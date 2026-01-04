/**
 * НАЗНАЧЕНИЕ: Универсальная карточка продукта (Вино или Мероприятие).
 * ЗАВИСИМОСТИ: i18n, next/image, next/link, useCartStore, useWishlistStore.
 * ОСОБЕННОСТИ: Адаптивный дизайн, Framer Motion анимации, поддержка типов Wine и Event.
 */

"use client";

import React, { useState, useEffect } from 'react';
import Link from 'next/link';
import Image from 'next/image';
import { ShoppingCart, Calendar, ArrowRight, Heart, Minus, Plus } from 'lucide-react';
import { Wine } from '@/lib/types/wine';
import { Event } from '@/lib/types/event';
import { useTranslation } from '@/lib/i18n';
import { motion } from 'framer-motion';
import { useWishlistStore } from '@/lib/store/useWishlistStore';
import { useCartStore } from '@/lib/store/useCartStore';
import { useAuth } from '@/lib/contexts/AuthContext';

interface Props {
    product: Wine | Event;
}

/**
 * Универсальная карточка для каталога.
 */
export default function ProductCard({ product }: Props) {
    const { t } = useTranslation();

    // Сторы (Zustand)
    const toggleWishlist = useWishlistStore(state => state.toggleWishlist);
    const wishlist = useWishlistStore(state => state.wishlist);
    const cartItem = useCartStore(
        React.useCallback((state) => state.items.find(item => item.id === product.id), [product.id])
    );
    const addToCart = useCartStore(state => state.addToCart);
    const updateQuantity = useCartStore(state => state.updateQuantity);

    const { isLoggedIn, setAuthModalOpen } = useAuth();
    const [mounted, setMounted] = useState(false);

    useEffect(() => {
        setMounted(true);
    }, []);

    const isFavorite = mounted && wishlist.includes(product.id);
    const inCart = mounted && !!cartItem;

    // Определение типа продукта
    const isWineItem = (p: Wine | Event): p is Wine => {
        return 'grapeVariety' in p;
    };

    const isWine = isWineItem(product);
    const isEvent = !isWine;


    return (
        <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="group relative bg-white dark:bg-zinc-900 rounded-[2rem] md:rounded-2xl overflow-hidden border border-zinc-100 dark:border-zinc-800 hover:shadow-xl transition-all duration-300 flex flex-col h-full"
        >
            {/* Контейнер изображения */}
            <div className="relative h-64 md:h-auto md:aspect-[3/4] overflow-hidden bg-white dark:bg-zinc-900">
                <Link href={isWine ? `/shop/${(product as Wine).slug}` : `/events/${product.id}`} className="block h-full w-full">
                    <Image
                        src={product.image}
                        alt={isEvent ? (product as Event).title : (product as Wine).name}
                        fill
                        className={`${isWine ? 'object-contain p-2' : 'object-cover'} group-hover:scale-105 transition-transform duration-500`}
                        sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
                    />
                </Link>

                {/* Год урожая (только для вин) */}
                {isWine && (mounted ? (product as Wine).year : true) && (
                    <div className="absolute top-3 left-3 z-10">
                        <div className="px-2.5 py-1 rounded-lg bg-white/90 dark:bg-zinc-900/90 backdrop-blur-md shadow-sm border border-zinc-100 dark:border-zinc-800">
                            <span className="text-[10px] md:text-xs font-black text-wine-dark dark:text-white serif italic">
                                {isWine && (product as Wine).year ? (product as Wine).year : 'Year'}
                            </span>
                        </div>
                    </div>
                )}

                {/* Бейдж скидки (только для вин) */}
                {/* Бейдж скидки удален так как нет regular_price */}

                {/* Лейбл Распродажи (на изображении) */}
                {mounted && isWine && (product as Wine).sale && (
                    <div className="absolute bottom-4 right-3 z-10 pointer-events-none">
                        <span className="text-[10px] md:text-xs font-black text-white uppercase tracking-widest bg-red-600 px-2 py-1 rounded-md shadow-lg">
                            {t('product_sale')}
                        </span>
                    </div>
                )}

                {/* Кнопка избранного (только для вин в данном представлении) */}
                {isWine && (
                    <div className="absolute top-3 right-3 md:top-4 md:right-4 z-10">
                        <button
                            onClick={(e) => {
                                e.preventDefault();
                                e.stopPropagation();
                                toggleWishlist(product.id);
                            }}
                            className={`p-2 md:p-2.5 rounded-xl transition-all duration-300 backdrop-blur-md ${isFavorite
                                ? 'bg-wine-gold text-white shadow-lg shadow-wine-gold/20'
                                : 'bg-white/80 dark:bg-zinc-800/80 text-zinc-400 hover:text-wine-gold'
                                }`}
                        >
                            <Heart className={`w-3.5 h-3.5 md:w-4 md:h-4 ${isFavorite ? 'fill-current' : ''}`} />
                        </button>
                    </div>
                )}
            </div>

            {/* Контентная часть */}
            <div className="p-3 md:p-5 flex flex-col flex-grow gap-2 md:gap-3">
                {/* Мета-данные (Сорт/Вкус или Дата) */}
                <div className="flex items-center justify-between text-[10px] md:text-xs text-zinc-500 font-bold uppercase tracking-widest min-h-[1.25rem]">
                    {isWine ? (
                        <div className="flex items-center gap-2">
                            <span>{(product as Wine).grapeVariety}</span>
                            {mounted && (product as Wine).flavor && (
                                <>
                                    <span className="w-1 h-1 rounded-full bg-zinc-300 dark:bg-zinc-700" />
                                    <span className="text-wine-gold">{t(`flavor_${(product as Wine).flavor?.toLowerCase()}`)}</span>
                                </>
                            )}
                        </div>
                    ) : (
                        <span className="flex items-center gap-1 text-wine-gold">
                            <Calendar className="w-3 h-3" />
                            {(product as Event).date}
                        </span>
                    )}
                </div>

                {/* Заголовок и Серия */}
                <div className="space-y-1">
                    <Link href={isWine ? `/shop/${(product as Wine).slug}` : `/events/${product.id}`} className="block">
                        <h3 className="text-base md:text-lg font-bold text-wine-dark dark:text-white group-hover:text-wine-gold transition-colors line-clamp-1 serif leading-tight">
                            {isEvent ? (product as Event).title : (product as Wine).name}
                        </h3>
                    </Link>
                    {isWine && (
                        <div className="min-h-[1.25rem]">
                            {mounted && (product as Wine).edition && (
                                <p className="text-[10px] md:text-xs font-medium text-zinc-400 dark:text-zinc-500 italic">
                                    {(product as Wine).edition}
                                </p>
                            )}
                        </div>
                    )}
                </div>

                {/* Цена и действия */}
                <div className="mt-auto pt-3 md:pt-4 border-t border-zinc-100 dark:border-zinc-800">
                    <div className="flex items-center justify-between mb-1 md:mb-2">
                        <div className="flex flex-col">
                            {/* Цена */}
                            <div className="flex items-baseline gap-2">
                                {mounted && isWine && (product as Wine).sale && (product as Wine).sale_price ? (
                                    <>
                                        <div className="text-red-600 dark:text-red-500 font-black text-lg md:text-xl italic serif">
                                            € {(product as Wine).sale_price!.toFixed(2).replace('.', ',')}
                                        </div>
                                        <div className="text-zinc-400 dark:text-zinc-600 font-medium text-xs md:text-sm line-through decoration-red-500/50">
                                            € {(product as Wine).price.toFixed(2).replace('.', ',')}
                                        </div>
                                    </>
                                ) : (
                                    <div className="text-wine-dark dark:text-white font-black text-lg md:text-xl italic serif">
                                        {typeof product.price === 'number'
                                            ? `€ ${product.price.toFixed(2).replace('.', ',')}`
                                            : product.price ? `€ ${parseFloat(product.price).toFixed(2).replace('.', ',')}` : '€ 0,00'}
                                    </div>
                                )}
                            </div>
                            {/* Информация о цене за литр */}
                            {isWine && (
                                <div className="text-[9px] md:text-[10px] text-zinc-500 font-medium leading-tight mt-0.5">
                                    <p>{t('product_tax_inc')}</p>
                                    <p>
                                        (€ {((isWine ? (mounted && (product as Wine).sale && (product as Wine).sale_price ? (product as Wine).sale_price! : (product as Wine).price) : 0) / 0.75).toFixed(2).replace('.', ',')} {t('product_unit_price')})
                                    </p>
                                    <p>{t('product_shipping_extra')}</p>
                                </div>
                            )}
                        </div>

                        {/* Действие: Корзина или Билеты */}
                        {isWine ? (
                            <div className="flex items-center gap-2">
                                {inCart && (
                                    <div className="flex items-center gap-1 md:gap-2 bg-zinc-100 dark:bg-zinc-800 rounded-xl p-0.5 md:p-1 border border-zinc-200 dark:border-zinc-700">
                                        <button
                                            onClick={(e) => {
                                                e.preventDefault();
                                                e.stopPropagation();
                                                updateQuantity(product.id, (cartItem?.quantity || 0) - 1);
                                            }}
                                            className="p-1 md:p-1.5 hover:bg-white dark:hover:bg-zinc-700 rounded-lg transition-all text-zinc-500"
                                        >
                                            <Minus className="w-3 h-3 md:w-3.5 md:h-3.5" />
                                        </button>
                                        <span className="text-[10px] md:text-xs font-black min-w-[1rem] text-center dark:text-white">
                                            {cartItem?.quantity}
                                        </span>
                                        <button
                                            onClick={(e) => {
                                                e.preventDefault();
                                                e.stopPropagation();
                                                updateQuantity(product.id, (cartItem?.quantity || 0) + 1);
                                            }}
                                            className="p-1 md:p-1.5 hover:bg-white dark:hover:bg-zinc-700 rounded-lg transition-all text-zinc-500"
                                        >
                                            <Plus className="w-3 h-3 md:w-3.5 md:h-3.5" />
                                        </button>
                                    </div>
                                )}
                                <button
                                    className={`w-10 h-10 md:w-12 md:h-12 rounded-xl md:rounded-2xl flex items-center justify-center transition-all shadow-sm ${inCart
                                        ? 'bg-zinc-900 text-white'
                                        : 'bg-zinc-100 dark:bg-zinc-800 text-wine-dark dark:text-white hover:bg-wine-gold hover:text-white hover:shadow-wine-gold/20'
                                        }`}
                                    onClick={(e) => {
                                        e.preventDefault();
                                        e.stopPropagation();
                                        addToCart(product.id);
                                    }}
                                >
                                    <ShoppingCart className="w-4 h-4 md:w-5 md:h-5" />
                                </button>
                            </div>
                        ) : (
                            <Link
                                href={`/events/${product.id}`}
                                className="flex items-center gap-2 text-xs font-bold uppercase tracking-wider text-wine-gold hover:text-wine-gold/80"
                            >
                                {t('event_book_now')} <ArrowRight className="w-3 h-3" />
                            </Link>
                        )}
                    </div>

                    {/* Время доставки (только для вин) */}
                    {isWine && (
                        <div className="mt-1.5 md:mt-2 pt-1.5 md:pt-2 border-t border-zinc-50 dark:border-zinc-800/50">
                            <p className="text-[8px] md:text-[10px] font-bold text-green-600 dark:text-green-500 uppercase tracking-widest flex items-center gap-1 md:gap-1.5">
                                <span className="w-1 md:w-1.5 h-1 md:h-1.5 rounded-full bg-current animate-pulse" />
                                {t('product_delivery_time')}
                            </p>
                        </div>
                    )}
                </div>
            </div>
        </motion.div>
    );
};
