/**
 * Назначение файла: Группа управляющих кнопок в шапке (поиск, профиль, избранное, корзина).
 * Содержит: Иконки действий с индикаторами количества (бейждами).
 * Особенности: Адаптивные размеры иконок, поддержка темной темы.
 */

"use client";

import React, { useState, useEffect } from "react";
import { Search, User as UserIcon, Heart, ShoppingCart } from "@/app/icon-sets";

interface HeaderActionsProps {
    isLoggedIn: boolean;
    wishlistCount: number;
    cartCount: number;
    searchOpen: boolean;
    setSearchOpen: (open: boolean) => void;
    cartDropdownOpen: boolean;
    setCartDropdownOpen: (open: boolean) => void;
    onUserClick: () => void;
    onWishlistClick: () => void;
    cartButtonRef: React.RefObject<HTMLButtonElement | null>;
}

/**
 * Блок кнопок действий в хедере.
 */
const HeaderActions: React.FC<HeaderActionsProps> = ({
    isLoggedIn,
    wishlistCount,
    cartCount,
    searchOpen,
    setSearchOpen,
    cartDropdownOpen,
    setCartDropdownOpen,
    onUserClick,
    onWishlistClick,
    cartButtonRef,
}) => {
    const [mounted, setMounted] = useState(false);

    useEffect(() => {
        // eslint-disable-next-line react-hooks/set-state-in-effect
        setMounted(true);
    }, []);

    return (
        <div className="flex items-center gap-2 md:gap-4">
            {/* Поиск */}
            <button
                className="p-2 md:p-3 hover:bg-zinc-100 dark:hover:bg-zinc-800 rounded-full transition-all text-zinc-600 dark:text-zinc-400 hover:text-wine-gold"
                onClick={() => setSearchOpen(!searchOpen)}
            >
                <Search className="w-5 h-5 md:w-6 md:h-6" />
            </button>

            {/* Профиль */}
            <button
                className="p-2 md:p-3 hover:bg-zinc-100 dark:hover:bg-zinc-800 rounded-full transition-all text-zinc-600 dark:text-zinc-400 hover:text-wine-gold relative"
                onClick={onUserClick}
            >
                <UserIcon className="w-5 h-5 md:w-6 md:h-6" />
                {mounted && isLoggedIn && (
                    <span className="absolute top-2 right-2 w-2 h-2 bg-green-500 rounded-full border-2 border-white dark:border-zinc-950"></span>
                )}
            </button>

            {/* Избранное */}
            <button
                onClick={onWishlistClick}
                className="p-2 md:p-3 hover:bg-zinc-100 dark:hover:bg-zinc-800 rounded-full transition-all text-zinc-600 dark:text-zinc-400 hover:text-wine-gold relative"
            >
                <Heart className="w-5 h-5 md:w-6 md:h-6" />
                {mounted && wishlistCount > 0 && (
                    <span className="absolute top-1 right-1 bg-wine-gold text-white text-[10px] font-black w-4 h-4 flex items-center justify-center rounded-full border-2 border-white dark:border-zinc-950 animate-in zoom-in">
                        {wishlistCount}
                    </span>
                )}
            </button>

            {/* Корзина */}
            <div className="relative">
                <button
                    ref={cartButtonRef}
                    onClick={() => setCartDropdownOpen(!cartDropdownOpen)}
                    className="p-2 md:p-3 hover:bg-zinc-100 dark:hover:bg-zinc-800 rounded-full transition-all text-zinc-600 dark:text-zinc-400 hover:text-wine-gold relative"
                >
                    <ShoppingCart className="w-5 h-5 md:w-6 md:h-6" />
                    {mounted && cartCount > 0 && (
                        <span className="absolute top-1 right-1 bg-wine-gold text-white text-[10px] font-black w-4 h-4 flex items-center justify-center rounded-full border-2 border-white dark:border-zinc-950 animate-in zoom-in">
                            {cartCount}
                        </span>
                    )}
                </button>
            </div>
        </div>
    );
};

export default HeaderActions;
