/**
 * НАЗНАЧЕНИЕ: Конфигурация Tailwind CSS.
 * ЗАВИСИМОСТИ: HeroUI.
 * ОСОБЕННОСТИ: Интеграция с дизайн-системой HeroUI, кастомные пути контента, поддержка темной темы.
 */

import { heroui } from "@heroui/react";
import type { Config } from "tailwindcss";

const config: Config = {
  content: [
    "./app/**/*.{js,ts,jsx,tsx,mdx}",
    "./components/**/*.{js,ts,jsx,tsx,mdx}",
    "./node_modules/@heroui/theme/dist/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {},
  },
  darkMode: "class",
  plugins: [heroui()],
};

export default config;