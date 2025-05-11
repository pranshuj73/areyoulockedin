import { UserJSON, WebhookEvent } from '@clerk/nextjs/server'
import { Webhook } from 'svix'
import { PrismaClient } from '@prisma/client';
import { NextRequest, NextResponse } from 'next/server';

const prisma = new PrismaClient();
const webhookSecret = process.env.CLERK_WEBHOOK_SECRET || ``

async function validateRequest(request: NextRequest) {
  const payloadString = await request.text()

  const svixHeaders = {
    'svix-id': request.headers.get('svix-id')!,
    'svix-timestamp': request.headers.get('svix-timestamp')!,
    'svix-signature': request.headers.get('svix-signature')!,
  }
  const wh = new Webhook(webhookSecret)
  return wh.verify(payloadString, svixHeaders) as WebhookEvent
}

export async function POST(request: NextRequest) {
  try {
    const payload = await validateRequest(request)
    console.log(payload)

    if (payload.type === "user.created" || payload.type === "user.updated") {
      const data: UserJSON = payload.data
      const userId = data.id
      const username = data.username
      const profilePictureUrl = data.image_url

      if (!userId || !username) {
        console.log('User ID or username is missing. Received Payload:', payload);
        return NextResponse.error()
      }

      // now handle user creation
      const userObj = await prisma.user.upsert({
        where:  { id: userId },
        update: { username, profilePictureUrl },
        create: { id: userId, username, profilePictureUrl },
      });

      const eventType = payload.type.split('.')[1]
      console.log(`User ${eventType} with id:`, userObj.id, "& username:", userObj.username);
    }

    return NextResponse.json({ message: 'payload received successfully!' })
  } catch (e) {
    console.log("encountered err:", e)
    return NextResponse.error()
  }
}
