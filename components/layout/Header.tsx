/**
 * НАЗНАЧЕНИЕ: Главный компонент шапки сайта (Header).
 * ЗАВИСИМОСТИ: Lucide Icons, useTranslation, useCartStore, useUIStore, useWinesStore, useAuth.
 * ОСОБЕННОСТИ: Прозрачный фон при скролле, выпадающие меню, интеграция с корзиной и поиском.
 */

"use client";

import React, { useState, useEffect, useRef } from "react";
import { useRouter } from "next/navigation";
import { useTranslation } from "@/lib/i18n";
import { useCartStore } from "@/lib/store/useCartStore";
import { useUIStore } from "@/lib/store/useUIStore";
import { useWines } from "@/lib/hooks/useWines";
import { useAuth } from "@/lib/contexts/AuthContext";
import { useWishlistStore } from "@/lib/store/useWishlistStore";

// Импорт суб-компонентов
import TopBar from "./Header/TopBar";
import Navigation from "./Header/Navigation";
import HeaderActions from "./Header/HeaderActions";
import CartDropdown from "./Header/CartDropdown";
import SearchOverlay from "./Header/SearchOverlay";
import MobileMenu from "./Header/MobileMenu";
import Logo from "./Logo";
import AuthModal from "../login/AuthModal";

/**
 * Главный компонент шапки.
 */
export default function Header() {
  const { language, setLanguage, t } = useTranslation();
  const router = useRouter();

  // Состояния из Zustand
  // Состояния из TanStack Query
  const { data: wines = [] } = useWines();
  const { items, removeFromCart, updateQuantity, getTotalPrice } = useCartStore();
  const { wishlist } = useWishlistStore();
  const { isLoggedIn, isAuthModalOpen, setAuthModalOpen } = useAuth();

  // Локальные состояния UI
  const [scrolled, setScrolled] = useState(false);
  const [searchTerm, setSearchTerm] = useState("");
  const [searchOpen, setSearchOpen] = useState(false);
  const [cartDropdownOpen, setCartDropdownOpen] = useState(false);

  // Состояния открытия меню (для десктопа)
  const [moreMenuOpen, setMoreMenuOpen] = useState(false);
  const [eventsMenuOpen, setEventsMenuOpen] = useState(false);
  const [aboutMenuOpen, setAboutMenuOpen] = useState(false);
  const [contactMenuOpen, setContactMenuOpen] = useState(false);

  // Рефы для клика вне области
  const moreMenuRef = useRef<HTMLDivElement>(null);
  const eventsMenuRef = useRef<HTMLDivElement>(null);
  const aboutMenuRef = useRef<HTMLDivElement>(null);
  const contactMenuRef = useRef<HTMLDivElement>(null);
  const cartDropdownRef = useRef<HTMLDivElement>(null);
  const cartButtonRef = useRef<HTMLButtonElement>(null);

  // Количество товаров и общая сумма
  const cartCount = items.reduce((total, item) => total + item.quantity, 0);
  const totalPrice = getTotalPrice(wines);

  // Эффект скролла
  useEffect(() => {
    const handleScroll = () => setScrolled(window.scrollY > 20);
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);


  // Click Outside
  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      const target = event.target as Node;
      if (moreMenuRef.current && !moreMenuRef.current.contains(target)) setMoreMenuOpen(false);
      if (eventsMenuRef.current && !eventsMenuRef.current.contains(target)) setEventsMenuOpen(false);
      if (aboutMenuRef.current && !aboutMenuRef.current.contains(target)) setAboutMenuOpen(false);
      if (contactMenuRef.current && !contactMenuRef.current.contains(target)) setContactMenuOpen(false);
      if (cartDropdownRef.current && !cartDropdownRef.current.contains(target) &&
        cartButtonRef.current && !cartButtonRef.current.contains(target)) {
        setCartDropdownOpen(false);
      }
    };
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  // Данные категорий
  const shopCategories = [
    { label: t("nav_red_wines"), path: "/shop?category=red" },
    { label: t("nav_white_wines"), path: "/shop?category=white" },
    { label: t("wine_type_rose"), path: "/shop?category=rose" },
    { label: t("nav_shop_federle"), path: "/shop?category=federle" },
    { label: t("nav_shop_vfb"), path: "/shop?tag=vfb" },
    { label: t("nav_shop_packages"), path: "/shop?category=package" },
    { label: t("wine_type_sparkling"), path: "/shop?category=sparkling" },
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

  const navigationItems = [
    { label: t("nav_loyalty"), path: "/loyalty" },
  ];

  const handleSearchSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (searchTerm.trim()) {
      router.push(`/shop?search=${encodeURIComponent(searchTerm)}`);
      setSearchOpen(false);
    }
  };

  return (
    <>
      <div className="hidden md:block">
        <TopBar t={t} language={language} setLanguage={setLanguage} />
      </div>

      <header className={`sticky top-0 z-50 transition-all duration-300 ${scrolled ? "bg-white/80 dark:bg-zinc-950/80 backdrop-blur-xl border-b border-zinc-200 dark:border-zinc-800" : "bg-transparent"
        } px-4 md:px-10`}>
        <div className="max-w-7xl mx-auto">
          <div className="flex items-center justify-between py-4 md:py-6">
            <div className="flex items-center gap-8">
              <Logo />
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
              <HeaderActions
                isLoggedIn={isLoggedIn}
                wishlistCount={wishlist.length}
                cartCount={cartCount}
                searchOpen={searchOpen}
                setSearchOpen={setSearchOpen}
                cartDropdownOpen={cartDropdownOpen}
                setCartDropdownOpen={setCartDropdownOpen}
                onUserClick={() => isLoggedIn ? router.push("/dashboard") : setAuthModalOpen(true)}
                onWishlistClick={() => isLoggedIn ? router.push("/shop") : router.push("/shop")} // Wishlist usually on shop or account
                cartButtonRef={cartButtonRef}
              />

              {cartDropdownOpen && (
                <CartDropdown
                  t={t}
                  items={items}
                  wines={wines}
                  getItemCount={() => cartCount}
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

      <AuthModal isOpen={isAuthModalOpen} onClose={() => setAuthModalOpen(false)} />
      <MobileMenu />
    </>
  );
}
