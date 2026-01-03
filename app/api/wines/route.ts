import { NextResponse } from 'next/server';
import productsData from '@/lib/data/products.json';

/**
 * API Route для получения списка вин.
 * Отдает данные из локального JSON.
 */
export async function GET() {
    try {
        return NextResponse.json(productsData);
    } catch (error) {
        console.error('Error in API Route /api/wines:', error);
        return NextResponse.json({ error: 'Failed to fetch wines' }, { status: 500 });
    }
}
