/**
 * Назначение файла: Компонент для отображения контактной информации в подвале сайта.
 * Зависимости: React, Next.js Link, константы контактов.
 * Особенности: Стилизованное отображение адреса, телефона и email с поддержкой i18n.
 */

"use client";

import React from "react";
import Link from "next/link";
import { CONTACT_PHONE, CONTACT_EMAIL, CONTACT_ADDRESS } from "@/lib/constants/contact";

interface ContactInfoProps {
    t: (key: string) => string;
}

/**
 * Блок контактной информации.
 */
const ContactInfo: React.FC<ContactInfoProps> = ({ t }) => {
    return (
        <div className="md:col-span-1 lg:col-span-1">
            <h3 className="font-black text-xs uppercase tracking-[0.2em] mb-6 text-wine-gold">
                {t("footer_contact_title")}
            </h3>
            <div className="space-y-4 text-sm">
                {/* Адрес */}
                <div className="text-zinc-400 leading-relaxed font-bold">
                    <p>{CONTACT_ADDRESS.name}</p>
                    <p>{CONTACT_ADDRESS.street}</p>
                    <p>{CONTACT_ADDRESS.city}</p>
                </div>

                {/* Телефон */}
                <div className="space-y-1 font-bold">
                    <p className="text-zinc-400">
                        {t("footer_phone_label")}{" "}
                        <a
                            href={`tel:${CONTACT_PHONE.replace(/\s/g, "")}`}
                            className="text-white hover:text-wine-gold transition-colors"
                        >
                            {CONTACT_PHONE}
                        </a>
                    </p>
                </div>

                {/* Email */}
                <p>
                    <a
                        href={`mailto:${CONTACT_EMAIL}`}
                        className="text-white hover:text-wine-gold transition-colors font-bold underline underline-offset-4 decoration-wine-gold/30 hover:decoration-wine-gold"
                    >
                        {CONTACT_EMAIL}
                    </a>
                </p>

                {/* Ссылка на карту/проезд */}
                <Link
                    href="/directions"
                    className="inline-block text-white hover:text-wine-gold transition-colors font-bold underline underline-offset-4 decoration-zinc-800 hover:decoration-wine-gold mt-4"
                >
                    {t("footer_directions")}
                </Link>
            </div>
        </div>
    );
};

export default ContactInfo;
