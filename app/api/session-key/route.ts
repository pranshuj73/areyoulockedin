import { NextRequest, NextResponse } from 'next/server';
import { v4 as uuidv4 } from 'uuid';
import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();

export async function POST(request: NextRequest) {
    try {
      const { userId, username, twitterId } = await request.json();
  
      if (!userId) {
        return NextResponse.json({ error: 'User ID is required' }, { status: 400 });
      }
  
      const sessionKey = uuidv4();
  
      // Use type assertion to avoid type errors
      const userData = {
        sessionKey,
      };
      
      if (username) {
        (userData as any).username = username;
      }
      
      if (twitterId) {
        (userData as any).twitterId = twitterId;
      }
  
      const user = await prisma.user.upsert({
        where: { id: userId },
        update: userData,
        create: { 
          id: userId, 
          sessionKey, 
          clerkId: userId,
          ...(username ? { username } : {}),
          ...(twitterId ? { twitterId } : {})
        },
      });
  
      return NextResponse.json({ sessionKey }, { status: 200 });
    } catch (error) {
      console.error('Error generating session key:', error);
      return NextResponse.json({ error: 'Failed to generate session key' }, { status: 500 });
    }
  }
