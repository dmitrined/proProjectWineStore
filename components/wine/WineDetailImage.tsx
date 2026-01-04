/**
 * НАЗНАЧЕНИЕ: Изображение вина на детальной странице (Wine Detail Image).
 * ЗАВИСИМОСТИ: React.
 * ОСОБЕННОСТИ: Эффект увеличения при наведении (scale-105).
 */

import React from 'react';

interface Props {
    image: string;
    name: string;
    year?: number;
}

/**
 * Компонент для визуализации бутылки вина.
 */
export const WineDetailImage: React.FC<Props> = ({ image, name }) => {
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
