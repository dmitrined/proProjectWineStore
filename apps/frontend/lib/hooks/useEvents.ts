/**
 * НАЗНАЧЕНИЕ: Хук для получения списка мероприятий.
 * ЗАВИСИМОСТИ: useQuery, fetchEvents.
 * ОСОБЕННОСТИ: Использование TanStack Query для кеширования и управления состоянием загрузки.
 */

import { useQuery } from "@tanstack/react-query";
import { fetchEvents } from "@/lib/api/products";

export const useEvents = () => {
    return useQuery({
        queryKey: ["events"],
        queryFn: fetchEvents,
    });
};
