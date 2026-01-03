/**
 * Назначение файла: Бейджи активных фильтров (Active Filters).
 * Зависимости: Lucide React (X, Trash2), i18n.
 * Особенности: Отображение выбранных параметров, возможность точечного или полного удаления.
 */

"use client";

import React from 'react';
import { X, Trash2 } from 'lucide-react';
import { useTranslation } from '@/lib/i18n';

interface ActiveFiltersProps {
    filters: {
        key: string;
        label: string;
        value: string;
        displayValue: string;
    }[];
    onRemove: (key: string, value: string) => void;
    onClear: () => void;
}

/**
 * Панель со списком активных фильтров.
 */
export const ActiveFilters: React.FC<ActiveFiltersProps> = ({ filters, onRemove, onClear }) => {
    const { t } = useTranslation();

    if (filters.length === 0) return null;

    return (
        <div className="flex flex-wrap items-center gap-2 mb-6 animate-in fade-in slide-in-from-top-2">
            <span className="text-xs font-bold text-zinc-500 uppercase tracking-widest mr-2">
                {t('filters_title')}:
            </span>

            {/* Список чипов фильтров */}
            {filters.map((filter) => (
                <button
                    key={`${filter.key}-${filter.value}`}
                    onClick={() => onRemove(filter.key, filter.value)}
                    className="
                        group flex items-center gap-1.5 px-3 py-1.5 rounded-full text-xs font-medium transition-all
                        bg-wine-gold/10 text-wine-dark hover:bg-wine-gold/20 hover:pr-2
                        dark:bg-wine-gold/20 dark:text-white dark:hover:bg-wine-gold/30
                        border border-wine-gold/20
                    "
                >
                    <span className="opacity-60 uppercase text-[10px]">{filter.label}:</span>
                    <span>{filter.displayValue}</span>
                    <X className="w-3 h-3 opacity-50 group-hover:opacity-100" />
                </button>
            ))}

            {/* Кнопка сброса всех фильтров */}
            {filters.length > 1 && (
                <button
                    onClick={onClear}
                    className="flex items-center gap-1.5 px-3 py-1.5 text-xs font-medium text-zinc-400 hover:text-wine-dark dark:hover:text-white transition-colors ml-auto md:ml-0"
                >
                    <Trash2 className="w-3 h-3" />
                    {t('clear_filters')}
                </button>
            )}
        </div>
    );
};
