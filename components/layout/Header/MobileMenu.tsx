/**
 * Назначение файла: Мобильное навигационное меню (Mobile Menu).
 * Зависимости: useTranslation, useUIStore, Logo, Lucide Icons, navigation constants.
 * Особенности: Боковая панель с аккордеон-секциями, анимация slide-in, переключатель языка.
 */
"use client";
import React, { useState } from "react";
import Link from "next/link";
import { Close, ArrowRight, ChevronDown } from "@/app/icon-sets";
import Logo from "@/components/layout/Logo";
import { useTranslation } from "@/lib/i18n";
import { useUIStore } from "@/lib/store/useUIStore";
import { getNavigationData } from "@/lib/constants/navigation";

const MobileMenuSection: React.FC<{
    title: string;
    isOpen: boolean;
    onToggle: () => void;
    children: React.ReactNode;
}> = ({ title, isOpen, onToggle, children }) => {
    return (
        <div className="border-b border-zinc-100 dark:border-zinc-900 last:border-0">
            <button
                onClick={onToggle}
                className="w-full py-4 flex items-center justify-between text-left group"
            >
                <span className={`text-lg font-black uppercase tracking-widest transition-colors ${isOpen ? "text-wine-gold" : "text-zinc-600 dark:text-zinc-400 group-hover:text-zinc-900 dark:group-hover:text-zinc-200"}`}>
                    {title}
                </span>
                <ChevronDown
                    className={`w-5 h-5 text-zinc-400 transition-transform duration-300 ${isOpen ? "rotate-180 text-wine-gold" : ""}`}
                />
            </button>
            <div
                className={`overflow-hidden transition-all duration-300 ease-in-out ${isOpen ? "max-h-[500px] opacity-100 mb-4" : "max-h-0 opacity-0"}`}
            >
                <div className="flex flex-col gap-3 pl-2">
                    {children}
                </div>
            </div>
        </div>
    );
};

