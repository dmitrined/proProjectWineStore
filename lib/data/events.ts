/**
 * Назначение файла: Массив статических данных о мероприятиях.
 * Теперь возвращает данные из json.
 */

import { Event } from '@/lib/types/event';
import eventsData from './events.json';

/**
 * Возвращает список мероприятий из локального JSON.
 * Параметр t оставлен для совместимости API, но пока не используется для перевода данных из JSON.
 */
export const getEvents = (t: (key: string) => string): Event[] => {
    // Приведение типов, так как JSON импортируется как общий объект
    return eventsData as unknown as Event[];
};