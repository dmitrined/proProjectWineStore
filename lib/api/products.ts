/**
 * НАЗНАЧЕНИЕ: Сервис для получения данных о продуктах и мероприятиях.
 * ЗАВИСИМОСТИ: @/lib/data, Wine type, Event type.
 * ОСОБЕННОСТИ: Имитация асинхронной работы API через Promise с пагинацией и фильтрацией.
 */

import { Wine } from '@/lib/types/wine';
import { Event } from '@/lib/types/event';
import productsData from '@/lib/data/products.json';
import eventsData from '@/lib/data/events.json';

/**
 * Имитация задержки сети.
 */
const delay = (ms: number) => new Promise(resolve => setTimeout(resolve, ms));

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
}

export interface PaginatedResponse<T> {
    data: T[];
    meta: {
        total: number;
        page: number;
        limit: number;
        hasMore: boolean;
    };
}

/**
 * Вспомогательная функция фильтрации (перенесена с клиента).
 */
function applyFilters(products: Wine[], params: FetchWinesParams): Wine[] {
    let result = [...products];

    // 1. Поиск (Название, Описание, Сорт)
    if (params.search) {
        const query = params.search.toLowerCase();
        result = result.filter(p => {
            const name = (p.name || '').toLowerCase();
            const description = (p.description || '').toLowerCase();
            const grape = (p.grapeVariety || '').toLowerCase();
            return name.includes(query) || description.includes(query) || grape.includes(query);
        });
    }

    // 2. Категория
    if (params.category) {
        result = result.filter(p => {
            const typeMap: Record<string, string> = {
                'rot': 'red',
                'weiss': 'white',
                'rose': 'rose',
                'prickelndes': 'sparkling',
                'weinpakete': 'package',
                'alkoholfrei': 'alcohol_free'
            };
            // 1. Проверка по маппингу типов
            if (typeMap[params.category!] && p.type === typeMap[params.category!]) {
                return true;
            }
            // 2. Прямая проверка типа
            if (p.type?.toLowerCase() === params.category!.toLowerCase()) {
                return true;
            }
            return false;
        });
    }

    // 3. Теги
    if (params.tag) {
        result = result.filter(p => {
            if (p.tags && Array.isArray(p.tags)) {
                return p.tags.some((t) => t.toLowerCase() === params.tag!.toLowerCase());
            }
            return false;
        });
    }

    // 4. Тип продукта
    if (params.type) {
        result = result.filter(p => p.type === params.type);
    }

    // 5. Сорт винограда
    if (params.grape) {
        result = result.filter(p => p.grapeVariety === params.grape);
    }

    // 6. Вкус
    if (params.flavor) {
        result = result.filter(p => p.flavor?.toLowerCase() === params.flavor!.toLowerCase());
    }

    // 7. Качество/Серия
    if (params.quality) {
        const q = params.quality.toLowerCase();
        const isEdition = q.includes('edition');
        const letter = isEdition ? q.split(' ').pop()?.replace(/[><]/g, '') : '';

        result = result.filter(p => {
            const pq = p.quality_level?.toLowerCase() || '';
            const ped = p.edition?.toLowerCase() || '';

            if (q === 'literweine') return pq.includes('liter');
            if (isEdition && letter) {
                return (pq.includes('edition') && pq.includes(letter)) || (ped.includes('edition') && ped.includes(letter));
            }
            return pq.includes(q) || ped.includes(q);
        });
    }

    // 8. Сортировка
    const sortBy = params.sort || 'price_asc';
    result.sort((a, b) => {
        const getPrice = (item: Wine) => typeof item.price === 'number' ? item.price : parseFloat(item.price || '0');
        const getDate = (item: Wine) => item.year || 0;

        switch (sortBy) {
            case 'price_asc': return getPrice(a) - getPrice(b);
            case 'price_desc': return getPrice(b) - getPrice(a);
            case 'newest': return getDate(b) - getDate(a);
            default: return 0;
        }
    });

    return result;
}

/**
 * Получение списка вин с пагинацией и базовой фильтрацией.
 */
export const fetchWines = async (params: FetchWinesParams = {}): Promise<PaginatedResponse<Wine>> => {
    await delay(600); // Имитация задержки

    const page = params.page || 1;
    const limit = params.limit || 12;

    // 1. Сначала фильтруем весь массив (имитация БД)
    const baseData = productsData as unknown as Wine[];
    // Фильтруем только товары с сортами (вино) или по логике, которая была в page.tsx
    // (В page.tsx: result = allProducts.filter(p => 'grapeVariety' in p))
    // Но мы оставим более общую логику, если вдруг появятся не-вина
    const winesOnly = baseData.filter(p => 'grapeVariety' in p); 
    
    // Применяем фильтры
    const filtered = applyFilters(winesOnly, params);

    // 2. Делаем пагинацию
    const startIndex = (page - 1) * limit;
    const endIndex = startIndex + limit;
    const paginatedData = filtered.slice(startIndex, endIndex);

    return {
        data: paginatedData,
        meta: {
            total: filtered.length,
            page,
            limit,
            hasMore: endIndex < filtered.length
        }
    };
};

/**
 * Получение доступных опций фильтрации на основе текущих фильтров (фасеты).
 * Это нужно, чтобы сайдбар показывал актуальные количества и доступные опции.
 */
export const fetchWineFacets = async (params: FetchWinesParams = {}) => {
    // Не имитируем долгую задержку для фасетов, или сделаем поменьше
    await delay(300);

    const baseData = productsData as unknown as Wine[];
    let winesOnly = baseData.filter(p => 'grapeVariety' in p);

    // Для фасетов мы обычно хотим применить ВСЕ фильтры КРОМЕ того, для которого считаем фасеты.
    // Но для упрощения (как в большинстве магазинов) применим просто все фильтры категории/поиска,
    // чтобы показать "что доступно внутри этой категории".
    
    const facetBaseParams = {
        category: params.category,
        search: params.search,
        tag: params.tag,
        type: params.type
    };
    
    const facetContext = applyFilters(winesOnly, facetBaseParams);

    // Сбор уникальных значений
    const grapes = Array.from(new Set(facetContext.map(p => p.grapeVariety).filter(Boolean))).sort();
    
    const allowedFlavors = ['feinherb', 'fruchtig', 'trocken'];
    const flavors = Array.from(new Set(
        facetContext.map(p => p.flavor?.toLowerCase()).filter(f => f && allowedFlavors.includes(f))
    )).sort();

    const allowedQuality = ['edition >c<', 'edition >p<', 'edition >s<', 'literweine'];
    const qualityLevels = Array.from(new Set(
        facetContext.map(p => {
             const q = p.quality_level?.toLowerCase() || '';
             const ed = p.edition?.toLowerCase() || '';
             if ((q + ed).includes('edition') && (q + ed).includes('c')) return 'edition >c<';
             if ((q + ed).includes('edition') && (q + ed).includes('p')) return 'edition >p<';
             if ((q + ed).includes('edition') && (q + ed).includes('s')) return 'edition >s<';
             if (q.includes('liter')) return 'literweine';
             return '';
        })
    )).filter(q => q && allowedQuality.includes(q)).sort();

    return {
        grapes,
        flavors,
        qualityLevels
    };
};

/**
 * Получение списка всех мероприятий.
 */
export const fetchEvents = async (): Promise<Event[]> => {
    await delay(400); // Имитация задержки
    return eventsData as unknown as Event[];
};
