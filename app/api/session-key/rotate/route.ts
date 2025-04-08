import { NextRequest, NextResponse } from 'next/server';
import { v4 as uuidv4 } from 'uuid';
import { PrismaClient } from '@prisma/client';
import { currentUser } from '@clerk/nextjs/server';

const prisma = new PrismaClient();

export async function POST(request: NextRequest) {
  try {
    const { userId } = await request.json();
    const user = await currentUser();
    const clerkId = user?.id;

    if (!userId) {
      return NextResponse.json({ error: 'User ID is required' }, { status: 400 });
    }

    if (!clerkId) {
      return NextResponse.json({ error: 'User not authenticated' }, { status: 401 });
    }

    const sessionKey = uuidv4();

    const dbUser = await prisma.user.update({
      where: { id: userId },
      data: { sessionKey },
    });

    console.log('Session key created for clerk user:', dbUser.id, dbUser.username, dbUser.sessionKey);
    
    return NextResponse.json({ sessionKey }, { status: 200 });
  } catch (error) {
    console.error('Error generating session key:', error);
    return NextResponse.json({ error: 'Failed to generate session key' }, { status: 500 });
  }
}
