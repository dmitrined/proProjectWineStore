/**
 * Назначение файла: Описание вкусовых ощущений (Wine Experience).
 * Зависимости: React.
 * Особенности: Использование Tailwind Typography (prose).
 */

import React from 'react';

interface WineDetailExperienceProps {
    title: string;
    description: string;
}

/**
 * Блок с текстом о впечатлениях от дегустации вина.
 */
export const WineDetailExperience: React.FC<WineDetailExperienceProps> = ({ title, description }) => {
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
