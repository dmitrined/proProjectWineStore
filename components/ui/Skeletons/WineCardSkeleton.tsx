/**
 * Назначение файла: Компонент-заглушка (Skeleton) для карточки вина.
 * Зависимости: HeroUI (Skeleton).
 * Особенности: Client Component, повторяет структуру WineCard с анимацией загрузки.
 */

"use client";

import React from "react";
import { Card, Skeleton } from "@heroui/react";

/**
 * Скелетон карточки вина.
 */
const WineCardSkeleton = () => {
    return (
        <Card className="group relative bg-white dark:bg-zinc-900 overflow-hidden rounded-[2.5rem] border border-zinc-100 dark:border-zinc-800 flex flex-col h-full p-0 shadow-none" radius="none">
            {/* Скелетон изображения */}
            <div className="relative h-64 w-full bg-zinc-50 dark:bg-zinc-800 p-4 flex items-center justify-center">
                <Skeleton className="rounded-3xl h-full w-full" />
            </div>

            {/* Скелетон контента */}
            <div className="p-5 flex flex-col flex-grow space-y-4">
                <div className="flex-grow space-y-2">
                    {/* Сорт винограда */}
                    <Skeleton className="w-2/3 h-3 rounded-full" />
                    {/* Название вина */}
                    <Skeleton className="w-full h-6 rounded-lg" />
                    <Skeleton className="w-3/4 h-6 rounded-lg" />
                    {/* Тип вина */}
                    <Skeleton className="w-20 h-5 rounded-full mt-2" />
                </div>

                <div className="mt-6 flex items-center justify-between border-t border-zinc-100 dark:border-zinc-800 pt-4">
                    <div className="flex flex-col">
                        {/* Цена */}
                        <Skeleton className="w-16 h-8 rounded-lg" />
                    </div>

                    {/* Кнопка действия */}
                    <Skeleton className="w-12 h-12 rounded-full" />
                </div>
            </div>
        </Card>
    );
};

export default WineCardSkeleton;
