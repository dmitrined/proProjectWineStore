"use client";

/**
 * НАЗНАЧЕНИЕ: Страница "Next Generation" (Следующее поколение).
 * ЗАВИСИМОСТИ: React, Framer Motion, i18n.
 * ОСОБЕННОСТИ: Представляет молодежное объединение виноделов, использование чередующегося макета, адаптивность.
 */

import React from 'react';
import { useTranslation } from '@/lib/i18n';
import { motion } from 'framer-motion';

export default function NextGenerationPage() {
    const { t } = useTranslation();

    const fadeIn = {
        hidden: { opacity: 0, y: 30 },
        visible: { opacity: 1, y: 0, transition: { duration: 0.8 } }
    };

    return (
        <div className="min-h-screen bg-white dark:bg-zinc-950 pt-32 pb-24">

            {/* Hero Section */}
            <section className="px-4 sm:px-6 lg:px-8 max-w-7xl mx-auto mb-20 text-center">
                <motion.div
                    initial="hidden"
                    whileInView="visible"
                    viewport={{ once: true }}
                    variants={fadeIn}
                >
                    <span className="text-wine-gold text-xs font-black uppercase tracking-[0.4em] mb-4 block">
                        Fellbacher Weingärtner eG
                    </span>
                    <h1 className="text-4xl md:text-6xl font-black text-wine-dark dark:text-white mb-6 serif">
                        {t("next_gen_hero_title")}
                    </h1>
                    <p className="text-xl text-zinc-600 dark:text-zinc-400 max-w-3xl mx-auto leading-relaxed">
                        {t("next_gen_hero_subtitle")}
                    </p>
                </motion.div>
            </section>

            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-24">

                {/* 1. Wer? (Text Left, Image Right) */}
                <motion.section
                    initial="hidden"
                    whileInView="visible"
                    viewport={{ once: true }}
                    variants={fadeIn}
                    className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center"
                >
                    <div className="order-2 lg:order-1">
                        <h2 className="text-3xl font-black text-wine-dark dark:text-white mb-6 serif">
                            {t("next_gen_wer_title")}
                        </h2>
                        <p className="text-lg text-zinc-600 dark:text-zinc-400 leading-relaxed text-justify">
                            {t("next_gen_wer_text")}
                        </p>
                    </div>
                    <div className="order-1 lg:order-2">
                        <div className="aspect-[3/2] rounded-[2rem] overflow-hidden shadow-2xl">
                            <img
                                src="https://fellbacher-weine.de/wp-content/uploads/2025/03/DSC06931-2048x1365.jpg"
                                alt="Next Generation Team"
                                className="w-full h-full object-cover hover:scale-105 transition-transform duration-700"
                            />
                        </div>
                    </div>
                </motion.section>

                {/* 2. Was? (Image Left, Text Right) */}
                <motion.section
                    initial="hidden"
                    whileInView="visible"
                    viewport={{ once: true }}
                    variants={fadeIn}
                    className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center"
                >
                    <div className="order-1">
                        <div className="aspect-[2/3] lg:aspect-[3/4] rounded-[2rem] overflow-hidden shadow-2xl">
                            <img
                                src="https://fellbacher-weine.de/wp-content/uploads/2025/07/DSC07048-1365x2048.jpg"
                                alt="Winemaking Process"
                                className="w-full h-full object-cover hover:scale-105 transition-transform duration-700"
                            />
                        </div>
                    </div>
                    <div className="order-2">
                        <h2 className="text-3xl font-black text-wine-dark dark:text-white mb-6 serif">
                            {t("next_gen_was_title")}
                        </h2>
                        <p className="text-lg text-zinc-600 dark:text-zinc-400 leading-relaxed text-justify">
                            {t("next_gen_was_text")}
                        </p>
                    </div>
                </motion.section>

                {/* 3. Wo? (Text Left, Image Right) */}
                <motion.section
                    initial="hidden"
                    whileInView="visible"
                    viewport={{ once: true }}
                    variants={fadeIn}
                    className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center"
                >
                    <div className="order-2 lg:order-1">
                        <h2 className="text-3xl font-black text-wine-dark dark:text-white mb-6 serif">
                            {t("next_gen_wo_title")}
                        </h2>
                        <p className="text-lg text-zinc-600 dark:text-zinc-400 leading-relaxed text-justify">
                            {t("next_gen_wo_text")}
                        </p>
                    </div>
                    <div className="order-1 lg:order-2">
                        <div className="aspect-[3/2] rounded-[2rem] overflow-hidden shadow-2xl">
                            <img
                                src="https://fellbacher-weine.de/wp-content/uploads/2025/06/IMG_9890-scaled.jpeg"
                                alt="Fellbach Vineyards"
                                className="w-full h-full object-cover hover:scale-105 transition-transform duration-700"
                            />
                        </div>
                    </div>
                </motion.section>

            </div>
        </div>
    );
}
