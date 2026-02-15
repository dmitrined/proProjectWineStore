/**
 * НАЗНАЧЕНИЕ: Сервис для получения данных о продуктах и мероприятиях.
 * ЗАВИСИМОСТИ: @/lib/types/wine, @/lib/types/event, @/lib/types/dtos.
 * ОСОБЕННОСТИ: Работает с реальным Spring Boot API. Использует DTO и Mappers для адаптации данных.
 */

import { Wine } from '@/lib/types/wine';
import { Event } from '@/lib/types/event';
import { WineDto, EventDto, ApiResponse, PageDto, StockStatusDto, WineTypeDto, WineFlavorDto, EventCategoryDto } from '@/lib/types/dtos';

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

// --- MAPPERS ---

function mapStockStatus(status: StockStatusDto): 'instock' | 'outofstock' {
    switch (status) {
        case 'IN_STOCK': return 'instock';
        case 'OUT_OF_STOCK': return 'outofstock';
        case 'ON_DEMAND': return 'outofstock'; // Treat ON_DEMAND as out of stock for now or add new UI state
        default: return 'outofstock';
    }
}

function mapWineType(type: WineTypeDto): Wine['type'] {
    return type.toLowerCase() as Wine['type'];
}

function mapWineFlavor(flavor?: WineFlavorDto): string | undefined {
    return flavor ? flavor.charAt(0) + flavor.slice(1).toLowerCase() : undefined; // "TROCKEN" -> "Trocken"
}

function mapWineDtoToWine(dto: WineDto): Wine {
    return {
        id: dto.id.toString(),
        name: dto.name,
        slug: dto.slug,
        description: dto.description,
        image: dto.image_url,
        price: dto.price,
        sale_price: dto.sale_price,
        sale: dto.is_sale,
        stock_status: mapStockStatus(dto.stock_status),
        stock_quantity: dto.stock_quantity,
        type: mapWineType(dto.type),
        grapeVariety: dto.grape_variety,
        year: dto.year,
        alcohol: dto.alcohol,
        acidity: dto.acidity,
        sugar: dto.sugar,
        flavor: mapWineFlavor(dto.flavor),
        edition: dto.edition,
        rating: dto.rating,
        recommended_dishes: dto.recommended_dishes,
        tags: dto.tags,
        is_favorite: false, // Local state
        created_at: new Date().toISOString() // Mock date if strictly needed, or backend should provide it
    };
}

function mapEventDtoToEvent(dto: EventDto): Event {
    return {
        id: dto.id.toString(),
        title: dto.title,
        slug: dto.slug,
        date: dto.date,
        time: dto.time,
        location: dto.location,
        description: dto.description,
        spots: dto.total_spots, // Mapping total spots here
        price: dto.price_per_person,
        image: dto.image_url,
        category: getEventCategory(dto.category),
        isFull: dto.is_full
    };
}

function getEventCategory(cat: EventCategoryDto): Event['category'] {
    switch (cat) {
        case 'WEINFEST': return 'Weinfest';
        case 'WEINPROBE': return 'Weinprobe';
        case 'KELLERBLICKE': return 'Kellerblicke';
        case 'WEINTREFF': return 'Weintreff';
        case 'AFTERWORK': return 'Afterwork';
        case 'WEINWANDERUNG': return 'Weinwanderung';
        case 'ONLINE': return 'Sonstiges'; // Map Online to Sonstiges or add new type
        case 'OTHER': return 'Sonstiges';
        default: return 'Sonstiges';
    }
}


// --- API FUNCTIONS ---

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
    if (params.category) query.set('category', params.category.toUpperCase()); // Ensure backend gets UPPERCASE
    if (params.type) query.set('type', params.type.toUpperCase());
    if (params.grape) query.set('grape', params.grape);
    if (params.flavor) query.set('flavor', params.flavor.toUpperCase());
    if (params.quality) query.set('quality', params.quality);
    if (params.tag) query.set('tag', params.tag);
    if (params.sort) {
        let sortParam = params.sort;
        if (sortParam === 'price_asc') sortParam = 'price,asc';
        else if (sortParam === 'price_desc') sortParam = 'price,desc';
        else if (sortParam === 'newest') sortParam = 'id,desc';
        else if (sortParam === 'rating') sortParam = 'rating,desc';
        query.set('sort', sortParam);
    }
    if (params.minPrice !== undefined) query.set('minPrice', params.minPrice.toString());
    if (params.maxPrice !== undefined) query.set('maxPrice', params.maxPrice.toString());

    try {
        console.log('Fetching wines from:', `http://localhost:8080/api/wines?${query.toString()}`);
        const res = await fetch(`http://localhost:8080/api/wines?${query.toString()}`);

        if (!res.ok) {
            console.error('API Error Status:', res.status, res.statusText);
            throw new Error(`Failed to fetch wines: ${res.statusText}`);
        }

        const response: ApiResponse<PageDto<WineDto>> = await res.json();
        console.log('API Response:', response);
        const pageData = response.data;

        if (!pageData || !pageData.content) {
            console.warn('API returned empty or invalid data structure:', pageData);
            return { data: [], meta: { total: 0, page: 1, limit: 12, hasMore: false, totalPages: 0 } };
        }

        const mappedData = pageData.content.map(mapWineDtoToWine);
        console.log('Mapped Data:', mappedData);

        return {
            data: mappedData,
            meta: {
                total: pageData.total_elements,
                page: pageData.number + 1,
                limit: pageData.size,
                hasMore: !pageData.last,
                totalPages: pageData.total_pages
            }
        };
    } catch (error) {
        console.error("Fetch wines failed", error);
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
 */
export const fetchWineFacets = async (_params: FetchWinesParams = {}) => {
    try {
        const res = await fetch('http://localhost:8080/api/wines/filters/grapes');
        if (!res.ok) return { grapes: [], flavors: [], qualityLevels: [] };

        const response: ApiResponse<string[]> = await res.json();

        return {
            grapes: response.data,
            flavors: [], // Mock for now
            qualityLevels: [] // Mock for now
        };
    } catch (e) {
        return { grapes: [], flavors: [], qualityLevels: [] };
    }
};

/**
 * Получение списка всех мероприятий.
 */
export const fetchEvents = async (): Promise<Event[]> => {
    try {
        const res = await fetch('http://localhost:8080/api/events');
        if (!res.ok) throw new Error('Failed to fetch events');

        const response: ApiResponse<EventDto[]> = await res.json();
        return response.data.map(mapEventDtoToEvent);
    } catch (error) {
        console.error("Fetch events failed", error);
        return [];
    }
};

/**
 * Расчет стоимости корзины на бэкенде.
 */
export const calculateCart = async (items: { productId: number | string, quantity: number }[]) => {
    try {
        const res = await fetch('http://localhost:8080/api/cart/calculate', {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({ items: items.map(i => ({ productId: Number(i.productId), quantity: i.quantity })) })
        });

        if (!res.ok) throw new Error('Cart calculation failed');
        const response = await res.json();
        return response.data;
    } catch (error) {
        console.error("Cart calculation failed", error);
        return null;
    }
};
