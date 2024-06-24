


import { NextResponse } from 'next/server';

export async function GET() {
  return NextResponse.json({ message: 'Hello - GET' });
}

// import { NextRequest, NextResponse } from 'next/server';
// import { db } from '@/app/lib/db';
// import { authOptions } from '@/app/lib/auth';
// import { getServerSession } from 'next-auth';
// import {
//   getContract,
//   prepareContractCall,
//   createThirdwebClient,
//   sendAndConfirmTransaction,
//   prepareEvent,
//   watchContractEvents,
//   toWei
// } from "thirdweb";
// import { baseSepolia } from "thirdweb/chains";
// import { privateKeyToAccount } from "thirdweb/wallets";

// export async function POST(req: NextRequest) {
//   try {
//     const session = await getServerSession(authOptions);
//     const body = await req.json();
//     const { amount, dueBlock, activeAccount } = body;

//     if (!session) {
//       console.log('Unauthorized: Session not found');
//       return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
//     }

//     if ( !amount || !dueBlock || !activeAccount) {
//       return NextResponse.json({ error: 'token, quantity, price, buy are required' }, { status: 400 });
//     }

//     const client = createThirdwebClient({
//       secretKey: process.env.NEXT_PUBLIC_ThirdWebAPISceret,
//     });

//     const ownerAccount = privateKeyToAccount({
//       client:client,
//       privateKey: process.env.NEXT_PUBLIC_PRIVATE_KEY,
//      });

//     const contract = getContract({
//       client:client,
//       chain: baseSepolia,
//       address: "address",
//     });

//     const tx = prepareContractCall({
//       contract,
//       method: "function createFuturesContract(uint amount,uint dueBlock) external payable",
//       params: [amount, dueBlock],
//       value: toWei(`${amount * 0.15}`)
//     });

//     const transactionResult = await sendAndConfirmTransaction({
//       transaction: tx,
//       account: activeAccount,
//     });


//     if (transactionResult.status !== "success") {
//       throw new Error("Transaction failed or pending");
//     }

//     const futuresContractCreatedEvent = prepareEvent({
//       signature: "event OrderPlaced(bytes32 indexed orderHash, address token, uint quantity, uint price, address user, bool buy)",
//     });

//     let newOrderHash: string | undefined;

//     const watchEvent = watchContractEvents({
//       contract: contract,
//       events: [futuresContractCreatedEvent],
//       onEvents: async (events) => {
        
//         for (const event of events) {

//           const { orderHash, quantity, price, user, buy } = event.args;
          
//           try {
//             const createdOrder = await db.order.create({
//               data: {
//                 orderHash: orderHash,
//                 token: token,
//                 quantity: quantity,
//                 price: price,
//                 customerAddress: user,
//                 buy: buy,
//                 createdAt: new Date()
//               }
//             });

//             newOrderHash = orderHash;
//             console.log(`OrderPlaced event: orderHash=${orderHash}, token=${token}, quantity=${quantity}, price=${price}, user=${user}, buy=${buy}`);

//             const oppositeOrders = await db.order.findMany({
//               where: {
//                 token: token,
//                 price:price,
//                 buy: !buy
//               },
//               orderBy: {
//                 createdAt: 'asc'
//               }
//             });

//             if (oppositeOrders.length > 0 && newOrderHash) {
//               const matchedOrder = oppositeOrders[0];
//               const settleTx = prepareContractCall({
//                 contract,
//                 method: "function settleOrder(bytes32 sellOrderHash, bytes32 buyOrderHash)",
//                 params: [
//                   buy ? `0x${matchedOrder.orderHash}` : `0x${orderHash}`,
//                   buy ? `0x${orderHash}` : `0x${matchedOrder.orderHash}`
//                 ],
//               });

//               const settleResult = await sendAndConfirmTransaction({
//                 transaction: settleTx,
//                 account: ownerAccount,
//               });

//               if (settleResult.status !== "success") {
//                 console.log('Settlement transaction failed or pending');
//                 throw new Error("Settlement transaction failed or pending");
//               }

//               await db.order.deleteMany({
//                 where: {
//                   OR: [
//                     { orderHash: matchedOrder.orderHash },
//                     { orderHash: orderHash }
//                   ]
//                 }
//               });

//             }
//             return NextResponse.json({ success: true, orderHash: orderHash }, { status: 200 });

//           } catch (error) {
//             console.error("Error processing OrderPlaced event:", error);
//             return NextResponse.json({ success: false }, { status: 400 });
//           }
//         }
//       },
//     });

//     return NextResponse.json({ success: true }, { status: 200 });

//   } catch (error) {
//     console.error("Failed to place order:", error);
//     return NextResponse.json({ error: 'Failed to Place Order' }, { status: 500 });
//   }
// }

// export async function DELETE(req: NextRequest) {
//   try {
//     const session = await getServerSession(authOptions);
//     const body = await req.json();
//     const { orderHash, activeAccount } = body;

//     if (!session) {
//       return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
//     }

//     if ( !orderHash || !activeAccount ) {
//       return NextResponse.json({ error: ' orderHash, activeAccount are required' }, { status: 400 });
//     }

//     const client = createThirdwebClient({
//       secretKey: process.env.NEXT_PUBLIC_ThirdWebAPISceret,
//     });

//     const contract = getContract({
//       client,
//       chain: baseSepolia,
//       address: "address",
//     });

//     const tx = prepareContractCall({
//       contract,
//       method: "function cancelOrder(bytes32 orderHash) public",
//       params: [orderHash]
//     });

//     const transactionResult = await sendAndConfirmTransaction({
//       transaction: tx,
//       account: activeAccount,
//     });


//     if (transactionResult.status !== "success") {
//       throw new Error("Transaction failed or pending");
//     }

//     const OrderPlacedEvent = prepareEvent({
//       signature: "event OrderCancelled(bytes32 indexed orderHash, address user)",
//     });

//     let newOrderHash: string | undefined;

//     const watchEvent = watchContractEvents({
//       contract: contract,
//       events: [OrderPlacedEvent],
//       onEvents: async (events) => {
        
//         for (const event of events) {

//           const { orderHash, user } = event.args;

//           try {
//             await db.order.deleteMany({
//                 where: { orderHash: orderHash }
//               });

//             return NextResponse.json({ success: true }, { status: 200 });

//           } catch (error) {
//             console.error("Error processing Delete event:", error);
//             return NextResponse.json({ success: false }, { status: 400 });
//           }
//         }
//       },
//     });

//     return NextResponse.json({ success: true }, { status: 200 });

//   } catch (error) {
//     return NextResponse.json({ error: 'Failed to Delete Order' }, { status: 500 });
//   }
// }
