/**
 * НАЗНАЧЕНИЕ: Хук для получения списка вин с сервера (TanStack Query).
 * ЗАВИСИМОСТИ: @/lib/api/products, React Query.
 * ОСОБЕННОСТИ: Использует useInfiniteQuery для пагинации. Данные идут только с бэкенда.
 */

import { useQuery, useInfiniteQuery } from "@tanstack/react-query";
import { fetchWines, fetchWineFacets, FetchWinesParams } from "@/lib/api/products";

export const useWines = (params: FetchWinesParams = {}) => {
    return useInfiniteQuery({
        queryKey: ["wines", params],
        queryFn: ({ pageParam }) => fetchWines({ ...params, page: pageParam as number, limit: 12 }),
        initialPageParam: 1,
        getNextPageParam: (lastPage) => {
            return lastPage.meta.hasMore ? lastPage.meta.page + 1 : undefined;
        },
    });
};

export const useWineFacets = (params: FetchWinesParams = {}) => {
    return useQuery({
        queryKey: ["wine-facets", params.category, params.search, params.tag, params.type],
        queryFn: () => fetchWineFacets(params),
        // Кешируем фасеты немного дольше
        staleTime: 1000 * 60 * 5,
    });
};
