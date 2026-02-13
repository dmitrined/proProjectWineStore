/**
 * НАЗНАЧЕНИЕ: Компонент-заглушка (Skeleton) для карточки вина.
 * ЗАВИСИМОСТИ: HeroUI (Skeleton).
 * ОСОБЕННОСТИ: Client Component, точно повторяет структуру WineCard с премиальной анимацией загрузки.
 */

"use client";

import React from "react";
import { Card, Skeleton } from "@heroui/react";

/**
 * Скелетон карточки вина с поддержкой адаптивности и темной темы.
 */
const WineCardSkeleton = () => {
    return (
        <Card
            className="group relative bg-white dark:bg-zinc-900 overflow-hidden rounded-[2rem] md:rounded-[2.5rem] border border-zinc-100 dark:border-zinc-800 flex flex-col h-full p-0 shadow-none"
            radius="none"
        >
            {/* Скелетон изображения - Высота совпадает с WineCard */}
            <div className="relative h-32 xs:h-40 md:h-64 w-full bg-zinc-50 dark:bg-zinc-800 p-3 md:p-4 flex items-center justify-center">
                <Skeleton
                    className="rounded-2xl md:rounded-3xl h-full w-full dark:bg-zinc-700/50"
                    disableAnimation={false}
                />
            </div>

            {/* Скелетон контента */}
            <div className="p-2.5 md:p-6 flex flex-col flex-grow space-y-4">
                <div className="flex-grow space-y-3">
                    {/* Сорт винограда и Вкус */}
                    <div className="flex justify-between items-center mb-1 md:mb-2">
                        <Skeleton className="w-1/3 h-2 md:h-3 rounded-full dark:bg-zinc-800" />
                        <Skeleton className="w-1/4 h-2 md:h-3 rounded-full dark:bg-zinc-800" />
                    </div>

                    {/* Название вина */}
                    <div className="space-y-2">
                        <Skeleton className="w-full h-5 md:h-7 rounded-lg dark:bg-zinc-800" />
                        <Skeleton className="w-3/4 h-5 md:h-7 rounded-lg dark:bg-zinc-800" />
                    </div>

                    {/* Edition (Издание) */}
                    <Skeleton className="w-24 h-2 md:h-3 rounded-full mt-2 dark:bg-zinc-800" />
                </div>

                {/* Цена и кнопка покупки */}
                <div className="mt-2 md:mt-6 border-t border-zinc-100 dark:border-zinc-800 pt-3 md:pt-6">
                    <div className="flex items-end justify-between">
                        <div className="flex flex-col space-y-2">
                            {/* Большая цена */}
                            <Skeleton className="w-20 md:w-32 h-6 md:h-10 rounded-lg dark:bg-zinc-800" />
                            {/* Доп. инфо (налог, доставка) */}
                            <Skeleton className="w-24 md:w-40 h-2 md:h-2.5 rounded-full dark:bg-zinc-800" />
                            <Skeleton className="w-20 md:w-32 h-2 md:h-2.5 rounded-full dark:bg-zinc-800" />
                        </div>

                        {/* Кнопка Корзины */}
                        <Skeleton className="w-10 h-10 md:w-12 md:h-12 rounded-xl md:rounded-2xl dark:bg-zinc-800 shadow-xl" />
                    </div>
                </div>
            </div>
        </Card>
    );
};

export default WineCardSkeleton;
