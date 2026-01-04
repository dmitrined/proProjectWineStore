/**
 * НАЗНАЧЕНИЕ: Массив статических данных о мероприятиях.
 * ЗАВИСИМОСТИ: events.json, Event type.
 * ОСОБЕННОСТИ: Возвращает данные из JSON-файла.
 */

import { Event } from '@/lib/types/event';
import eventsData from './events.json';

/**
 * Возвращает список мероприятий из локального JSON.
 */
export const getEvents = (): Event[] => {
    // Приведение типов, так как JSON импортируется как общий объект
    return eventsData as unknown as Event[];
};