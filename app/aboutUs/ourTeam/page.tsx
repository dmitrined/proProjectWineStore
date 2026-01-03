"use client";

/**
 * Страница "Unser Team" (Наша Команда).
 * 
 * Назначение:
 * Отображает список ключевых сотрудников компании в виде карточек.
 * 
 * Технологии:
 * - Tailwind CSS: Сетка Grid для адаптивного отображения (1 колонка на моб, 2 на планшете, 3 на десктопе).
 * - Lucide React: Иконки для контактов (телефон, email).
 * - Framer Motion: Анимация появления карточек.
 */

import React from 'react';
import { useTranslation } from '@/lib/i18n';
import { motion } from 'framer-motion';
import { Mail, Phone, User } from 'lucide-react';

// Интерфейс сотрудника
interface TeamMember {
    id: string;
    name: string;
    descriptionKey: string;
    phone?: string;
    email?: string;
    image?: string;
}

export default function OurTeamPage() {
    const { t } = useTranslation();

    // Список сотрудников (статические данные, пока нет API)
    const teamMembers: TeamMember[] = [
        {
            id: "Thomas Seibold",
            name: "Thomas Seibold",
            descriptionKey: "Vorstandsvorsitzender",
            phone: "0711/578803-10",
            email: "thomas.seibold@fellbacher-weine.de",
            image: "https://fellbacher-weine.de/wp-content/uploads/2024/11/2024-Portraits_Mitarbeiter_cut-1-2048x2048.jpg"
        },
        {
            id: "Gert Seibold",
            name: "Gert Seibold",
            descriptionKey: "stellvertr. Vorstandsvorsitzender",
            phone: "0711/578803-0",
            email: "gert.seibold@fellbacher-weine.de",
            image: "https://fellbacher-weine.de/wp-content/uploads/2024/11/2024-Portraits_Mitarbeiter_cut-15-1024x1024.jpg"
        },
        {
            id: "Joachim Hess",
            name: "Joachim Hess",
            descriptionKey: "Vorstandsmitglied",
            phone: "0711/578803-0",
            email: "joachim.hess@fellbacher-weine.de",
            image: "https://fellbacher-weine.de/wp-content/uploads/2024/11/2024-Portraits_Mitarbeiter_cut-14-1024x1024.jpg"
        },
        {
            id: "Florian Gruner",
            name: "Florian Gruner",
            descriptionKey: "Geschäftsführer Verwaltung",
            phone: "0711/578803-12",
            email: "florian.gruner@fellbacher-weine.de",
            image: "https://fellbacher-weine.de/wp-content/uploads/2024/11/2024-Portraits_Mitarbeiter_cut-8-1024x1024.jpg"
        },
        {
            id: "Albrecht Schurr",
            name: "Albrecht Schurr",
            descriptionKey: "Geschäftsführer Vertrieb",
            phone: "0711/578803-31",
            email: "albrecht.schurr@fellbacher-weine.de",
            image: "https://fellbacher-weine.de/wp-content/uploads/2024/11/2024-Portraits_Mitarbeiter_cut-19-1024x1024.jpg"
        },
        {
            id: "Thomas Zerweck",
            name: "Thomas Zerweck",
            descriptionKey: "Kellermeister",
            phone: "0711/578803-20",
            email: "thomas.zerweck@fellbacher-weine.de",
            image: "https://fellbacher-weine.de/wp-content/uploads/2024/11/2024-Portraits_Mitarbeiter_cut-7-1024x1024.jpg"
        }
    ];

    const fadeIn = {
        hidden: { opacity: 0, y: 20 },
        visible: { opacity: 1, y: 0, transition: { duration: 0.5 } }
    };

    return (
        <div className="min-h-screen bg-white dark:bg-zinc-950 pt-32 pb-24">

            {/* Header Section */}
            <section className="px-4 sm:px-6 lg:px-8 max-w-7xl mx-auto mb-16 text-center">
                <motion.div
                    initial="hidden"
                    animate="visible"
                    variants={fadeIn}
                >
                    <span className="text-wine-gold text-xs font-black uppercase tracking-[0.4em] mb-4 block">
                        {t("team_hero_subtitle")}
                    </span>
                    <h1 className="text-4xl md:text-6xl font-black text-wine-dark dark:text-white mb-6 serif">
                        {t("team_hero_title")}
                    </h1>
                    <p className="text-lg text-zinc-600 dark:text-zinc-400 max-w-2xl mx-auto">
                        {t("team_hero_desc")}
                    </p>
                </motion.div>
            </section>

            {/* Team Grid */}
            <section className="px-4 sm:px-6 lg:px-8 max-w-7xl mx-auto">
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
                    {teamMembers.map((member, idx) => (
                        <motion.div
                            key={member.id}
                            initial={{ opacity: 0 }}
                            whileInView={{ opacity: 1 }}
                            viewport={{ once: true }}
                            transition={{ delay: idx * 0.1, duration: 0.5 }}
                            className="group bg-zinc-50 dark:bg-zinc-900 rounded-3xl overflow-hidden border border-zinc-100 dark:border-zinc-800 md:hover:shadow-xl transition-all duration-300"
                        >
                            {/* Фотография (или заглушка) */}
                            <div className="aspect-[4/5] relative bg-zinc-200 dark:bg-zinc-800 overflow-hidden">
                                {member.image ? (
                                    <img
                                        src={member.image}
                                        alt={member.name}
                                        className="w-full h-full object-cover md:group-hover:scale-105 transition-transform duration-500"
                                    />
                                ) : (
                                    <div className="absolute inset-0 flex flex-col items-center justify-center text-zinc-400 dark:text-zinc-500">
                                        <div className="w-20 h-20 bg-white/50 dark:bg-black/20 rounded-full flex items-center justify-center mb-4">
                                            <User className="w-10 h-10" />
                                        </div>
                                        <span className="text-xs font-bold uppercase tracking-widest px-4 text-center">
                                            {t("team_photo_coming_soon")}
                                        </span>
                                    </div>
                                )}
                            </div>

                            {/* Информация */}
                            <div className="p-8">
                                <h3 className="text-xl font-bold text-wine-dark dark:text-white mb-2 font-serif">
                                    {member.name}
                                </h3>
                                <p className="text-wine-gold text-xs font-bold uppercase tracking-widest mb-6">
                                    {t(member.descriptionKey)}
                                </p>

                                <div className="space-y-3">
                                    {member.phone && (
                                        <div className="flex items-center gap-3 text-zinc-600 dark:text-zinc-400 text-sm group/link">
                                            <div className="w-8 h-8 rounded-full bg-white dark:bg-zinc-800 flex items-center justify-center text-zinc-400 md:group-hover/link:text-wine-gold md:group-hover/link:bg-wine-gold/10 transition-colors">
                                                <Phone className="w-4 h-4" />
                                            </div>
                                            <span>{member.phone}</span>
                                        </div>
                                    )}
                                    {member.email && (
                                        <div className="flex items-center gap-3 text-zinc-600 dark:text-zinc-400 text-sm group/link">
                                            <div className="w-8 h-8 rounded-full bg-white dark:bg-zinc-800 flex items-center justify-center text-zinc-400 md:group-hover/link:text-wine-gold md:group-hover/link:bg-wine-gold/10 transition-colors">
                                                <Mail className="w-4 h-4" />
                                            </div>
                                            <a href={`mailto:${member.email}`} className="md:hover:text-wine-dark md:dark:hover:text-white transition-colors truncate">
                                                {member.email}
                                            </a>
                                        </div>
                                    )}
                                </div>
                            </div>
                        </motion.div>
                    ))}
                </div>
            </section>

        </div>
    );
}
