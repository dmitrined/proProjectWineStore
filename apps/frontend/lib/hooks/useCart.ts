/**
 * НАЗНАЧЕНИЕ: Хук для синхронизации корзины с бэкендом (TanStack Query).
 * ЗАВИСИМОСТИ: useCartStore, calculateCart.
 */

import { useQuery } from "@tanstack/react-query";
import { useCartStore } from "../store/useCartStore";
import { calculateCart } from "../api/products";

export const useCart = () => {
    const items = useCartStore((state) => state.items);

    return useQuery({
        queryKey: ["cart-backend", items],
        queryFn: () => calculateCart(items.map(item => ({ productId: item.id, quantity: item.quantity }))),
        enabled: items.length > 0,
        // Кешируем на короткое время, так как корзина меняется часто
        staleTime: 1000 * 30,
    });
};
