/**
 * Назначение файла: Описание интерфейса Вина (Wine).
 * Зависимости: Нет.
 * Особенности: Используется для унификации данных из WooCommerce по всему приложению.
 */

export interface Wine {
    id: string; // UUID
    name: string;
    slug: string;
    price: number;
    description: string;
    short_description: string;
    
    // Media
    image: string;
    images: { src: string; alt?: string }[];
    
    // Classification
    type: 'Rotwein' | 'Weißwein' | 'Roséwein' | 'Sekt' | 'Alkoholfrei' | 'Paket' | 'Sonstiges';
    grapeVariety: string;
    year: number;
    
    // Details
    alcohol?: string;
    acidity?: string;
    sugar?: string;
    location?: string;
    quality_level?: string;
    flavor?: string;
    soil?: string;
    producer?: string;
    temp?: string;
    
    // AI Tags (future proofing)
    rating?: number;
    recommended_dishes?: string[];
    tags?: string[];
}
