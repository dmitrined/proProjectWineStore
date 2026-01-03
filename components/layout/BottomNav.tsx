/**
 * Назначение файла: Компонент нижней навигации для мобильных устройств (Mobile Bottom Nav).
 * Зависимости: Lucide Icons, useCartStore, useTranslation, Framer Motion, useUIStore.
 * Особенности: Отображается только на мобильных (md:hidden), поддержка индикатора активной страницы и счетчика корзины.
 */

"use client";

import React from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { useTranslation } from "@/lib/i18n";
import { Home, Wine, QrCode, MoreHorizontal, Calendar, LucideIcon } from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";
import { useUIStore } from "@/lib/store/useUIStore";
import { useCartStore } from "@/lib/store/useCartStore";

interface NavItem {
    label: string;
    href: string;
    icon: LucideIcon;
    count?: number;
    onClick?: (e: React.MouseEvent) => void;
}

/**
 * Панель навигации, фиксированная в нижней части экрана.
 */
const BottomNav: React.FC = () => {
    const pathname = usePathname();
    const { t } = useTranslation();
    const toggleMobileMenu = useUIStore((state) => state.toggleMobileMenu);
    const { items } = useCartStore();

    // Общее количество товаров в корзине
    const cartCount = items.reduce((acc, item) => acc + item.quantity, 0);

    // Определение структуры навигации
    const navItems: NavItem[] = [
        {
            label: t("bottom_nav_home"),
            href: "/",
            icon: Home,
        },
        {
            label: t("nav_shop"),
            href: "/shop",
            icon: Wine,
        },
        {
            label: t("bottom_nav_events"),
            href: "/events",
            icon: Calendar,
        },
        {
            label: t("bottom_nav_mycode"),
            href: "/loyalty/qr-code",
            icon: QrCode,
        },
        {
            label: t("bottom_nav_more"),
            href: "#",
            icon: MoreHorizontal,
            onClick: (e) => {
                e.preventDefault();
                toggleMobileMenu();
            }
        },
    ];

    return (
        <div className="fixed bottom-0 left-0 right-0 z-50 md:hidden bg-white/80 dark:bg-zinc-950/80 backdrop-blur-xl border-t border-zinc-200 dark:border-zinc-800 pb-safe">
            <nav className="flex items-center justify-around h-16">
                {navItems.map((item) => {
                    const isActive = pathname === item.href;
                    const Icon = item.icon;

                    return (
                        <Link
                            key={item.label}
                            href={item.href}
                            onClick={item.onClick}
                            className="relative flex flex-col items-center justify-center w-full h-full space-y-1 transition-colors"
                        >
                            <motion.div
                                initial={false}
                                animate={{
                                    scale: isActive ? 1.1 : 1,
                                    color: isActive ? "#D4AF37" : "#71717a",
                                }}
                                className="flex flex-col items-center relative"
                            >
                                <Icon size={24} />

                                {/* Индикатор количества товаров (Badge) */}
                                {item.count !== undefined && item.count > 0 && (
                                    <span className="absolute -top-1 -right-2 bg-red-500 text-white text-[10px] font-bold min-w-[16px] h-4 flex items-center justify-center rounded-full px-1 border-2 border-white dark:border-zinc-900">
                                        {item.count}
                                    </span>
                                )}

                                {/* Текстовая подпись */}
                                <span className="text-[10px] font-medium uppercase tracking-wider">
                                    {item.label}
                                </span>

                                {/* Активный индикатор (полоска сверху) */}
                                <AnimatePresence>
                                    {isActive && (
                                        <motion.div
                                            layoutId="bottom-nav-indicator"
                                            className="absolute -top-1 w-8 h-0.5 bg-wine-gold"
                                            initial={{ opacity: 0 }}
                                            animate={{ opacity: 1 }}
                                            exit={{ opacity: 0 }}
                                        />
                                    )}
                                </AnimatePresence>
                            </motion.div>
                        </Link>
                    );
                })}
            </nav>
        </div>
    );
};

export default BottomNav;
