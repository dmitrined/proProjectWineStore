/**
 * НАЗНАЧЕНИЕ: Объединенный компонент детальной страницы вина (Wine Detail).
 * ЗАВИСИМОСТИ: React, Lucide Icons, i18n, типы Wine, Zustand Stores.
 * ОСОБЕННОСТИ: Mobile-first дизайн, поддержка sale_price, премиальная эстетика.
 */

"use client";

import React from 'react';
import { Heart, ShieldCheck, Percent, Droplets, FlaskConical } from 'lucide-react';
import { Wine } from '@/lib/types/wine';

interface WineDetailProps {
    wine: Wine;
    isFavorite: boolean;
    onAddToCart: (id: string) => void;
    onToggleWishlist: (id: string) => void;
    t: (key: string) => string;
}

/**
 * Компонент изображения вина.
 */
const WineDetailImage: React.FC<{ image: string; name: string; year?: number }> = ({ image, name }) => {
    return (
        <div className="relative aspect-[4/5] md:aspect-[3/4] bg-zinc-50 dark:bg-zinc-900 rounded-3xl overflow-hidden flex items-center justify-center p-8 md:p-12 group">
            <img
                src={image}
                alt={name}
                className="h-full w-full object-contain transform group-hover:scale-105 transition-transform duration-700"
            />
        </div>
    );
};

/**
 * Компонент заголовка с названием и основной информацией.
 */
const WineDetailHeader: React.FC<{
    type: string;
    name: string;
    grapeVariety: string;
    t: (key: string) => string;
}> = ({ type, name, grapeVariety, t }) => {
    return (
        <div className="mb-6 md:mb-8">
            {/* Тип вина */}
            <p className="text-sm md:text-base font-black text-wine-gold uppercase tracking-[0.2em] mb-2 md:mb-4">
                {t('wine_type_' + type)}
            </p>

            {/* Название вина */}
            <h1 className="text-4xl md:text-6xl font-black text-wine-dark dark:text-white mb-3 md:mb-4 serif leading-tight">
                {name}
            </h1>

            {/* Сорт винограда */}
            <p className="text-xl md:text-2xl text-zinc-500 dark:text-zinc-400 font-medium tracking-tight mb-4">
                {grapeVariety}
            </p>
        </div>
    );
};

/**
 * Блок с текстом о впечатлениях от дегустации вина.
 */
const WineDetailExperience: React.FC<{ title: string; description: string }> = ({ title, description }) => {
    return (
        <div className="prose dark:prose-invert max-w-none mb-8 md:mb-12">
            <h3 className="text-lg md:text-xl font-bold dark:text-white mb-3 md:mb-4 serif">
                {title}
            </h3>
            <p className="text-zinc-600 dark:text-zinc-400 text-base md:text-lg leading-relaxed whitespace-pre-line">
                {description}
            </p>
        </div>
    );
};

/**
 * Блок с основными характеристиками вина (алкоголь, сахар, кислотность).
 */
const WineDetailStats: React.FC<{ wine: Wine; t: (key: string) => string }> = ({ wine, t }) => {
    const alcohol = wine.alcohol;
    const sugar = wine.sugar;
    const acid = wine.acidity;

    // Если данных нет, компонент не отображается
    if (!alcohol && !sugar && !acid) return null;

    const stats = [
        {
            label: t('stats_alcohol'),
            value: alcohol ? parseFloat(alcohol) : 0,
            icon: <Percent className="w-4 h-4 text-wine-gold" />,
            suffix: ' % vol.'
        },
        {
            label: t('stats_sugar'),
            value: sugar ? parseFloat(sugar) : 0,
            icon: <FlaskConical className="w-4 h-4 text-wine-gold" />,
            suffix: ' g/l'
        },
        {
            label: t('stats_acidity'),
            value: acid ? parseFloat(acid) : 0,
            icon: <Droplets className="w-4 h-4 text-wine-gold" />,
            suffix: ' g/l'
        }
    ].filter(s => s.value);

    return (
        <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 mb-8 md:mb-12">
            {stats.map((stat, idx) => (
                <div
                    key={idx}
                    className="flex items-center gap-4 p-4 rounded-2xl bg-zinc-50 dark:bg-zinc-900/50 border border-zinc-100 dark:border-zinc-800"
                >
                    <div className="p-2.5 rounded-xl bg-white dark:bg-zinc-800 shadow-sm">
                        {stat.icon}
                    </div>
                    <div>
                        <span className="block text-[10px] font-bold text-zinc-400 uppercase tracking-widest leading-none mb-1">
                            {stat.label}
                        </span>
                        <span className="text-sm font-bold text-wine-dark dark:text-white">
                            {stat.value}{stat.suffix}
                        </span>
                    </div>
                </div>
            ))}
        </div>
    );
};

/**
 * Блок с ценой, количеством и кнопками действий.
 */
