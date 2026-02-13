"use client";

/**
 * Страница события "Weinproben" (Винные дегустации).
 * Представляет информацию о возможности заказа индивидуальных или групповых дегустаций.
 * 
 * Зависимости:
 * - Next.js (Link)
 * - lucide-react (Иконки)
 * - i18n (Локализация)
 * - Tailwind CSS (Стилизация, Mobile First)
 * 
 * Особенности:
 * - Адаптивный дизайн
 * - Интеграция i18n для всех текстов
 * - Акцент на визуальную составляющую и призыв к действию (запрос предложения)
 */

import React from 'react';
import Link from 'next/link';
import { useTranslation } from '@/lib/i18n';
import { ArrowLeft, Wine, Users, Clock, GlassWater, MessageCircle, MapPin, BadgeCheck, Utensils, Phone, Mail } from 'lucide-react';
import { CONTACT_PHONE, CONTACT_EMAIL } from "@/lib/constants/contact";

export default function WeinprobenPage() {
    const { t } = useTranslation();

    return (
        <div className="min-h-screen bg-white dark:bg-zinc-950 pt-32 pb-24">
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">

                {/* Навигация назад к списку событий */}
                <Link
                    href="/events"
                    className="inline-flex items-center text-zinc-500 hover:text-wine-gold transition-colors mb-8 md:mb-12 group"
                >
                    <ArrowLeft className="w-5 h-5 mr-4 group-hover:-translate-x-1 transition-transform" />
                    <span className="text-sm font-bold uppercase tracking-widest">{t("nav_events")}</span>
                </Link>

                {/* Hero секция */}
                <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 md:gap-16 mb-16">
                    {/* Левая колонка: Описание */}
                    <div className="flex flex-col justify-center">
                        <span className="text-wine-gold text-xs font-black uppercase tracking-[0.4em] mb-4 block">
                            {t("premium_event")}
                        </span>
                        <h1 className="text-4xl md:text-6xl font-black text-wine-dark dark:text-white mb-6 serif italic leading-tight">
                            {t("weinproben_title")}
                        </h1>
                        <p className="text-xl md:text-2xl text-zinc-600 dark:text-zinc-400 mb-8 leading-relaxed">
                            {t("weinproben_subtitle")}
                        </p>
                        <p className="text-base md:text-lg text-zinc-600 dark:text-zinc-400 mb-8 leading-relaxed">
                            {t("weinproben_description")}
                        </p>
                    </div>

                    {/* Правая колонка: Изображение */}
                    <div className="relative rounded-3xl overflow-hidden shadow-2xl group">
                        <div className="aspect-[4/3] bg-gradient-to-br from-wine-dark to-zinc-800 relative">
                            {/* Изображение бокалов или процесса дегустации */}
                            <img
                                src="https://images.unsplash.com/photo-1510812431401-41d2bd2722f3?q=80&w=800&auto=format&fit=crop"
                                alt="Weinproben"
                                className="w-full h-full object-cover opacity-90 group-hover:scale-105 transition-transform duration-700"
                            />
                            <div className="absolute inset-0 bg-gradient-to-t from-wine-dark/80 via-transparent to-transparent flex items-end p-8">
                                <h2 className="text-4xl md:text-5xl font-black text-white serif uppercase tracking-wider">
                                    Tasting
                                </h2>
                            </div>
                        </div>
                    </div>
                </div>

                {/* Highlights (Особенности) */}
                <div className="bg-zinc-50 dark:bg-zinc-900/50 rounded-3xl p-8 md:p-12 mb-16 border border-zinc-200 dark:border-zinc-800">
                    <h2 className="text-3xl md:text-4xl font-black text-wine-dark dark:text-white mb-8 serif italic">
                        {t("kellerblicke_what_included")}
                    </h2>

                    <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                        {/* Разнообразие вин */}
                        <div className="flex items-start gap-4 p-4 rounded-xl hover:bg-white dark:hover:bg-zinc-800 transition-colors">
                            <div className="w-12 h-12 bg-wine-gold/10 rounded-full flex items-center justify-center flex-shrink-0">
                                <GlassWater className="w-6 h-6 text-wine-gold" />
                            </div>
                            <div>
                                <h3 className="text-lg font-bold text-wine-dark dark:text-white mb-2">{t("weinproben_highlight_variety")}</h3>
                                <p className="text-sm text-zinc-600 dark:text-zinc-400">{t("weinproben_highlight_variety_desc")}</p>
                            </div>
                        </div>

                        {/* Экспертное руководство */}
                        <div className="flex items-start gap-4 p-4 rounded-xl hover:bg-white dark:hover:bg-zinc-800 transition-colors">
                            <div className="w-12 h-12 bg-wine-gold/10 rounded-full flex items-center justify-center flex-shrink-0">
                                <BadgeCheck className="w-6 h-6 text-wine-gold" />
                            </div>
                            <div>
                                <h3 className="text-lg font-bold text-wine-dark dark:text-white mb-2">{t("weinproben_highlight_expert")}</h3>
                                <p className="text-sm text-zinc-600 dark:text-zinc-400">{t("weinproben_highlight_expert_desc")}</p>
                            </div>
                        </div>

                        {/* Атмосфера */}
                        <div className="flex items-start gap-4 p-4 rounded-xl hover:bg-white dark:hover:bg-zinc-800 transition-colors">
                            <div className="w-12 h-12 bg-wine-gold/10 rounded-full flex items-center justify-center flex-shrink-0">
                                <MapPin className="w-6 h-6 text-wine-gold" />
                            </div>
                            <div>
                                <h3 className="text-lg font-bold text-wine-dark dark:text-white mb-2">{t("weinproben_highlight_atmosphere")}</h3>
                                <p className="text-sm text-zinc-600 dark:text-zinc-400">{t("weinproben_highlight_atmosphere_desc")}</p>
                            </div>
                        </div>

                        {/* Закуски */}
                        <div className="flex items-start gap-4 p-4 rounded-xl hover:bg-white dark:hover:bg-zinc-800 transition-colors">
                            <div className="w-12 h-12 bg-wine-gold/10 rounded-full flex items-center justify-center flex-shrink-0">
                                <Utensils className="w-6 h-6 text-wine-gold" />
                            </div>
                            <div>
                                <h3 className="text-lg font-bold text-wine-dark dark:text-white mb-2">{t("weinproben_highlight_snacks")}</h3>
                                <p className="text-sm text-zinc-600 dark:text-zinc-400">{t("weinproben_highlight_snacks_desc")}</p>
                            </div>
                        </div>
                    </div>
                </div>

                {/* Информация (Grid) */}
                <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-16">
                    {/* Цена */}
                    <div className="bg-zinc-50 dark:bg-zinc-900 rounded-2xl p-6 md:p-8 border border-zinc-200 dark:border-zinc-800">
                        <div className="flex items-center gap-4 mb-4">
                            <Wine className="w-6 h-6 text-wine-gold" />
                            <h3 className="text-lg font-bold text-wine-dark dark:text-white">{t("weinproben_price_label")}</h3>
                        </div>
                        <p className="text-2xl font-black text-wine-dark dark:text-white mb-2">
                            {t("weinproben_price_value")}
                        </p>
                    </div>

                    {/* Дauer */}
                    <div className="bg-zinc-50 dark:bg-zinc-900 rounded-2xl p-6 md:p-8 border border-zinc-200 dark:border-zinc-800">
                        <div className="flex items-center gap-4 mb-4">
                            <Clock className="w-6 h-6 text-wine-gold" />
                            <h3 className="text-lg font-bold text-wine-dark dark:text-white">{t("weinproben_duration_label")}</h3>
                        </div>
                        <p className="text-base font-medium text-zinc-600 dark:text-zinc-300">
                            {t("weinproben_duration_value")}
                        </p>
                    </div>

                    {/* Размер группы */}
                    <div className="bg-zinc-50 dark:bg-zinc-900 rounded-2xl p-6 md:p-8 border border-zinc-200 dark:border-zinc-800">
                        <div className="flex items-center gap-4 mb-4">
                            <Users className="w-6 h-6 text-wine-gold" />
                            <h3 className="text-lg font-bold text-wine-dark dark:text-white">{t("weinproben_group_size_label")}</h3>
                        </div>
                        <p className="text-base font-medium text-zinc-600 dark:text-zinc-300">
                            {t("weinproben_group_size_value")}
                        </p>
                    </div>
                </div>


                {/* Контакты / CTA */}
                <div className="bg-wine-dark rounded-3xl p-8 md:p-12 text-white">
                    <div className="max-w-3xl mx-auto text-center">
                        <h2 className="text-3xl md:text-4xl font-black mb-6 serif italic">
                            {t("weinproben_contact_text")}
                        </h2>

                        <div className="flex flex-col md:flex-row items-center justify-center gap-6 mt-8">
                            <Link
                                href={`mailto:${CONTACT_EMAIL}`}
                                className="inline-flex items-center justify-center px-8 py-4 bg-wine-gold hover:bg-white text-wine-dark font-bold rounded-full transition-all duration-300 transform hover:scale-105 shadow-xl shadow-wine-gold/20"
                            >
                                <MessageCircle className="w-5 h-5 mr-2" />
                                {t("weinproben_book_button")}
                            </Link>

                            {/* Доп. контакты */}
                            <div className="flex items-center gap-4 mt-4 md:mt-0 text-zinc-300">
                                <a href={`tel:${CONTACT_PHONE.replace(/\s/g, "")}`} className="flex items-center gap-2 hover:text-white transition-colors">
                                    <Phone className="w-4 h-4" />
                                    {CONTACT_PHONE}
                                </a>
                            </div>
                        </div>
                    </div>
                </div>

            </div>
        </div>
    );
}