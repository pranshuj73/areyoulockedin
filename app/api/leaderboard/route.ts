import { NextRequest, NextResponse } from 'next/server';
import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();

export async function GET(request: NextRequest) {
  try {
    const usersSortedByTimeEntries = await prisma.user.findMany({
      select: {
        id: true,
        clerkId: true,
        _count: {
          select: { timeEntries: true }
        }
      },
      where: {
        timeEntries: {
          some: {
            timestamp: {
              gte: new Date(Date.now() - 24 * 60 * 60 * 1000) // Last 24 hours
            }
          }
        }
      },
      orderBy: {
        timeEntries: {
          _count: 'desc'
        }
      }
    });

    return NextResponse.json({data: usersSortedByTimeEntries}, { status: 200 });
  } catch (error) {
    console.error('Error saving time entry:', error);
    return NextResponse.json({ error: 'Failed to save time data' }, { status: 500 });
  }
}
