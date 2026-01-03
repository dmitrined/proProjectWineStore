/**
 * Назначение файла: Компонент-заглушка (Skeleton) для страницы детальной информации о вине.
 * Зависимости: HeroUI (Skeleton).
 * Особенности: Client Component, повторяет структуру WineDetailPage.
 */

"use client";

import React from "react";
import { Skeleton } from "@heroui/react";

/**
 * Скелетон детальной страницы вина.
 */
const WineDetailSkeleton = () => {
    return (
        <div className="min-h-screen bg-white dark:bg-zinc-950 pt-32 pb-24">
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                {/* Скелетон навигации назад */}
                <div className="mb-8 md:mb-12">
                    <Skeleton className="w-48 h-6 rounded" />
                </div>

                <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 md:gap-16">
                    {/* Скелетон секции изображения */}
                    <div className="relative aspect-square md:aspect-auto md:h-[600px] w-full bg-zinc-50 dark:bg-zinc-800 rounded-[3rem] p-12 flex items-center justify-center">
                        <Skeleton className="h-full w-full rounded-2xl" />
                    </div>

                    {/* Скелетон деталей */}
                    <div className="flex flex-col space-y-8">
                        {/* Скелетон заголовка */}
                        <div className="space-y-4">
                            <Skeleton className="w-24 h-6 rounded-full" />
                            <Skeleton className="w-full h-12 rounded-lg" />
                            <Skeleton className="w-1/2 h-4 rounded-full" />
                        </div>

                        {/* Скелетон секции описания */}
                        <div className="space-y-4">
                            <Skeleton className="w-40 h-8 rounded-lg" />
                            <Skeleton className="w-full h-4 rounded-full" />
                            <Skeleton className="w-full h-4 rounded-full" />
                            <Skeleton className="w-3/4 h-4 rounded-full" />
                        </div>

                        {/* Скелетон характеристик */}
                        <div className="grid grid-cols-3 gap-4 py-8 border-y border-zinc-100 dark:border-zinc-800">
                            <Skeleton className="h-20 rounded-2xl" />
                            <Skeleton className="h-20 rounded-2xl" />
                            <Skeleton className="h-20 rounded-2xl" />
                        </div>

                        {/* Скелетон покупки */}
                        <div className="space-y-6">
                            <Skeleton className="w-32 h-10 rounded-lg" />
                            <div className="flex gap-4">
                                <Skeleton className="flex-grow h-16 rounded-2xl" />
                                <Skeleton className="w-16 h-16 rounded-2xl" />
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default WineDetailSkeleton;
