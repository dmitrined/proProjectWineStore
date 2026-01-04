/**
 * НАЗНАЧЕНИЕ: Технические характеристики вина (Wine Tech Stats).
 * ЗАВИСИМОСТИ: Lucide Icons, типы Wine.
 * ОСОБЕННОСТИ: Отображение алкоголя, кислотности и сахара.
 */

import React from 'react';
import { Wine } from '@/lib/types/wine';
import { Percent, Droplets, FlaskConical } from 'lucide-react';

interface Props {
    wine: Wine;
    t: (key: string) => string;
}

/**
 * Блок с основными характеристиками вина (алкоголь, сахар, кислотность).
 */
export const WineDetailStats: React.FC<Props> = ({ wine, t }) => {
    // Поиск атрибутов: Алкоголь, Сахар, Кислотность
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
