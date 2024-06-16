import { NextRequest, NextResponse } from 'next/server';
import { db } from '@/app/lib/db';
import { authOptions } from '@/app/lib/auth';
import { getServerSession } from 'next-auth';

export async function POST(req: NextRequest) {
    try {
      const session = await getServerSession(authOptions);
      const body = await req.json();

      const {type} = body;
  
      if (type=="email") {
        const { email, smartWalletAddress } = body;

        const existingUser = await db.userEmail.findFirst({
          where: {
              email: email
          }
      });
        if(existingUser)
        {const addedUser = await db.userEmail.update({
            where: { email: email },
            data: {
              smartWalletAddress:smartWalletAddress,
            }
          });
        }

      } else if (type=="eoa") {
        const { eoaAddress, smartWalletAddress } = body;

        const existingUser = await db.userEOA.findFirst({
          where: {
              eoaAddress: eoaAddress
          }
      });

      if(existingUser)
        {
          const addedUser = await db.userEOA.update({
            where: { eoaAddress: eoaAddress },
            data: {
              smartWalletAddress:smartWalletAddress,
            }
          });
        }
        
      } else {
        return NextResponse.json({ error: 'User session is invalid' }, { status: 400 });
      }
  
      return NextResponse.json({ success: true });
    } catch (error) {
      console.error('Error adding user:', error);
      return NextResponse.json({ error: 'Failed to add user' }, { status: 500 });
    }
  }