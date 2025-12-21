import { NextResponse } from 'next/server';
import { seedDatabase } from '@/lib/seed';

export async function GET() {
  try {
    await seedDatabase();
    return NextResponse.json({ message: 'Database initialized successfully' });
  } catch (error) {
    console.error(error);
    return NextResponse.json({ error: 'Failed to initialize database' }, { status: 500 });
  }
}
