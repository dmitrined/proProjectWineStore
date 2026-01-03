/**
 * Назначение файла: Основное навигационное меню для десктопной версии сайта.
 * Содержит: Навигационные ссылки и выпадающие списки категорий.
 * Особенности: Плавные анимации появления, логика закрытия по таймауту при уходе курсора.
 */

"use client";

import React from "react";
import Link from "next/link";
import { ChevronDown } from "@/app/icon-sets";

interface NavigationProps {
    t: (key: string) => string;
    moreMenuOpen: boolean;
    setMoreMenuOpen: (open: boolean) => void;
    moreMenuRef: React.RefObject<HTMLDivElement | null>;
    navigationItems: Array<{ label: string; path: string }>;
    eventsMenuOpen: boolean;
    setEventsMenuOpen: (open: boolean) => void;
    eventsMenuRef: React.RefObject<HTMLDivElement | null>;
    eventCategories: Array<{ label: string; path: string }>;
    aboutMenuOpen: boolean;
    setAboutMenuOpen: (open: boolean) => void;
    aboutMenuRef: React.RefObject<HTMLDivElement | null>;
    aboutCategories: Array<{ label: string; path: string }>;
    contactMenuOpen: boolean;
    setContactMenuOpen: (open: boolean) => void;
    contactMenuRef: React.RefObject<HTMLDivElement | null>;
    contactCategories: Array<{ label: string; path: string }>;
    shopCategories: Array<{ label: string; path: string }>;
}

/**
 * Вспомогательный компонент для выпадающего пункта меню с логикой наведения.
 */
const DropdownNavItem = ({
    label,
    items,
    isOpen,
    setOpen,
    menuRef,
    path
}: {
    label: string,
    items: Array<{ label: string, path: string }>,
    isOpen: boolean,
    setOpen: (open: boolean) => void,
    menuRef: React.RefObject<HTMLDivElement | null>,
    path?: string
}) => {
    const timeoutRef = React.useRef<NodeJS.Timeout | null>(null);

    const handleMouseEnter = () => {
        if (timeoutRef.current) {
            clearTimeout(timeoutRef.current);
            timeoutRef.current = null;
        }
        setOpen(true);
    };

    const handleMouseLeave = () => {
        timeoutRef.current = setTimeout(() => {
            setOpen(false);
        }, 200);
    };

    return (
        <div
            className="relative"
            ref={menuRef}
            onMouseEnter={handleMouseEnter}
            onMouseLeave={handleMouseLeave}
        >
            {path ? (
                <Link
                    href={path}
                    className="flex items-center gap-1 text-sm font-bold uppercase tracking-widest text-zinc-600 dark:text-zinc-400 hover:text-wine-gold dark:hover:text-wine-gold transition-colors group py-2"
                >
                    {label}
                </Link>
            ) : (
                <button
                    className="flex items-center gap-1 text-sm font-bold uppercase tracking-widest text-zinc-600 dark:text-zinc-400 hover:text-wine-gold dark:hover:text-wine-gold transition-colors group py-2"
                >
                    {label}
                </button>
            )}

            {/* Выпадающий список */}
            {isOpen && (
                <div className="absolute top-full left-0 mt-0 w-56 bg-white dark:bg-zinc-900 shadow-2xl rounded-2xl z-50 border border-zinc-200 dark:border-zinc-800 overflow-hidden animate-in fade-in zoom-in duration-200">
                    <div className="p-2">
                        {items.map((item) => (
                            item.path === '#' || item.path === '' ? (
                                <span
                                    key={item.label}
                                    className="block px-4 py-3 text-xs font-bold uppercase tracking-widest text-zinc-400 dark:text-zinc-600 cursor-not-allowed"
                                >
                                    {item.label}
                                </span>
                            ) : (
                                <Link
                                    key={item.label}
                                    href={item.path}
                                    className="block px-4 py-3 text-xs font-bold uppercase tracking-widest text-zinc-600 dark:text-zinc-400 hover:bg-zinc-50 dark:hover:bg-zinc-800 rounded-xl transition-all hover:text-wine-gold dark:hover:text-wine-gold"
                                    onClick={() => setOpen(false)}
                                >
                                    {item.label}
                                </Link>
                            )
                        ))}
                    </div>
                </div>
            )}
        </div>
    );
};

/**
 * Основная навигация шапки.
 */
const Navigation: React.FC<NavigationProps> = ({
    t,
    moreMenuOpen,
    setMoreMenuOpen,
    moreMenuRef,
    eventsMenuOpen,
    setEventsMenuOpen,
    eventsMenuRef,
    aboutMenuOpen,
    setAboutMenuOpen,
    aboutMenuRef,
    contactMenuOpen,
    setContactMenuOpen,
    contactMenuRef,
    navigationItems,
    shopCategories,
    eventCategories,
    aboutCategories,
    contactCategories,
}) => {
    return (
        <nav className="hidden lg:flex gap-8 ml-8 items-center">
            {/* Обычные ссылки (Лояльность и т.д.) */}
            {navigationItems.map((item) => (
                <Link
                    key={item.label}
                    href={item.path}
                    className="text-sm font-bold uppercase tracking-widest text-zinc-600 dark:text-zinc-400 hover:text-wine-gold dark:hover:text-wine-gold transition-colors py-2 relative group"
                >
                    {item.label}
                    <span className="absolute bottom-0 left-0 w-0 h-0.5 bg-wine-gold group-hover:w-full transition-all duration-300"></span>
                </Link>
            ))}

            {/* Магазин (Магазин) */}
            <DropdownNavItem
                label={t("nav_shop")}
                items={shopCategories}
                isOpen={moreMenuOpen}
                setOpen={setMoreMenuOpen}
                menuRef={moreMenuRef}
                path="/shop"
            />

            {/* Мероприятия */}
            <DropdownNavItem
                label={t("nav_events")}
                items={eventCategories}
                isOpen={eventsMenuOpen}
                setOpen={setEventsMenuOpen}
                menuRef={eventsMenuRef}
                path="/events"
            />

            {/* О нас */}
            <DropdownNavItem
                label={t("nav_about_us")}
                items={aboutCategories}
                isOpen={aboutMenuOpen}
                setOpen={setAboutMenuOpen}
                menuRef={aboutMenuRef}
                path="/aboutUs/whoWeAre"
            />

            {/* Контакты */}
            <DropdownNavItem
                label={t("nav_contact")}
                items={contactCategories}
                isOpen={contactMenuOpen}
                setOpen={setContactMenuOpen}
                menuRef={contactMenuRef}
            />
        </nav>
    );
};

export default Navigation;
