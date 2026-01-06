/**
 * НАЗНАЧЕНИЕ: Сервис для получения данных о продуктах и мероприятиях.
 * ЗАВИСИМОСТИ: @/lib/data, Wine type, Event type.
 * ОСОБЕННОСТИ: Имитация асинхронной работы API через Promise.
 */

import { Wine } from '@/lib/types/wine';
import { Event } from '@/lib/types/event';
import productsData from '@/lib/data/products.json';
import eventsData from '@/lib/data/events.json';

/**
 * Имитация задержки сети.
 */
const delay = (ms: number) => new Promise(resolve => setTimeout(resolve, ms));

/**
 * Получение списка всех вин.
 */
export const fetchWines = async (): Promise<Wine[]> => {
    await delay(600); // Имитация задержки
    return productsData as unknown as Wine[];
};

/**
 * Получение списка всех мероприятий.
 */
export const fetchEvents = async (): Promise<Event[]> => {
    await delay(400); // Имитация задержки
    return eventsData as unknown as Event[];
};
