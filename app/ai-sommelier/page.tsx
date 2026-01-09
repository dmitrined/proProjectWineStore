/**
 * НАЗНАЧЕНИЕ: Главная страница раздела "AI Sommelier" (ИИ-Сомелье).
 * ЗАВИСИМОСТИ: React, Framer Motion, HeroUI, Next.js.
 * ОСОБЕННОСТИ: Пошаговый интерфейс выбора вина с помощью ИИ, Mobile-first, анимации Framer Motion.
 */

"use client";

import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { ArrowLeft, Sparkles, Home } from 'lucide-react';
import Link from 'next/link';
import { useRouter } from 'next/navigation';

import { useTranslation } from '@/lib/i18n';
import { MoodSelector } from '@/components/ai/MoodSelector';
import { FoodInput } from '@/components/ai/FoodInput';
import { SommelierChat } from '@/components/ai/SommelierChat';
import { useWines } from '@/lib/hooks/useWines';
import { Wine } from '@/lib/types/wine';

// Интерфейс для управления состоянием формы
interface SommelierStep {
    current: 'mood' | 'food' | 'result';
    mood: string | null;
    food: string;
    isLoading: boolean;
    recommendations: Wine[];
}

export default function AISommelierPage() {
    const { t } = useTranslation();
    const router = useRouter();
    const { data: wines = [] } = useWines();

    const [state, setState] = useState<SommelierStep>({
        current: 'mood',
        mood: null,
        food: '',
        isLoading: false,
        recommendations: []
    });

    const handleMoodSelect = (moodId: string) => {
        // Сохраняем выбранное настроение
        setState(prev => ({ ...prev, mood: moodId }));

        // Автоматический переход к следующему шагу (Еда) с небольшой задержкой.
        // Это улучшает UX, давая пользователю визуальное подтверждение выбора перед сменой экрана.
        setTimeout(() => {
            setState(prev => ({ ...prev, current: 'food' }));
        }, 500);
    };

    const handleFoodChange = (value: string) => {
        setState(prev => ({ ...prev, food: value }));
    };

    const handleBack = () => {
        // Логика кнопки "Назад" зависит от текущего шага
        if (state.current === 'food') {
            // Если мы на выборе еды -> возвращаемся к выбору настроения
            setState(prev => ({ ...prev, current: 'mood' }));
        } else if (state.current === 'result') {
            // Если мы на результате -> возвращаемся к выбору еды и сбрасываем рекомендации
            setState(prev => ({ ...prev, current: 'food', recommendations: [] }));
        } else {
            // Если мы на первом шаге -> возвращаемся на главную
            router.push('/');
        }
    };

    const handleAskAI = async () => {
        setState(prev => ({ ...prev, current: 'result', isLoading: true }));

        // Имитация формирования промпта для ИИ (для логов или отладки)
        console.log("Analyzing...", { mood: state.mood, food: state.food });

        // Имитация работы ИИ: фильтрация и выбор вин
        setTimeout(() => {
            let processedWines: Wine[] = [];

            // Обработка данных из useInfiniteQuery или обычного массива
            if (Array.isArray(wines)) {
                // Если это массив (старая версия или пустой)
                processedWines = wines as Wine[];
            } else if (wines && 'pages' in wines) {
                // Если это InfiniteData
                processedWines = (wines as any).pages.flatMap((page: any) => page.data);
            }

            const sourceWines = processedWines.filter((w): w is Wine => 'grapeVariety' in w);

            // Случайный выбор 2-х вин
            const randomWines = [...sourceWines].sort(() => 0.5 - Math.random()).slice(0, 2);

            setState(prev => ({
                ...prev,
                isLoading: false,
                recommendations: randomWines
            }));
        }, 2000);
    };

    const handleRestart = () => {
        setState({
            current: 'mood',
            mood: null,
            food: '',
            isLoading: false,
            recommendations: []
        });
    };

    return (
        <div className="min-h-screen bg-white dark:bg-zinc-950 pb-24 relative overflow-hidden">
            {/* Фоновые элементы */}
            <div className="absolute top-0 left-0 w-full h-[50vh] bg-gradient-to-b from-wine-gold/5 to-transparent pointer-events-none" />

            {/* Header */}
            <header className="sticky top-0 z-50 bg-white/80 dark:bg-zinc-950/80 backdrop-blur-md border-b border-zinc-100 dark:border-zinc-800">
                <div className="max-w-md mx-auto px-4 h-16 flex items-center justify-between">
                    <button
                        onClick={handleBack}
                        className="p-2 -ml-2 rounded-full hover:bg-zinc-100 dark:hover:bg-zinc-800 transition-colors"
                    >
                        {state.current === 'mood' ? <Home className="w-6 h-6" /> : <ArrowLeft className="w-6 h-6" />}
                    </button>
                    <span className="font-serif text-lg font-bold text-wine-dark dark:text-white">
                        {t('ai_title')}
                    </span>
                    <div className="w-10" /> {/* Spacer for balance */}
                </div>
            </header>

            <main className="max-w-md mx-auto px-6 py-8 relative z-10">
                <AnimatePresence mode="wait">
                    {state.current === 'mood' && (
                        <motion.div
                            key="mood"
                            initial={{ opacity: 0, x: 20 }}
                            animate={{ opacity: 1, x: 0 }}
                            exit={{ opacity: 0, x: -20 }}
                            className="flex flex-col gap-6"
                        >
                            <div className="text-center space-y-2">
                                <h1 className="text-2xl font-serif font-bold text-wine-dark dark:text-white">
                                    {t('ai_step_mood')}
                                </h1>
                                <p className="text-zinc-500 dark:text-zinc-400 text-sm">
                                    {t('ai_subtitle')}
                                </p>
                            </div>

                            <MoodSelector
                                selectedMood={state.mood}
                                onSelect={handleMoodSelect}
                            />
                        </motion.div>
                    )}

                    {state.current === 'food' && (
                        <motion.div
                            key="food"
                            initial={{ opacity: 0, x: 20 }}
                            animate={{ opacity: 1, x: 0 }}
                            exit={{ opacity: 0, x: -20 }}
                            className="flex flex-col gap-8 h-full"
                        >
                            <div className="text-center space-y-2">
                                <h1 className="text-2xl font-serif font-bold text-wine-dark dark:text-white">
                                    {t('ai_step_food')}
                                </h1>
                                <p className="text-zinc-500 dark:text-zinc-400 text-sm">
                                    {t('ai_mood_' + state.mood)}
                                </p>
                            </div>

                            <FoodInput
                                value={state.food}
                                onChange={handleFoodChange}
                                onNext={handleAskAI}
                            />

                            <button
                                onClick={handleAskAI}
                                disabled={!state.food}
                                className={`
                                    w-full py-4 rounded-2xl font-bold uppercase tracking-wider text-sm transition-all duration-300 shadow-lg
                                    ${state.food
                                        ? 'bg-wine-gold text-white shadow-wine-gold/30 hover:shadow-wine-gold/50 hover:-translate-y-1'
                                        : 'bg-zinc-200 dark:bg-zinc-800 text-zinc-400 cursor-not-allowed shadow-none'
                                    }
                                `}
                            >
                                <div className="flex items-center justify-center gap-2">
                                    <Sparkles className="w-5 h-5" />
                                    {t('ai_btn_find')}
                                </div>
                            </button>
                        </motion.div>
                    )}

                    {state.current === 'result' && (
                        <motion.div
                            key="result"
                            initial={{ opacity: 0 }}
                            animate={{ opacity: 1 }}
                            className="flex flex-col gap-6"
                        >
                            <SommelierChat
                                isLoading={state.isLoading}
                                recommendedWines={state.recommendations}
                            />

                            {!state.isLoading && (
                                <button
                                    onClick={handleRestart}
                                    className="mt-8 mx-auto px-6 py-2 rounded-full border border-zinc-200 dark:border-zinc-800 text-sm font-medium text-zinc-500 dark:text-zinc-400 hover:text-wine-dark dark:hover:text-white transition-colors"
                                >
                                    {t('ai_restart')}
                                </button>
                            )}
                        </motion.div>
                    )}
                </AnimatePresence>
            </main>
        </div>
    );
}
