/**
 * НАЗНАЧЕНИЕ: Боковая панель фильтров каталога (Sidebar Filters).
 * ЗАВИСИМОСТИ: i18n, next/navigation, Zustand, framer-motion, FilterSection.
 * ОСОБЕННОСТИ: Динамическое построение опций через API Facets, управление через URL, адаптивность (Mobile Drawer).
 */

"use client";

import React, { useMemo, useState } from 'react';
import { useRouter, usePathname, useSearchParams } from 'next/navigation';
import { useTranslation } from '@/lib/i18n';
import { useUIStore } from '@/lib/store/useUIStore';
import { useWineFacets } from '@/lib/hooks/useWines';
import { X, Grid3x3, Grape, ChevronLeft, ChevronRight, Search, SlidersHorizontal, ArrowUpDown } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';
import { FilterSection } from './FilterSection';

interface Props {
    // products prop removed as we use useWineFacets now
}

/**
 * Компонент сайдбара с фильтрами.
 */
export default function SidebarFilters({ }: Props) {
    const { t } = useTranslation();
    const router = useRouter();
    const pathname = usePathname();
    const searchParams = useSearchParams();

    // UI Store для управления мобильной версией
    const isFilterOpen = useUIStore((state) => state.isFilterOpen);
    const setFilterOpen = useUIStore((state) => state.setFilterOpen);

    // Локальное состояние сайдбара
    const [isCollapsed, setIsCollapsed] = useState(false);
    const [grapeSearch, setGrapeSearch] = useState('');
    const [expandedSection, setExpandedSection] = useState<string | null>('category');

    // --- 1. Параметры URL ---
    const currentCategory = searchParams.get('category');
    const currentTag = searchParams.get('tag');
    const currentGrape = searchParams.get('grape');
    const currentFlavor = searchParams.get('flavor');
    const currentQuality = searchParams.get('quality');
    const currentSort = searchParams.get('sort') || 'price_asc';
    const currentSearch = searchParams.get('search') || '';
    const currentType = searchParams.get('type');

    // --- 2. Получение фасетов (опций) ---
    const { data: facetsData } = useWineFacets({
        category: currentCategory || undefined,
        search: currentSearch || undefined,
        tag: currentTag || undefined,
        type: currentType || undefined
    });

    const options = useMemo(() => {
        // Категории (статичные, так как это навигация высокого уровня)
        const categories = [
            { name: t('nav_red_wines'), slug: 'red', type: 'category' },
            { name: t('nav_white_wines'), slug: 'white', type: 'category' },
            { name: t('wine_type_rose'), slug: 'rose', type: 'category' },
            { name: t('nav_shop_federle'), slug: 'federle', type: 'category' },
            { name: t('nav_shop_vfb'), slug: 'vfb', type: 'tag' },
            { name: t('nav_shop_packages'), slug: 'package', type: 'category' },
            { name: t('wine_type_sparkling'), slug: 'sparkling', type: 'category' },
            { name: t('nav_shop_alles_gewoehnlich'), slug: 'magnum-sondereditionen', type: 'category' },
            { name: t('nav_shop_vouchers'), slug: 'gutscheine', type: 'category' },
            { name: t('nav_shop_presents'), slug: 'geschenke', type: 'category' },
        ];

        // Опции из API или пустые массивы
        const grapes = facetsData?.grapes || [];
        const flavors = (facetsData?.flavors || []) as string[];
        const qualityLevels = facetsData?.qualityLevels || [];

        // Опции сортировки
        const sorting = [
            { label: t('sort_newest'), value: 'newest' },
            { label: t('sort_price_asc'), value: 'price_asc' },
            { label: t('sort_price_desc'), value: 'price_desc' },
        ];

        return { categories, grapes, flavors, qualityLevels, sorting };
    }, [t, facetsData]);

    // --- 3. Обработчики URL ---

    /**
     * Переключение параметров в URL.
     */
    const toggleParam = (key: string, value: string) => {
        const params = new URLSearchParams(searchParams.toString());

        if (params.get(key) === value) {
            params.delete(key);
        } else {
            // При выборе категории или тега, очищаем другой параметр
            if (key === 'category') {
                params.delete('tag');
            } else if (key === 'tag') {
                params.delete('category');
            }
            params.set(key, value);
        }

        router.push(`${pathname}?${params.toString()}`, { scroll: false });
    };

    /**
     * Сброс всех фильтров.
     */
    const clearAll = () => {
        router.push(pathname, { scroll: false });
        setFilterOpen(false);
    };

    // Фильтрация сортов винограда по поиску внутри секции
    const filteredGrapes = useMemo(() => {
        if (!grapeSearch) return options.grapes;
        return options.grapes.filter((grape: string) =>
            grape.toLowerCase().includes(grapeSearch.toLowerCase())
        );
    }, [options.grapes, grapeSearch]);

    // --- 4. Вспомогательная функция для рендеринга контента ---
    const renderFilterContent = () => (
        <div className="space-y-2">
            {/* Поиск */}
            <div className="mb-6">
                <div className="relative">
                    <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-zinc-400" />
                    <input
                        type="text"
                        defaultValue={currentSearch}
                        placeholder={t('search_input_placeholder')}
                        className="w-full pl-10 pr-4 py-2.5 rounded-xl bg-white dark:bg-zinc-900 border border-zinc-200 dark:border-zinc-800 focus:outline-none focus:ring-2 focus:ring-wine-gold/50 text-sm shadow-sm transition-all"
                        onKeyDown={(e) => {
                            if (e.key === 'Enter') {
                                const val = e.currentTarget.value;
                                const params = new URLSearchParams(searchParams.toString());
                                if (val) params.set('search', val);
                                else params.delete('search');
                                router.push(`${pathname}?${params.toString()}`);
                            }
                        }}
                    />
                </div>
            </div>

            {/* Заголовок и кнопка сброса */}
            <div className="flex items-center justify-between mb-4 pb-4 border-b border-zinc-200 dark:border-zinc-800">
                <h3 className="text-xl font-bold text-wine-dark dark:text-white">
                    {t('filters_title')}
                </h3>
                <button
                    onClick={clearAll}
                    className="text-xs text-zinc-500 hover:text-wine-gold uppercase font-medium tracking-wider transition-colors"
                >
                    {t('filter_clear_all')}
                </button>
            </div>

            {/* Сортировка */}
            <FilterSection
                title={t('sort_by')}
                icon={<ArrowUpDown className="w-4 h-4" />}
                isExpanded={expandedSection === 'sort'}
                onToggle={() => setExpandedSection(expandedSection === 'sort' ? null : 'sort')}
            >
                <div className="space-y-2">
                    {options.sorting.map(sort => (
                        <label key={sort.value} className="flex items-center gap-2 cursor-pointer group">
                            <input
                                type="radio"
                                name="sort"
                                checked={currentSort === sort.value}
                                onChange={() => toggleParam('sort', sort.value)}
                                className="peer sr-only"
                            />
                            <div className="w-4 h-4 rounded-full border border-zinc-300 dark:border-zinc-700 peer-checked:border-wine-gold flex items-center justify-center transition-all">
                                <div className={`w-2 h-2 rounded-full transition-all ${currentSort === sort.value ? 'bg-wine-gold scale-100' : 'bg-transparent scale-0'}`} />
                            </div>
                            <span className={`text-sm group-hover:text-wine-gold transition-colors ${currentSort === sort.value ? 'font-medium text-wine-dark dark:text-white' : 'text-zinc-600 dark:text-zinc-400'}`}>
                                {sort.label}
                            </span>
                        </label>
                    ))}
                </div>
            </FilterSection>

            {/* Категории */}
            <FilterSection
                title={t('filter_category')}
                icon={<Grid3x3 className="w-4 h-4" />}
                count={options.categories.length}
                isExpanded={expandedSection === 'category'}
                onToggle={() => setExpandedSection(expandedSection === 'category' ? null : 'category')}
            >
                <div className="space-y-2">
                    {options.categories.map(cat => {
                        const isActive = cat.type === 'tag'
                            ? currentTag === cat.slug
                            : currentCategory === cat.slug;
                        const paramKey = cat.type === 'tag' ? 'tag' : 'category';

                        return (
                            <label key={cat.slug} className="flex items-center gap-2 cursor-pointer group">
                                <input
                                    type="checkbox"
                                    checked={isActive}
                                    onChange={() => toggleParam(paramKey, cat.slug)}
                                    className="peer sr-only"
                                />
                                <div className="w-4 h-4 rounded border border-zinc-300 dark:border-zinc-700 peer-checked:bg-wine-gold peer-checked:border-wine-gold flex items-center justify-center transition-all">
                                    <div className="w-2 h-2 bg-white rounded-full opacity-0 peer-checked:opacity-100" />
                                </div>
                                <span className={`text-sm group-hover:text-wine-gold transition-colors ${isActive ? 'font-medium text-wine-dark dark:text-white' : 'text-zinc-600 dark:text-zinc-400'}`}>
                                    {cat.name}
                                </span>
                            </label>
                        );
                    })}
                </div>
            </FilterSection>

            {/* Вкусы */}
            {options.flavors.length > 0 && (
                <FilterSection
                    title={t('product_characteristic_flavor')}
                    icon={<SlidersHorizontal className="w-4 h-4" />}
                    count={options.flavors.length}
                    isExpanded={expandedSection === 'flavor'}
                    onToggle={() => setExpandedSection(expandedSection === 'flavor' ? null : 'flavor')}
                >
                    <div className="space-y-2">
                        {options.flavors.map((flavor: string) => {
                            const flavorKey = `flavor_${flavor.toLowerCase()}`;
                            const displayName = t(flavorKey) !== flavorKey ? t(flavorKey) : flavor;

                            return (
                                <label key={flavor} className="flex items-center gap-2 cursor-pointer group">
                                    <input
                                        type="checkbox"
                                        checked={currentFlavor === flavor}
                                        onChange={() => toggleParam('flavor', flavor)}
                                        className="peer sr-only"
                                    />
                                    <div className="w-4 h-4 rounded border border-zinc-300 dark:border-zinc-700 peer-checked:bg-wine-gold peer-checked:border-wine-gold flex items-center justify-center transition-all">
                                        <div className="w-2 h-2 bg-white rounded-full opacity-0 peer-checked:opacity-100" />
                                    </div>
                                    <span className={`text-sm group-hover:text-wine-gold transition-colors ${currentFlavor === flavor ? 'font-medium text-wine-dark dark:text-white' : 'text-zinc-600 dark:text-zinc-400'}`}>
                                        {displayName}
                                    </span>
                                </label>
                            );
                        })}
                    </div>
                </FilterSection>
            )}

            {/* Сорта винограда */}
            {options.grapes.length > 0 && (
                <FilterSection
                    title={t('filter_grape')}
                    icon={<Grape className="w-4 h-4" />}
                    count={options.grapes.length}
                    isExpanded={expandedSection === 'grape'}
                    onToggle={() => setExpandedSection(expandedSection === 'grape' ? null : 'grape')}
                >
                    {options.grapes.length > 10 && (
                        <div className="mb-3">
                            <div className="relative">
                                <input
                                    type="text"
                                    value={grapeSearch}
                                    onChange={(e) => setGrapeSearch(e.target.value)}
                                    placeholder={t('search_input_placeholder')}
                                    className="w-full px-3 py-2 text-xs rounded-lg bg-zinc-50 dark:bg-zinc-900 border border-zinc-200 dark:border-zinc-800 focus:outline-none focus:ring-2 focus:ring-wine-gold/50"
                                />
                            </div>
                        </div>
                    )}
                    <div className="space-y-2 max-h-60 overflow-y-auto scrollbar-thin scrollbar-thumb-zinc-200 dark:scrollbar-thumb-zinc-800">
                        {filteredGrapes.map((grape: string) => (
                            <label key={grape} className="flex items-center gap-2 cursor-pointer group">
                                <input
                                    type="checkbox"
                                    checked={currentGrape === grape}
                                    onChange={() => toggleParam('grape', grape)}
                                    className="peer sr-only"
                                />
                                <div className="w-4 h-4 rounded border border-zinc-300 dark:border-zinc-700 peer-checked:bg-wine-gold peer-checked:border-wine-gold flex items-center justify-center transition-all">
                                    <div className="w-2 h-2 bg-white rounded-full opacity-0 peer-checked:opacity-100" />
                                </div>
                                <span className={`text-sm group-hover:text-wine-gold transition-colors ${currentGrape === grape ? 'font-medium text-wine-dark dark:text-white' : 'text-zinc-600 dark:text-zinc-400'}`}>
                                    {grape}
                                </span>
                            </label>
                        ))}
                    </div>
                </FilterSection>
            )}

            {/* Уровни качества */}
            {options.qualityLevels.length > 0 && (
                <FilterSection
                    title={t('product_characteristic_quality')}
                    icon={<SlidersHorizontal className="w-4 h-4" />}
                    count={options.qualityLevels.length}
                    isExpanded={expandedSection === 'quality'}
                    onToggle={() => setExpandedSection(expandedSection === 'quality' ? null : 'quality')}
                >
                    <div className="space-y-2">
                        {options.qualityLevels.map((quality: string) => {
                            const qKey = `quality_${quality.toLowerCase()
                                .replace(/edition >/g, 'edition_')
                                .replace(/</g, '')
                                .replace(/>/g, '')
                                .replace(/\s+/g, '')}`;

                            const displayName = t(qKey) !== qKey ? t(qKey) : quality;

                            return (
                                <label key={quality} className="flex items-center gap-2 cursor-pointer group">
                                    <input
                                        type="checkbox"
                                        checked={currentQuality === quality}
                                        onChange={() => toggleParam('quality', quality)}
                                        className="peer sr-only"
                                    />
                                    <div className="w-4 h-4 rounded border border-zinc-300 dark:border-zinc-700 peer-checked:bg-wine-gold peer-checked:border-wine-gold flex items-center justify-center transition-all">
                                        <div className="w-2 h-2 bg-white rounded-full opacity-0 peer-checked:opacity-100" />
                                    </div>
                                    <span className={`text-sm group-hover:text-wine-gold transition-colors ${currentQuality === quality ? 'font-medium text-wine-dark dark:text-white' : 'text-zinc-600 dark:text-zinc-400'}`}>
                                        {displayName}
                                    </span>
                                </label>
                            );
                        })}
                    </div>
                </FilterSection>
            )}
        </div>
    );

    return (
        <>
            {/* Сайдбар для десктопа */}
            <motion.div
                className="hidden lg:block flex-shrink-0 relative"
                animate={{ width: isCollapsed ? '60px' : '280px' }}
                transition={{ duration: 0.3, ease: 'easeInOut' }}
            >
                {/* Кнопка сворачивания */}
                <button
                    onClick={() => setIsCollapsed(!isCollapsed)}
                    className="absolute -right-3 top-8 z-10 p-1.5 rounded-full bg-white dark:bg-zinc-900 border-2 border-zinc-200 dark:border-zinc-800 shadow-lg hover:border-wine-gold transition-colors"
                >
                    {isCollapsed ? (
                        <ChevronRight className="w-4 h-4 text-wine-gold" />
                    ) : (
                        <ChevronLeft className="w-4 h-4 text-wine-gold" />
                    )}
                </button>

                <div className="sticky top-32 overflow-hidden">
                    {!isCollapsed && renderFilterContent()}
                    {isCollapsed && (
                        <div className="flex flex-col items-center gap-4 pt-4">
                            <div className="p-2 rounded-lg bg-wine-gold/10">
                                <Grid3x3 className="w-5 h-5 text-wine-gold" />
                            </div>
                            <div className="writing-mode-vertical text-xs font-bold text-zinc-400 uppercase tracking-wider">
                                {t('filters_title')}
                            </div>
                        </div>
                    )}
                </div>
            </motion.div>

            {/* Выезжающая панель для мобильных */}
            <AnimatePresence>
                {isFilterOpen && (
                    <>
                        {/* Затемнение фона */}
                        <motion.div
                            initial={{ opacity: 0 }}
                            animate={{ opacity: 1 }}
                            exit={{ opacity: 0 }}
                            onClick={() => setFilterOpen(false)}
                            className="fixed inset-0 bg-black/50 z-40 lg:hidden backdrop-blur-sm"
                        />
                        {/* Панель */}
                        <motion.div
                            initial={{ x: '100%' }}
                            animate={{ x: 0 }}
                            exit={{ x: '100%' }}
                            transition={{ type: "spring", damping: 25, stiffness: 200 }}
                            className="fixed inset-y-0 right-0 w-[80%] max-w-sm bg-white dark:bg-zinc-950 z-50 shadow-2xl p-6 overflow-y-auto"
                        >
                            <div className="flex justify-end mb-6">
                                <button onClick={() => setFilterOpen(false)} className="p-2 hover:bg-zinc-100 dark:hover:bg-zinc-900 rounded-full">
                                    <X className="w-6 h-6 text-zinc-500" />
                                </button>
                            </div>
                            {renderFilterContent()}
                        </motion.div>
                    </>
                )}
            </AnimatePresence>
        </>
    );
}
