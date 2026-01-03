/**
 * Назначение файла: Конфигурация Next.js.
 * Зависимости: next-pwa.
 * Особенности: Поддержка PWA, автоматическая генерация Service Worker.
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



export default withPWA(nextConfig as any);


