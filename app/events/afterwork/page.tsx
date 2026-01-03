"use client";

/**
 * Страница события "Afterwork" (Вечерние встречи по четвергам).
 * Отображает информацию о ежемесячных встречах с дегустацией вин.
 * Содержит расписание тем на 2026 год.
 * 
 * Зависимости:
 * - Next.js (Link)
 * - lucide-react (Иконки)
 * - i18n (Локализация)
 * - Tailwind CSS (Стилизация, Mobile First)
 * 
 * Особенности:
 * - Список расписания (Grid/Table)
 * - Ссылка на Instagram
 * - Информационные карточки с ценами
 */

import React from 'react';
import Link from 'next/link';
import { useTranslation } from '@/lib/i18n';
import { ArrowLeft, Clock, MapPin, Instagram, PartyPopper, CalendarDays, Wine, Coffee } from 'lucide-react';

export default function AfterworkPage() {
    const { t } = useTranslation();

    // Расписание событий (статические данные, ключи для перевода тем)
    const schedule = [
        { date: "05.02.2026", theme: "theme_fasching" },
        { date: "05.03.2026", theme: "theme_pinot" },
        { date: "02.04.2026", theme: "theme_jungwein" },
        { date: "07.05.2026", theme: "theme_cuvee" },
        { date: "11.06.2026", theme: "theme_rose" },
        { date: "", theme: "theme_summer_break", isBreak: true }, // Летняя пауза
        { date: "01.10.2026", theme: "theme_autumn" },
        { date: "05.11.2026", theme: "theme_deluxe" },
        { date: "03.12.2026", theme: "theme_boss" },
    ];

    return (
        <div className="min-h-screen bg-white dark:bg-zinc-950 pt-32 pb-24">
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">

                {/* Навигация назад */}
                <Link
                    href="/events"
                    className="inline-flex items-center text-zinc-500 hover:text-wine-gold transition-colors mb-8 md:mb-12 group"
                >
                    <ArrowLeft className="w-5 h-5 mr-4 group-hover:-translate-x-1 transition-transform" />
                    <span className="text-sm font-bold uppercase tracking-widest">{t("nav_events")}</span>
                </Link>

                {/* Hero секция */}
                <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 md:gap-16 mb-16">
                    {/* Текст */}
                    <div className="flex flex-col justify-center">
                        <span className="text-wine-gold text-xs font-black uppercase tracking-[0.4em] mb-4 block">
                            {t("premium_event")}
                        </span>
                        <h1 className="text-4xl md:text-6xl font-black text-wine-dark dark:text-white mb-6 serif italic leading-tight">
                            {t("afterwork_title")}
                        </h1>
                        <p className="text-xl md:text-2xl text-zinc-600 dark:text-zinc-400 mb-8 leading-relaxed">
                            {t("afterwork_subtitle")}
                        </p>
                        <p className="text-base md:text-lg text-zinc-600 dark:text-zinc-400 mb-8 leading-relaxed">
                            {t("afterwork_description")}
                        </p>

                        {/* Инстаграм ссылка */}
                        <div className="flex items-center gap-2 p-4 bg-zinc-50 dark:bg-zinc-900 rounded-xl border border-zinc-200 dark:border-zinc-800">
                            <Instagram className="w-6 h-6 text-[#E1306C]" /> {/* Instagram brand color */}
                            <p className="text-sm text-zinc-600 dark:text-zinc-400">
                                {t("afterwork_food_note")} <a href="https://instagram.com/fellbacher.weingaertner" target="_blank" rel="noopener noreferrer" className="font-bold text-wine-dark dark:text-white hover:text-wine-gold underline decoration-wine-gold/30 hover:decoration-wine-gold transition-all">@fellbacher.weingaertner</a>
                            </p>
                        </div>
                    </div>

                    {/* Изображение */}
                    <div className="relative rounded-3xl overflow-hidden shadow-2xl group">
                        <div className="aspect-[4/3] bg-gradient-to-br from-wine-dark to-zinc-800 relative">
                            {/* Фото вечеринки */}
                            <img
                                src="https://images.unsplash.com/photo-1559339352-11d035aa65de?q=80&w=800&auto=format&fit=crop"
                                alt="Afterwork"
                                className="w-full h-full object-cover opacity-90 group-hover:scale-105 transition-transform duration-700"
                            />
                            <div className="absolute inset-0 bg-gradient-to-t from-wine-dark/80 via-transparent to-transparent flex items-end p-8">
                                <h2 className="text-4xl md:text-5xl font-black text-white serif uppercase tracking-wider">
                                    Thursdays
                                </h2>
                            </div>
                        </div>
                    </div>
                </div>

                {/* Цены и условия (Grid) */}
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-16">
                    {/* Время */}
                    <div className="bg-zinc-50 dark:bg-zinc-900 rounded-2xl p-6 border border-zinc-200 dark:border-zinc-800">
                        <Clock className="w-8 h-8 text-wine-gold mb-4" />
                        <h3 className="text-lg font-bold text-wine-dark dark:text-white mb-1">{t("afterwork_time")}</h3>
                        <p className="text-sm text-zinc-500 dark:text-zinc-400">Jeden 1. Donnerstag</p>
                    </div>

                    {/* Локация */}
                    <div className="bg-zinc-50 dark:bg-zinc-900 rounded-2xl p-6 border border-zinc-200 dark:border-zinc-800">
                        <MapPin className="w-8 h-8 text-wine-gold mb-4" />
                        <h3 className="text-lg font-bold text-wine-dark dark:text-white mb-1">{t("weinfeste_location_label")}</h3>
                        <p className="text-sm text-zinc-500 dark:text-zinc-400">{t("afterwork_location")}</p>
                    </div>

                    {/* Цена стандарт */}
                    <div className="bg-zinc-50 dark:bg-zinc-900 rounded-2xl p-6 border border-zinc-200 dark:border-zinc-800 relative overflow-hidden group">
                        <div className="absolute top-0 right-0 w-16 h-16 bg-wine-gold/10 rounded-bl-full -mr-8 -mt-8 transition-transform group-hover:scale-150"></div>
                        <Wine className="w-8 h-8 text-wine-gold mb-4 relative z-10" />
                        <h3 className="text-lg font-bold text-wine-dark dark:text-white mb-1">{t("afterwork_price_full")}</h3>
                        <p className="text-sm text-zinc-500 dark:text-zinc-400">{t("afterwork_price_full_desc")}</p>
                    </div>

                    {/* Цена лайт */}
                    <div className="bg-zinc-50 dark:bg-zinc-900 rounded-2xl p-6 border border-zinc-200 dark:border-zinc-800">
                        <Coffee className="w-8 h-8 text-zinc-400 mb-4" />
                        <h3 className="text-lg font-bold text-wine-dark dark:text-white mb-1">{t("afterwork_price_lite")}</h3>
                        <p className="text-sm text-zinc-500 dark:text-zinc-400">{t("afterwork_price_lite_desc")}</p>
                    </div>
                </div>

                {/* Расписание (Schedule) */}
                <div className="bg-wine-dark rounded-3xl p-8 md:p-12 text-white">
                    <div className="flex items-center gap-4 mb-8">
                        <CalendarDays className="w-8 h-8 text-wine-gold" />
                        <h2 className="text-3xl md:text-4xl font-black serif italic">
                            {t("afterwork_schedule_title")}
                        </h2>
                    </div>

                    <div className="grid grid-cols-1 gap-4">
                        {schedule.map((item, index) => (
                            <div
                                key={index}
                                className={`flex flex-col md:flex-row md:items-center justify-between p-4 rounded-xl transition-all ${item.isBreak
                                        ? "bg-white/10 border-l-4 border-zinc-500"
                                        : "bg-white/5 hover:bg-white/10 border-l-4 border-wine-gold"
                                    }`}
                            >
                                <div className="flex items-center gap-4 mb-2 md:mb-0 w-full md:w-1/3">
                                    {item.date && (
                                        <span className="font-mono text-wine-gold font-bold text-lg">{item.date}</span>
                                    )}
                                </div>
                                <div className="flex items-center gap-2 w-full md:w-2/3">
                                    {item.isBreak && <PartyPopper className="w-5 h-5 text-zinc-400" />}
                                    <span className={`text-lg ${item.isBreak ? "text-zinc-400 italic" : "font-bold"}`}>
                                        {t(item.theme)}
                                    </span>
                                </div>
                            </div>
                        ))}
                    </div>

                    <div className="mt-8 pt-8 border-t border-white/10 text-center">
                        <p className="text-zinc-400 mb-2">
                            {t("afterwork_no_registration")}
                        </p>
                        <p className="font-bold text-white text-lg">
                            Wir freuen uns auf Sie!
                        </p>
                    </div>
                </div>

            </div>
        </div>
    );
}