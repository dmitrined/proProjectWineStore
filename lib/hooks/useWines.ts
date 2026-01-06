/**
 * НАЗНАЧЕНИЕ: Хук для получения списка вин.
 * ЗАВИСИМОСТИ: useQuery, fetchWines.
 * ОСОБЕННОСТИ: Использование TanStack Query для кеширования и управления состоянием загрузки.
 */

import { useQuery } from "@tanstack/react-query";
import { fetchWines } from "@/lib/api/products";

export const useWines = () => {
    return useQuery({
        queryKey: ["wines"],
        queryFn: fetchWines,
    });
};
