/**
 * Назначение файла: Список ссылок в подвале сайта.
 * Особенности: Группировка ссылок по категориям (Помощь, Компания), динамическая генерация списков.
 */

"use client";

import React from "react";
import Link from "next/link";

interface FooterLinksProps {
    t: (key: string) => string;
}

/**
 * Блок навигационных ссылок футера.
 */
const FooterLinks: React.FC<FooterLinksProps> = ({ t }) => {
    // Набор ссылок для отображения
    const footerLinks = {
        [t("footer_help")]: [
            { label: t("footer_contact_us"), path: "/contact" },
            { label: t("footer_shipping"), path: "/shipping" },
            { label: t("footer_returns"), path: "/returns" },
        ],
        [t("footer_company")]: [
            { label: t("footer_about_us"), path: "/about" },
            { label: t("footer_careers"), path: "/careers" },
            { label: t("footer_privacy"), path: "/privacy" },
        ],
    };

    return (
        <>
            {Object.entries(footerLinks).map(([category, links]) => (
                <div key={category}>
                    <h3 className="font-black text-xs uppercase tracking-[0.2em] mb-6 text-wine-gold">
                        {category}
                    </h3>
                    <ul className="space-y-4">
                        {links.map((link) => (
                            <li key={link.label}>
                                <Link
                                    href={link.path}
                                    className="text-zinc-400 hover:text-white transition-colors text-sm font-bold"
                                >
                                    {link.label}
                                </Link>
                            </li>
                        ))}
                    </ul>
                </div>
            ))}
        </>
    );
};

export default FooterLinks;
