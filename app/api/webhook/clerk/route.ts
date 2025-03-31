import { WebhookEvent } from '@clerk/nextjs/server';
import { NextRequest, NextResponse } from 'next/server';
import { v4 as uuidv4 } from 'uuid';
import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();

export async function POST(req: NextRequest) {
  // Access headers directly from the request
  const svix_id = req.headers.get('svix-id');
  const svix_timestamp = req.headers.get('svix-timestamp');
  const svix_signature = req.headers.get('svix-signature');

  // If there are no Svix headers, this isn't a Clerk webhook
  if (!svix_id || !svix_timestamp || !svix_signature) {
    return new NextResponse('Missing svix headers', { status: 400 });
  }

  // Get the body of the request
  const payload = await req.json();
  const { type, data } = payload;

  // Only process user.created events
  if (type === 'user.created') {
    try {
      const userId = data.id;
      const usernameValue = data.username || data.first_name || null;
      
      // Try to get Twitter account if available
      let twitterIdValue = null;
      if (data.external_accounts && data.external_accounts.length > 0) {
        const twitterAccount = data.external_accounts.find(
          (account: any) => account.provider === 'twitter'
        );
        if (twitterAccount) {
          twitterIdValue = twitterAccount.username || null;
        }
      }

      const sessionKey = uuidv4();

      // Create the user data object
      const userData: any = {
        id: userId,
        clerkId: userId,
        sessionKey,
      };
      
      // Add optional fields if they exist
      if (usernameValue) {
        userData.username = usernameValue;
      }
      
      if (twitterIdValue) {
        userData.twitterId = twitterIdValue;
      }

      // Create the user in the database
      await prisma.user.create({
        data: userData,
      });

      return NextResponse.json(
        { success: true, message: 'User created successfully' },
        { status: 200 }
      );
    } catch (error) {
      console.error('Error creating user:', error);
      return NextResponse.json(
        { success: false, error: 'Failed to create user' },
        { status: 500 }
      );
    }
  }

  // Return a 200 for any other webhook event
  return NextResponse.json({ success: true }, { status: 200 });
} 