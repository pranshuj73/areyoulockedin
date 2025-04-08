import { NextRequest, NextResponse } from 'next/server';
import { PrismaClient } from '@prisma/client';
import { currentUser } from '@clerk/nextjs/server';

const prisma = new PrismaClient();

export async function GET(request: NextRequest) {
  try {
    const user = await currentUser();
    const userId = user?.id;

    if (!userId) {
      return NextResponse.json({ error: 'User ID is required' }, { status: 400 });
    }

    const dbUser = await prisma.user.findUnique({
      where: { id: userId },
    });

    if (!dbUser) {
      return NextResponse.json({ error: `User not found for userId: ${userId}` }, { status: 404 });
    }

    console.log('Session key retrieved for user:', dbUser.id, dbUser.username, dbUser.sessionKey);

    return NextResponse.json({ sessionKey: dbUser.sessionKey }, { status: 200 });
  } catch (error) {
    console.error('Error retrieving session key:', error);
    return NextResponse.json({ errrr: 'Failed to retrieve session key' }, { status: 500 });
  }
}
