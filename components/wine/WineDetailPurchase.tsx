/**
 * Назначение файла: Блок покупки на странице вина (Wine Purchase).
 * Зависимости: Lucide React (Heart, ShieldCheck), i18n, типы Wine.
 * Особенности: Расчет цены за литр, статус наличия, кнопки корзины и избранного.
 */

import React from 'react';
import { Heart, ShieldCheck } from 'lucide-react';
import { Wine } from '@/lib/types/wine';

interface WineDetailPurchaseProps {
    wine: Wine;
    isFavorite: boolean;
    onAddToCart: (id: string) => void;
    onToggleWishlist: (id: string) => void;
    premiumPriceLabel: string;
    addToCartLabel: string;
    qualityGuaranteeLabel: string;
    t: (key: string) => string;
}

/**
 * Блок с ценой, количеством и кнопками действий.
 */
export const WineDetailPurchase: React.FC<WineDetailPurchaseProps> = ({
    wine,
    isFavorite,
    onAddToCart,
    onToggleWishlist,
    premiumPriceLabel,
    addToCartLabel,
    qualityGuaranteeLabel,
    t
}) => {
    // Расчет цены за литр (стандартно 0.75л, если не указано иное)
    // Расчет цены за литр (стандартно 0.75л, если не указано иное)
    const unitPrice = (wine.price / 0.75).toFixed(2).replace('.', ',');

    return (
        <div className="mt-auto bg-zinc-900 dark:bg-zinc-900 border border-zinc-800 p-6 md:p-8 rounded-[2rem] text-white">
            <div className="flex flex-col gap-6">
                {/* Секция цены */}
                <div>
                    <span className="text-wine-gold text-[10px] font-black uppercase tracking-[0.2em] mb-2 block">
                        {premiumPriceLabel}
                    </span>
                    <div className="flex flex-wrap items-baseline gap-4 mb-4">
                        <span className="text-4xl md:text-5xl font-black serif italic">
                            {wine.price.toFixed(2).replace('.', ',')} €
                        </span>
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
                            {addToCartLabel}
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
                    {qualityGuaranteeLabel}
                </span>
            </div>
        </div>
    );
};
