/**
 * НАЗНАЧЕНИЕ: Детальная страница вина (Wine Detail Page).
 * ЗАВИСИМОСТИ: HeroUI, Lucide React, i18n, Zustand Stores.
 * ОСОБЕННОСТИ: Динамическая маршрутизация, использование скелетонов при загрузке, Mobile-first.
 */

"use client";

import React from 'react';
import { useParams } from 'next/navigation';
import { ArrowLeft } from 'lucide-react';
import Link from 'next/link';
import { Wine } from '@/lib/types/wine';
import { WineDetail } from '@/components/wine/WineDetail';
import { useTranslation } from '@/lib/i18n';
import { useWishlistStore } from '@/lib/store/useWishlistStore';
import { useCartStore } from '@/lib/store/useCartStore';
import { useAuth } from '@/lib/contexts/AuthContext';
import { useWines } from '@/lib/hooks/useWines';
import WineDetailSkeleton from '@/components/ui/Skeletons/WineDetailSkeleton';


export default function WineDetailPage() {
    const { wineId } = useParams();
    const { t } = useTranslation();

    // Стор TanStack Query
    const { data: allProducts = [], isLoading } = useWines();
    const addToCart = useCartStore(state => state.addToCart);
    const toggleWishlist = useWishlistStore(state => state.toggleWishlist);

    const { isLoggedIn, setAuthModalOpen } = useAuth();
    const [mounted, setMounted] = React.useState(false);

    // Обеспечение согласованности гидратации
    React.useEffect(() => {
        setMounted(true);
    }, []);

    // Поиск конкретного вина по slug
    const wine = React.useMemo(() => {
        const item = allProducts.find((p) => {
            // Проверяем что это вино
            if ('grapeVariety' in p) {
                const wineItem = p as Wine;
                // Ищем по slug (используется в URL)
                return wineItem.slug === wineId;
            }
            return false;
        });

        if (item && 'grapeVariety' in item) {
            return item as Wine;
        }
        return undefined;
    }, [allProducts, wineId]);

    // Состояние избранного (всегда вызываем хук, даже если вино не найдено)
    const isFavorite = useWishlistStore(
        React.useCallback((state) => wine ? state.wishlist.includes(wine.id) : false, [wine])
    );


    if (!mounted) return null;


    // Если данные еще грузятся, показываем скелетон
    if (isLoading && !wine) {
        return <WineDetailSkeleton />;
    }


    if (!wine) {
        return (
            <div className="min-h-screen flex items-center justify-center bg-white dark:bg-zinc-950">
                <div className="text-center">
                    <h2 className="text-2xl font-bold mb-4 dark:text-white">{t("no_wines_found")}</h2>
                    <Link href="/shop" className="text-wine-gold font-bold hover:underline">{t("back_to_collection")}</Link>
                </div>
            </div>
        );
    }

    return (
        <div className="min-h-screen bg-white dark:bg-zinc-950 pt-32 pb-24">
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                {/* Навигация назад */}
                <Link
                    href="/shop"
                    className="inline-flex items-center text-zinc-500 hover:text-wine-gold transition-colors mb-8 md:mb-12 group"
                >
                    <ArrowLeft className="w-5 h-5 mr-4 group-hover:-translate-x-1 transition-transform" />
                    <span className="text-sm font-bold uppercase tracking-widest">{t("back_to_collection")}</span>
                </Link>


                <WineDetail
                    wine={wine}
                    isFavorite={isFavorite}
                    onAddToCart={(id) => {
                        addToCart(id);
                    }}
                    onToggleWishlist={(id) => {
                        toggleWishlist(id);
                    }}
                    t={t}
                />
            </div>
        </div>
    );
}
