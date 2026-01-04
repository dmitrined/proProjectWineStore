/**
 * НАЗНАЧЕНИЕ: Страница каталога вин (Shop).
 * ЗАВИСИМОСТИ: HeroUI, Lucide React, i18n Context, Wines Context, SidebarFilters.
 * ОСОБЕННОСТИ: Client Component (useSearchParams), Динамическая фильтрация через URL.
 */

"use client";

import React, { useMemo, Suspense } from 'react';
import { useSearchParams, useRouter, usePathname } from 'next/navigation';
import { SlidersHorizontal } from 'lucide-react';
import { useTranslation } from '@/lib/i18n';
import { useWinesStore } from '@/lib/store/useWinesStore';
import { useUIStore } from '@/lib/store/useUIStore';
import { Wine } from '@/lib/types/wine';

import ProductCard from '@/components/wine/ProductCard';
import WineCardSkeleton from '@/components/ui/Skeletons/WineCardSkeleton';
import SidebarFilters from '@/components/wine/SidebarFilters';
import { ActiveFilters } from '@/components/wine/ActiveFilters';

function CatalogContent() {
    const { t } = useTranslation();
    const router = useRouter();
    const pathname = usePathname();

    // Состояние хранилища (Zustand)
    const { wines: allProducts, isLoading, error, fetchProducts } = useWinesStore();

    // Загрузка данных при монтировании, если они еще не загружены
    React.useEffect(() => {
        if (allProducts.length === 0) {
            fetchProducts();
        }
    }, [fetchProducts, allProducts.length]);

    const searchParams = useSearchParams();
    const toggleFilter = useUIStore((state) => state.toggleFilter);

    // --- 1. Парсинг параметров URL ---
    const searchQuery = searchParams.get('search') || '';
    const category = searchParams.get('category');
    const tag = searchParams.get('tag');
    const grape = searchParams.get('grape');
    const flavor = searchParams.get('flavor');
    const quality = searchParams.get('quality');
    const type = searchParams.get('type');
    const sortBy = searchParams.get('sort') || 'price_asc';

    const updateParams = (newParams: URLSearchParams) => {
        router.push(`${pathname}?${newParams.toString()}`);
    };

    // --- 2. Логика фильтрации и сортировки ---
    const filteredProducts = useMemo(() => {
        // Фильтруем только вина (наличие сорта винограда)
        let result = allProducts.filter(p => 'grapeVariety' in p) as Wine[];

        // 2.1 Поиск (Название, Описание, Сорт)
        if (searchQuery) {
            const query = searchQuery.toLowerCase();
            result = result.filter(p => {
                const name = (p.name || '').toLowerCase();
                const description = (p.description || '').toLowerCase();
                const grape = (p.grapeVariety || '').toLowerCase();

                return name.includes(query) || description.includes(query) || grape.includes(query);
            });
        }

        // 2.2 Категория
        if (category) {
            result = result.filter(p => {
                const typeMap: Record<string, string> = {
                    'rot': 'red',
                    'weiss': 'white',
                    'rose': 'rose',
                    'prickelndes': 'sparkling',
                    'weinpakete': 'package',
                    'alkoholfrei': 'alcohol_free'
                };

                // 1. Проверка по маппингу типов
                if (typeMap[category] && p.type === typeMap[category]) {
                    return true;
                }

                // 2. Прямая проверка типа
                if (p.type?.toLowerCase() === category.toLowerCase()) {
                    return true;
                }

                return false;
            });
        }

        // 2.3 Теги
        if (tag) {
            result = result.filter(p => {
                if (p.tags && Array.isArray(p.tags)) {
                    // Теги хранятся как массив строк, проверяем наличие (кейс-независимо для надежности)
                    return p.tags.some((t) => t.toLowerCase() === tag.toLowerCase());
                }
                return false;
            });
        }

        // 2.4 Тип продукта
        if (type) {
            result = result.filter(p => p.type === type);
        }

        // 2.5 Сорт винограда (только для вин)
        if (grape) {
            result = result.filter(p => p.grapeVariety === grape);
        }

        // 2.6 Вкус (только для вин)
        if (flavor) {
            result = result.filter(p => p.flavor?.toLowerCase() === flavor.toLowerCase());
        }

        // 2.7 Уровень качества / Серия
        if (quality) {
            const q = quality.toLowerCase();
            const isEdition = q.includes('edition');
            const letter = isEdition ? q.split(' ').pop()?.replace(/[><]/g, '') : '';

            result = result.filter(p => {
                const pq = p.quality_level?.toLowerCase() || '';
                // Проверяем поле edition если оно есть
                const ped = p.edition?.toLowerCase() || '';

                if (q === 'literweine') return pq.includes('liter');
                if (isEdition && letter) {
                    return (pq.includes('edition') && pq.includes(letter)) || (ped.includes('edition') && ped.includes(letter));
                }
                return pq.includes(q) || ped.includes(q);
            });
        }

        // 2.8 Сортировка
        result.sort((a, b) => {
            const getPrice = (item: Wine) => typeof item.price === 'number' ? item.price : parseFloat(item.price || '0');
            const getDate = (item: Wine) => item.year || 0;

            switch (sortBy) {
                case 'price_asc': return getPrice(a) - getPrice(b);
                case 'price_desc': return getPrice(b) - getPrice(a);
                case 'newest': return getDate(b) - getDate(a);
                default: return 0;
            }
        });

        return result;
    }, [allProducts, searchQuery, category, tag, type, grape, flavor, quality, sortBy]);

    // --- 3. Данные для активных фильтров ---
    const activeFiltersData = useMemo(() => {
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
        if (tag) list.push({ key: 'tag', label: t('filter_tag'), value: tag, displayValue: tag });
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

                    {/* Боковые фильтры (Динамические) */}
                    <SidebarFilters products={allProducts} />

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

                        {/* Grid */}
                        {isLoading && filteredProducts.length === 0 ? (
                            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-3 gap-6">
                                {[...Array(6)].map((_, i) => (
                                    <WineCardSkeleton key={i} />
                                ))}
                            </div>
                        ) : error ? (
                            <div className="flex flex-col items-center justify-center py-20 bg-wine-dark/5 dark:bg-wine-gold/5 rounded-3xl border border-dashed border-wine-gold/30">
                                <div className="w-16 h-16 bg-wine-gold/10 rounded-full flex items-center justify-center mb-6">
                                    <SlidersHorizontal className="w-8 h-8 text-wine-gold" />
                                </div>
                                <h3 className="text-2xl font-bold text-wine-dark dark:text-white mb-2">
                                    {t("api_error")}
                                </h3>
                                <p className="text-zinc-500 mb-8 max-w-sm text-center">
                                    {error === 'No products found in the database.' ? t('api_empty') : error}
                                </p>
                                <button
                                    onClick={() => fetchProducts()}
                                    className="px-8 py-3 bg-wine-dark dark:bg-wine-gold text-white rounded-full font-bold hover:scale-105 active:scale-95 transition-transform"
                                >
                                    {t('hero_cta')}
                                </button>
                            </div>
                        ) : filteredProducts.length > 0 ? (
                            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-3 gap-6">
                                {filteredProducts.map((product) => (
                                    <ProductCard key={product.id} product={product} />
                                ))}
                            </div>
                        ) : (
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

