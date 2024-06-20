import React, { useEffect, useRef, useState } from "react";
import axios from "axios";
import { sepolia, bscTestnet, avalancheFuji, optimismSepolia, arbitrumSepolia, baseSepolia, polygonAmoy, Chain } from "thirdweb/chains";
import { useRecoilValue, useSetRecoilState } from "recoil";
import { smartWalletAddressAtom, activeAccountAtom } from "@/app/lib/states";
import { HiOutlineClipboardCopy } from "react-icons/hi";
import { AiOutlineCheck } from "react-icons/ai";
import { HiOutlineChevronDown } from 'react-icons/hi';
import { createThirdwebClient } from "thirdweb";
import { smartWallet } from "thirdweb/wallets";
import { prepareTransaction, toWei } from "thirdweb";
import { sendAndConfirmTransaction } from "thirdweb";

interface SendModalProps {
    showSendModal: boolean;
    toggleSendModal: () => void;
    sendData: { id: number, name: string, address: string };
}

const SendContactsModal: React.FC<SendModalProps> = ({ showSendModal, toggleSendModal, sendData }) => {


    const activeAccountValue = useRecoilValue(activeAccountAtom);

    const clientId = process.env.NEXT_PUBLIC_ThirdWebClientId as string
    const client = createThirdwebClient({
        clientId: clientId,
    });

    const toAddress = useRef("");
    const fromAddress = useRef("");
    const token = useRef("");
    const fromChain = useRef(sepolia);
    const toChain = useRef(sepolia);

    const suportedChains = [
        { id: 1, name: "ETH", image: "https://cryptologos.cc/logos/ethereum-eth-logo.svg?v=032", chain: sepolia },
        { id: 2, name: "BSC", image: "https://cryptologos.cc/logos/bnb-bnb-logo.svg?v=032", chain: bscTestnet },
        { id: 3, name: "Matic", image: "https://cryptologos.cc/logos/polygon-matic-logo.svg?v=032", chain: polygonAmoy },
        { id: 7, name: "Avalanche", image: "https://cryptologos.cc/logos/avalanche-avax-logo.svg?v=032", chain: avalancheFuji },
        { id: 9, name: "Optimism", image: "https://cryptologos.cc/logos/optimism-ethereum-op-logo.svg?v=032", chain: optimismSepolia },
        { id: 10, name: "Arbitrum", image: "https://cryptologos.cc/logos/arbitrum-arb-logo.svg?v=032", chain: arbitrumSepolia },
        { id: 11, name: "Base", image: "https://tokenlogo.xyz/assets/chain/base.svg", chain: baseSepolia },
    ];

    const smartWalletAddressValue = useRecoilValue(smartWalletAddressAtom)
    const [copiedAddress, setCopiedAddress] = useState<string | null>(null);
    const [dropdownOpenToChain, setDropdownOpenToChain] = useState(false);
    const [dropdownOpenFromChain, setDropdownOpenFromChain] = useState(false);
    const [dropdownOpenToken, setDropdownOpenToken] = useState(false);
    const [selectedToChain, setSelectedToChain] = useState(suportedChains[0]);
    const [selectedFromChain, setSelectedFromChain] = useState(suportedChains[0]);
    const [selectedToken, setSelectedToken] = useState(suportedChains[0]);
    const [amount, setAmount] = useState('');
    const [crossChain, setcrossChain] = useState(false);

    const copyToClipboard = (address: string) => {
        navigator.clipboard.writeText(address);
        setCopiedAddress(address);
        setTimeout(() => setCopiedAddress(null), 3000);
    };

    const handleToChainChange = (chain: { id: number, name: string, image: string, chain: Chain }) => {
        setSelectedToChain(chain);
        setDropdownOpenToChain(false);
    };

    const handleFromChainChange = (chain: { id: number, name: string, image: string, chain: Chain }) => {
        setSelectedFromChain(chain);
        setDropdownOpenFromChain(false);
    };

    const handleTokenChange = (chain: { id: number, name: string, image: string, chain: Chain }) => {
        setSelectedToken(chain);
        setDropdownOpenToken(false);
    };

    const handleAmountChange = (event: React.ChangeEvent<HTMLInputElement>) => {
        setAmount(event.target.value);
      };

    const togleCrossChain = () => {
        setcrossChain(!crossChain);
    }

    const handleSendSubmit = async (event: React.FormEvent) => {
        event.preventDefault();

        try {
            if (!crossChain) {
                if (activeAccountValue != null) {

                    const wallet = smartWallet({
                        chain: baseSepolia,
                        gasless: true,
                      });
                       
                    const account = await wallet.connect({
                        client,
                        personalAccount: activeAccountValue,
                    });

                    const transaction = prepareTransaction({
                        to: `${sendData.address}`,
                        chain: selectedFromChain.chain,
                        client: client,
                        value: toWei(`${amount}`),
                       });

                       console.log(transaction)
                       
                    const receipt = await sendAndConfirmTransaction({
                    transaction,
                    account: account,
                    });

                    toggleSendModal();
                    console.log(receipt);
                }
            }
        } catch (error) {
            console.error('Failed to initiate transfer:', error);
        }
    };

    return (
        <>
            {showSendModal && (
                <div className="fixed top-0 left-0 w-full h-full backdrop-blur-sm bg-gray-800 bg-opacity-50 flex items-center justify-center z-50">
                    <div className="bg-gray-900 rounded-lg shadow-lg p-4 max-w-md w-full mx-4">
                        <div className="flex justify-between items-center border-b-2 pb-2 mb-4">
                            <h2 className="text-xl font-semibold text-gray-400">Send Tokens Cross-Chain</h2>
                            <button
                                onClick={toggleSendModal}
                                className="text-gray-400 hover:text-gray-600 focus:outline-none"
                            >
                                <svg
                                    xmlns="http://www.w3.org/2000/svg"
                                    className="h-6 w-6"
                                    fill="none"
                                    viewBox="0 0 24 24"
                                    stroke="currentColor"
                                >
                                    <path
                                        strokeLinecap="round"
                                        strokeLinejoin="round"
                                        strokeWidth={2}
                                        d="M6 18L18 6M6 6l12 12"
                                    />
                                </svg>
                            </button>
                        </div>
                        <form onSubmit={handleSendSubmit} className="space-y-4 justify-center">
                            <div>
                                <label className="block mb-1 text-sm font-medium text-gray-400">From Address</label>
                                <div className="inline-flex items-center gap-2 bg-gray-700 px-2 py-2 rounded-xl shadow-inner">
                                    <p className="text-white font-mono text-xs">
                                        {smartWalletAddressValue.substring(0, 28)}...{smartWalletAddressValue.substring(smartWalletAddressValue.length - 4)}
                                    </p>
                                    <button
                                        className="text-white hover:text-gray-300 focus:outline-none"
                                        onClick={() => copyToClipboard(smartWalletAddressValue)}
                                        aria-label="Copy wallet address"
                                    >
                                        {copiedAddress === smartWalletAddressValue ? (
                                            <AiOutlineCheck className="w-5 h-5 text-green-500" />
                                        ) : (
                                            <HiOutlineClipboardCopy className="w-5 h-5" />
                                        )}
                                    </button>
                                </div>
                            </div>

                            <div className="inline-flex flex-row rounded-full gap-10">
                                <div>
                                    <label className="block mb-1 text-sm font-medium text-gray-400">From Chain</label>
                                    <button
                                        id="coin"
                                        onClick={() => setDropdownOpenFromChain(!dropdownOpenFromChain)}
                                        className="w-full bg-gray-800 text-white p-2 rounded-xl flex justify-between items-center"
                                    >
                                        <div className="flex items-center gap-2">
                                            <img src={selectedFromChain.image} alt={selectedFromChain.name} className="w-6 h-6 rounded-full" />
                                            <span className='text-md'>{selectedFromChain.name}</span>
                                        </div>
                                        <HiOutlineChevronDown className="text-gray-400 mx-2" />
                                    </button>
                                    {dropdownOpenFromChain && (
                                        <div className="absolute z-10 w-full max-h-40 overflow-y-auto bg-gray-700 rounded-xl mt-1 max-w-32 no-scrollbar">
                                            {suportedChains.map((chain) => (
                                                <div
                                                    key={chain.id}
                                                    className="flex items-center gap-2 p-2 cursor-pointer hover:bg-gray-800 rounded-xl"
                                                    onClick={() => handleFromChainChange(chain)}
                                                >
                                                    <img src={chain.image} alt={chain.name} className="w-6 h-6 rounded-full" />
                                                    <span className='text-md font-md '>{chain.name}</span>
                                                </div>
                                            ))}
                                        </div>
                                    )}
                                </div>

                                {!crossChain ? <></> : <div>
                                    <label className="block mb-1 text-sm font-medium text-gray-400">To Chain</label>
                                    <button
                                        id="coin"
                                        onClick={() => setDropdownOpenToChain(!dropdownOpenToChain)}
                                        className="w-full bg-gray-800 text-white p-2 rounded-xl flex justify-between items-center"
                                    >
                                        <div className="flex items-center gap-2">
                                            <img src={selectedToChain.image} alt={selectedToChain.name} className="w-6 h-6 rounded-full" />
                                            <span className='text-md'>{selectedToChain.name}</span>
                                        </div>
                                        <HiOutlineChevronDown className="text-gray-400 mx-2" />
                                    </button>
                                    {dropdownOpenToChain && (
                                        <div className="absolute z-10 w-full max-h-40 overflow-y-auto bg-gray-700 rounded-xl mt-1 max-w-32 no-scrollbar">
                                            {suportedChains.map((chain) => (
                                                <div
                                                    key={chain.id}
                                                    className="flex items-center gap-2 p-2 cursor-pointer hover:bg-gray-800 rounded-xl"
                                                    onClick={() => handleToChainChange(chain)}
                                                >
                                                    <img src={chain.image} alt={chain.name} className="w-6 h-6 rounded-full" />
                                                    <span className='text-md font-md '>{chain.name}</span>
                                                </div>
                                            ))}
                                        </div>
                                    )}
                                </div>}

                            </div>
                            <div>
                                <label className="block mb-1 text-sm font-medium text-gray-400">Token</label>
                                <button
                                    id="coin"
                                    onClick={() => setDropdownOpenToken(!dropdownOpenToken)}
                                    className="w-full bg-gray-800 text-white p-2 rounded-xl flex justify-between items-center"
                                >
                                    <div className="flex items-center gap-2">
                                        <img src={selectedToken.image} alt={selectedToken.name} className="w-6 h-6 rounded-full" />
                                        <span className='text-md'>{selectedToken.name}</span>
                                    </div>
                                    <HiOutlineChevronDown className="text-gray-400 mx-2" />
                                </button>
                                {dropdownOpenToken && (
                                    <div className="absolute z-10 w-[413px] max-h-40 overflow-y-auto bg-gray-700 rounded-xl mt-1 no-scrollbar">
                                        {suportedChains.map((chain) => (
                                            <div
                                                key={chain.id}
                                                className="flex items-center gap-2 p-2 cursor-pointer hover:bg-gray-800 rounded-xl"
                                                onClick={() => handleTokenChange(chain)}
                                            >
                                                <img src={chain.image} alt={chain.name} className="w-6 h-6 rounded-full" />
                                                <span className='text-md font-md '>{chain.name}</span>
                                            </div>
                                        ))}
                                    </div>
                                )}
                            </div>
                            <div>
                                <label className="block mb-1 text-sm font-medium text-gray-400">Amount</label>
                                <input
                                    type="number"
                                    className="w-full bg-gray-800 border border-gray-700 p-2 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                                    step="any"
                                    placeholder="Enter amount"
                                    onChange={handleAmountChange}
                                />
                            </div>
                            <div>
                                <label className="block mb-1 text-sm font-medium text-gray-400">To Address</label>
                                <div className="inline-flex items-center gap-2 bg-gray-700 px-2 py-2 rounded-xl shadow-inner">
                                    <p className="text-white font-mono text-xs">
                                        {sendData.address.substring(0, 28)}...{sendData.address.substring(smartWalletAddressValue.length - 4)}
                                    </p>
                                    <button
                                        className="text-white hover:text-gray-300 focus:outline-none"
                                        onClick={() => copyToClipboard(sendData.address)}
                                        aria-label="Copy wallet address"
                                    >
                                        {copiedAddress === sendData.address ? (
                                            <AiOutlineCheck className="w-5 h-5 text-green-500" />
                                        ) : (
                                            <HiOutlineClipboardCopy className="w-5 h-5" />
                                        )}
                                    </button>
                                </div>
                            </div>
                            <div className="flex items-center">
                                <input onChange={() => { togleCrossChain() }} type="checkbox" className="form-checkbox h-4 w-4 text-blue-600" />
                                <label className="ml-2 block text-sm text-gray-400">I want to send cross-chain</label>
                            </div>
                            <div className="flex justify-end">
                                <button
                                    type="submit"
                                    className="px-4 py-2 bg-blue-600 text-white rounded-md hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-500"
                                >
                                    Continue
                                </button>
                            </div>
                        </form>
                    </div>
                </div>
            )}
        </>
    );
};

export default SendContactsModal;
