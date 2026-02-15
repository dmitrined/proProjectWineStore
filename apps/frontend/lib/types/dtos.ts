/**
 * НАЗНАЧЕНИЕ: DTO (Data Transfer Objects) для взаимодействия с Backend API.
 * ЗАВИСИМОСТИ: Нет.
 * ОСОБЕННОСТИ: Отражает структуру JSON ответов от Spring Boot (snake_case, Uppercase Enums).
 */

// --- ENUMS (Backend Style) ---

export type SortOrder = 'asc' | 'desc';

export type StockStatusDto = 'IN_STOCK' | 'OUT_OF_STOCK' | 'ON_DEMAND';

export type WineTypeDto = 'RED' | 'WHITE' | 'ROSE' | 'SPARKLING' | 'ALCOHOL_FREE' | 'PACKAGE' | 'OTHER';

export type WineFlavorDto = 'TROCKEN' | 'FEINHERB' | 'FRUCHTIG' | 'BRUT' | 'LIEBLICH' | 'SUESS'; // Add known flavors from Backend

export type EventCategoryDto = 'WEINFEST' | 'WEINPROBE' | 'ONLINE' | 'OTHER' | 'KELLERBLICKE' | 'WEINTREFF' | 'AFTERWORK' | 'WEINWANDERUNG';

// --- ENTITIES ---

export interface WineDto {
    id: number;
    name: string;
    slug: string;
    description: string;
    image_url: string; // snake_case
    price: number;
    sale_price?: number;
    is_sale: boolean; // snake_case
    stock_status: StockStatusDto; // snake_case
    stock_quantity: number; // snake_case
    type: WineTypeDto;
    grape_variety: string; // snake_case
    year: number;
    alcohol?: string;
    acidity?: string;
    sugar?: string;
    flavor?: WineFlavorDto;
    edition?: string;
    rating?: number;
    recommended_dishes?: string[]; // snake_case
    tags?: string[];
    featured?: boolean;
}

export interface EventDto {
    id: number;
    title: string;
    slug: string;
    description: string;
    image_url: string; // snake_case
    date: string; // ISO string "YYYY-MM-DD"
    time: string;
    location: string;
    price_per_person: number; // snake_case
    total_spots: number; // snake_case
    booked_spots: number; // snake_case
    is_full: boolean; // snake_case
    category: EventCategoryDto;
}

// --- PAGINATION ---

export interface PageDto<T> {
    content: T[];
    pageable: {
        page_number: number;
        page_size: number;
        // other pageable fields...
    };
    total_elements: number;
    total_pages: number;
    last: boolean;
    size: number;
    number: number;
    sort: {
        empty: boolean;
        sorted: boolean;
        unsorted: boolean;
    };
    first: boolean;
    number_of_elements: number;
    empty: boolean;
}

export interface ApiResponse<T> {
    success: boolean;
    message?: string;
    data: T;
    timestamp: string;
}
