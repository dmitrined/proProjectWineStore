/**
 * Назначение файла: Компонент-заглушка (Skeleton) для карточки мероприятия.
 * Зависимости: HeroUI (Skeleton).
 * Особенности: Client Component, повторяет структуру EventCard с анимацией загрузки.
 */

"use client";

import React from "react";
import { Card, Skeleton } from "@heroui/react";

/**
 * Скелетон карточки мероприятия.
 */
const EventCardSkeleton = () => {
    return (
        <Card className="group relative flex flex-col bg-zinc-50 dark:bg-zinc-900 rounded-[2.5rem] overflow-hidden border border-zinc-100 dark:border-zinc-800 h-full p-0 shadow-none" radius="none">
            {/* Скелетон контейнера изображения */}
            <div className="relative h-72 overflow-hidden">
                <Skeleton className="w-full h-full" />
                <div className="absolute top-6 left-6">
                    <Skeleton className="w-24 h-8 rounded-xl" />
                </div>
            </div>

            {/* Скелетон контента */}
            <div className="p-8 md:p-10 flex flex-col flex-grow space-y-6">
                <div className="flex items-center gap-4">
                    <Skeleton className="w-24 h-4 rounded-full" />
                    <div className="w-1 h-1 bg-zinc-200 dark:bg-zinc-800 rounded-full" />
                    <Skeleton className="w-20 h-4 rounded-full" />
                </div>

                <div className="space-y-3">
                    <Skeleton className="w-full h-8 rounded-lg" />
                    <Skeleton className="w-3/4 h-8 rounded-lg" />
                </div>

                <div className="space-y-4 pt-4">
                    <div className="flex items-center gap-3">
                        <Skeleton className="w-5 h-5 rounded-full" />
                        <Skeleton className="w-40 h-4 rounded-full" />
                    </div>
                    <div className="flex items-center gap-3">
                        <Skeleton className="w-5 h-5 rounded-full" />
                        <Skeleton className="w-32 h-4 rounded-full" />
                    </div>
                </div>

                <div className="mt-auto pt-6">
                    <Skeleton className="w-full h-16 rounded-2xl" />
                </div>
            </div>
        </Card>
    );
};

export default EventCardSkeleton;
