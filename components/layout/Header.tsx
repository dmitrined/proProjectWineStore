/**
 * Назначение файла: Главный компонент шапки сайта (Header).
 * Зависимости: HeroUI, Lucide Icons, useTranslation, useCartStore, useUIStore.
 * Особенности: Прозрачный фон при скролле, выпадающие меню, интеграция с корзиной и поиском.
 */

"use client";

import React, { useState, useEffect, useRef } from "react";
import Link from "next/link";
import { useRouter, usePathname } from "next/navigation";
import {
  Search,
  ShoppingBag,
  User,
  Menu,
  X,
  ChevronDown,
  Heart,
  Phone,
  MapPin,
  Clock
} from "lucide-react";
import { useTranslation } from "@/lib/i18n";
import { useWishlistStore } from "@/lib/store/useWishlistStore";
import { useCartStore } from "@/lib/store/useCartStore";
import { useAuth } from "@/lib/contexts/AuthContext";
import { useWinesStore } from "@/lib/store/useWinesStore";
import AuthModal from "../login/AuthModal";
import TopBar from "./Header/TopBar";
import Navigation from "./Header/Navigation";
import HeaderActions from "./Header/HeaderActions";
import CartDropdown from "./Header/CartDropdown";
import SearchOverlay from "./Header/SearchOverlay";
import Logo from "./Logo";




