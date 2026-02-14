/**
 * НАЗНАЧЕНИЕ: Страница корзины (Cart Page).
 * ЗАВИСИМОСТИ: Lucide Icons, useCartStore, useWinesStore, useTranslation, Framer Motion.
 * ОСОБЕННОСТИ: Адаптивный дизайн (Mobile-first), премиальная эстетика, управление количеством, расчет итогов.
 */

"use client";

import React from 'react';
import Link from 'next/link';
import Image from 'next/image';
import { motion, AnimatePresence } from 'framer-motion';
import { ShoppingCart, ArrowLeft, Trash2, Plus, Minus, ShieldCheck, Truck, CreditCard } from 'lucide-react';
import { useTranslation } from '@/lib/i18n';
import { useCartStore } from '@/lib/store/useCartStore';
import { useCart } from '@/lib/hooks/useCart';
import { Wine } from '@/lib/types/wine';

export default function CartPage() {
    const { t } = useTranslation();
    const { items, updateQuantity, removeFromCart } = useCartStore();
    const { data: cartBackend, isLoading: isCartLoading } = useCart();

    const totalPrice = cartBackend?.totalAmount || 0;
    const shippingCost = totalPrice > 100 || totalPrice === 0 ? 0 : 6.90;
    const finalTotal = totalPrice + shippingCost;
    const allProducts = cartBackend?.items || [];

    return (
        <div className="min-h-screen bg-zinc-50 dark:bg-zinc-950 pt-24 pb-20 md:pt-32 md:pb-32">
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                {/* Заголовок */}
                <div className="mb-8 md:mb-12">
                    <Link
                        href="/shop"
                        className="inline-flex items-center text-zinc-500 hover:text-wine-gold transition-colors mb-6 group"
                    >
                        <ArrowLeft className="w-4 h-4 mr-2 group-hover:-translate-x-1 transition-transform" />
                        <span className="text-[10px] font-black uppercase tracking-widest">{t("nav_catalog")}</span>
                    </Link>
                    <h1 className="text-4xl md:text-6xl font-black text-wine-dark dark:text-white serif italic">
                        {t("cart_page_title")}
                    </h1>
                </div>

                {items.length === 0 ? (
                    /* Пустая корзина */
                    <motion.div
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        className="bg-white dark:bg-zinc-900 rounded-[2.5rem] p-12 md:p-24 text-center border border-zinc-100 dark:border-zinc-800 shadow-xl"
                    >
                        <div className="w-20 h-20 bg-zinc-50 dark:bg-zinc-800 rounded-full flex items-center justify-center mx-auto mb-8">
                            <ShoppingCart className="w-10 h-10 text-zinc-200" />
                        </div>
                        <h2 className="text-2xl font-bold text-zinc-900 dark:text-white mb-4 uppercase tracking-tight">
                            {t("cart_empty")}
                        </h2>
                        <Link
                            href="/shop"
                            className="inline-flex bg-wine-gold text-white px-10 py-4 rounded-2xl font-black uppercase tracking-widest text-xs hover:bg-zinc-900 transition-all duration-300 shadow-lg shadow-wine-gold/20"
                        >
                            {t("cart_empty_cta")}
                        </Link>
                    </motion.div>
                ) : (
                    /* Содержимое корзины */
                    <div className="grid grid-cols-1 lg:grid-cols-3 gap-8 md:gap-12">
                        {/* Список товаров */}
                        <div className="lg:col-span-2 space-y-4">
                            <AnimatePresence mode="popLayout">
                                {items.map((item) => {
                                    const product = allProducts.find((p: any) => String(p.productId) === String(item.id));
                                    if (!product && !isCartLoading) return null;

                                    // Fallback for loading state
                                    const displayName = product?.name || "Loading...";
                                    const displayPrice = product?.unitPrice || 0;
                                    const subtotal = product?.subtotal || 0;
                                    const imageUrl = product?.imageUrl || "";
                                    const available = product?.available ?? true;

                                    return (
                                        <motion.div
                                            key={item.id}
                                            layout
                                            initial={{ opacity: 0, scale: 0.95 }}
                                            animate={{ opacity: 1, scale: 1 }}
                                            exit={{ opacity: 0, scale: 0.95 }}
                                            className="bg-white dark:bg-zinc-900 rounded-3xl p-4 md:p-6 border border-zinc-100 dark:border-zinc-800 flex gap-4 md:gap-8 group shadow-sm hover:shadow-md transition-all"
                                        >
                                            {/* Изображение */}
                                            <div className="w-20 md:w-32 h-28 md:h-40 bg-zinc-50 dark:bg-zinc-800/50 rounded-2xl overflow-hidden flex-shrink-0 flex items-center justify-center p-3">
                                                <Image
                                                    src={imageUrl || 'https://placehold.co/600x800/png?text=Wine'}
                                                    alt={displayName}
                                                    width={120}
                                                    height={160}
                                                    className="h-full w-auto object-contain group-hover:scale-110 transition-transform duration-500"
                                                />
                                            </div>

                                            {/* Инфо */}
                                            <div className="flex-grow flex flex-col justify-between py-1">
                                                <div>
                                                    <div className="flex justify-between gap-4 mb-2">
                                                        <h3 className="text-sm md:text-xl font-bold dark:text-white leading-tight serif">
                                                            {displayName}
                                                        </h3>
                                                        <button
                                                            onClick={() => removeFromCart(item.id)}
                                                            className="text-zinc-400 hover:text-red-500 transition-colors p-1"
                                                        >
                                                            <Trash2 className="w-4 h-4 md:w-5 md:h-5" />
                                                        </button>
                                                    </div>
                                                    {!available && (
                                                        <p className="text-[10px] md:text-xs text-red-500 font-black uppercase tracking-widest">
                                                            {t("cart_out_of_stock")}
                                                        </p>
                                                    )}
                                                </div>

                                                <div className="flex items-end justify-between mt-4">
                                                    {/* Управление количеством */}
                                                    <div className="flex items-center gap-2 md:gap-4 bg-zinc-50 dark:bg-zinc-800/80 rounded-xl p-1 md:p-1.5 border border-zinc-100 dark:border-zinc-700">
                                                        <button
                                                            onClick={() => updateQuantity(item.id, item.quantity - 1)}
                                                            className="p-1 md:p-2 hover:bg-white dark:hover:bg-zinc-700 rounded-lg transition-all text-zinc-500"
                                                        >
                                                            <Minus className="w-3 h-3 md:w-4 md:h-4" />
                                                        </button>
                                                        <span className="text-xs md:text-sm font-black min-w-[1rem] text-center dark:text-white">
                                                            {item.quantity}
                                                        </span>
                                                        <button
                                                            onClick={() => updateQuantity(item.id, item.quantity + 1)}
                                                            className="p-1 md:p-2 hover:bg-white dark:hover:bg-zinc-700 rounded-lg transition-all text-zinc-500"
                                                        >
                                                            <Plus className="w-3 h-3 md:w-4 md:h-4" />
                                                        </button>
                                                    </div>

                                                    <div className="text-right">
                                                        <p className="text-[10px] text-zinc-400 font-bold uppercase tracking-widest mb-1">
                                                            {t("cart_price")}
                                                        </p>
                                                        <div className="flex flex-col items-end">
                                                            <p className="text-lg md:text-2xl font-black text-wine-dark dark:text-white serif italic">
                                                                {subtotal.toFixed(2).replace('.', ',')} €
                                                            </p>
                                                            {product && product.unitPrice === 0 && !isCartLoading && (
                                                                <p className="text-[10px] text-red-500 italic">Price unavailable</p>
                                                            )}
                                                        </div>
                                                    </div>
                                                </div>
                                            </div>
                                        </motion.div>
                                    );
                                })}
                            </AnimatePresence>
                        </div>

                        {/* Итоги */}
                        <div className="lg:col-span-1">
                            <div className="bg-wine-dark text-white rounded-[2.5rem] p-8 md:p-10 sticky top-32 shadow-2xl">
                                <h2 className="text-2xl font-black serif italic mb-8 border-b border-white/10 pb-6 uppercase tracking-tight">
                                    {t("cart_summary")}
                                </h2>

                                <div className="space-y-6">
                                    <div className="flex justify-between items-center text-sm">
                                        <span className="font-bold text-white/60 uppercase tracking-widest">{t("cart_subtotal")}</span>
                                        <span className="font-black serif italic text-xl">{totalPrice.toFixed(2).replace('.', ',')} €</span>
                                    </div>

                                    <div className="flex justify-between items-center text-sm">
                                        <span className="font-bold text-white/60 uppercase tracking-widest">{t("cart_shipping")}</span>
                                        <span className="font-black serif italic text-xl">
                                            {shippingCost === 0 ? "Gratis" : `${shippingCost.toFixed(2).replace('.', ',')} €`}
                                        </span>
                                    </div>

                                    <div className="pt-6 border-t border-white/10">
                                        <div className="flex justify-between items-end mb-2">
                                            <span className="text-xs font-black uppercase tracking-[0.2em]">{t("cart_total")}</span>
                                            <span className="text-4xl md:text-5xl font-black serif italic text-wine-gold">
                                                {finalTotal.toFixed(2).replace('.', ',')} €
                                            </span>
                                        </div>
                                        <p className="text-[10px] font-medium text-white/40 italic">
                                            {t("cart_tax_included")}
                                        </p>
                                    </div>

                                    <button className="w-full bg-wine-gold hover:bg-white text-wine-dark py-5 rounded-2xl font-black uppercase tracking-widest text-xs transition-all duration-300 shadow-xl shadow-wine-gold/20 flex items-center justify-center gap-3 group">
                                        {t("cart_checkout")}
                                        <CreditCard className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
                                    </button>

                                    {/* Дополнительная инфо */}
                                    <div className="grid grid-cols-2 gap-4 pt-8">
                                        <div className="flex flex-col items-center text-center p-3 border border-white/10 rounded-2xl">
                                            <ShieldCheck className="w-6 h-6 text-wine-gold mb-2" />
                                            <span className="text-[8px] font-black uppercase tracking-widest text-white/60 leading-tight">Secure Payment</span>
                                        </div>
                                        <div className="flex flex-col items-center text-center p-3 border border-white/10 rounded-2xl">
                                            <Truck className="w-6 h-6 text-wine-gold mb-2" />
                                            <span className="text-[8px] font-black uppercase tracking-widest text-white/60 leading-tight">Fast Delivery</span>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                )}
            </div>
        </div>
    );
}
