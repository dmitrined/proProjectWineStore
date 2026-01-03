"use client";

import { HeroUIProvider } from "@heroui/react";
import { LanguageProvider } from "@/lib/i18n";
import { AuthProvider } from '@/lib/contexts/AuthContext';
import { OrdersProvider } from '@/lib/contexts/OrdersContext';


/**
 * Компонент-обертка для всех контекст-провайдеров приложения.
 * Включает локализацию, авторизацию, корзину, список желаемого и UI-библиотеку.
 */
export function Providers({ children }: { children: React.ReactNode }) {
  return (
    // Провайдер управления языками (i18n) - самый верхний уровень
    <LanguageProvider>
      {/* Провайдер аутентификации (данные пользователя и сессия) */}
      <AuthProvider>
        {/* Провайдер управления историей заказов */}
        <OrdersProvider>
          <HeroUIProvider>
            {/* Рендеринг дочерних элементов приложения */}
            {children}
          </HeroUIProvider>
        </OrdersProvider>
      </AuthProvider>
    </LanguageProvider>
  );
}