const MobileMenu: React.FC = () => {
    const { t, language, setLanguage } = useTranslation();
    // Migrated to Zustand with selectors
    const isMobileMenuOpen = useUIStore((state) => state.isMobileMenuOpen);
    const setMobileMenuOpen = useUIStore((state) => state.setMobileMenuOpen);

    const [openSection, setOpenSection] = useState<string | null>(null);

    const {
        navigationItems,
        shopCategories,
        eventCategories,
        aboutCategories,
        contactCategories
    } = getNavigationData(t);

    if (!isMobileMenuOpen) return null;

    const toggleSection = (section: string) => {
        setOpenSection(openSection === section ? null : section);
    };

    return (
        <div className="fixed inset-0 lg:hidden z-[100]">
            <div
                className="absolute inset-0 bg-zinc-950/80 backdrop-blur-sm animate-in fade-in duration-500"
                onClick={() => setMobileMenuOpen(false)}
            />
            <div className="absolute left-0 top-0 h-full w-[85%] max-w-sm bg-white dark:bg-zinc-950 p-8 shadow-[20px_0_50px_rgba(0,0,0,0.3)] animate-in slide-in-from-left duration-500 flex flex-col overflow-y-auto">
                <div className="flex items-center justify-between mb-8 border-b border-zinc-100 dark:border-zinc-900 pb-6 flex-shrink-0">
                    <Logo onClick={() => setMobileMenuOpen(false)} />

                    <button
                        onClick={() => setMobileMenuOpen(false)}
                        className="p-2 hover:bg-zinc-100 dark:hover:bg-zinc-900 rounded-full transition-colors"
                        aria-label="Close menu"
                    >
                        <Close className="w-6 h-6 dark:text-zinc-400" />
                    </button>
                </div>

                <nav className="flex flex-col flex-1">
                    <div className="flex flex-col gap-4 mb-6">
                        {navigationItems.map((item, idx) => (
                            <Link
                                key={item.label}
                                href={item.path}
                                className="text-2xl font-black serif dark:text-white hover:text-wine-gold transition-all duration-300"
                                onClick={() => setMobileMenuOpen(false)}
                                style={{ animationDelay: `${idx * 100}ms` }}
                            >
                                {item.label}
                            </Link>
                        ))}
                    </div>

                    <div className="flex flex-col">
                        <MobileMenuSection
                            title={t("nav_shop")}
                            isOpen={openSection === "shop"}
                            onToggle={() => toggleSection("shop")}
                        >
                            {shopCategories.map((item) => (
                                <Link
                                    key={item.label}
                                    href={item.path}
                                    className="text-base font-medium text-zinc-600 dark:text-zinc-400 hover:text-wine-gold transition-colors flex items-center justify-between group py-1"
                                    onClick={() => setMobileMenuOpen(false)}
                                >
                                    {item.label}
                                    <ArrowRight className="w-3.5 h-3.5 opacity-0 -translate-x-2 group-hover:opacity-100 group-hover:translate-x-0 transition-all text-wine-gold" />
                                </Link>
                            ))}
                        </MobileMenuSection>

                        <MobileMenuSection
                            title={t("nav_events")}
                            isOpen={openSection === "events"}
                            onToggle={() => toggleSection("events")}
                        >
                            {eventCategories.map((item) => (
                                <Link
                                    key={item.label}
                                    href={item.path}
                                    className="text-base font-medium text-zinc-600 dark:text-zinc-400 hover:text-wine-gold transition-colors flex items-center justify-between group py-1"
                                    onClick={() => setMobileMenuOpen(false)}
                                >
                                    {item.label}
                                    <ArrowRight className="w-3.5 h-3.5 opacity-0 -translate-x-2 group-hover:opacity-100 group-hover:translate-x-0 transition-all text-wine-gold" />
                                </Link>
                            ))}
                        </MobileMenuSection>

                        <MobileMenuSection
                            title={t("nav_about_us")}
                            isOpen={openSection === "about"}
                            onToggle={() => toggleSection("about")}
                        >
                            {aboutCategories.map((item) => (
                                <Link
                                    key={item.label}
                                    href={item.path}
                                    className="text-base font-medium text-zinc-600 dark:text-zinc-400 hover:text-wine-gold transition-colors flex items-center justify-between group py-1"
                                    onClick={() => setMobileMenuOpen(false)}
                                >
                                    {item.label}
                                    <ArrowRight className="w-3.5 h-3.5 opacity-0 -translate-x-2 group-hover:opacity-100 group-hover:translate-x-0 transition-all text-wine-gold" />
                                </Link>
                            ))}
                        </MobileMenuSection>

                        <MobileMenuSection
                            title={t("nav_contact")}
                            isOpen={openSection === "contact"}
                            onToggle={() => toggleSection("contact")}
                        >
                            {contactCategories.map((item) => (
                                <Link
                                    key={item.label}
                                    href={item.path}
                                    className="text-base font-medium text-zinc-600 dark:text-zinc-400 hover:text-wine-gold transition-colors flex items-center justify-between group py-1"
                                    onClick={() => setMobileMenuOpen(false)}
                                >
                                    {item.label}
                                    <ArrowRight className="w-3.5 h-3.5 opacity-0 -translate-x-2 group-hover:opacity-100 group-hover:translate-x-0 transition-all text-wine-gold" />
                                </Link>
                            ))}
                        </MobileMenuSection>
                    </div>


                    <div className="mt-8 flex-shrink-0">
                        <Link
                            href="/ai-sommelier"
                            className="w-full py-4 px-6 rounded-2xl bg-gradient-to-r from-wine-gold to-yellow-600 text-white shadow-lg shadow-wine-gold/20 flex items-center justify-between group overflow-hidden relative"
                            onClick={() => setMobileMenuOpen(false)}
                        >
                            <div className="absolute inset-0 bg-white/20 translate-y-full group-hover:translate-y-0 transition-transform duration-500 ease-out" />
                            <div className="flex items-center gap-3 relative z-10">
                                <span className="text-xl">✨</span>
                                <div className="flex flex-col">
                                    <span className="text-sm font-black uppercase tracking-widest leading-none mb-1">
                                        {t('ai_title')}
                                    </span>
                                    <span className="text-[10px] font-medium opacity-90 leading-none">
                                        {t('ai_subtitle')}
                                    </span>
                                </div>
                            </div>
                            <ArrowRight className="w-5 h-5 relative z-10 group-hover:translate-x-1 transition-transform" />
                        </Link>
                    </div>

                    <div className="mt-8 pt-8 border-t border-zinc-100 dark:border-zinc-900 flex-shrink-0">
                        <p className="text-[10px] font-black uppercase tracking-[0.2em] text-zinc-400 mb-4 px-1">
                            {t("select_language")}
                        </p>
                        <div className="flex gap-4">
                            <button
                                onClick={() => setLanguage("de")}
                                className={`px-5 py-3 rounded-2xl text-xs font-black tracking-widest transition-all ${language === "de"
                                    ? "bg-wine-gold text-white shadow-lg shadow-wine-gold/20"
                                    : "bg-zinc-100 dark:bg-zinc-900 text-zinc-500 hover:text-zinc-900 dark:hover:text-zinc-100"
                                    }`}
                            >
                                DE
                            </button>
                            <button
                                onClick={() => setLanguage("en")}
                                className={`px-5 py-3 rounded-2xl text-xs font-black tracking-widest transition-all ${language === "en"
                                    ? "bg-wine-gold text-white shadow-lg shadow-wine-gold/20"
                                    : "bg-zinc-100 dark:bg-zinc-900 text-zinc-500 hover:text-wine-dark dark:hover:text-zinc-100"
                                    }`}
                            >
                                EN
                            </button>
                        </div>
                    </div>
                </nav>
            </div>
        </div>
    );
};

export default MobileMenu;