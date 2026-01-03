/**
 * Назначение файла: Компонент выбора настроения для рекомендаций (Mood Selector).
 * Зависимости: framer-motion, lucide-react, i18n.
 * Особенности: Сетка карточек с интерактивным выбором и индикацией (Check icon).
 */

import React from 'react';
import { motion } from 'framer-motion';
import { Flame, PartyPopper, Armchair, Gift, Utensils } from 'lucide-react';
import { useTranslation } from '@/lib/i18n';

interface MoodOption {
    id: string;
    icon: React.ElementType;
    labelKey: string;
    color: string;
}

// Список доступных настроений/поводов
const moods: MoodOption[] = [
    { id: 'romantic', icon: Flame, labelKey: 'ai_mood_romantic', color: 'bg-rose-500/10 text-rose-500 border-rose-200' },
    { id: 'party', icon: PartyPopper, labelKey: 'ai_mood_party', color: 'bg-purple-500/10 text-purple-500 border-purple-200' },
    { id: 'relax', icon: Armchair, labelKey: 'ai_mood_relax', color: 'bg-blue-500/10 text-blue-500 border-blue-200' },
    { id: 'gift', icon: Gift, labelKey: 'ai_mood_gift', color: 'bg-amber-500/10 text-amber-500 border-amber-200' },
    { id: 'dinner', icon: Utensils, labelKey: 'ai_mood_dinner', color: 'bg-emerald-500/10 text-emerald-500 border-emerald-200' },
];

interface MoodSelectorProps {
    selectedMood: string | null;
    onSelect: (moodId: string) => void;
}

/**
 * Сетка кнопок для выбора повода/настроения.
 */
export const MoodSelector: React.FC<MoodSelectorProps> = ({ selectedMood, onSelect }) => {
    const { t } = useTranslation();

    return (
        <div className="grid grid-cols-2 gap-4">
            {moods.map((mood, index) => (
                <motion.button
                    key={mood.id}
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: index * 0.1 }}
                    onClick={() => onSelect(mood.id)}
                    className={`
                        relative p-6 rounded-2xl border-2 flex flex-col items-center justify-center gap-3 transition-all duration-300
                        ${selectedMood === mood.id
                            ? `${mood.color} ring-2 ring-offset-2 ring-wine-gold border-transparent scale-105`
                            : 'bg-white dark:bg-zinc-900 border-zinc-100 dark:border-zinc-800 hover:border-wine-gold/50 hover:bg-zinc-50 dark:hover:bg-zinc-800'
                        }
                    `}
                >
                    {/* Иконка настроения */}
                    <mood.icon className={`w-8 h-8 ${selectedMood === mood.id ? '' : 'text-zinc-400 dark:text-zinc-500'}`} />

                    {/* Заголовок */}
                    <span className={`font-medium text-sm ${selectedMood === mood.id ? '' : 'text-zinc-600 dark:text-zinc-300'}`}>
                        {t(mood.labelKey)}
                    </span>

                    {/* Галочка выбора */}
                    {selectedMood === mood.id && (
                        <motion.div
                            layoutId="check"
                            className="absolute top-3 right-3 w-4 h-4 rounded-full bg-wine-gold flex items-center justify-center"
                        >
                            <svg className="w-3 h-3 text-white" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={3} d="M5 13l4 4L19 7" />
                            </svg>
                        </motion.div>
                    )}
                </motion.button>
            ))}
        </div>
    );
};
