import { NextRequest, NextResponse } from 'next/server';
import { db } from '@/app/lib/db'

export async function POST(req: NextRequest) {
    try {
      const body = await req.json();
  
      if (body.email) {
        const { email,smartWalletAddress } = body;
        const addedUser = await db.userEmail.update({
            where: { email: email },
            data: {
              smartWalletAddress:smartWalletAddress,
            },
            include: { friends: true },
          });

      } else if (body.eoaAddress) {
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