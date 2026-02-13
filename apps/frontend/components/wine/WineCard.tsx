/**
 * НАЗНАЧЕНИЕ: Компонент карточки вина (Wine Card).
 * ЗАВИСИМОСТИ: Lucide Icons, useCartStore, useWishlistStore, useTranslation, useAuth.
 * ОСОБЕННОСТИ: Отображение цены за литр, статус доставки, управление количеством в корзине, избранное.
 */

"use client";

import React, { useState, useEffect } from 'react';
import { Heart, ShoppingCart, Plus, Minus } from 'lucide-react';
import Link from 'next/link';
import { Wine } from '@/lib/types/wine';
import { useTranslation } from '@/lib/i18n';
import { useWishlistStore } from '@/lib/store/useWishlistStore';
import { useCartStore } from '@/lib/store/useCartStore';
import { useAuth } from '@/lib/contexts/AuthContext';

interface Props {
    wine: Wine;
}

/**
 * Карточка вина для списков и каталога.
 */
export default function WineCard({ wine }: Props) {
    const { t } = useTranslation();

    // Состояние избранного
    const toggleWishlist = useWishlistStore(state => state.toggleWishlist);
    const wishlist = useWishlistStore(state => state.wishlist);

    // Состояние корзины
    const cartItem = useCartStore(
        React.useCallback((state) => state.items.find(item => item.id === wine.id), [wine.id])
    );
    const addToCart = useCartStore(state => state.addToCart);
    const updateQuantity = useCartStore(state => state.updateQuantity);

    const { isLoggedIn, setAuthModalOpen } = useAuth();
    const [imageError, setImageError] = useState(false);
    const [mounted, setMounted] = useState(false);

    useEffect(() => {
        setMounted(true);
    }, []);

    const isFavorite = mounted && wishlist.includes(wine.id);
    const inCart = mounted && !!cartItem;

    return (
        <div className="group relative bg-white dark:bg-zinc-900 overflow-hidden rounded-[2rem] md:rounded-[2.5rem] border border-zinc-100 dark:border-zinc-800 hover:shadow-2xl transition-all duration-500 flex flex-col h-full">
            {/* Секция изображения */}
            <div className="relative h-32 xs:h-40 md:h-64 w-full bg-zinc-50 dark:bg-zinc-800 transition-colors group-hover:bg-white dark:group-hover:bg-zinc-900">
                <Link href={`/shop/${wine.slug}`} className="block h-full w-full p-3 md:p-4">
                    {!imageError ? (
                        <div className="relative h-full w-full transform group-hover:scale-110 transition-transform duration-700 flex items-center justify-center">
                            <img
                                src={wine.image}
                                alt={wine.name}
                                className="h-full w-full object-contain"
                                onError={() => setImageError(true)}
                            />
                        </div>
                    ) : (
                        <div className="flex flex-col items-center justify-center text-center p-4 bg-zinc-100/50 dark:bg-zinc-800/50 rounded-2xl w-full h-full border-2 border-dashed border-zinc-200 dark:border-zinc-700">
                            <span className="text-xs font-black text-wine-dark dark:text-white uppercase tracking-tighter serif italic break-words line-clamp-2">
                                {wine.name}
                            </span>
                            <div className="mt-1 text-[8px] font-bold text-zinc-400 uppercase tracking-widest">
                                {t("image_not_available")}
                            </div>
                        </div>
                    )}
                </Link>

                {/* Год урожая */}
                {(mounted ? wine.year : true) && (
                    <div className="absolute top-2 left-2 md:top-6 md:left-6 z-10">
                        <div className="px-2.5 py-1 md:px-3 md:py-1.5 rounded-xl bg-white/90 dark:bg-zinc-900/90 backdrop-blur-md shadow-sm border border-zinc-100 dark:border-zinc-800">
                            <span className="text-[10px] md:text-sm font-black text-wine-dark dark:text-white serif italic">
                                {wine.year || 'Year'}
                            </span>
                        </div>
                    </div>
                )}

                {/* Лейбл Распродажи (на изображении) */}
                {mounted && wine.sale && (
                    <div className="absolute bottom-2 right-2 md:bottom-6 md:right-6 z-10 pointer-events-none">
                        <span className="text-[10px] md:text-sm font-black text-white uppercase tracking-widest bg-red-600 px-2 py-1 md:px-3 md:py-1.5 rounded-lg shadow-xl">
                            {t('product_sale')}
                        </span>
                    </div>
                )}

                {/* Кнопка "В избранное" (поверх изображения) */}
                <div className="absolute top-2 right-2 md:top-6 md:right-6 z-10">
                    <button
                        onClick={(e) => {
                            e.preventDefault();
                            e.stopPropagation();
                            toggleWishlist(wine.id);
                        }}
                        className={`p-2 md:p-3 rounded-2xl transition-all duration-300 backdrop-blur-md ${isFavorite
                            ? 'bg-wine-gold text-white shadow-lg shadow-wine-gold/20 scale-110'
                            : 'bg-white/80 dark:bg-zinc-900/80 text-zinc-400 hover:text-wine-gold'
                            }`}
                    >
                        <Heart className={`w-3.5 h-3.5 md:w-5 md:h-5 ${isFavorite ? 'fill-current' : ''}`} />
                    </button>
                </div>
            </div>

            {/* Секция информации */}
            <div className="p-2.5 md:p-6 flex flex-col flex-grow">
                <div className="flex-grow">
                    <div className="flex items-center justify-between text-[9px] md:text-[10px] uppercase tracking-[0.2em] font-black mb-1 md:mb-2 min-h-[1rem]">
                        <span className="text-wine-gold">{wine.grapeVariety}</span>
                        {mounted && wine.flavor && (
                            <span className="text-zinc-400 dark:text-zinc-600 font-bold">{t(`flavor_${wine.flavor.toLowerCase()}`)}</span>
                        )}
                    </div>
                    <Link href={`/shop/${wine.slug}`}>
                        <h3 className="text-sm md:text-xl font-bold text-zinc-900 dark:text-white leading-tight mb-1 group-hover:text-wine-gold transition-colors serif">
                            {wine.name}
                        </h3>
                    </Link>
                    <div className="min-h-[1.25rem] mb-1.5 md:mb-3">
                        {mounted && wine.edition && (
                            <p className="text-[10px] md:text-xs font-medium text-zinc-400 dark:text-zinc-500 italic">
                                {wine.edition}
                            </p>
                        )}
                    </div>
                </div>

                {/* Цена и покупка */}
                <div className="mt-2 md:mt-6 border-t border-zinc-100 dark:border-zinc-800 pt-2 md:pt-6">
                    <div className="flex flex-col mb-2 md:mb-4">
                        <div className="flex items-baseline gap-2">
                            {mounted && wine.sale && wine.sale_price ? (
                                <>
                                    <div className="text-red-600 dark:text-red-500 font-black text-lg md:text-3xl italic serif">
                                        € {wine.sale_price.toFixed(2).replace('.', ',')}
                                    </div>
                                    <div className="text-zinc-400 dark:text-zinc-600 font-medium text-xs md:text-sm line-through decoration-red-500/50">
                                        € {wine.price.toFixed(2).replace('.', ',')}
                                    </div>
                                </>
                            ) : (
                                <span className="text-lg md:text-3xl font-black text-zinc-900 dark:text-white italic serif">
                                    € {wine.price.toFixed(2).replace('.', ',')}
                                </span>
                            )}
                        </div>
                        <div className="text-[9px] md:text-[10px] text-zinc-500 font-medium leading-relaxed mt-0.5 md:mt-2 space-y-0.5">
                            <p>{t('product_tax_inc')}</p>
                            <p>
                                (€ {((mounted && wine.sale && wine.sale_price ? wine.sale_price : wine.price) / 0.75).toFixed(2).replace('.', ',')} {t('product_unit_price')})
                            </p>
                            <p>{t('product_shipping_extra')}</p>
                        </div>
                    </div>

                    <div className="pt-2 md:pt-4 border-t border-zinc-50 dark:border-zinc-800/50 flex items-center justify-between gap-2">
                        {/* Статус доставки */}
                        <p className="text-[8px] md:text-[10px] font-bold text-green-600 dark:text-green-500 uppercase tracking-widest flex items-center gap-1">
                            <span className="w-1 md:w-1.5 h-1 md:h-1.5 rounded-full bg-current animate-pulse" />
                            {t('product_delivery_time')}
                        </p>

                        <div className="flex items-center gap-1.5 md:gap-2">
                            {/* Управление количеством в корзине */}
                            {inCart && (
                                <div className="flex items-center gap-0.5 md:gap-2 bg-zinc-100 dark:bg-zinc-800 rounded-full p-0.5 md:p-1 border border-zinc-200 dark:border-zinc-700">
                                    <button
                                        onClick={(e) => {
                                            e.preventDefault();
                                            e.stopPropagation();
                                            updateQuantity(wine.id, (cartItem?.quantity || 0) - 1);
                                        }}
                                        className="p-1 md:p-1.5 hover:bg-white dark:hover:bg-zinc-700 rounded-full transition-all text-zinc-500"
                                    >
                                        <Minus className="w-2.5 h-2.5 md:w-3.5 md:h-3.5" />
                                    </button>
                                    <span className="text-[9px] md:text-xs font-black min-w-[0.8rem] md:min-w-[1rem] text-center dark:text-white">{cartItem?.quantity}</span>
                                    <button
                                        onClick={(e) => {
                                            e.preventDefault();
                                            e.stopPropagation();
                                            updateQuantity(wine.id, (cartItem?.quantity || 0) + 1);
                                        }}
                                        className="p-1 md:p-1.5 hover:bg-white dark:hover:bg-zinc-700 rounded-full transition-all text-zinc-500"
                                    >
                                        <Plus className="w-2.5 h-2.5 md:w-3.5 md:h-3.5" />
                                    </button>
                                </div>
                            )}
                            {/* Кнопка добавления в корзину */}
                            <button
                                onClick={(e) => {
                                    e.preventDefault();
                                    e.stopPropagation();
                                    addToCart(wine.id);
                                }}
                                className={`w-10 h-10 md:w-12 md:h-12 rounded-xl md:rounded-2xl flex items-center justify-center transition-all duration-300 shadow-xl ${inCart
                                    ? 'bg-zinc-900 text-white'
                                    : 'bg-wine-gold hover:bg-zinc-900 text-white'
                                    }`}
                            >
                                <ShoppingCart className="w-3.5 h-3.5 md:w-5 md:h-5" />
                            </button>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}
