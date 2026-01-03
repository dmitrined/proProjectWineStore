"use client";

/**
 * Страница QR-кода пользователя (Программа лояльности).
 * Здесь будет отображаться персональный код для сканирования в магазине.
 */

import React, { useEffect } from 'react';
import { useTranslation } from '@/lib/i18n';
import { QrCode, ArrowLeft } from 'lucide-react';
import Link from 'next/link';
import { useAuth } from '@/lib/contexts/AuthContext';
import { useRouter } from 'next/navigation';

export default function QRCodePage() {
    const { t } = useTranslation();
    const { user, isLoggedIn, setAuthModalOpen } = useAuth();
    const router = useRouter();

    // Перенаправляем на дашборд (где сработает логика входа) если не авторизован
    useEffect(() => {
        if (!isLoggedIn) {
            router.push('/dashboard');
            // Опционально: открываем модалку сразу после перехода (если это поддерживается)
            setAuthModalOpen(true);
        }
    }, [isLoggedIn, router, setAuthModalOpen]);

    if (!isLoggedIn || !user) return null;

    return (
        <div className="min-h-screen bg-zinc-50 dark:bg-zinc-950 pt-24 pb-12 px-6">
            <div className="max-w-md mx-auto">
                <Link
                    href="/dashboard"
                    className="flex items-center gap-2 text-zinc-500 hover:text-wine-gold transition-colors mb-8 group"
                >
                    <ArrowLeft className="w-4 h-4 group-hover:-translate-x-1 transition-transform" />
                    <span className="text-sm font-bold uppercase tracking-wider">Zurück</span>
                </Link>

                <div className="bg-white dark:bg-zinc-900 rounded-[2.5rem] p-8 shadow-2xl shadow-zinc-200/50 dark:shadow-none border border-zinc-100 dark:border-zinc-800 text-center">
                    <div className="w-20 h-20 bg-wine-gold/10 rounded-3xl flex items-center justify-center mx-auto mb-6 text-wine-gold">
                        <QrCode size={40} />
                    </div>

                    <h1 className="text-3xl font-black text-wine-dark dark:text-white mb-2 serif">
                        MyCode
                    </h1>
                    <p className="text-zinc-500 dark:text-zinc-400 text-sm mb-10 leading-relaxed uppercase tracking-widest font-bold">
                        {t("loyalty_scan_desc") || "Scan this code at the register"}
                    </p>

                    <div className="aspect-square bg-white dark:bg-white p-8 rounded-3xl shadow-inner flex items-center justify-center relative group overflow-hidden border-4 border-wine-dark/5">
                        {/* Placeholder QR Code */}
                        <div className="w-full h-full border-2 border-dashed border-zinc-200 flex flex-col items-center justify-center gap-4">
                            <QrCode size={120} className="text-zinc-200" />
                            <span className="text-[10px] font-black text-zinc-300 uppercase tracking-widest">
                                Coming Soon
                            </span>
                        </div>

                        {/* Decorative elements */}
                        <div className="absolute top-0 left-0 w-8 h-8 border-t-4 border-l-4 border-wine-gold"></div>
                        <div className="absolute top-0 right-0 w-8 h-8 border-t-4 border-r-4 border-wine-gold"></div>
                        <div className="absolute bottom-0 left-0 w-8 h-8 border-b-4 border-l-4 border-wine-gold"></div>
                        <div className="absolute bottom-0 right-0 w-8 h-8 border-b-4 border-r-4 border-wine-gold"></div>
                    </div>

                    <div className="mt-10 p-6 bg-wine-dark text-white rounded-2xl relative overflow-hidden group">
                        <div className="relative z-10">
                            <p className="text-[10px] font-black uppercase tracking-[0.2em] text-wine-gold mb-1">
                               NR ... {user.name} 
                            </p>
                            <p className="text-lg font-black uppercase tracking-widest">
                                {user.name}
                            </p>
                        </div>

                        <div className="absolute -right-4 -bottom-4 w-24 h-24 bg-wine-gold/10 rounded-full blur-2xl group-hover:scale-150 transition-transform duration-700"></div>
                    </div>
                </div>
            </div>
        </div>
    );
}
