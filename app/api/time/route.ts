import { NextRequest, NextResponse } from 'next/server';
import { PrismaClient } from '@prisma/client';
import { getLanguage } from '@/lib/language';

const prisma = new PrismaClient();

export async function POST(request: NextRequest) {
  try {
    const { sessionKey, timeSpent, fileExtension, timestamp } = await request.json();

    if (!sessionKey || !timeSpent || !fileExtension || !timestamp) {
      return NextResponse.json({ error: 'Missing required fields' }, { status: 400 });
    }

    const language = getLanguage(fileExtension);

    const user = await prisma.user.findUnique({
      where: { sessionKey },
    });

    if (!user) {
      return NextResponse.json({ error: 'Invalid session key' }, { status: 401 });
    }

    const timeEntry = await prisma.timeEntry.create({
      data: {
        sessionKey,
        timeSpent: parseFloat(timeSpent),
        language: language ? language : "text",
        timestamp: new Date(timestamp),
      },
    });

    return NextResponse.json({ message: 'Time recorded', timeEntry }, { status: 200 });
  } catch (error) {
    console.error('Error saving time entry:', error);
    return NextResponse.json({ error: 'Failed to save time data' }, { status: 500 });
  }
}
