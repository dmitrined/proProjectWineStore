/**
 * Назначение файла: Страница мероприятий (Events).
 * Зависимости: Lucide React, i18n Context, Auth Context, getEvents data.
 * Особенности: Client Component, Скелетоны при загрузке.
 */

"use client";

import React, { useState, useEffect } from 'react';
import { useTranslation } from '@/lib/i18n';
import { Calendar, MapPin, Users, ArrowRight, Clock, Star } from 'lucide-react';
import Link from 'next/link';
import { useAuth } from '@/lib/contexts/AuthContext';
import { useRouter } from 'next/navigation';

import { getEvents } from '@/lib/data/events';
import EventCardSkeleton from '@/components/ui/Skeletons/EventCardSkeleton';

export default function EventsPage() {
    const { t } = useTranslation();
    const { isLoggedIn, setAuthModalOpen } = useAuth();
    const [isLoading, setIsLoading] = useState(true);
    const router = useRouter();

    const events = getEvents(t);

    // Симуляция загрузки для отображения скелетонов (улучшает UX и подчеркивает систему скелетонов)
    useEffect(() => {
        const timer = setTimeout(() => setIsLoading(false), 1000);
        return () => clearTimeout(timer);
    }, []);

    return (
        <div className="min-h-screen bg-white dark:bg-zinc-950 pt-32 pb-24">
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                {/* Header */}
                <div className="max-w-3xl mb-16 md:mb-24">
                    <span className="text-wine-gold text-xs font-black uppercase tracking-[0.4em] mb-4 block animate-in fade-in slide-in-from-bottom-2 duration-700">
                        {t("discover_and_experience")}
                    </span>
                    <h1 className="text-5xl md:text-8xl font-black text-wine-dark dark:text-white mb-6 serif leading-tight tracking-tighter animate-in fade-in slide-in-from-bottom-4 duration-700 delay-100">
                        {t("events_title")}
                    </h1>
                    <p className="text-xl md:text-2xl text-zinc-500 dark:text-zinc-400 font-medium tracking-tight animate-in fade-in slide-in-from-bottom-6 duration-700 delay-200">
                        {t("events_subtitle")}
                    </p>
                </div>

                {/* Сетка событий: Адаптивная (1 -> 2 -> 3 колонки) */}
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 md:gap-12">
                    {isLoading ? (
                        [...Array(6)].map((_, i) => <EventCardSkeleton key={i} />)
                    ) : (
                        events.map((event, idx) => (

                            <div key={event.id} className="group relative flex flex-col bg-zinc-50 dark:bg-zinc-900 rounded-[2.5rem] overflow-hidden border border-zinc-100 dark:border-zinc-800 hover:shadow-2xl transition-all duration-500 hover:-translate-y-2">
                                {/* Image Container */}
                                <div className="relative h-72 overflow-hidden">
                                    <img
                                        src={event.image}
                                        alt={event.title}
                                        className="w-full h-full object-cover transform group-hover:scale-110 transition-transform duration-700"
                                    />
                                    <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
                                    <div className="absolute top-6 left-6">
                                        <span className="bg-white/90 dark:bg-zinc-950/90 backdrop-blur px-4 py-2 rounded-xl text-[10px] font-black uppercase tracking-widest text-wine-dark dark:text-wine-gold shadow-lg">
                                            {event.category}
                                        </span>
                                    </div>
                                    <div className="absolute bottom-6 left-6 right-6 flex items-end justify-between text-white transform translate-y-4 opacity-0 group-hover:translate-y-0 group-hover:opacity-100 transition-all duration-500">
                                        <div className="flex items-center gap-2">
                                            <Star className="w-4 h-4 fill-wine-gold text-wine-gold" />
                                            <span className="text-sm font-bold">{t("premium_event")}</span>
                                        </div>
                                        <span className="text-2xl font-black serif italic">{event.price}</span>
                                    </div>
                                </div>

                                {/* Content */}
                                <div className="p-8 md:p-10 flex flex-col flex-grow">
                                    <div className="flex items-center gap-4 mb-6 text-zinc-400 dark:text-zinc-500">
                                        <div className="flex items-center gap-2">
                                            <Calendar className="w-4 h-4" />
                                            <span className="text-xs font-bold uppercase tracking-widest">{event.date}</span>
                                        </div>
                                        <div className="w-1 h-1 bg-zinc-200 dark:bg-zinc-800 rounded-full" />
                                        <div className="flex items-center gap-2">
                                            <Clock className="w-4 h-4" />
                                            <span className="text-xs font-bold uppercase tracking-widest">{event.time}</span>
                                        </div>
                                    </div>

                                    <h3 className="text-2xl md:text-3xl font-bold dark:text-white mb-6 serif leading-tight group-hover:text-wine-gold transition-colors">
                                        {event.title}
                                    </h3>

                                    <div className="space-y-4 mb-10 text-sm font-medium text-zinc-500 dark:text-zinc-400">
                                        <div className="flex items-center gap-3">
                                            <MapPin className="w-5 h-5 text-wine-gold" />
                                            <span>{event.location}</span>
                                        </div>
                                        <div className="flex items-center gap-3">
                                            <Users className="w-5 h-5 text-wine-gold" />
                                            <span className={(event.isFull || event.spots === 0) ? "text-red-500 font-bold" : ""}>
                                                {(event.isFull || event.spots === 0) ? t("fully_booked") : event.spots}
                                            </span>
                                        </div>
                                    </div>

                                    <div className="mt-auto">
                                        {(event.isFull || event.spots === 0) ? (
                                            <button disabled className="w-full py-5 bg-zinc-100 dark:bg-zinc-800 text-zinc-400 rounded-2xl text-sm font-black uppercase tracking-widest cursor-not-allowed">
                                                {t("fully_booked")}
                                            </button>
                                        ) : event.category === 'Weinfest' ? (
                                            // Логика для Weinfeste - переход на отдельную страницу
                                            <Link
                                                href="/events/weinfeste"
                                                className="group/btn relative w-full inline-flex items-center justify-center py-5 bg-wine-dark hover:bg-wine-gold text-white hover:text-wine-dark rounded-2xl text-sm font-black uppercase tracking-widest transition-all duration-300 overflow-hidden"
                                            >
                                                <span className="relative z-10">{t("more_info")}</span>
                                                <ArrowRight className="w-5 h-5 ml-3 relative z-10 transform group-hover/btn:translate-x-2 transition-transform" />
                                            </Link>
                                        ) : event.category === 'Weinprobe' ? (
                                            // Логика для Weinproben - переход на отдельную страницу
                                            <Link
                                                href="/events/weinproben"
                                                className="group/btn relative w-full inline-flex items-center justify-center py-5 bg-wine-dark hover:bg-wine-gold text-white hover:text-wine-dark rounded-2xl text-sm font-black uppercase tracking-widest transition-all duration-300 overflow-hidden"
                                            >
                                                <span className="relative z-10">{t("more_info")}</span>
                                                <ArrowRight className="w-5 h-5 ml-3 relative z-10 transform group-hover/btn:translate-x-2 transition-transform" />
                                            </Link>
                                        ) : event.category === 'Afterwork' ? (
                                            // Логика для Afterwork - переход на отдельную страницу
                                            <Link
                                                href="/events/afterwork"
                                                className="group/btn relative w-full inline-flex items-center justify-center py-5 bg-wine-dark hover:bg-wine-gold text-white hover:text-wine-dark rounded-2xl text-sm font-black uppercase tracking-widest transition-all duration-300 overflow-hidden"
                                            >
                                                <span className="relative z-10">{t("more_info")}</span>
                                                <ArrowRight className="w-5 h-5 ml-3 relative z-10 transform group-hover/btn:translate-x-2 transition-transform" />
                                            </Link>

                                        ) : (
                                            // Стандартная логика: кнопка бронирования.
                                            // Если пользователь не авторизован, открываем модалку входа.
                                            <button
                                                onClick={() => {
                                                    if (isLoggedIn) {
                                                        router.push(`/events/${event.id}/book`);
                                                    } else {
                                                        setAuthModalOpen(true);
                                                    }
                                                }}
                                                className="group/btn relative w-full inline-flex items-center justify-center py-5 bg-wine-dark hover:bg-wine-gold text-white hover:text-wine-dark rounded-2xl text-sm font-black uppercase tracking-widest transition-all duration-300 overflow-hidden"
                                            >
                                                <span className="relative z-10">{t("events_register")}</span>
                                                <ArrowRight className="w-5 h-5 ml-3 relative z-10 transform group-hover/btn:translate-x-2 transition-transform" />
                                            </button>
                                        )}
                                    </div>
                                </div>
                            </div>
                        ))
                    )}
                </div>


                {/* Информационная секция о частных мероприятиях */}
                <div className="mt-24 md:mt-32 p-10 md:p-16 bg-zinc-900 rounded-[3rem] text-white relative overflow-hidden">
                    <div className="relative z-10 flex flex-col lg:flex-row items-center justify-between gap-12">
                        <div className="max-w-xl">
                            <h2 className="text-3xl md:text-5xl font-bold mb-6 serif italic tracking-tight">{t("private_events_title")}</h2>
                            <p className="text-lg text-zinc-400 mb-8 leading-relaxed">
                                {t("private_events_desc")}
                            </p><button className="px-10 py-5 bg-wine-gold text-wine-dark rounded-2xl text-sm font-black uppercase tracking-widest hover:bg-white transition-all transform hover:scale-105">
                                {t("request_quote")}
                            </button>
                        </div>
                        <div className="grid grid-cols-2 gap-4">
                            <div className="p-6 bg-white/5 backdrop-blur rounded-3xl text-center">
                                <span className="text-4xl font-black serif italic text-wine-gold mb-2 block">120+</span>
                                <span className="text-[10px] uppercase font-bold tracking-widest text-zinc-500">{t("events_per_year")}</span>
                            </div>
                            <div className="p-6 bg-white/5 backdrop-blur rounded-3xl text-center">
                                <span className="text-4xl font-black serif italic text-wine-gold mb-2 block">100%</span>
                                <span className="text-[10px] uppercase font-bold tracking-widest text-zinc-500">{t("passion")}</span>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}