/**
 * Назначение файла: API Route для получения продуктов (вина + мероприятия).
 * Теперь отдает локальные данные из JSON файлов.
 */

import { NextResponse } from 'next/server';
import productsData from '@/lib/data/products.json';
import eventsData from '@/lib/data/events.json';

export async function GET() {
    try {
        const allProducts = [...productsData, ...eventsData];
        return NextResponse.json(allProducts);
    } catch (error: any) {
        console.error('Ошибка при получении продуктов в API route:', error);
        return NextResponse.json({
            error: 'Не удалось загрузить данные',
            message: error.message
        }, { status: 500 });
    }
}
