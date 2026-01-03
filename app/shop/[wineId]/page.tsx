/**
 * Назначение файла: Детальная страница вина (Wine Detail).
 * Зависимости: HeroUI, Lucide React, i18n Context, Wines Context.
 * Особенности: Client Component, Динамическая маршрутизация ([wineId]), Скелетоны.
 */

"use client";


import React from 'react';
import { useParams } from 'next/navigation';
import { ArrowLeft } from 'lucide-react';
import Link from 'next/link';
import { WineDetailImage } from '@/components/wine/WineDetailImage';
import { WineDetailHeader } from '@/components/wine/WineDetailHeader';
import { WineDetailExperience } from '@/components/wine/WineDetailExperience';
import { WineDetailStats } from '@/components/wine/WineDetailStats';
import { WineDetailPurchase } from '@/components/wine/WineDetailPurchase';
import { useTranslation } from '@/lib/i18n';
import { useWishlistStore } from '@/lib/store/useWishlistStore';
import { useCartStore } from '@/lib/store/useCartStore';
import { useAuth } from '@/lib/contexts/AuthContext';
import { useWinesStore } from '@/lib/store/useWinesStore';
import WineDetailSkeleton from '@/components/ui/Skeletons/WineDetailSkeleton';


export default function WineDetailPage() {
    const { t } = useTranslation();

    // Migrated from WishlistContext
    const toggleWishlist = useWishlistStore(state => state.toggleWishlist);
    const isInWishlist = useWishlistStore(state => state.isInWishlist);

    // Migrated from CartContext
    const addToCart = useCartStore(state => state.addToCart);

    const { getWineById, isLoading, fetchProducts, wines: allProducts } = useWinesStore();
    const { isLoggedIn, setAuthModalOpen } = useAuth();
    const params = useParams();
    const wineId = params.wineId as string;
    const [mounted, setMounted] = React.useState(false);

    // Ensure hydration consistency
    React.useEffect(() => {
        setMounted(true);
    }, []);

    const wine = getWineById(wineId);

    // Загрузка продуктов если они еще не загружены (например при прямом переходе по ссылке)
    React.useEffect(() => {
        if (allProducts.length === 0) {
            fetchProducts();
        }
    }, [fetchProducts, allProducts.length]);

    if (!mounted) return null;

    const isFavorite = wine ? isInWishlist(wine.id) : false;

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

                <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 md:gap-16">
                    {/* Секция изображения */}
                    <WineDetailImage
                        image={wine.image}
                        name={wine.name}
                        year={wine.year}
                    />

                    {/* Детали вина */}
                    <div className="flex flex-col">
                        <WineDetailHeader
                            type={wine.type}
                            name={wine.name}
                            grapeVariety={wine.grapeVariety}
                            t={t}
                        />

                        <WineDetailExperience
                            title={t("experience_title")}
                            description={wine.description || t("experience_desc")}
                        />

                        <WineDetailStats
                            wine={wine}
                            t={t}
                        />

                        <WineDetailPurchase
                            wine={wine}
                            isFavorite={isFavorite}
                            onAddToCart={(id) => {
                                if (isLoggedIn) {
                                    addToCart(id);
                                } else {
                                    setAuthModalOpen(true);
                                }
                            }}
                            onToggleWishlist={(id) => {
                                if (isLoggedIn) {
                                    toggleWishlist(id);
                                } else {
                                    setAuthModalOpen(true);
                                }
                            }}
                            premiumPriceLabel={t("premium_price")}
                            addToCartLabel={t("add_to_cart")}
                            qualityGuaranteeLabel={t("quality_guarantee")}
                            t={t}
                        />
                    </div>
                </div>
            </div>
        </div>
    );
}
