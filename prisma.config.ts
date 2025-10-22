import path from 'node:path'
import { defineConfig } from 'prisma/config'
import { PrismaLibSQL } from '@prisma/adapter-libsql'

// import your .env file
import 'dotenv/config'

export default defineConfig({
  schema: path.join('prisma', 'schema.ingest.prisma'),
  // @ts-expect-error - experimental feature not in types yet
  experimental: {
    adapter: true,
  },
  async adapter() {
    return new PrismaLibSQL({
      url: process.env.INGEST_DATABASE_URL!,
      authToken: process.env.TURSO_AUTH_TOKEN!,
    })
  }
})
