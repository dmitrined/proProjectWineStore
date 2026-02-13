/**
 * НАЗНАЧЕНИЕ: Провайдер TanStack Query для управления состоянием данных.
 * ЗАВИСИМОСТИ: @tanstack/react-query.
 * ОСОБЕННОСТИ: Конфигурация QueryClient с оптимальными настройками для кеширования.
 */

"use client";

import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { useState } from "react";

export default function QueryProvider({ children }: { children: React.ReactNode }) {
    const [queryClient] = useState(
        () =>
            new QueryClient({
                defaultOptions: {
                    queries: {
                        staleTime: 60 * 1000, // Данные считаются свежими 1 минуту
                        refetchOnWindowFocus: false, // Отключаем рефетч при смене фокуса окна
                    },
                },
            })
    );

    return (
        <QueryClientProvider client={queryClient}>
            {children}
        </QueryClientProvider>
    );
}
