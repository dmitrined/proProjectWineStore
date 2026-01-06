/**
 * Назначение файла: Выпадающее меню корзины в шапке сайта.
 * Содержит: Список добавленных товаров, управление количеством, расчет итоговой суммы.
 * Особенности: Использование анимации появления, адаптивная верстка для десктопа.
 */

"use client";

import React from "react";
import Link from "next/link";
import Image from "next/image";
import { ShoppingCart, Minus, Plus, Trash, ArrowRight } from "@/app/icon-sets";
import { Wine, UnifiedProduct } from "@/lib/types";

interface CartDropdownProps {
    t: (key: string) => string;
    items: { id: string; quantity: number }[]; // Список товаров в корзине
    wines: UnifiedProduct[]; // Данные о винах для получения цен и изображений
    getItemCount: () => number; // Функция получения общего количества
    totalPrice: number; // Общая стоимость
    updateQuantity: (id: string, delta: number) => void;
    removeFromCart: (id: string) => void;
    setCartDropdownOpen: (open: boolean) => void;
    cartDropdownRef: React.RefObject<HTMLDivElement | null>;
}

/**
 * Плавающее окно корзины.
 */
const CartDropdown: React.FC<CartDropdownProps> = ({
    t,
    items,
    wines,
    getItemCount,
    totalPrice,
    updateQuantity,
    removeFromCart,
    setCartDropdownOpen,
    cartDropdownRef,
}) => {
    return (
        <div
            ref={cartDropdownRef}
            className="absolute top-full right-0 mt-4 w-80 bg-white dark:bg-zinc-900 shadow-[0_20px_50px_rgba(0,0,0,0.2)] rounded-[2.5rem] border border-zinc-100 dark:border-zinc-800 z-50 overflow-hidden animate-in fade-in zoom-in slide-in-from-top-4 duration-300"
        >
            <div className="p-6 md:p-8">
                {/* Заголовок и счетчик */}
                <div className="flex items-center justify-between mb-6">
                    <h3 className="text-lg font-black serif dark:text-white uppercase tracking-tight">
                        {t("cart_title")}
                    </h3>
                    <span className="text-[10px] font-black bg-zinc-100 dark:bg-zinc-800 px-2 py-1 rounded-full text-zinc-500">
                        {getItemCount()}
                    </span>
                </div>

                {/* Содержимое корзины */}
                {items.length === 0 ? (
                    <div className="text-center py-8">
                        <ShoppingCart className="w-8 h-8 text-zinc-200 mx-auto mb-2" />
                        <p className="text-[10px] font-black uppercase tracking-widest text-zinc-400">
                            {t("cart_empty")}
                        </p>
                    </div>
                ) : (
                    <div className="space-y-4 max-h-[40vh] overflow-y-auto no-scrollbar mb-6">
                        {items.map((item) => {
                            const wine = wines.find((w) => w.id === item.id) as Wine | undefined;
                            if (!wine) return null;
                            return (
                                <div key={item.id} className="flex gap-4 group">
                                    {/* Миниатюра товара */}
                                    <div className="w-12 h-16 bg-zinc-50 dark:bg-zinc-800/50 rounded-xl overflow-hidden flex-shrink-0 flex items-center justify-center p-2 relative">
                                        <Image
                                            src={wine.image}
                                            alt={wine.name}
                                            width={48}
                                            height={64}
                                            className="h-full w-auto object-contain group-hover:scale-110 transition-transform"
                                        />
                                    </div>

                                    <div className="flex-grow min-w-0">
                                        <h4 className="text-[11px] font-black dark:text-white truncate uppercase tracking-tighter">
                                            {wine.name}
                                        </h4>
                                        <div className="flex items-center justify-between mt-2">
                                            {/* Управление количеством */}
                                            <div className="flex items-center gap-2 bg-zinc-50 dark:bg-zinc-800/50 rounded-lg p-1">
                                                <button
                                                    onClick={(e) => {
                                                        e.preventDefault();
                                                        e.stopPropagation();
                                                        updateQuantity(item.id, item.quantity - 1);
                                                    }}
                                                    className="p-1 hover:bg-white dark:hover:bg-zinc-700 rounded-md transition-colors text-zinc-400 hover:text-wine-dark dark:hover:text-white"
                                                >
                                                    <Minus className="w-3 h-3" />
                                                </button>
                                                <span className="text-[10px] font-black w-4 text-center dark:text-white">
                                                    {item.quantity}
                                                </span>
                                                <button
                                                    onClick={(e) => {
                                                        e.preventDefault();
                                                        e.stopPropagation();
                                                        updateQuantity(item.id, item.quantity + 1);
                                                    }}
                                                    className="p-1 hover:bg-white dark:hover:bg-zinc-700 rounded-md transition-colors text-zinc-400 hover:text-wine-dark dark:hover:text-white"
                                                >
                                                    <Plus className="w-3 h-3" />
                                                </button>
                                            </div>
                                            {/* Цена за позицию */}
                                            <div className="flex flex-col items-end">
                                                {wine.sale && wine.sale_price ? (
                                                    <>
                                                        <span className="text-xs font-black text-red-600 dark:text-red-500 serif italic">
                                                            {(wine.sale_price * item.quantity).toFixed(2).replace('.', ',')} €
                                                        </span>
                                                        <span className="text-[8px] text-zinc-400 line-through">
                                                            {(wine.price * item.quantity).toFixed(2).replace('.', ',')} €
                                                        </span>
                                                    </>
                                                ) : (
                                                    <span className="text-xs font-black text-wine-dark dark:text-white serif italic">
                                                        {(wine.price * item.quantity).toFixed(2).replace('.', ',')} €
                                                    </span>
                                                )}
                                            </div>
                                        </div>
                                    </div>

                                    {/* Удаление */}
                                    <button
                                        onClick={(e) => {
                                            e.preventDefault();
                                            e.stopPropagation();
                                            removeFromCart(item.id);
                                        }}
                                        className="self-center p-1.5 hover:bg-red-50 dark:hover:bg-red-900/10 hover:text-red-500 text-zinc-400 transition-colors group/remove"
                                    >
                                        <Trash className="w-4 h-4 group-hover/remove:scale-110 transition-transform" />
                                    </button>
                                </div>
                            );
                        })}
                    </div>
                )}

                {/* Футер выпадающего меню */}
                <div className="border-t border-zinc-100 dark:border-zinc-800 pt-6">
                    <div className="flex items-center justify-between mb-6">
                        <span className="text-[10px] font-black uppercase tracking-[0.2em] text-zinc-400">
                            {t("cart_total")}
                        </span>
                        <span className="text-xl font-black text-wine-dark dark:text-white serif italic">
                            {totalPrice.toFixed(2).replace('.', ',')} €
                        </span>
                    </div>
                    {/* Кнопка перехода к оформлению */}
                    <Link
                        href="/cart"
                        onClick={() => setCartDropdownOpen(false)}
                        className="w-full bg-wine-dark text-white py-4 rounded-2xl font-black uppercase tracking-widest text-xs hover:bg-wine-gold hover:text-wine-dark transition-all duration-300 flex items-center justify-center gap-2 group shadow-xl shadow-zinc-950/20"
                    >
                        {t("cart_checkout")}
                        <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
                    </Link>
                </div>
            </div>
        </div>
    );
};

export default CartDropdown;
