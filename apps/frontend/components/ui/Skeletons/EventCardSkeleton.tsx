/**
 * НАЗНАЧЕНИЕ: Компонент-заглушка (Skeleton) для карточки мероприятия.
 * ЗАВИСИМОСТИ: HeroUI (Skeleton).
 * ОСОБЕННОСТИ: Client Component, точно повторяет структуру EventCard с премиальной анимацией загрузки.
 */

"use client";

import React from "react";
import { Card, Skeleton } from "@heroui/react";

/**
 * Скелетон карточки мероприятия (Events).
 */
const EventCardSkeleton = () => {
    return (
        <Card
            className="group relative flex flex-col bg-zinc-50 dark:bg-zinc-900 rounded-[2.5rem] overflow-hidden border border-zinc-100 dark:border-zinc-800 h-full p-0 shadow-none"
            radius="none"
        >
            {/* Скелетон контейнера изображения */}
            <div className="relative h-72 overflow-hidden bg-zinc-100 dark:bg-zinc-800">
                <Skeleton className="w-full h-full dark:bg-zinc-700/50" />

                {/* Категория (Badge) */}
                <div className="absolute top-6 left-6">
                    <Skeleton className="w-24 h-8 rounded-xl dark:bg-zinc-800" />
                </div>
            </div>

            {/* Скелетон контента */}
            <div className="p-8 md:p-10 flex flex-col flex-grow">
                {/* Дата и Время */}
                <div className="flex items-center gap-4 mb-6">
                    <div className="flex items-center gap-2">
                        <Skeleton className="w-4 h-4 rounded-full dark:bg-zinc-800" />
                        <Skeleton className="w-24 h-3 rounded-full dark:bg-zinc-800" />
                    </div>
                    <div className="w-1 h-1 bg-zinc-200 dark:bg-zinc-800 rounded-full" />
                    <div className="flex items-center gap-2">
                        <Skeleton className="w-4 h-4 rounded-full dark:bg-zinc-800" />
                        <Skeleton className="w-16 h-3 rounded-full dark:bg-zinc-800" />
                    </div>
                </div>

                {/* Заголовок (Title) */}
                <div className="space-y-3 mb-6">
                    <Skeleton className="w-full h-8 md:h-10 rounded-lg dark:bg-zinc-800" />
                    <Skeleton className="w-3/4 h-8 md:h-10 rounded-lg dark:bg-zinc-800" />
                </div>

                {/* Локация и Места */}
                <div className="space-y-4 mb-10 pt-2">
                    <div className="flex items-center gap-3">
                        <Skeleton className="w-5 h-5 rounded-lg dark:bg-zinc-800" />
                        <Skeleton className="w-40 h-4 rounded-full dark:bg-zinc-800" />
                    </div>
                    <div className="flex items-center gap-3">
                        <Skeleton className="w-5 h-5 rounded-lg dark:bg-zinc-800" />
                        <Skeleton className="w-32 h-4 rounded-full dark:bg-zinc-800" />
                    </div>
                </div>

                {/* Кнопка регистрации */}
                <div className="mt-auto">
                    <Skeleton className="w-full h-16 rounded-2xl dark:bg-zinc-800" />
                </div>
            </div>
        </Card>
    );
};

export default EventCardSkeleton;
