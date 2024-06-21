import { NextRequest, NextResponse } from 'next/server';
import { db } from '@/app/lib/db';
import { authOptions } from '@/app/lib/auth';
import { getServerSession } from 'next-auth';
import { TransactionStatus } from '@prisma/client';

interface TransactionData {
  transactionHash: string;
  blockNumber: string;
  from: string;
  gasUsed: string;
  status: 'success' | 'reverted';
  to: string;
  type: string;
}

export async function GET(req: NextRequest) {
  try {
    const session = await getServerSession(authOptions);

    if (!session) {
      return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
    }

    let transactionsData;

    if (session.user.email) {
      transactionsData = await db.transaction.findMany({
        where: { userEmail: { email: session.user.email } },
      });
    } else if (session.user.eoaAddress) {
      transactionsData = await db.transaction.findMany({
        where: { userEOA: { eoaAddress: session.user.eoaAddress } },
      });
    } else {
      return NextResponse.json({ error: 'User session is invalid' }, { status: 400 });
    }

    return NextResponse.json({ success: true, transactionsData });
  } catch (error) {
    console.error('Error fetching transactions:', error);
    return NextResponse.json({ error: 'Failed to fetch transactions' }, { status: 500 });
  }
}

export async function POST(req: NextRequest) {
  try {
    const session = await getServerSession(authOptions);
    const body = await req.json();
    const { transactionHash, blockNumber, from, gasUsed, status, to, type } = body as TransactionData;

    if (!session) {
      return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
    }

    if (!transactionHash || !blockNumber || !from || !gasUsed || !status || !to || !type) {
      return NextResponse.json({ error: 'Missing required transaction fields' }, { status: 400 });
    }

    let addedTransaction;

    if (session.user.email) {
      addedTransaction = await db.userEmail.update({
        where: { email: session.user.email },
        data: {
          transactions: {
            create: {
              transactionHash,
              blockNumber: blockNumber,
              from,
              gasUsed: gasUsed,
              status: status as TransactionStatus, 
              to,
              type,
            },
          },
        },
        include: { transactions: true },
      });
    } else if (session.user.eoaAddress) {
      addedTransaction = await db.userEOA.update({
        where: { eoaAddress: session.user.eoaAddress },
        data: {
          transactions: {
            create: {
              transactionHash,
              blockNumber: blockNumber,
              from,
              gasUsed: gasUsed,
              status: status as TransactionStatus,
              to,
              type,
            },
          },
        },
        include: { transactions: true },
      });
    } else {
      return NextResponse.json({ error: 'User session is invalid' }, { status: 400 });
    }

    return NextResponse.json({ success: true, transaction: addedTransaction },{ status: 200 });
  } catch (error) {
    console.error('Error adding transaction:', error);
    return NextResponse.json({ error: 'Failed to add transaction' }, { status: 500 });
  }
}
