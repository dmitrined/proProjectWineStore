/**
 * Назначение файла: Хранилище (Store) для управления списком избранного (Wishlist).
 * Зависимости: Zustand, LocalStorage.
 * Особенности: Персистентность, переключение состояния избранного (toggle), проверка наличия.
 */

import { create } from 'zustand';
import { persist } from 'zustand/middleware';

// Интерфейс состояния списка избранного
interface WishlistState {
    wishlist: string[]; // Список ID избранных товаров

    // Методы
    toggleWishlist: (productId: string) => void; // Добавить/удалить из избранного
    isInWishlist: (productId: string) => boolean; // Проверка на наличие в списке
    clearWishlist: () => void; // Полная очистка списка
}

/**
 * Хук-хранилище избранного с автоматическим сохранением в localStorage.
 */
export const useWishlistStore = create<WishlistState>()(
    persist(
        (set, get) => ({
            wishlist: [],

            /**
             * Переключение состояния избранного для товара.
             */
            toggleWishlist: (productId) => {
                set((state) => {
                    const exists = state.wishlist.includes(productId);
                    return {
                        wishlist: exists
                            ? state.wishlist.filter((id) => id !== productId) // Удаление
                            : [...state.wishlist, productId], // Добавление
                    };
                });
            },

            /**
             * Проверка, находится ли товар в избранном.
             */
            isInWishlist: (productId) => {
                return get().wishlist.includes(productId);
            },

            /**
             * Полная очистка списка избранного.
             */
            clearWishlist: () => set({ wishlist: [] }),
        }),
        {
            name: 'wishlist-storage', // Ключ в localStorage
        }
    )
);
