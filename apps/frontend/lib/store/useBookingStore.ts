/**
 * Назначение файла: Хранилище (Store) для управления бронированиями мероприятий.
 * Зависимости: Zustand, LocalStorage.
 * Особенности: Персистентность, генерация ID бронирования, фильтрация по событиям.
 */

import { create } from 'zustand';
import { persist } from 'zustand/middleware';

// Интерфейс данных бронирования
export interface Booking {
    id: string; // Уникальный номер брони
    eventId: string; // ID мероприятия из WooCommerce
    eventTitle: string; // Название мероприятия
    date: string; // Дата
    time: string; // Время
    guests: number; // Количество гостей
    totalAmount: number; // Итоговая сумма
    status: 'pending' | 'confirmed' | 'cancelled'; // Статус заказа
    createdAt: string; // Дата создания записи
}

// Интерфейс состояния хранилища бронирований
interface BookingState {
    bookings: Booking[]; // Список всех совершенных бронирований

    // Методы
    addBooking: (booking: Omit<Booking, 'id' | 'status' | 'createdAt'>) => void;
    cancelBooking: (id: string) => void;
    getEventBookings: (eventId: string) => Booking[];
}

/**
 * Хук-хранилище бронирований с автоматическим сохранением в localStorage.
 */
export const useBookingStore = create<BookingState>()(
    persist(
        (set, get) => ({
            bookings: [],

            /**
             * Создание нового бронирования.
             * Генерирует уникальный ID и устанавливает статус 'confirmed'.
             */
            addBooking: (newBookingData) => {
                const newBooking: Booking = {
                    ...newBookingData,
                    id: Math.random().toString(36).substring(2, 11).toUpperCase(), // Генерация читаемого ID
                    status: 'confirmed',
                    createdAt: new Date().toISOString(),
                };

                set((state) => ({
                    bookings: [newBooking, ...state.bookings], // Добавление в начало списка
                }));
            },

            /**
             * Отмена бронирования по ID.
             * Меняет статус на 'cancelled'.
             */
            cancelBooking: (id: string) => {
                set((state) => ({
                    bookings: state.bookings.map((b) =>
                        b.id === id ? { ...b, status: 'cancelled' } : b
                    ),
                }));
            },

            /**
             * Получение списка бронирований для конкретного мероприятия.
             */
            getEventBookings: (eventId: string) => {
                return get().bookings.filter((b) => b.eventId === eventId);
            },
        }),
        {
            name: 'booking-storage', // Ключ в localStorage
        }
    )
);
