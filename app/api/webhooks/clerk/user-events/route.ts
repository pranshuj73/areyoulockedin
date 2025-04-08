import { UserJSON, WebhookEvent } from '@clerk/nextjs/server'
import { headers } from 'next/headers'
import { Webhook } from 'svix'
import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();
const webhookSecret = process.env.CLERK_WEBHOOK_SECRET || ``

async function validateRequest(request: Request) {
  const payloadString = await request.text()
  const headerPayload = headers()

  const svixHeaders = {
    'svix-id': headerPayload.get('svix-id')!,
    'svix-timestamp': headerPayload.get('svix-timestamp')!,
    'svix-signature': headerPayload.get('svix-signature')!,
  }
  const wh = new Webhook(webhookSecret)
  return wh.verify(payloadString, svixHeaders) as WebhookEvent
}

export async function POST(request: Request) {
  try {
    const payload = await validateRequest(request)
    console.log(payload)

    if (payload.type === "user.created" || payload.type === "user.updated") {
      const data: UserJSON = payload.data
      const userId = data.id
      const username = data.username
      const profilePictureUrl = data.image_url

      if (!userId && !username) {
        console.log('User ID or username is missing. Received Payload:', payload);
        return Response.error()
      }

      // now handle user creation
      const userObj = await prisma.user.upsert({
        where:  { id: userId },
        update: { username, profilePictureUrl },
        create: { id: userId, username, profilePictureUrl },
      });

      console.log("User created/udpated with id:", userObj.id, "& username:", userObj.username);
    }

    return Response.json({ message: 'payload received successfully!' })
  } catch (e) {
    console.log("encountered err:", e)
    return Response.error()
  }
}
