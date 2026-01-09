/**
 * НАЗНАЧЕНИЕ: Страница каталога вин (Shop).
 * ЗАВИСИМОСТИ: HeroUI, Lucide React, i18n Context, Wines Context, SidebarFilters.
 * ОСОБЕННОСТИ: Client Component, Пагинация (Infinite Scroll), Серверная фильтрация (через API).
 */

"use client";

import React, { Suspense } from 'react';
import { useSearchParams, useRouter, usePathname } from 'next/navigation';
import { SlidersHorizontal, ChevronDown } from 'lucide-react';
import { useTranslation } from '@/lib/i18n';
import { useWines } from '@/lib/hooks/useWines';
import { useUIStore } from '@/lib/store/useUIStore';

import ProductCard from '@/components/wine/ProductCard';
import WineCardSkeleton from '@/components/ui/Skeletons/WineCardSkeleton';
import SidebarFilters from '@/components/wine/SidebarFilters';
import { ActiveFilters } from '@/components/wine/ActiveFilters';

function CatalogContent() {
    const { t } = useTranslation();
    const router = useRouter();
    const pathname = usePathname();
    const searchParams = useSearchParams();
    const toggleFilter = useUIStore((state) => state.toggleFilter);

    // --- 1. Парсинг параметров URL ---
    const searchQuery = searchParams.get('search') || undefined;
    const category = searchParams.get('category') || undefined;
    const tag = searchParams.get('tag') || undefined;
    const grape = searchParams.get('grape') || undefined;
    const flavor = searchParams.get('flavor') || undefined;
    const quality = searchParams.get('quality') || undefined;
    const type = searchParams.get('type') || undefined;
    const sortBy = searchParams.get('sort') || 'price_asc';

    // --- 2. Получение данных (Infinite Scroll) ---
    const {
        data,
        fetchNextPage,
        hasNextPage,
        isFetchingNextPage,
        isLoading,
        error,
        refetch
    } = useWines({
        search: searchQuery,
        category,
        tag,
        grape,
        flavor,
        quality,
        type,
        sort: sortBy
    });

    // Плоский список продуктов из всех загруженных страниц
    const allProducts = data?.pages.flatMap((page) => page.data) || [];

    const updateParams = (newParams: URLSearchParams) => {
        router.push(`${pathname}?${newParams.toString()}`);
    };

    // --- 3. Данные для активных фильтров (для UI) ---
    // (Логика отображения чипсов осталась прежней)
    const activeFiltersData = React.useMemo(() => {
        const list = [];
        if (category) {
            const typeMap: Record<string, string> = {
                'rot': 'red',
                'weiss': 'white',
                'rose': 'rose',
                'prickelndes': 'sparkling',
                'weinpakete': 'package',
                'alkoholfrei': 'alcohol_free'
            };
            const technicalType = typeMap[category];
            const displayValue = technicalType ? t('wine_type_' + technicalType) : category;
            list.push({ key: 'category', label: t('filter_category'), value: category, displayValue });
        }
        if (tag) list.push({ key: 'tag', label: t('filter_tag'), value: tag, displayValue: t(`nav_shop_${tag.toLowerCase()}`) !== `nav_shop_${tag.toLowerCase()}` ? t(`nav_shop_${tag.toLowerCase()}`) : tag });
        if (type) list.push({ key: 'type', label: t('product_type'), value: type, displayValue: t('wine_type_' + type) });
        if (grape) list.push({ key: 'grape', label: t('filter_grape'), value: grape, displayValue: grape });
        if (flavor) list.push({ key: 'flavor', label: t('product_characteristic_flavor'), value: flavor, displayValue: t(`flavor_${flavor.toLowerCase()}`) });
        if (quality) {
            const qKey = `quality_${quality.toLowerCase().replace(/edition >/g, 'edition_').replace(/</g, '').replace(/>/g, '').replace(/\s+/g, '')}`;
            list.push({ key: 'quality', label: t('product_characteristic_quality'), value: quality, displayValue: t(qKey) !== qKey ? t(qKey) : quality });
        }
        return list;
    }, [category, tag, type, grape, flavor, quality, t]);

    return (
        <div className="min-h-screen bg-zinc-50 dark:bg-zinc-950 pt-32 pb-20">
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">

                {/* Заголовок страницы */}
                <div className="mb-8 md:mb-12">
                    <h1 className="text-4xl md:text-5xl font-black text-wine-dark dark:text-white mb-4">
                        {t("catalog_title")}
                    </h1>
                    <p className="text-zinc-600 dark:text-zinc-400 max-w-2xl text-lg">
                        {t("catalog_subtitle")}
                    </p>
                </div>

                <div className="flex flex-col lg:flex-row gap-8">

                    {/* Боковые фильтры */}
                    <SidebarFilters />

                    {/* Основной контент */}
                    <div className="flex-1">
                        {/* Переключатель мобильных фильтров */}
                        <div className="lg:hidden sticky top-20 z-40 bg-zinc-50/90 dark:bg-zinc-950/90 backdrop-blur-md py-4 mb-6 border-b border-zinc-200 dark:border-zinc-800">
                            <button
                                onClick={() => toggleFilter()}
                                className="flex items-center gap-2 px-6 py-2.5 bg-white dark:bg-zinc-900 border border-zinc-200 dark:border-zinc-800 rounded-full font-bold shadow-sm w-full justify-center text-wine-dark dark:text-white"
                            >
                                <SlidersHorizontal className="w-4 h-4" />
                                {t('filters_title')}
                                {(activeFiltersData.length > 0) && (
                                    <span className="bg-wine-gold text-white text-[10px] px-1.5 py-0.5 rounded-full">
                                        {activeFiltersData.length}
                                    </span>
                                )}
                            </button>
                        </div>

                        {/* Активные фильтры */}
                        <ActiveFilters
                            filters={activeFiltersData}
                            onRemove={(key, _value) => {
                                const params = new URLSearchParams(searchParams.toString());
                                params.delete(key);
                                updateParams(params);
                            }}
                            onClear={() => {
                                router.push(pathname, { scroll: false });
                            }}
                        />

                        {/* Состояние загрузки (Скелетоны) */}
                        {isLoading ? (
                            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-3 gap-6">
                                {[...Array(6)].map((_, i) => (
                                    <WineCardSkeleton key={i} />
                                ))}
                            </div>
                        ) : error ? (
                            // Состояние ошибки
                            <div className="flex flex-col items-center justify-center py-20 bg-wine-dark/5 dark:bg-wine-gold/5 rounded-3xl border border-dashed border-wine-gold/30">
                                <div className="w-16 h-16 bg-wine-gold/10 rounded-full flex items-center justify-center mb-6">
                                    <SlidersHorizontal className="w-8 h-8 text-wine-gold" />
                                </div>
                                <h3 className="text-2xl font-bold text-wine-dark dark:text-white mb-2">
                                    {t("api_error")}
                                </h3>
                                <p className="text-zinc-500 mb-8 max-w-sm text-center">
                                    {error instanceof Error && error.message === 'No products found in the database.' ? t('api_empty') : (error as Error)?.message || String(error)}
                                </p>
                                <button
                                    onClick={() => refetch()}
                                    className="px-8 py-3 bg-wine-dark dark:bg-wine-gold text-white rounded-full font-bold hover:scale-105 active:scale-95 transition-transform"
                                >
                                    {t('hero_cta')}
                                </button>
                            </div>
                        ) : allProducts.length > 0 ? (
                            <>
                                {/* Сетка товаров */}
                                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-3 gap-6 mb-12">
                                    {allProducts.map((product) => (
                                        <ProductCard key={product.id} product={product} />
                                    ))}
                                </div>

                                {/* Кнопка "Загрузить еще" */}
                                {hasNextPage && (
                                    <div className="flex justify-center pt-4 pb-12">
                                        <button
                                            onClick={() => fetchNextPage()}
                                            disabled={isFetchingNextPage}
                                            className="group flex items-center gap-2 px-8 py-3 bg-white dark:bg-zinc-900 border border-zinc-200 dark:border-zinc-800 text-wine-dark dark:text-white rounded-full font-bold shadow-sm hover:shadow-md hover:border-wine-gold transition-all disabled:opacity-50 disabled:cursor-not-allowed"
                                        >
                                            {isFetchingNextPage ? (
                                                <div className="w-5 h-5 border-2 border-wine-gold border-t-transparent rounded-full animate-spin" />
                                            ) : (
                                                <ChevronDown className="w-5 h-5 group-hover:translate-y-0.5 transition-transform" />
                                            )}
                                            {isFetchingNextPage ? t('loading') : t('load_more')}
                                        </button>
                                    </div>
                                )}
                            </>
                        ) : (
                            // Пустое состояние
                            <div className="flex flex-col items-center justify-center py-20 bg-white dark:bg-zinc-900 rounded-3xl border border-dashed border-zinc-200 dark:border-zinc-800">
                                <div className="w-12 h-12 bg-zinc-100 rounded-full flex items-center justify-center mb-4">
                                    <SlidersHorizontal className="w-6 h-6 text-zinc-300" />
                                </div>
                                <h3 className="text-xl font-bold text-wine-dark dark:text-white mb-2">
                                    {t("no_wines_found")}
                                </h3>
                                <p className="text-zinc-500">{t("adjust_filters")}</p>
                            </div>
                        )}
                    </div>
                </div>
            </div>
        </div>
    );
}

export default function CatalogPage() {
    return (
        <Suspense fallback={<div className="min-h-screen pt-32 flex justify-center"><div className="animate-spin rounded-full h-8 w-8 border-b-2 border-wine-dark"></div></div>}>
            <CatalogContent />
        </Suspense>
    );
}

