/**
 * Назначение файла: Корневой макет приложения (Root Layout).
 * Зависимости: Next.js, HeroUI, Lucide React, Framer Motion, Context Providers.
 * Особенности: Server Component, PWA Ready, Mobile-first metadata.
 */

import type { Metadata, Viewport } from "next";
import { Geist, Geist_Mono, Playfair_Display } from "next/font/google";
import "./globals.css";
import { Providers } from "./providers";
import Header from "@/components/layout/Header";
import Footer from "@/components/layout/Footer";
import BottomNav from "@/components/layout/BottomNav";
import CookieConsent from "@/components/layout/CookieConsent";


// Настройка современного шрифта без засечек Geist

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

// Настройка моноширинного шрифта Geist Mono
const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

// Настройка премиального шрифта с засечками Playfair Display для заголовков
const playfair = Playfair_Display({
  variable: "--font-playfair",
  subsets: ["latin"],
  weight: ["400", "700", "900"],
});

// Настройки вьюпорта для мобильных устройств (PWA)
export const viewport: Viewport = {
  themeColor: "#ffffff",
  width: "device-width",
  initialScale: 1,
  maximumScale: 1,
  userScalable: false,
};

// Глобальные метаданные для SEO и PWA
export const metadata: Metadata = {
  title: "Fellbacher Weine | Premium Wine Catalog",
  description: "Discover the finest wines from Fellbacher Weingärtner eG. Browse, rate, and find your perfect pair.",
  manifest: "/manifest.json",
  appleWebApp: {
    capable: true,
    statusBarStyle: "default",
    title: "Fellbacher",
  },
  formatDetection: {
    telephone: false,
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" suppressHydrationWarning>
      <body
        className={`${geistSans.variable} ${geistMono.variable} ${playfair.variable} antialiased`}
        suppressHydrationWarning
      >
        {/* Обертка всеми контекст-провайдерами (Auth, Cart, Wishlist и т.д.) */}
        <Providers>
          {/* Глобальная навигационная панель */}
          <Header />
          {/* Основной контент страницы */}
          <main>

            {children}
          </main>
          {/* Глобальный футер с контактной информацией */}
          <Footer />

          {/* Нижняя навигация для мобильных устройств */}
          <BottomNav />
          <CookieConsent />
        </Providers>
      </body>
    </html>


  );
}