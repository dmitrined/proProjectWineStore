/**
 * НАЗНАЧЕНИЕ: Конфигурация Next.js.
 * ЗАВИСИМОСТИ: next-pwa.
 * ОСОБЕННОСТИ: Поддержка PWA, автоматическая генерация Service Worker, оптимизация изображений.
 */

import type { NextConfig } from "next";
import withPWAInit from "next-pwa";

const withPWA = withPWAInit({
  dest: "public",
  disable: process.env.NODE_ENV === "development",
  register: true,
  skipWaiting: true,
});

const nextConfig: NextConfig = {
  images: {
    remotePatterns: [
      {
        protocol: 'https',
        hostname: 'fellbacher-weine.de',
        port: '',
        pathname: '/wp-content/uploads/**',
      },
      {
        protocol: 'https',
        hostname: 'placehold.co',
        port: '',
        pathname: '/**',
      },
    ],
  },
  turbopack: {},
};

// @ts-expect-error - next-pwa types are slightly incompatible with latest NextConfig
export default withPWA(nextConfig);


