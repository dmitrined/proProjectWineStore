export interface Wine {
    // ИДЕНТИФИКАЦИЯ
    id: string;             // Сохраняем string для совместимости с фронтендом
    name: string;
    slug: string;
    description: string;
    imageUrl: string;       // Переименовано из image

    // КОММЕРЧЕСКИЕ ДАННЫЕ
    price: number;
    salePrice?: number;     // Переименовано из sale_price
    isSale: boolean;        // Переименовано из sale

    // КАТЕГОРИЗАЦИЯ И СКЛАД
    stockStatus: 'IN_STOCK' | 'OUT_OF_STOCK' | 'ON_DEMAND';
    stockQuantity?: number;
    type: 'RED' | 'WHITE' | 'ROSE' | 'SPARKLING' | 'ALCOHOL_FREE' | 'PACKAGE' | 'OTHER';

    // ВИННЫЕ ХАРАКТЕРИСТИКИ
    grapeVariety: string;
    releaseYear?: number;   // Переименовано из year
    alcohol?: string;
    acidity?: string;
    sugar?: string;
    flavor?: 'TROCKEN' | 'FEINHERB' | 'FRUCHTIG' | 'BRUT';
    edition?: string;

    // AI & МАРКЕТИНГ
    rating?: number;
    recommendedDishes?: any[]; // Массив объектов Dish
    tags?: string[];
    featured: boolean;      // Новое поле

    // СИСТЕМНЫЕ ПОЛЯ (Опционально, если нужны на фронте)
    created_at?: string;
}