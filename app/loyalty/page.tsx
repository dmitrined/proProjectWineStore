/**
 * Назначение файла: Страница программы лояльности (Loyalty Program).
 * Зависимости: i18n, Lucide Icons.
 * Особенности: Client Component, отображение баланса баллов, истории активности, доступных наград.
 */

"use client";

import React from 'react';
import { useTranslation } from '@/lib/i18n';
import { QrCode, Gift, Star, ChevronRight, Award, History, Info } from 'lucide-react';

export default function LoyaltyPage() {
    const { t } = useTranslation();

    const rewards = [
        { id: 1, title: "10% Rabatt Gutschein", points: 250, description: "Gültig für Ihren nächsten Einkauf ab 50€." },
        { id: 2, title: "Exklusive Weinprobe", points: 750, description: "Einladung für 2 Personen zur monatlichen Keller-Verkostung." },
        { id: 3, title: "Flasche Edition 'L'", points: 1500, description: "Eine limitierte Magnumflasche aus unserem Privatkeller." },
    ];

    return (
        <div className="min-h-screen bg-zinc-50 dark:bg-zinc-950 pt-32 pb-24">
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                {/* Header */}
                <div className="mb-12">
                    <h1 className="text-4xl md:text-6xl font-black text-wine-dark dark:text-white mb-4 serif leading-tight">
                        {t("loyalty_title")}
                    </h1>
                    <p className="text-xl text-zinc-500 dark:text-zinc-400 max-w-2xl font-medium tracking-tight">
                        {t("loyalty_subtitle")}
                    </p>
                </div>

                <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
                    {/* Points Balance Card */}
                    <div className="lg:col-span-2 space-y-8">
                        <div className="bg-wine-dark rounded-[2.5rem] p-8 md:p-12 text-white relative overflow-hidden shadow-2xl shadow-wine-dark/20">
                            <div className="relative z-10">
                                <span className="text-wine-gold text-xs font-black uppercase tracking-[0.3em] mb-4 block">
                                    {t("loyalty_tier_silver")}
                                </span>
                                <h2 className="text-sm font-bold opacity-60 uppercase tracking-widest mb-2">
                                    {t("loyalty_points_balance")}
                                </h2>
                                <div className="flex items-end gap-3 mb-8">
                                    <span className="text-7xl md:text-8xl font-black serif italic leading-none">450</span>
                                    <span className="text-2xl font-bold mb-2">PTS</span>
                                </div>

                                <div className="space-y-4">
                                    <div className="flex justify-between items-end text-xs font-bold uppercase tracking-widest">
                                        <span>750 PTS {t("loyalty_tier_gold")}</span>
                                        <span className="opacity-60">{t("pts_until_goal", { points: 300 })}</span>
                                    </div>
                                    <div className="h-3 bg-white/10 rounded-full overflow-hidden">
                                        <div className="h-full bg-wine-gold w-[60%] rounded-full shadow-[0_0_15px_rgba(234,179,8,0.5)]" />
                                    </div>
                                </div>
                            </div>
                            {/* Decorative Background Icon */}
                            <Star className="absolute -right-12 -bottom-12 w-64 h-64 text-white/5 rotate-12" />
                        </div>

                        {/* Recent History / Stats */}
                        <div className="bg-white dark:bg-zinc-900 rounded-[2rem] p-8 border border-zinc-100 dark:border-zinc-800 shadow-xl shadow-zinc-200/50 dark:shadow-none">
                            <div className="flex items-center justify-between mb-8">
                                <div className="flex items-center gap-3">
                                    <div className="p-3 bg-zinc-100 dark:bg-zinc-800 rounded-2xl">
                                        <History className="w-6 h-6 text-wine-dark dark:text-wine-gold" />
                                    </div>
                                    <h3 className="text-xl font-bold dark:text-white serif">{t("recent_activities")}</h3>
                                </div>
                                <button className="text-xs font-black uppercase tracking-widest text-wine-gold hover:text-wine-dark transition-colors">
                                    {t("view_all_short")}
                                </button>
                            </div>

                            <div className="space-y-6">
                                {[
                                    { title: "Einkauf im Weinladen", date: "15. Dez 2023", points: "+85" },
                                    { title: "Besuch: Adventszauber", date: "12. Dez 2023", points: "+50" },
                                    { title: "Online Bestellung #4592", date: "02. Dez 2023", points: "+112" },
                                ].map((item, idx) => (
                                    <div key={idx} className="flex items-center justify-between py-4 border-b border-zinc-50 dark:border-zinc-800 last:border-0 hover:bg-zinc-50 dark:hover:bg-zinc-800/50 -mx-4 px-4 rounded-xl transition-colors cursor-pointer group">
                                        <div className="flex flex-col">
                                            <span className="font-bold dark:text-white group-hover:text-wine-gold transition-colors">{item.title}</span>
                                            <span className="text-xs text-zinc-400 font-medium">{item.date}</span>
                                        </div>
                                        <span className="font-black text-wine-dark dark:text-wine-gold serif italic">{item.points}</span>
                                    </div>
                                ))}
                            </div>
                        </div>
                    </div>

                    {/* QR Scanner & Rewards Sidebar */}
                    <div className="space-y-8">
                        {/* Scan Card */}
                        <div className="bg-white dark:bg-zinc-900 rounded-[2rem] p-8 border border-zinc-100 dark:border-zinc-800 shadow-xl shadow-zinc-200/50 dark:shadow-none text-center group cursor-pointer hover:border-wine-gold transition-colors">
                            <div className="inline-flex p-6 bg-zinc-50 dark:bg-zinc-800 rounded-[2rem] mb-6 group-hover:bg-wine-gold/10 transition-colors">
                                <QrCode className="w-12 h-12 text-wine-dark dark:text-wine-gold transition-transform group-hover:scale-110" />
                            </div>
                            <h3 className="text-xl font-bold dark:text-white mb-2 serif">{t("loyalty_scan_qr")}</h3>
                            <p className="text-sm text-zinc-500 dark:text-zinc-400 mb-6 font-medium">
                                {t("loyalty_scan_desc")}
                            </p>
                            <div className="h-1 bg-zinc-100 dark:bg-zinc-800 rounded-full mb-2" />
                            <span className="text-[10px] font-black uppercase tracking-widest text-wine-gold">{t("ready_to_scan")}</span>
                        </div>

                        {/* Rewards List */}
                        <div className="bg-white dark:bg-zinc-900 rounded-[2rem] p-8 border border-zinc-100 dark:border-zinc-800 shadow-xl shadow-zinc-200/50 dark:shadow-none">
                            <div className="flex items-center gap-3 mb-8">
                                <div className="p-3 bg-wine-gold/10 rounded-2xl">
                                    <Gift className="w-6 h-6 text-wine-gold" />
                                </div>
                                <h3 className="text-xl font-bold dark:text-white serif">{t("loyalty_rewards")}</h3>
                            </div>

                            <div className="space-y-6">
                                {rewards.map((reward) => (
                                    <div key={reward.id} className="relative group p-4 border border-zinc-100 dark:border-zinc-800 rounded-2xl hover:border-wine-gold transition-all duration-300">
                                        <div className="flex justify-between items-start mb-2">
                                            <h4 className="font-bold dark:text-white text-sm">{reward.title}</h4>
                                            <span className="text-xs font-black text-wine-gold">{reward.points} PTS</span>
                                        </div>
                                        <p className="text-xs text-zinc-500 dark:text-zinc-400 leading-relaxed mb-4">
                                            {reward.description}
                                        </p>
                                        <button className="w-full py-2 bg-zinc-100 dark:bg-zinc-800 hover:bg-wine-gold hover:text-wine-dark text-zinc-600 dark:text-zinc-300 rounded-xl text-[10px] font-black uppercase tracking-widest transition-all">
                                            {t("redeem_points")}
                                        </button>
                                    </div>
                                ))}
                            </div>
                        </div>

                        {/* Info / Tier Card */}
                        <div className="bg-zinc-900 rounded-[2rem] p-8 text-white">
                            <Award className="w-8 h-8 text-wine-gold mb-4" />
                            <h4 className="text-lg font-bold mb-2 serif">{t("status_benefits")}</h4>
                            <ul className="space-y-3 mb-6">
                                <li className="flex items-center gap-2 text-xs text-zinc-400">
                                    <div className="w-1 h-1 bg-wine-gold rounded-full" />
                                    10% auf alle Online-Bestellungen
                                </li>
                                <li className="flex items-center gap-2 text-xs text-zinc-400">
                                    <div className="w-1 h-1 bg-wine-gold rounded-full" />
                                    Versandkostenfreie Lieferung
                                </li>
                                <li className="flex items-center gap-2 text-xs text-zinc-400">
                                    <div className="w-1 h-1 bg-wine-gold rounded-full" />
                                    Exklusiver Vorabzugriff auf neue Jahrgänge
                                </li>
                            </ul>
                            <div className="flex items-center gap-2 text-zinc-500 hover:text-white cursor-pointer transition-colors pt-4 border-t border-white/5">
                                <Info className="w-4 h-4" />
                                <span className="text-[10px] font-bold uppercase tracking-widest">{t("program_details")}</span>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}
