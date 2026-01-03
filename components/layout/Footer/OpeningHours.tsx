/**
 * Назначение файла: Компонент для отображения графика работы в подвале.
 * Особенности: Разделение на отдел продаж и офис, поддержка локализации.
 */

"use client";

import React from "react";

interface OpeningHoursProps {
    t: (key: string) => string;
}

/**
 * Блок часов работы.
 */
const OpeningHours: React.FC<OpeningHoursProps> = ({ t }) => {
    return (
        <div className="md:col-span-1 lg:col-span-1">
            <h3 className="font-black text-xs uppercase tracking-[0.2em] mb-6 text-wine-gold">
                {t("footer_opening_hours_title")}
            </h3>
            <div className="space-y-6 text-sm">
                {/* Отдел продаж */}
                <div>
                    <p className="text-white font-bold mb-1">{t("footer_sales_tasting_label")}</p>
                    <p className="text-zinc-400">{t("footer_sales_tasting_hours")}</p>
                </div>
                {/* Офис */}
                <div>
                    <p className="text-white font-bold mb-1">{t("footer_office_label")}</p>
                    <p className="text-zinc-400">{t("footer_office_hours")}</p>
                </div>
            </div>
        </div>
    );
};

export default OpeningHours;
