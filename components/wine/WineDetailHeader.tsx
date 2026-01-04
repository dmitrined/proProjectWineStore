/**
 * НАЗНАЧЕНИЕ: Заголовок детальной страницы вина (Wine Detail Header).
 * ЗАВИСИМОСТИ: React, i18n.
 * ОСОБЕННОСТИ: Отображение названия, типа вина и сорта винограда.
 */

import React from 'react';

interface Props {
    type: string;
    name: string;
    grapeVariety: string;
    t: (key: string) => string;
}

/**
 * Компонент заголовка с названием и основной информацией.
 */
export const WineDetailHeader: React.FC<Props> = ({
    type,
    name,
    grapeVariety,
    t
}) => {
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
