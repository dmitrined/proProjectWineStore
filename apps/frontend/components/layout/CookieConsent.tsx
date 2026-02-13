/**
 * НАЗНАЧЕНИЕ: Баннер согласия с использованием Cookie (GDPR).
 * ЗАВИСИМОСТИ: React, Framer Motion, i18n, Lucide React.
 * ОСОБЕННОСТИ: Сохраняет настройки в localStorage, позволяет выбирать категории.
 */

"use client";

import React, { useState, useEffect } from 'react';
import { useTranslation } from '@/lib/i18n';
import { motion, AnimatePresence } from 'framer-motion';
import { Cookie, Shield, BarChart, ShoppingBag, X, ChevronDown, ChevronUp, Check } from 'lucide-react';

interface CookieSettings {
    necessary: boolean;
    analytics: boolean;
    marketing: boolean;
}

const STORAGE_KEY = 'cookie_consent_preferences';

export default function CookieConsent() {
    const { t } = useTranslation();
    const [isVisible, setIsVisible] = useState(false);
    const [showSettings, setShowSettings] = useState(false);
    const [settings, setSettings] = useState<CookieSettings>({
        necessary: true,
        analytics: true,
        marketing: true
    });

    useEffect(() => {
        // Проверяем наличие сохраненных настроек
        const saved = localStorage.getItem(STORAGE_KEY);
        if (!saved) {
            // Если настроек нет, показываем баннер
            // Небольшая задержка для плавного появления
            const timer = setTimeout(() => setIsVisible(true), 1000);
            return () => clearTimeout(timer);
        } else {
            // Если есть, загружаем их (можно использовать для инициализации аналитики)
            setSettings(JSON.parse(saved));
        }
    }, []);

    const savePreferences = (newSettings: CookieSettings) => {
        localStorage.setItem(STORAGE_KEY, JSON.stringify(newSettings));
        setSettings(newSettings);
        setIsVisible(false);
        // Здесь можно вызвать инициализацию скриптов (GA, Pixel и т.д.)
    };

    const handleAcceptAll = () => {
        savePreferences({ necessary: true, analytics: true, marketing: true });
    };

    const handleRejectAll = () => {
        savePreferences({ necessary: true, analytics: false, marketing: false });
    };

    const handleSaveSettings = () => {
        savePreferences(settings);
    };

    if (!isVisible) return null;

    return (
        <AnimatePresence>
            {isVisible && (
                <motion.div
                    initial={{ y: 100, opacity: 0 }}
                    animate={{ y: 0, opacity: 1 }}
                    exit={{ y: 100, opacity: 0 }}
                    transition={{ type: "spring", stiffness: 300, damping: 30 }}
                    className="fixed bottom-0 inset-x-0 z-50 p-4 md:p-6 flex justify-center pointer-events-none"
                >
                    <div className="bg-white dark:bg-zinc-900 border border-zinc-200 dark:border-zinc-800 rounded-3xl shadow-2xl w-full max-w-4xl pointer-events-auto overflow-hidden">
                        <div className="p-6 md:p-8">
                            {/* Header */}
                            <div className="flex items-start justify-between gap-4 mb-4">
                                <div className="flex items-center gap-3">
                                    <div className="bg-wine-gold/10 p-2 rounded-xl">
                                        <Cookie className="w-6 h-6 text-wine-gold" />
                                    </div>
                                    <h3 className="text-xl font-bold font-serif dark:text-white">
                                        {t("cookie_title")}
                                    </h3>
                                </div>
                            </div>

                            {/* Description */}
                            <p className="text-zinc-600 dark:text-zinc-400 text-sm mb-6 leading-relaxed">
                                {t("cookie_desc")}
                            </p>

                            {/* Settings Panel (Collapsible) */}
                            <AnimatePresence>
                                {showSettings && (
                                    <motion.div
                                        initial={{ height: 0, opacity: 0 }}
                                        animate={{ height: "auto", opacity: 1 }}
                                        exit={{ height: 0, opacity: 0 }}
                                        className="overflow-hidden mb-6"
                                    >
                                        <div className="space-y-4 pt-2 border-t border-zinc-100 dark:border-zinc-800">
                                            {/* Necessary */}
                                            <div className="flex items-start justify-between">
                                                <div className="flex gap-3">
                                                    <Shield className="w-5 h-5 text-green-500 mt-0.5" />
                                                    <div>
                                                        <h4 className="font-bold text-sm dark:text-white">{t("cookie_cat_necessary")}</h4>
                                                        <p className="text-xs text-zinc-500">{t("cookie_cat_necessary_desc")}</p>
                                                    </div>
                                                </div>
                                                <div className="flex items-center h-6">
                                                    <input
                                                        type="checkbox"
                                                        checked={true}
                                                        disabled
                                                        className="w-4 h-4 rounded text-wine-gold focus:ring-wine-gold cursor-not-allowed opacity-50"
                                                    />
                                                </div>
                                            </div>

                                            {/* Analytics */}
                                            <div className="flex items-start justify-between">
                                                <div className="flex gap-3">
                                                    <BarChart className="w-5 h-5 text-blue-500 mt-0.5" />
                                                    <div>
                                                        <h4 className="font-bold text-sm dark:text-white">{t("cookie_cat_analytics")}</h4>
                                                        <p className="text-xs text-zinc-500">{t("cookie_cat_analytics_desc")}</p>
                                                    </div>
                                                </div>
                                                <div className="flex items-center h-6">
                                                    <label className="relative inline-flex items-center cursor-pointer">
                                                        <input
                                                            type="checkbox"
                                                            className="sr-only peer"
                                                            checked={settings.analytics}
                                                            onChange={(e) => setSettings({ ...settings, analytics: e.target.checked })}
                                                        />
                                                        <div className="w-11 h-6 bg-zinc-200 peer-focus:outline-none rounded-full peer dark:bg-zinc-700 peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border-zinc-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-wine-gold"></div>
                                                    </label>
                                                </div>
                                            </div>

                                            {/* Marketing */}
                                            <div className="flex items-start justify-between">
                                                <div className="flex gap-3">
                                                    <ShoppingBag className="w-5 h-5 text-purple-500 mt-0.5" />
                                                    <div>
                                                        <h4 className="font-bold text-sm dark:text-white">{t("cookie_cat_marketing")}</h4>
                                                        <p className="text-xs text-zinc-500">{t("cookie_cat_marketing_desc")}</p>
                                                    </div>
                                                </div>
                                                <div className="flex items-center h-6">
                                                    <label className="relative inline-flex items-center cursor-pointer">
                                                        <input
                                                            type="checkbox"
                                                            className="sr-only peer"
                                                            checked={settings.marketing}
                                                            onChange={(e) => setSettings({ ...settings, marketing: e.target.checked })}
                                                        />
                                                        <div className="w-11 h-6 bg-zinc-200 peer-focus:outline-none rounded-full peer dark:bg-zinc-700 peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border-zinc-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-wine-gold"></div>
                                                    </label>
                                                </div>
                                            </div>
                                        </div>
                                    </motion.div>
                                )}
                            </AnimatePresence>

                            {/* Actions */}
                            <div className="flex flex-col md:flex-row gap-3 items-center justify-between pt-4 border-t border-zinc-100 dark:border-zinc-800">
                                <button
                                    onClick={() => setShowSettings(!showSettings)}
                                    className="text-sm font-semibold text-zinc-500 hover:text-zinc-900 dark:hover:text-white transition-colors flex items-center gap-1"
                                >
                                    {t("cookie_settings")}
                                    {showSettings ? <ChevronUp className="w-4 h-4" /> : <ChevronDown className="w-4 h-4" />}
                                </button>

                                <div className="flex flex-col md:flex-row gap-3 w-full md:w-auto">
                                    {showSettings ? (
                                        <button
                                            onClick={handleSaveSettings}
                                            className="px-6 py-3 rounded-xl bg-zinc-900 dark:bg-white text-white dark:text-zinc-900 font-bold text-sm hover:bg-zinc-800 dark:hover:bg-zinc-200 transition-colors flex items-center justify-center gap-2"
                                        >
                                            <Check className="w-4 h-4" />
                                            {t("cookie_save")}
                                        </button>
                                    ) : (
                                        <>
                                            <button
                                                onClick={handleRejectAll}
                                                className="px-6 py-3 rounded-xl border-2 border-zinc-200 dark:border-zinc-700 text-zinc-700 dark:text-zinc-300 font-bold text-sm hover:bg-zinc-50 dark:hover:bg-zinc-800 transition-colors"
                                            >
                                                {t("cookie_reject_all")}
                                            </button>
                                            <button
                                                onClick={handleAcceptAll}
                                                className="px-6 py-3 rounded-xl bg-wine-gold text-white font-bold text-sm hover:bg-wine-gold/90 transition-colors shadow-lg shadow-wine-gold/20"
                                            >
                                                {t("cookie_accept_all")}
                                            </button>
                                        </>
                                    )}
                                </div>
                            </div>
                        </div>
                    </div>
                </motion.div>
            )}
        </AnimatePresence>
    );
}
