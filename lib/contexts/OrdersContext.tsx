/**
 * НАЗНАЧЕНИЕ: Контекст для работы с историей заказов (Orders Context).
 * ЗАВИСИМОСТИ: AuthContext.
 * ОСОБЕННОСТИ: Хранение истории заказов в LocalStorage, инициализация мок-данных, привязка к статусу авторизации.
 */

"use client";

import React, { createContext, useContext, useState, useEffect } from 'react';
import { useAuth } from './AuthContext';

// Интерфейс заказа
export interface Order {
    id: string; // Номер заказа
    date: string; // Дата совершения
    total: number; // Общая сумма
    items: {
        wineId: string; // ID купленного товара
        name: string; // Название товара
        quantity: number; // Количество
        price: number; // Цена за единицу
    }[];
    status: 'Delivered' | 'In Transit' | 'Processing'; // Статус заказа
}

// Типизация контекста
interface OrdersContextType {
    orders: Order[]; // Список всех заказов пользователя
    addOrder: (order: Order) => void;
    clearOrders: () => void;
}

// Создание контекста
const OrdersContext = createContext<OrdersContextType | undefined>(undefined);

/**
 * Провайдер истории заказов.
 */
export const OrdersProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
    // Инициализация из localStorage для избежания лишнего рендера
    const [orders, setOrders] = useState<Order[]>(() => {
        if (typeof window !== 'undefined') {
            const savedOrders = localStorage.getItem('orders');
            if (savedOrders) {
                try {
                    return JSON.parse(savedOrders);
                } catch (e) {
                    console.error('Ошибка загрузки истории заказов:', e);
                }
            }

            // Если заказов нет, проверяем авторизацию для создания демо-заказа
            const savedUser = localStorage.getItem('user');
            if (savedUser) {
                const initialOrders: Order[] = [
                    {
                        id: 'ORD-2023-001',
                        date: '2023-10-15',
                        total: 89.70,
                        status: 'Delivered',
                        items: [
                            { wineId: '1', name: 'MERLOT GOLDBERG', quantity: 3, price: 29.90 }
                        ]
                    }
                ];
                localStorage.setItem('orders', JSON.stringify(initialOrders));
                return initialOrders;
            }
        }
        return [];
    });

    const { isLoggedIn } = useAuth();

    // Синхронизация при смене статуса входа
    useEffect(() => {
        if (!isLoggedIn && orders.length > 0) {
            // eslint-disable-next-line react-hooks/set-state-in-effect
            setOrders([]);
            localStorage.removeItem('orders');
        } else if (isLoggedIn && orders.length === 0) {
            const savedOrders = localStorage.getItem('orders');
            if (savedOrders) {
                try {
                    // eslint-disable-next-line react-hooks/set-state-in-effect
                    setOrders(JSON.parse(savedOrders));
                } catch (e) {
                    console.error(e);
                }
            } else {
                const initialOrders: Order[] = [
                    {
                        id: 'ORD-2023-001',
                        date: '2023-10-15',
                        total: 89.70,
                        status: 'Delivered',
                        items: [
                            { wineId: '1', name: 'MERLOT GOLDBERG', quantity: 3, price: 29.90 }
                        ]
                    }
                ];
                // eslint-disable-next-line react-hooks/set-state-in-effect
                setOrders(initialOrders);
                localStorage.setItem('orders', JSON.stringify(initialOrders));
            }
        }
    }, [isLoggedIn, orders.length]);

    /**
     * Регистрация нового заказа.
     */
    const addOrder = (order: Order) => {
        setOrders(prev => {
            const next = [order, ...prev];
            localStorage.setItem('orders', JSON.stringify(next));
            return next;
        });
    };

    /**
     * Очистка всей истории.
     */
    const clearOrders = () => {
        setOrders([]);
        localStorage.removeItem('orders');
    };

    return (
        <OrdersContext.Provider value={{ orders, addOrder, clearOrders }}>
            {children}
        </OrdersContext.Provider>
    );
};

/**
 * Хук для доступа к данным о заказах.
 */
export const useOrders = () => {
    const context = useContext(OrdersContext);
    if (context === undefined) {
        throw new Error('useOrders должен использоваться внутри OrdersProvider');
    }
    return context;
};
