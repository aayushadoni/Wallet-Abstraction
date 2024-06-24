// SPDX-License-Identifier: UNLICENSED
pragma solidity ^0.8.17;

import "@chainlink/contracts/src/v0.8/interfaces/AggregatorV3Interface.sol";
import "@openzeppelin/contracts/access/Ownable.sol";
import "@openzeppelin/contracts/token/ERC20/IERC20.sol";
import "@openzeppelin/contracts/utils/math/SafeMath.sol";
import "@openzeppelin/contracts/security/ReentrancyGuard.sol";

contract ERC20FuturesExchange is Ownable, ReentrancyGuard {

    receive() external payable {}

    using SafeMath for uint;

    AggregatorV3Interface internal ethUsdPriceFeed;
    uint public minProofAmount;

    constructor(address _ethUsdPriceFeed, uint _minProofAmount) Ownable(msg.sender) {
        ethUsdPriceFeed = AggregatorV3Interface(_ethUsdPriceFeed);
        minProofAmount = _minProofAmount;
    }

    struct Order {
        address token;
        uint quantity;
        uint price;
        address user;
        bool buy;
        bool active;
    }

    struct FuturesContract {
        uint amount;
        uint price;
        uint dueBlock;
        bool settled;
        address longPosition;
        address shortPosition;
        uint longMargin;
        uint shortMargin;
    }

    mapping(bytes32 => Order) public orders;
    mapping(bytes32 => FuturesContract) public futuresContracts;

    event OrderPlaced(
        bytes32 indexed orderHash,
        address token,
        uint quantity,
        uint price,
        address user,
        bool buy
    );
    event OrderCancelled(bytes32 indexed orderHash, address user);
    event OrderSettled(
        bytes32 indexed sellOrderHash,
        bytes32 indexed buyOrderHash,
        uint price,
        uint quantity
    );

    event FuturesContractCreated(
        bytes32 indexed hash,
        uint amount,
        uint price,
        uint dueBlock,
        address shortPosition,
        uint shortMargin
    );
    event FuturesContractEntered(bytes32 indexed hash, address longPosition, uint longMargin);
    event FuturesContractSettled(
        bytes32 indexed hash,
        uint settlementPrice,
        uint longProfit,
        uint shortProfit
    );

    /**
     * @dev Retrieves the latest ETH price from Chainlink oracle.
     * @return The latest ETH price in USD.
     */
    function getEthPrice() public view returns (uint) {
        (, int price, , , ) = ethUsdPriceFeed.latestRoundData();
        return uint(price);
    }

    /**
     * @dev Places an order for buying or selling tokens.
     * @param token The address of the ERC20 token.
     * @param quantity The quantity of tokens.
     * @param price The price at which to buy/sell.
     * @param buy True if placing a buy order, false for sell order.
     */
    function placeOrder(
        address token,
        uint quantity,
        uint price,
        bool buy
    ) public payable nonReentrant {

        if (buy) {

            require(
                msg.value >= price.mul(10**18),
                "Insufficient ETH value for the specified price"
            );
        } else {
            require(
                IERC20(token).transferFrom(msg.sender, address(this), quantity),
                "Transfer of token failed"
            );
        }

        bytes32 orderHash = keccak256(
            abi.encodePacked(
                token,
                quantity,
                price,
                buy,
                block.number,
                msg.sender
            )
        );

        orders[orderHash] = Order({
            token: token,
            quantity: quantity,
            price: price,
            user: msg.sender,
            buy: buy,
            active: true
        });

        emit OrderPlaced(orderHash, token, quantity, price, msg.sender, buy);
    }

    /**
     * @dev Cancels an active order.
     * @param orderHash The hash of the order to cancel.
     */
    function cancelOrder(bytes32 orderHash) public nonReentrant {
        Order storage order = orders[orderHash];

        require(order.user == msg.sender, "Unauthorized");
        require(order.active == true, "Order already settled or cancelled");

        if (order.buy) {
            payable(msg.sender).transfer(order.price.mul(10**18));
        } else {
            require(
                IERC20(order.token).transfer(msg.sender, order.quantity),
                "Transfer of token failed"
            );
        }

        delete orders[orderHash];
        emit OrderCancelled(orderHash, msg.sender);
    }

    /**
     * @dev Settles matching buy and sell orders.
     * @param sellOrderHash The hash of the sell order.
     * @param buyOrderHash The hash of the buy order.
     */
    function settleOrder(
        bytes32 sellOrderHash,
        bytes32 buyOrderHash
    ) public onlyOwner nonReentrant {
        Order storage sellOrder = orders[sellOrderHash];
        Order storage buyOrder = orders[buyOrderHash];
        uint ethPrice = getEthPrice();

        require(
            sellOrder.active == true && buyOrder.active == true,
            "Order does not exist or already settled/cancelled"
        );
        require(
            sellOrder.buy == false && buyOrder.buy == true,
            "Order types mismatch"
        );
        require(sellOrder.price == buyOrder.price, "Order price mismatch");

        uint tradeQuantity = sellOrder.quantity < buyOrder.quantity
            ? sellOrder.quantity
            : buyOrder.quantity;
        uint ethAmount = sellOrder.quantity < buyOrder.quantity
            ? sellOrder.price
            : buyOrder.price;

        payable(sellOrder.user).transfer(ethAmount.mul(10**18));
        IERC20(buyOrder.token).transfer(buyOrder.user, tradeQuantity);

        sellOrder.quantity = sellOrder.quantity.sub(tradeQuantity);
        buyOrder.quantity = buyOrder.quantity.sub(tradeQuantity);

        emit OrderSettled(
            sellOrderHash,
            buyOrderHash,
            ethAmount.mul(ethPrice),
            tradeQuantity
        );

        if (sellOrder.quantity == 0) {
            delete orders[sellOrderHash];
        }
        if (buyOrder.quantity == 0) {
            delete orders[buyOrderHash];
        }
    }

    /**
     * @dev Creates a new futures contract.
     * @param amount The amount of the underlying asset.
     * @param dueBlock The block number by which the contract must be settled.
     * @return The hash of the created futures contract.
     */
    function createFuturesContract(
        uint amount,
        uint dueBlock
    ) external payable nonReentrant returns (bytes32) {

        require(dueBlock > block.number, "Due block must be in the future");
        require(msg.value >= minProofAmount.mul(amount.mul(10**18)), "Insufficient margin");

        uint price = getEthPrice();

        bytes32 contractHash = keccak256(
            abi.encode(amount, price, dueBlock, msg.sender, block.number)
        );
        futuresContracts[contractHash] = FuturesContract({
            amount: amount,
            price: price,
            dueBlock: dueBlock,
            settled: false,
            longPosition: address(0),
            shortPosition: msg.sender,
            longMargin: 0,
            shortMargin: msg.value.div(10**18)
        });

        emit FuturesContractCreated(
            contractHash,
            amount,
            price,
            dueBlock,
            msg.sender,
            msg.value.div(10**18)
        );
    }

    /**
     * @dev Enters an existing futures contract as a long position.
     * @param contractHash The hash of the futures contract.
     */
    function enterFuturesContract(bytes32 contractHash) public payable nonReentrant {
        FuturesContract storage futuresContract = futuresContracts[contractHash];
        require(futuresContract.shortPosition != address(0), "Futures contract does not exist");
        require(futuresContract.longPosition == address(0), "Futures contract already entered");
        require(futuresContract.dueBlock > block.number, "Futures contract expired");
        require(msg.value >= futuresContract.shortMargin, "Insufficient margin");

        futuresContract.longPosition = msg.sender;
        futuresContract.longMargin = msg.value.div(10**18);

        emit FuturesContractEntered(contractHash, msg.sender, msg.value.div(10**18));
    }

    /**
     * @dev Settles a due futures contract.
     * @param contractHash The hash of the futures contract.
     */
    function settleFuturesContract(bytes32 contractHash) public nonReentrant {
        FuturesContract storage futuresContract = futuresContracts[contractHash];
        require(futuresContract.dueBlock <= block.number, "Futures contract not yet due");
        require(futuresContract.settled == false, "Futures contract already settled");

        uint settlementPrice = getEthPrice();
        uint longProfit = 0;
        uint shortProfit = 0;

        if (settlementPrice < futuresContract.price) {
            shortProfit = futuresContract.amount.mul(futuresContract.price.sub(settlementPrice));
        } else {
            longProfit = futuresContract.amount.mul(settlementPrice.sub(futuresContract.price));
        }

        futuresContract.settled = true;
        uint totalMargin = futuresContract.longMargin.add(futuresContract.shortMargin);

        if (longProfit > 0) {
            payable(futuresContract.longPosition).transfer(longProfit.mul(10**18));
            payable(futuresContract.shortPosition).transfer((totalMargin.sub(longProfit)).mul(10**18));
        } else {
            payable(futuresContract.shortPosition).transfer(shortProfit.mul(10**18));
            payable(futuresContract.longPosition).transfer((totalMargin.sub(shortProfit)).mul(10**18));
        }

        emit FuturesContractSettled(contractHash, settlementPrice, longProfit, shortProfit);
    }
}
