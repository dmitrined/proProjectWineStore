/**
 * НАЗНАЧЕНИЕ: Главная страница приложения (Home Page).
 * ЗАВИСИМОСТИ: WineCard, useWinesStore, useAuth, i18n, Lucide Icons, events data.
 * ОСОБЕННОСТИ: Клиентский компонент, Hero-секция, подборки событий, преимущества компании.
 */

"use client";

import Link from 'next/link';
import { ArrowRight, ShieldCheck, Truck, Award, Calendar, Clock, MapPin, Users, Star, Sparkles } from 'lucide-react';
import { useTranslation } from '@/lib/i18n';
import { useAuth } from '@/lib/contexts/AuthContext';
import { useRouter } from 'next/navigation';
import { getEvents } from '@/lib/data/events';
import React from 'react';

/**
 * Главная страница с Hero-секцией, событиями и преимуществами.
 */
export default function Home() {
  const { t } = useTranslation();
  const { isLoggedIn, setAuthModalOpen } = useAuth();
  const router = useRouter();
  const events = getEvents(t);


  return (
    <div className="flex flex-col min-h-screen bg-white dark:bg-zinc-950">
      {/* Hero Section: Главный экран с фоновым изображением и приветствием */}
      <section className="relative h-screen flex items-center overflow-hidden">
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_top_right,_var(--tw-gradient-stops))] from-wine-gold/10 via-transparent to-transparent opacity-50" />
        <div className="absolute top-0 left-0 w-full h-full bg-[url('https://fellbacher-weine.de/wp-content/uploads/2023/12/Banner-Weihnachten-scaled.jpg')] bg-cover bg-center grayscale-[0.2] brightness-[0.4] scale-105" />

        <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 z-10">
          <div className="max-w-3xl">
            <h1 className="text-5xl md:text-8xl font-black text-white mb-6 leading-tight serif">
              {t("hero_title_1")} <br />
              <span className="text-wine-gold">{t("hero_title_2")}</span>
            </h1>
            <p className="text-lg md:text-xl text-zinc-300 mb-10 leading-relaxed max-w-xl">
              {t("hero_subtitle")}
            </p>
            <div className="flex flex-col sm:flex-row gap-4">
              <Link
                href="/shop"
                className="inline-flex items-center justify-center px-8 py-4 bg-wine-gold hover:bg-white text-wine-dark font-bold rounded-full transition-all duration-300 transform hover:scale-105 shadow-xl shadow-wine-gold/20 group text-sm md:text-base"
              >
                {t("hero_cta")}
                <ArrowRight className="ml-2 w-5 h-5 group-hover:translate-x-1 transition-transform" />
              </Link>
            </div>
          </div>
        </div>
      </section>

      {/* Events Section */}
      <section className="py-16 md:py-24 bg-zinc-50 dark:bg-zinc-900/50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="max-w-3xl mb-12">
            <span className="text-wine-gold text-xs font-black uppercase tracking-[0.4em] mb-4 block">
              {t("discover_and_experience")}
            </span>
            <h2 className="text-4xl md:text-6xl font-black text-wine-dark dark:text-white mb-6 serif leading-tight">
              {t("events_title")}
            </h2>
            <p className="text-xl text-zinc-500 dark:text-zinc-400 font-medium">
              {t("events_subtitle")}
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 md:gap-12">
            {events.map((event, idx) => (
              <div key={event.id} className="group relative flex flex-col bg-white dark:bg-zinc-900 rounded-[2.5rem] overflow-hidden border border-zinc-100 dark:border-zinc-800 hover:shadow-2xl transition-all duration-500 hover:-translate-y-2">
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

                  <h3 className="text-2xl font-bold dark:text-white mb-6 serif leading-tight group-hover:text-wine-gold transition-colors">
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
                    ) : event.category === 'Kellerblicke' ? (
                      <Link
                        href="/events/kellerblicke"
                        className="group/btn relative w-full inline-flex items-center justify-center py-5 bg-wine-dark hover:bg-wine-gold text-white hover:text-wine-dark rounded-2xl text-sm font-black uppercase tracking-widest transition-all duration-300 overflow-hidden"
                      >
                        <span className="relative z-10">{t("more_info")}</span>
                        <ArrowRight className="w-5 h-5 ml-3 relative z-10 transform group-hover/btn:translate-x-2 transition-transform" />
                      </Link>
                    ) : event.category === 'Weinfest' ? (
                      <Link
                        href="/events/weinfeste"
                        className="group/btn relative w-full inline-flex items-center justify-center py-5 bg-wine-dark hover:bg-wine-gold text-white hover:text-wine-dark rounded-2xl text-sm font-black uppercase tracking-widest transition-all duration-300 overflow-hidden"
                      >
                        <span className="relative z-10">{t("more_info")}</span>
                        <ArrowRight className="w-5 h-5 ml-3 relative z-10 transform group-hover/btn:translate-x-2 transition-transform" />
                      </Link>
                    ) : event.category === 'Weinprobe' ? (
                      <Link
                        href="/events/weinproben"
                        className="group/btn relative w-full inline-flex items-center justify-center py-5 bg-wine-dark hover:bg-wine-gold text-white hover:text-wine-dark rounded-2xl text-sm font-black uppercase tracking-widest transition-all duration-300 overflow-hidden"
                      >
                        <span className="relative z-10">{t("more_info")}</span>
                        <ArrowRight className="w-5 h-5 ml-3 relative z-10 transform group-hover/btn:translate-x-2 transition-transform" />
                      </Link>
                    ) : event.category === 'Weintreff' ? (
                      <Link
                        href="/events/weintreff"
                        className="group/btn relative w-full inline-flex items-center justify-center py-5 bg-wine-dark hover:bg-wine-gold text-white hover:text-wine-dark rounded-2xl text-sm font-black uppercase tracking-widest transition-all duration-300 overflow-hidden"
                      >
                        <span className="relative z-10">{t("more_info")}</span>
                        <ArrowRight className="w-5 h-5 ml-3 relative z-10 transform group-hover/btn:translate-x-2 transition-transform" />
                      </Link>
                    ) : event.category === 'Afterwork' ? (
                      <Link
                        href="/events/afterwork"
                        className="group/btn relative w-full inline-flex items-center justify-center py-5 bg-wine-dark hover:bg-wine-gold text-white hover:text-wine-dark rounded-2xl text-sm font-black uppercase tracking-widest transition-all duration-300 overflow-hidden"
                      >
                        <span className="relative z-10">{t("more_info")}</span>
                        <ArrowRight className="w-5 h-5 ml-3 relative z-10 transform group-hover/btn:translate-x-2 transition-transform" />
                      </Link>
                    ) : event.category === 'Weinwanderung' ? ( // Assuming isWeinWeiter corresponds to Weinwanderung or similar, let's check mapping. 'WeinWeiter' is slug 'weiter'. Category 'Weinwanderung'.
                      <Link
                        href="/events/weinweiter"
                        className="group/btn relative w-full inline-flex items-center justify-center py-5 bg-wine-dark hover:bg-wine-gold text-white hover:text-wine-dark rounded-2xl text-sm font-black uppercase tracking-widest transition-all duration-300 overflow-hidden"
                      >
                        <span className="relative z-10">{t("more_info")}</span>
                        <ArrowRight className="w-5 h-5 ml-3 relative z-10 transform group-hover/btn:translate-x-2 transition-transform" />
                      </Link>
                    ) : event.category === 'Sonstiges' && event.slug.includes('raetsel') ? ( // isWeinRaetselTour. Category might be Sonstiges or special. I need to be careful with 'isWeinRaetselTour'.
                      // Let's assume for now I map it to 'Sonstiges' but I don't have a specific category for RaetselTour in my type.
                      // Looking at my Event type: 'Weinfest' | 'Weinprobe' | 'Kellerblicke' | 'Weintreff' | 'Afterwork' | 'Weinwanderung' | 'Sonstiges'.
                      // The original code handled isWeinRaetselTour.
                      // I'll check my generated data if I included this tour. I included only 4 events. 
                      // The loop iterates over `events` from `getEvents(t)`.
                      // `getEvents` was importing from `lib/data/events`.
                      // So if I didn't add RaetselTour to events.json, this branch won't be hit anyway.
                      // But the code exists in page.tsx. I should probably just leave the logic IF I can match a category.
                      // If I don't have RaetselTour in my new data, I can remove this branch or map it to 'Sonstiges'.
                      // I'll map it to 'Sonstiges' for now or just remove the specific Link if it's not in my data.
                      // However, TS checks the code. So `event.isWeinRaetselTour` doesn't exist.
                      // I will remove this specific check or use category check if I had it.
                      // Since I don't have it in my data, I'll remove it.
                      // Logic for WeinWeiter -> I mapped to 'Weinwanderung' locally in my thought, but let's check.
                      // I used `category: 'Weinfest' | ...`.
                      // I'll use `category === 'Weinwanderung'` for `isWeinWeiter`.

                      <Link
                        href="/events/weinraetseltour"
                        className="group/btn relative w-full inline-flex items-center justify-center py-5 bg-wine-dark hover:bg-wine-gold text-white hover:text-wine-dark rounded-2xl text-sm font-black uppercase tracking-widest transition-all duration-300 overflow-hidden"
                      >
                        <span className="relative z-10">{t("more_info")}</span>
                        <ArrowRight className="w-5 h-5 ml-3 relative z-10 transform group-hover/btn:translate-x-2 transition-transform" />
                      </Link>
                    ) : (
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
                      </button >
                    )}
                  </div >
                </div >
              </div >
            ))}
          </div >
        </div >
      </section >

      {/* AI Sommelier Teaser */}
      <section className="py-24 bg-zinc-900 relative overflow-hidden">
        <div className="absolute top-0 left-0 w-full h-full bg-[url('https://avatars.mds.yandex.net/i?id=fa5c24669828c413e6eb063898e39d5908088098-5866055-images-thumbs&n=13')] bg-cover bg-center grayscale-[0.2] brightness-[0.4] scale-105" />

        <div className="absolute inset-0 bg-gradient-to-br from-wine-gold/20 via-transparent to-purple-900/20" />
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10 text-center">

          <div className="inline-flex items-center justify-center p-4 bg-white/10 rounded-2xl mb-8 backdrop-blur-sm">
            <Sparkles className="w-8 h-8 text-wine-gold" />
          </div>
          <h2 className="text-4xl md:text-5xl font-black text-white mb-6 serif">
            {t("ai_title")}
          </h2>
          <p className="text-xl text-zinc-300 mb-10 max-w-2xl mx-auto leading-relaxed">
            {t("ai_home_description")}
          </p>
          <Link
            href="/ai-sommelier"
            className="inline-flex items-center px-8 py-4 bg-white text-wine-dark font-bold rounded-xl hover:bg-wine-gold hover:text-white transition-all duration-300"
          >
            {t("ai_home_cta")}
            <ArrowRight className="ml-2 w-5 h-5" />
          </Link>
        </div>
      </section>

      {/* Features Grid: Ключевые преимущества (Качество, Отбор, Доставка) */}
      <section className="py-16 md:py-24 border-t border-zinc-100 dark:border-zinc-800">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8 md:gap-12">
            <div className="flex flex-col items-center text-center p-6 md:p-8 bg-zinc-50 dark:bg-zinc-900 rounded-3xl transition-transform hover:-translate-y-2">
              <div className="w-16 h-16 bg-wine-gold/10 rounded-2xl flex items-center justify-center mb-6">
                <Award className="w-8 h-8 text-wine-gold" />
              </div>
              <h3 className="text-xl font-bold mb-3 dark:text-white serif">{t("feature_quality_title")}</h3>
              <p className="text-zinc-500 dark:text-zinc-400">{t("feature_quality_desc")}</p>
            </div>
            <div className="flex flex-col items-center text-center p-6 md:p-8 bg-zinc-50 dark:bg-zinc-900 rounded-3xl transition-transform hover:-translate-y-2">
              <div className="w-16 h-16 bg-wine-gold/10 rounded-2xl flex items-center justify-center mb-6">
                <ShieldCheck className="w-8 h-8 text-wine-gold" />
              </div>
              <h3 className="text-xl font-bold mb-3 dark:text-white serif">{t("feature_curation_title")}</h3>
              <p className="text-zinc-500 dark:text-zinc-400">{t("feature_curation_desc")}</p>
            </div>
            <div className="flex flex-col items-center text-center p-6 md:p-8 bg-zinc-50 dark:bg-zinc-900 rounded-3xl transition-transform hover:-translate-y-2">
              <div className="w-16 h-16 bg-wine-gold/10 rounded-2xl flex items-center justify-center mb-6">
                <Truck className="w-8 h-8 text-wine-gold" />
              </div>
              <h3 className="text-xl font-bold mb-3 dark:text-white serif">{t("feature_delivery_title")}</h3>
              <p className="text-zinc-500 dark:text-zinc-400">{t("feature_delivery_desc")}</p>
            </div>
          </div>
        </div>
      </section >
    </div >
  );
}
