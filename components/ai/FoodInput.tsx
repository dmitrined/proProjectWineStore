/**
 * Назначение файла: Компонент ввода названия блюда для AI-сомелье (Food Input).
 * Зависимости: framer-motion, lucide-react, i18n.
 * Особенности: Инпут с поддержкой быстрого выбора (тэги/подсказки).
 */

import React from 'react';
import { motion } from 'framer-motion';
import { Search } from 'lucide-react';
import { useTranslation } from '@/lib/i18n';

interface FoodInputProps {
    value: string;
    onChange: (value: string) => void;
    onNext: () => void;
}

// Список подсказок для быстрого выбора блюд
const foodSuggestions = [
    { id: 'meat', labelKey: 'ai_food_meat' },
    { id: 'fish', labelKey: 'ai_food_fish' },
    { id: 'cheese', labelKey: 'ai_food_cheese' },
    { id: 'pasta', labelKey: 'ai_food_pasta' },
    { id: 'dessert', labelKey: 'ai_food_dessert' },
];

/**
 * Компонент для ввода текста и отображения подсказок.
 */
export const FoodInput: React.FC<FoodInputProps> = ({ value, onChange, onNext }) => {
    const { t } = useTranslation();

    return (
        <div className="flex flex-col gap-6">
            {/* Поле ввода */}
            <div className="relative">
                <Search className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-zinc-400" />
                <input
                    type="text"
                    value={value}
                    onChange={(e) => onChange(e.target.value)}
                    placeholder={t('ai_food_placeholder')}
                    className="w-full pl-12 pr-4 py-4 rounded-2xl bg-white dark:bg-zinc-900 border-2 border-zinc-100 dark:border-zinc-800 focus:border-wine-gold focus:ring-0 outline-none transition-all placeholder:text-zinc-400 text-lg"
                    onKeyDown={(e) => {
                        if (e.key === 'Enter' && value.trim()) {
                            onNext();
                        }
                    }}
                    autoFocus
                />
            </div>

            {/* Быстрые подсказки */}
            <div className="flex flex-wrap gap-2">
                {foodSuggestions.map((item, index) => (
                    <motion.button
                        key={item.id}
                        initial={{ opacity: 0, scale: 0.9 }}
                        animate={{ opacity: 1, scale: 1 }}
                        transition={{ delay: 0.2 + index * 0.05 }}
                        onClick={() => onChange(t(item.labelKey))}
                        className="px-4 py-2 rounded-full bg-zinc-100 dark:bg-zinc-800 hover:bg-zinc-200 dark:hover:bg-zinc-700 text-sm font-medium text-zinc-600 dark:text-zinc-300 transition-colors"
                    >
                        {t(item.labelKey)}
                    </motion.button>
                ))}
            </div>
        </div>
    );
};
