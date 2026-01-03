/**
 * Назначение файла: Верхняя информационная панель (TopBar).
 * Содержит: Информацию о доставке, ссылки на ключевые разделы, переключатель языка.
 * Особенности: Скрыта на мобильных устройствах, использование корпоративных цветов.
 */

"use client";

import React from "react";
import { Truck } from "@/app/icon-sets";

interface TopBarProps {
    t: (key: string) => string;
    language: string;
    setLanguage: (lang: "de" | "en") => void;
}

/**
 * Верхний бар шапки.
 */
const TopBar: React.FC<TopBarProps> = ({ t, language, setLanguage }) => {
    return (
        <div className="bg-wine-dark text-white py-2 px-4 md:px-10 border-b border-white/5">
            <div className="max-w-7xl mx-auto flex justify-between items-center">
                {/* Левая часть: Инфо о доставке */}
                <div className="flex items-center gap-2 text-[10px] md:text-xs tracking-wider uppercase font-bold text-wine-gold">
                    <Truck className="w-3 h-3" />
                    <span>{t("promo_shipping")}</span>
                </div>

                {/* Правая часть: Навигация и Языки */}
                <div className="flex items-center gap-6">
                    <div className="hidden md:flex items-center gap-6 text-[10px] uppercase font-bold text-zinc-400">
                        <span className="hover:text-wine-gold cursor-pointer transition-colors">
                            {t("nav_our_vineyards")}
                        </span>
                        <span className="hover:text-wine-gold cursor-pointer transition-colors">
                            {t("nav_contact")}
                        </span>
                    </div>

                    {/* Переключатель языка */}
                    <div className="flex items-center gap-2 border-l border-white/10 ml-2 pl-4">
                        <button
                            onClick={() => setLanguage("de")}
                            className={`text-[10px] font-black tracking-widest transition-colors ${language === "de" ? "text-wine-gold" : "text-zinc-500 hover:text-white"
                                }`}
                        >
                            DE
                        </button>
                        <span className="text-[10px] text-zinc-700">|</span>
                        <button
                            onClick={() => setLanguage("en")}
                            className={`text-[10px] font-black tracking-widest transition-colors ${language === "en" ? "text-wine-gold" : "text-zinc-500 hover:text-white"
                                }`}
                        >
                            EN
                        </button>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default TopBar;
