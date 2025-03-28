import { NextRequest, NextResponse } from 'next/server';
import { v4 as uuidv4 } from 'uuid';
import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();

export async function POST(request: NextRequest) {
    try {
      const { userId } = await request.json();
  
      if (!userId) {
        return NextResponse.json({ error: 'User ID is required' }, { status: 400 });
      }
  
      const sessionKey = uuidv4();
  
      const user = await prisma.user.upsert({
        where: { id: userId },
        update: { sessionKey },
        create: { id: userId, sessionKey },
      });
  
      return NextResponse.json({ sessionKey }, { status: 200 });
    } catch (error) {
      console.error('Error generating session key:', error);
      return NextResponse.json({ error: 'Failed to generate session key' }, { status: 500 });
    }
  }