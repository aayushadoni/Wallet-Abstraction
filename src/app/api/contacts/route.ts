import { NextRequest, NextResponse } from 'next/server';
import { db } from '@/app/lib/db';
import { authOptions } from '@/app/lib/auth';
import { getServerSession } from 'next-auth';

export async function GET(res: NextResponse) {
    try {
      const session = await getServerSession(authOptions);
  
      if (!session) {
        return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
      }
      let friendsData;
      if (session.user.email) {
        friendsData = await db.userEmail.findFirst({
          where: { email: session.user.email },
          include: { friends: true },
        });
      } else if (session.user.address) {
        friendsData = await db.userEOA.findFirst({
          where: { eoaAddress: session.user.address },
          include: { friends: true },
        });
      } else {
        return NextResponse.json({ error: 'User session is invalid' }, { status: 400 });
      }
  
      return NextResponse.json({ success: true, friendsData: friendsData });
    } catch (error) {
      console.error('Error adding friend:', error);
      return NextResponse.json({ error: 'Failed to add friend' }, { status: 500 });
    }
  }

export async function POST(req: NextRequest) {
  try {
    const session = await getServerSession(authOptions);
    const body = await req.json();
    const { name, address } = body;

    if (!session) {
      return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
    }

    if (!name || !address) {
      return NextResponse.json({ error: 'Name and address are required' }, { status: 400 });
    }

    let addedFriend;

    if (session.user.email) {
      addedFriend = await db.userEmail.update({
        where: { email: session.user.email },
        data: {
          friends: {
            create: {
              name,
              address,
              transaction_no: 0,
            },
          },
        },
        include: { friends: true },
      });
    } else if (session.user.address) {
      addedFriend = await db.userEOA.update({
        where: { eoaAddress: session.user.address },
        data: {
          friends: {
            create: {
              name,
              address,
              transaction_no: 0,
            },
          },
        },
        include: { friends: true },
      });
    } else {
      return NextResponse.json({ error: 'User session is invalid' }, { status: 400 });
    }

    return NextResponse.json({ success: true, friend: addedFriend });
  } catch (error) {
    console.error('Error adding friend:', error);
    return NextResponse.json({ error: 'Failed to add friend' }, { status: 500 });
  }
}

export async function DELETE(req: NextRequest) {
  try {
    const session = await getServerSession(authOptions);
    const body = await req.json();
    const { name, address } = body;

    if (!session) {
      return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
    }

    if (!name || !address) {
      return NextResponse.json({ error: 'Name and address are required' }, { status: 400 });
    }

    if (session.user.email) {
      const user = await db.userEmail.findUnique({
        where: { email: session.user.email },
        include: { friends: true },
      });

      if (user) {
        await db.friend.deleteMany({
          where: {
            name,
            address,
            userEmailId: user.id,
          },
        });
      }
    } else if (session.user.address) {
      const user = await db.userEOA.findUnique({
        where: { eoaAddress: session.user.address },
        include: { friends: true },
      });

      if (user) {
        await db.friend.deleteMany({
          where: {
            name,
            address,
            userEOAId: user.id,
          },
        });
      }
    } else {
      return NextResponse.json({ error: 'User session is invalid' }, { status: 400 });
    }

    return NextResponse.json({ success: true });
  } catch (error) {
    console.error('Error deleting friend:', error);
    return NextResponse.json({ error: 'Failed to delete friend' }, { status: 500 });
  }
}
