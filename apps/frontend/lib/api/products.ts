/**
 * НАЗНАЧЕНИЕ: Сервис для получения данных о продуктах и мероприятиях.
 * ЗАВИСИМОСТИ: @/lib/types/wine, @/lib/types/event.
 * ОСОБЕННОСТИ: Работает с реальным Spring Boot API. Локальная фильтрация удалена.
 */

import { Wine } from '@/lib/types/wine';
import { Event } from '@/lib/types/event';
// JSON data imports removed as we use API now

export interface FetchWinesParams {
    page?: number;     // Номер страницы (начинается с 1)
    limit?: number;    // Кол-во товаров на страницу
    search?: string;
    category?: string;
    tag?: string;
    grape?: string;
    flavor?: string;
    quality?: string;
    type?: string;
    sort?: string;
    minPrice?: number;
    maxPrice?: number;
}

export interface PaginatedResponse<T> {
    data: T[];
    meta: {
        total: number;
        page: number;
        limit: number;
        hasMore: boolean;
        totalPages: number;
    };
}

/**
 * Получение списка вин с сервера (Spring Boot API).
 */
export const fetchWines = async (params: FetchWinesParams = {}): Promise<PaginatedResponse<Wine>> => {
    const query = new URLSearchParams();

    // Spring Boot Pageable uses 0-based index
    const pageZeroBased = (params.page || 1) - 1;
    query.set('page', pageZeroBased.toString());
    query.set('size', (params.limit || 12).toString());

    if (params.search) query.set('search', params.search);
    if (params.category) query.set('category', params.category);
    if (params.type) query.set('type', params.type);
    if (params.grape) query.set('grape', params.grape);
    if (params.flavor) query.set('flavor', params.flavor);
    if (params.quality) query.set('quality', params.quality);
    if (params.tag) query.set('tag', params.tag);
    if (params.sort) query.set('sort', params.sort);
    if (params.minPrice !== undefined) query.set('minPrice', params.minPrice.toString());
    if (params.maxPrice !== undefined) query.set('maxPrice', params.maxPrice.toString());

    try {
        // Запрос к Spring Boot
        const res = await fetch(`http://localhost:8080/api/wines?${query.toString()}`);

        if (!res.ok) {
            console.error('API Error:', res.status, res.statusText);
            throw new Error(`Failed to fetch wines: ${res.statusText}`);
        }

        const data = await res.json();

        // Spring Data Page interface mapping
        // data.content = items
        // data.totalElements = total count
        // data.number = current page index (0-based)
        // data.size = page size
        // data.last = is last page
        // data.totalPages = total pages

        return {
            data: data.content || [],
            meta: {
                total: data.totalElements || 0,
                page: (data.number || 0) + 1,
                limit: data.size || 12,
                hasMore: !data.last,
                totalPages: data.totalPages || 0
            }
        };
    } catch (error) {
        console.error("Fetch wines failed", error);
        // Return empty structure on error to prevent UI crash
        return {
            data: [],
            meta: {
                total: 0,
                page: 1,
                limit: 12,
                hasMore: false,
                totalPages: 0
            }
        };
    }
};

/**
 * Получение доступных опций фильтрации (Фасеты).
 * В будущем можно реализовать отдельный эндпоинт /api/wines/facets
 * Пока оставляем заглушку или можно делать отдельный light query.
 * Для упрощения миграции пока вернем пустые или статические данные, 
 * так как реальной фасетной логики на бэке пока нет в спецификации задачи.
 * Но чтобы UI не сломался, вернем базовые списки.
 */
export const fetchWineFacets = async (_params: FetchWinesParams = {}) => {
    // TODO: Implement /api/wines/facets endpoint on backend
    return {
        grapes: [],
        flavors: [],
        qualityLevels: []
    };
};

/**
 * Получение списка всех мероприятий.
 */
export const fetchEvents = async (): Promise<Event[]> => {
    try {
        const res = await fetch('http://localhost:8080/api/events');
        if (!res.ok) throw new Error('Failed to fetch events');
        return await res.json();
    } catch (error) {
        console.error("Fetch events failed", error);
        return [];
    }
};
