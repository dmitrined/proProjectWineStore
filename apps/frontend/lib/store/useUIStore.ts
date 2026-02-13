/**
 * Назначение файла: Хранилище (Store) для управления состоянием интерфейса (UI).
 * Зависимости: Zustand.
 * Особенности: Управление видимостью меню, фильтров и модальных окон. Состояние не сохраняется после перезагрузки.
 */

import { create } from 'zustand';

// Интерфейс состояния пользовательского интерфейса
interface UIState {
    isMobileMenuOpen: boolean; // Состояние мобильного меню (открыто/закрыто)
    isFilterOpen: boolean; // Состояние боковой панели фильтров

    // Методы управления
    setMobileMenuOpen: (isOpen: boolean) => void;
    toggleMobileMenu: () => void;
    setFilterOpen: (isOpen: boolean) => void;
    toggleFilter: () => void;
}

/**
 * Хук-хранилище для управления глобальными элементами UI.
 */
export const useUIStore = create<UIState>((set) => ({
    isMobileMenuOpen: false,
    isFilterOpen: false,

    /**
     * Установка состояния мобильного меню.
     */
    setMobileMenuOpen: (isOpen) => set({ isMobileMenuOpen: isOpen }),

    /**
     * Переключение видимости мобильного меню.
     */
    toggleMobileMenu: () => set((state) => ({ isMobileMenuOpen: !state.isMobileMenuOpen })),

    /**
     * Установка состояния панели фильтров.
     */
    setFilterOpen: (isOpen) => set({ isFilterOpen: isOpen }),

    /**
     * Переключение видимости панели фильтров.
     */
    toggleFilter: () => set((state) => ({ isFilterOpen: !state.isFilterOpen })),
}));
