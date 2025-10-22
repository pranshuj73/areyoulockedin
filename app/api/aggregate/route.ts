import { NextRequest, NextResponse } from 'next/server';
import { aggregateActivityData, cleanupSessionCache } from '@/lib/aggregation';

/**
 * Aggregation endpoint - called by Cloudflare Worker every 15 minutes
 * This processes raw events from IngestDB and writes aggregated data to AnalyticsDB
 * 
 * Note: This endpoint is excluded from rate limiting in middleware.ts
 * Authentication via Bearer token (AGGREGATION_TOKEN env var)
 */
export async function POST(request: NextRequest) {
  try {
    // Optional: Add authentication/authorization for this endpoint
    const authHeader = request.headers.get('authorization');
    const expectedToken = process.env.AGGREGATION_TOKEN;
    
    if (expectedToken && authHeader !== `Bearer ${expectedToken}`) {
      return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
    }

    console.log('Starting aggregation job...');
    
    // Run aggregation
    await aggregateActivityData();
    
    // Clean up expired session cache
    await cleanupSessionCache();
    
    console.log('Aggregation job completed successfully');
    
    return NextResponse.json({ 
      message: 'Aggregation completed successfully',
      timestamp: new Date().toISOString()
    }, { status: 200 });
    
  } catch (error) {
    console.error('Aggregation job failed:', error);
    return NextResponse.json({ 
      error: 'Aggregation failed', 
      details: error instanceof Error ? error.message : 'Unknown error'
    }, { status: 500 });
  }
}

/**
 * Health check endpoint for the aggregation service
 */
export async function GET(request: NextRequest) {
  try {
    const { getIngestDb, analyticsDb } = await import('@/lib/db');
    const ingestDb = await getIngestDb();
    
    // Check database connectivity
    const health = await Promise.all([
      ingestDb.$queryRaw`SELECT 1`,
      analyticsDb.$queryRaw`SELECT 1`,
    ]);
    
    return NextResponse.json({ 
      status: 'healthy',
      databases: {
        ingest: 'connected',
        analytics: 'connected'
      },
      timestamp: new Date().toISOString()
    }, { status: 200 });
    
  } catch (error) {
    console.error('Health check failed:', error);
    return NextResponse.json({ 
      status: 'unhealthy',
      error: error instanceof Error ? error.message : 'Unknown error'
    }, { status: 500 });
  }
}
