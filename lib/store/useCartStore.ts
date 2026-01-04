/**
 * НАЗНАЧЕНИЕ: Глобальное состояние корзины и логика расчетов.
 * ЗАВИСИМОСТИ: Zustand, Persist Middleware, useWinesStore.
 * ОСОБЕННОСТИ: Client Component, Persist Middleware (localStorage), автоматический расчет итогов.
 */

import { create } from 'zustand';
import { persist } from 'zustand/middleware';
import { useWinesStore } from './useWinesStore';

// Интерфейс элемента корзины
export interface CartItem {
    id: string; // ID продукта
    quantity: number; // Количество
}

// Интерфейс состояния корзины
interface CartState {
    items: CartItem[]; // Список товаров

    // Методы
    addToCart: (productId: string, quantity?: number) => void;
    removeFromCart: (productId: string) => void;
    updateQuantity: (productId: string, quantity: number) => void;
    clearCart: () => void;

    // Вычисляемые значения (геттеры)
    getTotalPrice: () => number;
    getItemCount: () => number;
    isInCart: (productId: string) => boolean;
}

/**
 * Хук-хранилище корзины с автоматическим сохранением в localStorage.
 */
export const useCartStore = create<CartState>()(
    persist(
        (set, get) => ({
            items: [],

            /**
             * Добавление товара в корзину.
             * Если товар уже есть, увеличивает количество.
             */
            addToCart: (productId, quantity = 1) => {
                const currentItems = get().items;
                const existingItem = currentItems.find(item => item.id === productId);

                if (existingItem) {
                    set({
                        items: currentItems.map(item =>
                            item.id === productId
                                ? { ...item, quantity: item.quantity + quantity }
                                : item
                        ),
                    });
                } else {
                    set({ items: [...currentItems, { id: productId, quantity }] });
                }
            },

            /**
             * Удаление товара из корзины по ID.
             */
            removeFromCart: (productId) => {
                set({
                    items: get().items.filter(item => item.id !== productId),
                });
            },

            /**
             * Обновление количества конкретного товара.
             * Если количество <= 0, товар удаляется.
             */
            updateQuantity: (productId, quantity) => {
                if (quantity <= 0) {
                    get().removeFromCart(productId);
                    return;
                }
                set({
                    items: get().items.map(item =>
                        item.id === productId ? { ...item, quantity } : item
                    ),
                });
            },

            /**
             * Полная очистка корзины.
             */
            clearCart: () => set({ items: [] }),

            /**
             * Расчет общей стоимости товаров в корзине.
             * Берет актуальные цены из useWinesStore.
             */
            getTotalPrice: () => {
                const wines = useWinesStore.getState().wines;
                return get().items.reduce((total, item) => {
                    const product = wines.find(w => w.id === item.id);
                    if (!product) return total;

                    // Безопасное получение цены для вина или мероприятия
                    let price = 'price' in product
                        ? (typeof product.price === 'number' ? product.price : parseFloat(product.price))
                        : 0;

                    // Если есть распродажа, используем sale_price
                    if ('sale' in product && product.sale && 'sale_price' in product && product.sale_price) {
                        price = product.sale_price;
                    }

                    return total + (price * item.quantity);
                }, 0);
            },

            /**
             * Расчет общего количества предметов в корзине.
             */
            getItemCount: () => {
                return get().items.reduce((count, item) => count + item.quantity, 0);
            },

            /**
             * Проверка наличия товара в корзине.
             */
            isInCart: (productId) => {
                return get().items.some(item => item.id === productId);
            },
        }),
        {
            name: 'cart-storage', // Ключ в localStorage
        }
    )
);
