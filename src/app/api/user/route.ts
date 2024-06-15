import { NextRequest, NextResponse } from 'next/server';
import { db } from '@/app/lib/db';
import { authOptions } from '@/app/lib/auth';
import { getServerSession } from 'next-auth';

export async function POST(req: NextRequest) {
    try {
      const session = await getServerSession(authOptions);
      const body = await req.json();
  
      if (!session) {
        return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
      }
  
      if (session.user.email) {
        const { smartWalletAddress } = body;
        const addedUser = await db.userEmail.update({
            where: { email: session.user.email },
            data: {
              smartWalletAddress:smartWalletAddress,
            },
            include: { friends: true },
          });

      } else if (session.user.address) {
        const { eoaAddress, smartWalletAddress } = body;
        const addedUser = await db.userEOA.create({
            data:{
              eoaAddress:eoaAddress,
              transaction_no:0,
              smartWalletAddress:smartWalletAddress
            }
          });
      } else {
        return NextResponse.json({ error: 'User session is invalid' }, { status: 400 });
      }
  
      return NextResponse.json({ success: true });
    } catch (error) {
      console.error('Error adding user:', error);
      return NextResponse.json({ error: 'Failed to add user' }, { status: 500 });
    }
  }