const WineDetailPurchase: React.FC<{
    wine: Wine;
    isFavorite: boolean;
    onAddToCart: (id: string) => void;
    onToggleWishlist: (id: string) => void;
    t: (key: string) => string;
}> = ({ wine, isFavorite, onAddToCart, onToggleWishlist, t }) => {
    // Определение активной цены (с учетом распродажи)
    const activePrice = wine.sale && wine.sale_price ? wine.sale_price : wine.price;
    const unitPrice = (activePrice / 0.75).toFixed(2).replace('.', ',');

    return (
        <div className="mt-auto bg-zinc-900 dark:bg-zinc-900 border border-zinc-800 p-6 md:p-8 rounded-[2rem] text-white">
            <div className="flex flex-col gap-6">
                {/* Секция цены */}
                <div>
                    <span className="text-wine-gold text-[10px] font-black uppercase tracking-[0.2em] mb-2 block">
                        {t("premium_price")}
                    </span>
                    <div className="flex flex-wrap items-baseline gap-4 mb-4">
                        {wine.sale && wine.sale_price ? (
                            <>
                                <span className="text-4xl md:text-5xl font-black serif italic text-red-500">
                                    {wine.sale_price.toFixed(2).replace('.', ',')} €
                                </span>
                                <span className="text-2xl md:text-3xl font-medium text-white/40 line-through decoration-red-500/50">
                                    {wine.price.toFixed(2).replace('.', ',')} €
                                </span>
                            </>
                        ) : (
                            <span className="text-4xl md:text-5xl font-black serif italic">
                                {wine.price.toFixed(2).replace('.', ',')} €
                            </span>
                        )}
                    </div>

                    {/* Дополнительная информация о налогах и доставке */}
                    <div className="space-y-1 text-xs text-white/60 font-medium">
                        <p>{t('product_tax_inc')}</p>
                        <p>(€ {unitPrice} {t('product_unit_price')})</p>
                        <p>{t('product_shipping_extra')}</p>
                        <p className="text-green-400 font-bold mt-2">{t('product_delivery_time')}</p>
                        <p className="text-[10px] text-white/40 leading-relaxed mt-2 italic">
                            {t('product_non_eu_disclaimer')}
                        </p>
                    </div>
                </div>

                {/* Кнопки действий */}
                <div className="flex flex-wrap items-center gap-4 mt-4">
                    <div className="flex-grow flex items-center gap-2">
                        <button
                            onClick={() => onAddToCart(wine.id)}
                            className="flex-grow bg-wine-gold hover:bg-white text-wine-dark font-black px-8 md:px-12 py-4 md:py-5 rounded-2xl transition-all duration-300 transform hover:scale-105 active:scale-95 shadow-xl shadow-wine-gold/20 text-sm md:text-base uppercase tracking-widest"
                        >
                            {t("add_to_cart")}
                        </button>
                        <button
                            onClick={() => onToggleWishlist(wine.id)}
                            className={`p-4 md:p-5 rounded-2xl transition-all ${isFavorite
                                ? 'bg-wine-gold text-white shadow-lg shadow-wine-gold/20'
                                : 'bg-white/10 hover:bg-white/20 text-white'
                                }`}
                        >
                            <Heart className={`w-5 h-5 md:w-6 md:h-6 ${isFavorite ? 'fill-current' : ''}`} />
                        </button>
                    </div>
                </div>

                {/* Статус наличия */}
                <div className="flex items-center gap-3 py-4 border-t border-white/10 mt-2">
                    <div className="w-2 h-2 rounded-full bg-green-500" />
                    <span className="text-xs font-bold uppercase tracking-widest">
                        {t('product_in_stock')}
                    </span>
                </div>
            </div>

            {/* Гарантия качества */}
            <div className="mt-4 pt-6 md:pt-8 border-t border-white/10 flex items-center gap-4 text-white/40">
                <ShieldCheck className="w-5 h-5 flex-shrink-0" />
                <span className="text-[10px] font-bold tracking-[0.2em] uppercase leading-tight">
                    {t("quality_guarantee")}
                </span>
            </div>
        </div>
    );
};

/**
 * Главный компонент детальной страницы вина.
 * Объединяет все подкомпоненты в единую структуру.
 */
export const WineDetail: React.FC<WineDetailProps> = ({
    wine,
    isFavorite,
    onAddToCart,
    onToggleWishlist,
    t
}) => {
    return (
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 md:gap-16">
            {/* Секция изображения */}
            <WineDetailImage
                image={wine.image}
                name={wine.name}
                year={wine.year}
            />

            {/* Детали вина */}
            <div className="flex flex-col">
                <WineDetailHeader
                    type={wine.type}
                    name={wine.name}
                    grapeVariety={wine.grapeVariety}
                    t={t}
                />

                <WineDetailExperience
                    title={t("experience_title")}
                    description={wine.description || t("experience_desc")}
                />

                <WineDetailStats
                    wine={wine}
                    t={t}
                />

                <WineDetailPurchase
                    wine={wine}
                    isFavorite={isFavorite}
                    onAddToCart={onAddToCart}
                    onToggleWishlist={onToggleWishlist}
                    t={t}
                />
            </div>
        </div>
    );
};
