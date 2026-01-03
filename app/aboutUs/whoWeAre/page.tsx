"use client";

/**
 * Страница "Wir über uns" (Кто мы).
 * 
 * Назначение:
 * Представляет пользователю историю, философию, ценности и ключевые показатели винодельни.
 * Является важной имиджевой страницей, укрепляющей доверие бренда.
 * 
 * Технологии:
 * - Framer Motion: Использован для плавного появления элементов (секции, статистика) при скролле.
 * - HeroUI / Tailwind: Адаптивная верстка (Mobile First).
 * - i18n: Вся текстовая информация вынесена в словари для поддержки немецкого и английского языков.
 */

import React from 'react';
import { useTranslation } from '@/lib/i18n';
import { motion } from 'framer-motion';
import { Award, Users, Grape, Leaf } from 'lucide-react';

export default function WhoWeArePage() {
    // Хук для получения функции перевода t(key)
    const { t } = useTranslation();

    // Конфигурация анимации "Появление снизу"
    // hidden: начальное состояние (прозрачность 0, смещение вниз на 20px)
    // visible: конечное состояние (прозрачность 1, возврат на место)
    const fadeIn = {
        hidden: { opacity: 0, y: 20 },
        visible: { opacity: 1, y: 0, transition: { duration: 0.6 } }
    };

    // Данные для секции статистики (иконка, подпись, значение)
    // Вынесены в массив для удобного рендеринга через map
    const stats = [
        { icon: Users, label: t("about_stats_members"), value: "400+" },
        { icon: Grape, label: t("about_stats_hectares"), value: "150 ha" },
        { icon: Award, label: t("about_stats_awards"), value: "150+" },
        { icon: Leaf, label: t("about_stats_tradition"), value: "1858" },
    ];

    return (
        <div className="min-h-screen bg-white dark:bg-zinc-950 pt-32 pb-24">

            {/* Hero Section: Заголовок и вводный текст */}
            <section className="relative px-4 sm:px-6 lg:px-8 max-w-7xl mx-auto mb-20 md:mb-32">
                <motion.div
                    initial="hidden"
                    animate="visible"
                    variants={fadeIn}
                    className="text-center max-w-3xl mx-auto"
                >
                    <span className="text-wine-gold text-xs font-black uppercase tracking-[0.4em] mb-4 block">
                        {t("about_hero_subtitle")}
                    </span>
                    <h1 className="text-5xl md:text-7xl font-black text-wine-dark dark:text-white mb-8 serif leading-tight">
                        {t("about_hero_title")}
                    </h1>
                    <p className="text-xl text-zinc-600 dark:text-zinc-400 leading-relaxed font-medium">
                        {t("about_hero_desc")}
                    </p>
                </motion.div>
            </section>

            {/* Content Section: Изображение и текстовые блоки (История, Философия) */}
            <section className="px-4 sm:px-6 lg:px-8 max-w-7xl mx-auto mb-24">
                <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 lg:gap-24 items-center">
                    {/* Левая колонка: Изображение с декоративной цитатой */}
                    <motion.div
                        initial={{ opacity: 0, x: -50 }} // Анимация появления слева
                        whileInView={{ opacity: 1, x: 0 }}
                        viewport={{ once: true }} // Анимировать только один раз при скролле
                        transition={{ duration: 0.8 }}
                        className="relative"
                    >
                        <div className="aspect-[4/5] rounded-[2.5rem] overflow-hidden">
                            <img
                                src="/images/uberUns.jpg"
                                alt="Vineyard landscape"
                                className="w-full h-full object-cover"
                            />
                        </div>
                        {/* Плавашка с цитатой, скрыта на мобильных, видна на десктопе (hidden md:block) */}
                        <div className="absolute -bottom-6 -right-6 bg-white dark:bg-zinc-900 p-8 rounded-[2rem] shadow-xl border border-zinc-100 dark:border-zinc-800 max-w-xs hidden md:block">
                            <p className="text-wine-dark dark:text-white font-black serif italic text-lg leading-snug">
                                "{t("about_quote")}"
                            </p>
                        </div>
                    </motion.div>

                    {/* Правая колонка: Текстовое описание */}
                    <motion.div
                        initial={{ opacity: 0, x: 50 }} // Анимация появления справа
                        whileInView={{ opacity: 1, x: 0 }}
                        viewport={{ once: true }}
                        transition={{ duration: 0.8 }}
                        className="space-y-8"
                    >
                        <div>
                            <h2 className="text-3xl font-black text-wine-dark dark:text-white mb-4 serif">
                                {t("about_history_title")}
                            </h2>
                            <p className="text-zinc-600 dark:text-zinc-400 leading-relaxed">
                                {t("about_history_text")}
                            </p>
                        </div>
                        <div>
                            <h2 className="text-3xl font-black text-wine-dark dark:text-white mb-4 serif">
                                {t("about_philosophy_title")}
                            </h2>
                            <p className="text-zinc-600 dark:text-zinc-400 leading-relaxed">
                                {t("about_philosophy_text")}
                            </p>
                        </div>
                    </motion.div>
                </div>
            </section>

            {/* Stats Section: Ключевые цифры (Сетка 2x2 на мобильных, 4 в ряд на десктопе) */}
            <section className="bg-zinc-50 dark:bg-zinc-900 py-24 my-24 border-y border-zinc-100 dark:border-zinc-800">
                <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                    <div className="grid grid-cols-2 md:grid-cols-4 gap-12">
                        {stats.map((stat, idx) => (
                            <motion.div
                                key={idx}
                                initial={{ opacity: 0, y: 20 }}
                                whileInView={{ opacity: 1, y: 0 }}
                                viewport={{ once: true }}
                                transition={{ delay: idx * 0.1, duration: 0.5 }} // Каскадная задержка анимации
                                className="text-center"
                            >
                                <div className="inline-flex items-center justify-center w-16 h-16 bg-wine-gold/10 text-wine-gold rounded-2xl mb-6">
                                    <stat.icon className="w-8 h-8" />
                                </div>
                                <div className="text-4xl md:text-5xl font-black text-wine-dark dark:text-white mb-2 serif">
                                    {stat.value}
                                </div>
                                <div className="text-xs font-bold uppercase tracking-widest text-zinc-400">
                                    {stat.label}
                                </div>
                            </motion.div>
                        ))}
                    </div>
                </div>
            </section>

            {/* Values Section: Ценности компании (Сетка карточек) */}
            <section className="px-4 sm:px-6 lg:px-8 max-w-7xl mx-auto">
                <div className="text-center max-w-3xl mx-auto mb-16">
                    <h2 className="text-3xl md:text-5xl font-black text-wine-dark dark:text-white mb-6 serif">
                        {t("about_values_title")}
                    </h2>
                    <p className="text-zinc-600 dark:text-zinc-400">
                        {t("about_values_subtitle")}
                    </p>
                </div>
                <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
                    {[
                        { title: t("about_value_1_title"), desc: t("about_value_1_desc") },
                        { title: t("about_value_2_title"), desc: t("about_value_2_desc") },
                        { title: t("about_value_3_title"), desc: t("about_value_3_desc") },
                    ].map((item, idx) => (
                        <div key={idx} className="bg-zinc-50 dark:bg-zinc-900 rounded-[2rem] p-8 border border-zinc-100 dark:border-zinc-800">
                            <h3 className="text-xl font-bold text-wine-dark dark:text-white mb-4">{item.title}</h3>
                            <p className="text-zinc-600 dark:text-zinc-400 text-sm leading-relaxed">{item.desc}</p>
                        </div>
                    ))}
                </div>
            </section>

        </div>
    );
}
