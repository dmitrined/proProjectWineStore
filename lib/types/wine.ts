/**
 * Интерфейс Wine — центральная модель данных проекта.
 * Спроектирован с учетом будущей интеграции с PostgreSQL и Java Spring Boot.
 */
export interface Wine {
    // ИДЕНТИФИКАЦИЯ
    id: string;             // UUID или уникальная строка. В БД будет Primary Key.
    name: string;           // Полное название (например, "2022 Pinot Noir trocken")
    slug: string;           // Человекочитаемый URL (например, "pinot-noir-2022")

    // КОММЕРЧЕСКИЕ ДАННЫЕ
    price: number;          // Цена. В Java/DB лучше использовать тип Decimal/BigDecimal
    description: string;    // Развернутое описание для страницы товара
    short_description: string; // Короткое описание для карточек в каталоге
    image: string;          // Основная ссылка на изображение

    // КАТЕГОРИЗАЦИЯ И СКЛАД
    // Строгое перечисление типов помогает избежать ошибок в фильтрах
    type: 'red' | 'white' | 'rose' | 'sparkling' | 'alcohol_free' | 'package' | 'other';
    stock_status: 'instock' | 'outofstock'; // Статус наличия для UI (кнопка купить/нет в наличии)
    stock_quantity?: number;               // Точное кол-во на складе для контроля остатков

    // ВИННЫЕ ХАРАКТЕРИСТИКИ (Техническая карта)
    grapeVariety: string;   // Сорт винограда (например, "Spätburgunder")
    year: number;           // Год урожая
    alcohol?: string;       // Крепость (например, "13.5%")
    acidity?: string;       // Кислотность в г/л
    sugar?: string;         // Сахар в г/л
    flavor?: string;        // Вкусовой профиль (Trocken, Halbtrocken и т.д.)
    quality_level?: string; // Классификация (VDP, Qualitätswein)
    edition?: string;       // Особая серия (Edition P, Edition C,)
    
    // ТЕРРУАР И ПРОИСХОЖДЕНИЕ
    location?: string;      // Название виноградника (например, "Fellbacher Lämmler")
    soil?: string;          // Тип почвы (например, "Gipskeuper")
    producer?: string;      // Винодельня (по умолчанию Fellbacher Weingärtner)
    temp?: string;          // Температура подачи (например, "16-18°C")

    // ДАННЫЕ ДЛЯ AI И МАРКЕТИНГА
    rating?: number;        // Средняя оценка пользователей (4.5, 5.0)
    recommended_dishes?: string[]; // Массив блюд. Ключевое поле для логики AI-сомелье
    tags?: string[];        // Теги для быстрого поиска ("Bestseller", "New", "Organic")

    // СИСТЕМНЫЕ ПОЛЯ
    is_favorite?: boolean;  // Локальное состояние для UI (сердечко), не хранится в основной таблице вин
    created_at?: string;    // ISO дата создания. Позволяет сортировать по "Новинкам"
}