const Header: React.FC = () => {
  // Хуки для перевода, состояния списков и данных пользователя
  const { language, setLanguage, t } = useTranslation();

  // Zustand Stores
  const wishlist = useWishlistStore(state => state.wishlist);

  const getItemCount = useCartStore(state => state.getItemCount);
  const items = useCartStore(state => state.items);
  const removeFromCart = useCartStore(state => state.removeFromCart);
  const updateQuantity = useCartStore(state => state.updateQuantity);

  const { isLoggedIn, user, isAuthModalOpen, setAuthModalOpen } = useAuth();
  const { wines, fetchProducts } = useWinesStore();

  // Загрузка продуктов если они еще не загружены (для расчета цен в корзине и т.д.)
  useEffect(() => {
    if (wines.length === 0) {
      fetchProducts();
    }
  }, [fetchProducts, wines.length]);

  // Состояния для управления открытием различных меню и модалок
  const [searchOpen, setSearchOpen] = useState(false); // Прямой поиск

  const [moreMenuOpen, setMoreMenuOpen] = useState(false); // Выпадающее меню "Магазин"
  const [cartDropdownOpen, setCartDropdownOpen] = useState(false); // Предпросмотр корзины
  const [searchTerm, setSearchTerm] = useState(""); // Текст поиска

  const router = useRouter();

  // Рефы для отслеживания кликов вне области меню (для их закрытия)
  const moreMenuRef = useRef<HTMLDivElement>(null);
  const cartDropdownRef = useRef<HTMLDivElement>(null);
  const cartButtonRef = useRef<HTMLButtonElement>(null);

  const [eventsMenuOpen, setEventsMenuOpen] = useState(false);
  const eventsMenuRef = useRef<HTMLDivElement>(null);

  const [aboutMenuOpen, setAboutMenuOpen] = useState(false);
  const aboutMenuRef = useRef<HTMLDivElement>(null);

  const [contactMenuOpen, setContactMenuOpen] = useState(false);
  const contactMenuRef = useRef<HTMLDivElement>(null);

  // --- Данные навигации ---
  // Группы ссылок для различных секций меню (Магазин, События, О нас, Контакты)
  const navigationItems = [
    { label: t("nav_loyalty"), path: "/loyalty" },
  ];

  const shopCategories = [
    { label: t("nav_red_wines"), path: "/shop?category=rot" },
    { label: t("nav_white_wines"), path: "/shop?category=weiss" },
    { label: t("wine_type_rose"), path: "/shop?category=rose" },
    { label: t("nav_shop_federle"), path: "/shop?category=federle" },
    { label: t("nav_shop_vfb"), path: "/shop?tag=vfb" },
    { label: t("nav_shop_packages"), path: "/shop?category=weinpakete" },
    { label: t("wine_type_sparkling"), path: "/shop?category=prickelndes" },
    { label: t("nav_shop_alles_gewoehnlich"), path: "/shop?category=magnum-sondereditionen" },
    { label: t("nav_shop_vouchers"), path: "/shop?category=gutscheine" },
    { label: t("nav_shop_presents"), path: "/shop?category=geschenke" },
  ];

  const eventCategories = [
    { label: t("events_all_events"), path: "/events" },
    { label: t("event_weinfeste"), path: "/events/weinfeste" },
    { label: t("event_weinproben"), path: "/events/weinproben" },
    { label: t("event_afterwork"), path: "/events/afterwork" },
  ];

  const aboutCategories = [
    { label: t("about_we_about_us"), path: "/aboutUs/whoWeAre" },
    { label: t("about_team"), path: "/aboutUs/ourTeam" },
    { label: t("about_next_generation"), path: "/aboutUs/nextGeneration" },
  ];

  const contactCategories = [
    { label: t("contact_info_hours"), path: "/contact" },
    { label: t("contact_directions"), path: "/contact" },
    { label: t("contact_jobs"), path: "/contact" },
  ];

  // Эффект Click Outside: закрывает все открытые меню, если клик произошел вне их области.
  // Это обеспечивает UX, привычный для пользователей веба (закрытие по клику в пустоту).
  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (moreMenuRef.current && !moreMenuRef.current.contains(event.target as Node)) {
        setMoreMenuOpen(false);
      }
      if (eventsMenuRef.current && !eventsMenuRef.current.contains(event.target as Node)) {
        setEventsMenuOpen(false);
      }
      if (aboutMenuRef.current && !aboutMenuRef.current.contains(event.target as Node)) {
        setAboutMenuOpen(false);
      }
      if (contactMenuRef.current && !contactMenuRef.current.contains(event.target as Node)) {
        setContactMenuOpen(false);
      }
      if (
        cartDropdownRef.current &&
        !cartDropdownRef.current.contains(event.target as Node) &&
        cartButtonRef.current &&
        !cartButtonRef.current.contains(event.target as Node)
      ) {
        setCartDropdownOpen(false);
      }
    };

    document.addEventListener("mousedown", handleClickOutside);
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, []);

  // Обработчик отправки поискового запроса
  const handleSearchSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (searchTerm.trim()) {
      router.push(`/shop?search=${encodeURIComponent(searchTerm)}`);
      setSearchOpen(false);
    }
  };

  // Вычисление общей стоимости корзины "на лету"
  const totalPrice = useCartStore(state => state.getTotalPrice());

  return (
    <>
      {/* Верхняя тонкая полоса с выбором языка и промо-текстом (скрыта на мобильных) */}
      <div className="hidden md:block">
        <TopBar t={t} language={language} setLanguage={setLanguage} />
      </div>


      <header className="sticky top-0 z-50 bg-white/80 dark:bg-zinc-950/80 backdrop-blur-xl border-b border-zinc-200 dark:border-zinc-800 px-4 md:px-10">
        <div className="max-w-7xl mx-auto">
          <div className="flex items-center justify-between py-4 md:py-6">
            <div className="flex items-center gap-8">
              {/* Логотип компании */}
              <Logo />


              {/* Основная навигация (Десктоп) */}
              <Navigation
                t={t}
                moreMenuOpen={moreMenuOpen}
                setMoreMenuOpen={setMoreMenuOpen}
                moreMenuRef={moreMenuRef}
                eventsMenuOpen={eventsMenuOpen}
                setEventsMenuOpen={setEventsMenuOpen}
                eventsMenuRef={eventsMenuRef}
                aboutMenuOpen={aboutMenuOpen}
                setAboutMenuOpen={setAboutMenuOpen}
                aboutMenuRef={aboutMenuRef}
                contactMenuOpen={contactMenuOpen}
                setContactMenuOpen={setContactMenuOpen}
                contactMenuRef={contactMenuRef}
                navigationItems={navigationItems}
                shopCategories={shopCategories}
                eventCategories={eventCategories}
                aboutCategories={aboutCategories}
                contactCategories={contactCategories}
              />
            </div>

            <div className="relative">
              {/* Кнопки действий: Поиск, Аккаунт, Избранное, Корзина */}
              <HeaderActions
                isLoggedIn={isLoggedIn}
                wishlistCount={wishlist.length}
                cartCount={getItemCount()}
                searchOpen={searchOpen}
                setSearchOpen={setSearchOpen}
                cartDropdownOpen={cartDropdownOpen}
                setCartDropdownOpen={setCartDropdownOpen}
                onUserClick={() =>
                  isLoggedIn ? router.push("/dashboard") : setAuthModalOpen(true)
                }
                onWishlistClick={() =>
                  isLoggedIn ? router.push("/dashboard?tab=wishlist") : setAuthModalOpen(true)
                }
                cartButtonRef={cartButtonRef}
              />

              {/* Всплывающее окно предпросмотра корзины */}
              {cartDropdownOpen && (
                <CartDropdown
                  t={t}
                  items={items}
                  wines={wines}
                  getItemCount={getItemCount}
                  totalPrice={totalPrice}
                  updateQuantity={updateQuantity}
                  removeFromCart={removeFromCart}
                  setCartDropdownOpen={setCartDropdownOpen}
                  cartDropdownRef={cartDropdownRef}
                />
              )}
            </div>
          </div>
        </div>

        {/* Оверлей полноэкранного поиска */}
        {searchOpen && (
          <SearchOverlay
            t={t}
            searchTerm={searchTerm}
            setSearchTerm={setSearchTerm}
            setSearchOpen={setSearchOpen}
            handleSearchSubmit={handleSearchSubmit}
          />
        )}
      </header>





      {/* Модальное окно входа / регистрации */}
      <AuthModal isOpen={isAuthModalOpen} onClose={() => setAuthModalOpen(false)} />
    </>
  );
};

export default Header;
