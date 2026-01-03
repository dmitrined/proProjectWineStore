import { create } from 'zustand';
import { Wine } from '@/lib/types/wine';
import { Event } from '@/lib/types/event'; // Assuming Event type exists
import productsData from '@/lib/data/products.json';
import eventsData from '@/lib/data/events.json';

// Объединенный тип
export type UnifiedProduct = Wine | Event;

// Интерфейс состояния хранилища
interface WinesState {
    wines: UnifiedProduct[]; // Список всех продуктов
    isLoading: boolean; // Флаг загрузки
    error: string | null; // Сообщение об ошибке
    lastFetched: number | null; // Штамп времени последнего обновления

    // Методы
    fetchProducts: (force?: boolean) => Promise<void>;
    getWineById: (id: string) => Wine | undefined;
    getEventById: (id: string) => Event | undefined;
    setWines: (wines: UnifiedProduct[]) => void;
}

/**
 * Хук-хранилище для доступа к данным каталога по всему приложению.
 */
export const useWinesStore = create<WinesState>((set, get) => ({
    wines: [],
    isLoading: false,
    error: null,
    lastFetched: null,

    /**
     * Загрузка продуктов из локальных JSON файлов.
     * Имитирует асинхронность для совместимости с существующим кодом.
     */
    fetchProducts: async (force = false) => {
        const { lastFetched, wines } = get();

        // Если данные уже есть, не перезагружаем (если не force)
        if (!force && wines.length > 0) {
            return;
        }

        set({ isLoading: true, error: null });

        try {
            // Имитация задержки сети (опционально, можно убрать)
            // await new Promise(resolve => setTimeout(resolve, 500)); 

            // Объединяем вина и события. 
            // Приводим типы, так как JSON импортируется как object.
            const allProducts = [...(productsData as unknown as Wine[]), ...(eventsData as unknown as Event[])];

            set({
                wines: allProducts,
                isLoading: false,
                lastFetched: Date.now(),
                error: null
            });
        } catch (error) {
            console.error('Ошибка в сторе при загрузке локальных данных:', error);
            set({
                isLoading: false,
                error: 'Не удалось загрузить данные'
            });
        }
    },

    /**
     * Поиск вина по ID.
     */
    getWineById: (id: string) => {
        const product = get().wines.find(w => w.id === id || ('slug' in w && w.slug === id));
        // Проверка: это вино, если у него есть поле type (или нет полей Event-специфичных, но type надежнее для Wine из текущих типов)
        // В нашем случае Wine имеет type, Event имеет category.
        return product && 'type' in product ? (product as Wine) : undefined;
    },

    /**
     * Поиск мероприятия по ID.
     */
    getEventById: (id: string) => {
        const product = get().wines.find(w => w.id === id || ('slug' in w && w.slug === id));
        // Event имеет поле category, Wine тоже имеет categories (массив), но Event interface имеет string category.
        // Лучше использовать "нет type" или проверка на наличие полей Event
        return product && !('type' in product) ? (product as Event) : undefined;
    },

    /**
     * Принудительная установка списка продуктов.
     */
    setWines: (wines) => set({ wines, lastFetched: Date.now() }),
}));
