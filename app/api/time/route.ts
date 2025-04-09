import { NextRequest, NextResponse } from 'next/server';
import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();

export async function POST(request: NextRequest) {
  try {
    const { sessionKey, timeSpent, language, timestamp } = await request.json();

    if (!sessionKey || !timeSpent || !language || !timestamp) {
      return NextResponse.json({ error: 'Missing required fields' }, { status: 400 });
    }

    const user = await prisma.user.findUnique({
      where: { sessionKey },
    });

    if (!user) {
      return NextResponse.json({ error: 'Invalid session key' }, { status: 401 });
    }

    const roundedTimeSpent = Math.ceil(parseFloat(timeSpent) * 100) / 100;

    const timeEntry = await prisma.timeEntry.create({
      data: {
        userId: user.id,
        sessionKey,
        timeSpent: roundedTimeSpent,
        language: language || "Missingno", // Use the sent language directly
        timestamp: new Date(timestamp),
      },
    });

    return NextResponse.json({ message: 'Time recorded', timeEntry }, { status: 200 });
  } catch (error) {
    console.error('Error saving time entry:', error);
    return NextResponse.json({ error: 'Failed to save time data' }, { status: 500 });
  }
}
