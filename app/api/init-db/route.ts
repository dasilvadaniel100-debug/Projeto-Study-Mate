import { NextResponse } from 'next/server';
import { initializeDatabase } from '@/lib/db-postgres';
import { seedDatabase } from '@/lib/seed-postgres';

export async function GET() {
  try {
    // Initialize schema first
    await initializeDatabase();

    // Then seed data
    const result = await seedDatabase();

    return NextResponse.json({
      message: 'Database initialized successfully',
      ...result
    });
  } catch (error) {
    console.error(error);
    return NextResponse.json({
      error: 'Failed to initialize database',
      details: error instanceof Error ? error.message : 'Unknown error'
    }, { status: 500 });
  }
}
