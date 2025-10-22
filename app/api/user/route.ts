import { NextRequest, NextResponse } from 'next/server';
import { analyticsDb } from '@/lib/db';


export async function POST(request: NextRequest) {
  try {
    const body = await request.json();
    const username = body.username;

    console.log(username)

    // 1. Find the user by username (twitter handle)
    const user = await analyticsDb.user.findUnique({
      where: { username },
      select: {
        id: true,
        username: true,
        profilePictureUrl: true,
        createdAt: true,
      },
    });

    if (!user) {
      return NextResponse.json({ error: 'User not found' }, { status: 404 });
    }

    const responseData = {
      user: {
        id: user.id,
        username: user.username,
        profilePictureUrl: user.profilePictureUrl ?? null,
        createdAt: user.createdAt,
      },
    };

    return NextResponse.json(responseData, { status: 200 });

  } catch (error) {
    console.error('Error fetching user details:', error);
    const errorMessage = error instanceof Error ? error.message : 'Unknown error occurred';
    return NextResponse.json({ error: 'Failed to fetch user details', details: errorMessage }, { status: 500 });
  }
}
