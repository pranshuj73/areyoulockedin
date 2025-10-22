import 'server-only';
import { PrismaClient as AnalyticsClient } from '../node_modules/.prisma/analytics';

// Singleton pattern for AnalyticsDB (Neon) - for aggregated data and reads
// See: https://www.prisma.io/docs/orm/more/help-and-troubleshooting/nextjs-help
const globalForAnalytics = global as unknown as { analyticsDb: AnalyticsClient };

export const analyticsDb =
  globalForAnalytics.analyticsDb ||
  new AnalyticsClient({
    log: process.env.NODE_ENV === 'development' ? ['query', 'info', 'warn', 'error'] : ['error'],
  });

if (process.env.NODE_ENV !== 'production') {
  globalForAnalytics.analyticsDb = analyticsDb;
}

// IngestDB (Turso) - for high-frequency writes
// Using dynamic import to avoid bundling issues
const globalForIngest = global as unknown as { ingestDb: any };

export async function getIngestDb() {
  if (!globalForIngest.ingestDb) {
    // Dynamic import to avoid webpack bundling issues
    const { PrismaClient: IngestClient } = await import('../node_modules/.prisma/ingest');
    const { PrismaLibSQL } = await import('@prisma/adapter-libsql');
    
    const tursoAdapter = new PrismaLibSQL({
      url: process.env.INGEST_DATABASE_URL!,
      authToken: process.env.TURSO_AUTH_TOKEN!,
    });

    globalForIngest.ingestDb = new IngestClient({
      // @ts-expect-error - Type mismatch between adapter versions
      adapter: tursoAdapter,
      log: process.env.NODE_ENV === 'development' ? ['query', 'info', 'warn', 'error'] : ['error'],
    });
  }
  return globalForIngest.ingestDb;
}

// Graceful shutdown
export async function disconnectDatabases() {
  const ingest = await getIngestDb();
  await Promise.all([
    ingest.$disconnect(),
    analyticsDb.$disconnect(),
  ]);
}

// Health check for both databases
export async function checkDatabaseHealth() {
  try {
    const ingest = await getIngestDb();
    await Promise.all([
      ingest.$queryRaw`SELECT 1`,
      analyticsDb.$queryRaw`SELECT 1`,
    ]);
    return { ingest: 'healthy', analytics: 'healthy' };
  } catch (error) {
    console.error('Database health check failed:', error);
    return { ingest: 'unhealthy', analytics: 'unhealthy', error };
  }
}
