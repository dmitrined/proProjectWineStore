/**
 * НАЗНАЧЕНИЕ: Контекст авторизации (Authentication Context).
 * ЗАВИСИМОСТИ: React Context, useCartStore.
 * ОСОБЕННОСТИ: Управление состоянием пользователя, вход, регистрация, выход, хранение сессии в LocalStorage.
 */

"use client";

import React, { createContext, useContext, useState } from 'react';
import { useCartStore } from '@/lib/store/useCartStore';

// Интерфейс данных пользователя
export interface User {
    id: string; // Уникальный идентификатор
    name: string; // Имя пользователя
    email: string; // Электронная почта
    avatar?: string; // URL аватара (опционально)
}

// Интерфейс для регистрации (внутренний для мок-данных)
interface RegisteredUser extends User {
    password: string;
}

// Типизация контекста авторизации
interface AuthContextType {
    user: User | null; // Объект текущего пользователя
    isLoggedIn: boolean; // Флаг: вошел ли пользователь в систему
    login: (email: string, password: string) => Promise<void>;
    register: (name: string, email: string, password: string) => Promise<void>;
    logout: () => void;
    isAuthModalOpen: boolean; // Видимость модального окна входа
    setAuthModalOpen: (isOpen: boolean) => void;
}

// Создание контекста с неопределенным начальным значением
const AuthContext = createContext<AuthContextType | undefined>(undefined);

/**
 * Провайдер авторизации, оборачивающий всё приложение.
 */
export const AuthProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
    // Инициализация пользователя из localStorage (на стороне клиента)
    const [user, setUser] = useState<User | null>(() => {
        if (typeof window !== 'undefined') {
            const savedUser = localStorage.getItem('user');
            if (savedUser) {
                try {
                    return JSON.parse(savedUser);
                } catch (e) {
                    console.error('Ошибка парсинга данных пользователя:', e);
                }
            }
        }
        return null;
    });

    const [isAuthModalOpen, setAuthModalOpen] = useState(false);

    /**
     * Функция входа (имитация/Mock).
     */
    const login = async (email: string, password: string) => {
        const users: RegisteredUser[] = JSON.parse(localStorage.getItem('registered_users') || '[]');
        const found = users.find(u => u.email === email && u.password === password);

        if (found) {
            const userData: User = { id: found.id, name: found.name, email: found.email };
            setUser(userData);
            localStorage.setItem('user', JSON.stringify(userData));
        } else {
            throw new Error('Некорректный email или пароль');
        }
    };

    /**
     * Функция регистрации нового пользователя (имитация/Mock).
     */
    const register = async (name: string, email: string, password: string) => {
        const users: RegisteredUser[] = JSON.parse(localStorage.getItem('registered_users') || '[]');

        if (users.find(u => u.email === email)) {
            throw new Error('Пользователь с таким email уже существует');
        }

        const newUser: RegisteredUser = {
            id: Math.random().toString(36).substring(2, 11),
            name,
            email,
            password
        };
        users.push(newUser);
        localStorage.setItem('registered_users', JSON.stringify(users));

        const userData: User = { id: newUser.id, name: newUser.name, email: newUser.email };
        setUser(userData);
        localStorage.setItem('user', JSON.stringify(userData));
    };

    /**
     * Функция выхода из системы.
     */
    const logout = () => {
        setUser(null);
        localStorage.removeItem('user');
        // Очистка корзины при выходе в целях безопасности данных
        useCartStore.getState().clearCart();
    };

    return (
        <AuthContext.Provider value={{
            user,
            isLoggedIn: !!user,
            login,
            register,
            logout,
            isAuthModalOpen,
            setAuthModalOpen
        }}>
            {children}
        </AuthContext.Provider>
    );
};

/**
 * Хук для доступа к контексту авторизации.
 */
export const useAuth = () => {
    const context = useContext(AuthContext);
    if (context === undefined) {
        throw new Error('useAuth должен использоваться внутри AuthProvider');
    }
    return context;
};
