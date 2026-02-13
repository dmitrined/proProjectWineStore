/**
 * Назначение файла: Полноэкранный оверлей для поиска по сайту.
 * Содержит: Поле ввода поискового запроса с автофокусом и кнопкой закрытия.
 * Особенности: Плавное появление (анимация slide-in), поддержка темной темы.
 */

"use client";

import React from "react";
import { Search, Close } from "@/app/icon-sets";

interface SearchOverlayProps {
    t: (key: string) => string;
    searchTerm: string;
    setSearchTerm: (term: string) => void;
    setSearchOpen: (open: boolean) => void;
    handleSearchSubmit: (e: React.FormEvent) => void;
}

/**
 * Оверлей поиска.
 */
const SearchOverlay: React.FC<SearchOverlayProps> = ({
    t,
    searchTerm,
    setSearchTerm,
    setSearchOpen,
    handleSearchSubmit,
}) => {
    return (
        <div className="absolute inset-0 bg-white dark:bg-zinc-950 z-[60] flex items-center px-4 md:px-10 animate-in slide-in-from-top duration-300">
            <div className="max-w-7xl mx-auto w-full flex items-center gap-3 md:gap-4">
                <Search className="w-5 h-5 md:w-6 md:h-6 text-wine-gold flex-shrink-0" />

                {/* Форма поиска */}
                <form onSubmit={handleSearchSubmit} className="flex-grow">
                    <input
                        autoFocus
                        type="text"
                        placeholder={t("search_placeholder")}
                        value={searchTerm}
                        onChange={(e) => setSearchTerm(e.target.value)}
                        className="w-full bg-transparent border-none outline-none text-lg md:text-3xl font-black tracking-tight text-wine-dark dark:text-white placeholder-zinc-300 dark:placeholder-zinc-700 serif uppercase"
                    />
                </form>

                {/* Кнопка закрытия */}
                <button
                    onClick={() => setSearchOpen(false)}
                    className="p-1.5 md:p-2 hover:bg-zinc-100 dark:hover:bg-zinc-800 rounded-full transition-colors"
                    aria-label="Close search"
                >
                    <Close className="w-5 h-5 md:w-6 md:h-6 text-zinc-400" />
                </button>
            </div>
        </div>
    );
};

export default SearchOverlay;
