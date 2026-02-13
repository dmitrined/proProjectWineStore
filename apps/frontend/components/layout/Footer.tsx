/**
 * Назначение файла: Главный компонент подвала сайта (Footer).
 * Содержит контактную информацию, график работы, ссылки на социальные сети и навигацию по сайту.
 * Особенности: Использование темной темы (zinc-950) для контраста, адаптивная сетка.
 */

"use client";

import React from 'react';
import { useTranslation } from '@/lib/i18n';
import SocialLinks from "./Footer/SocialLinks";
import ContactInfo from "./Footer/ContactInfo";
import OpeningHours from "./Footer/OpeningHours";
import FooterLinks from "./Footer/FooterLinks";
import Logo from "./Logo";

/**
 * Основной компонент Футера.
 */
const Footer: React.FC = () => {
  const { t } = useTranslation();

  return (
    <footer className="bg-zinc-950 text-white border-t border-white/5">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16 md:py-24">
        <div className="grid grid-cols-1 md:grid-cols-4 lg:grid-cols-5 gap-12 md:gap-8">
          {/* Секция Логотипа и Описания */}
          <div className="md:col-span-1 lg:col-span-1">
            <Logo variant="light" className="mb-6" />
            <p className="text-zinc-400 text-sm leading-relaxed max-w-xs mb-8">
              {t("footer_desc")}
            </p>
            <SocialLinks />
          </div>

          {/* Информационные секции */}
          <ContactInfo t={t} />
          <OpeningHours t={t} />
          <FooterLinks t={t} />
        </div>

        {/* Нижняя панель с авторскими правами */}
        <div className="border-t border-white/5 mt-16 pt-8 flex flex-col md:flex-row items-center justify-between gap-4">
          <p className="text-zinc-500 text-xs font-medium">
            &copy; {new Date().getFullYear()} Fellbacher Weingärtner eG.{" "}
            {t("quality_guarantee")}
          </p>
          <div className="flex items-center gap-6">
            <span className="text-zinc-500 hover:text-wine-gold cursor-pointer transition-colors text-[10px] font-black uppercase tracking-widest">
              {t("footer_privacy")}
            </span>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;