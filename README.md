# ProProjectWineStore

Индивидуально разработанный интернет-магазин вина и портал мероприятий для Fellbacher Weingärtner.

## 🚀 Стек Технологий
* **Frontend:** Next.js 16.1 (App Router), React 19.2.3
* **Styling:** Tailwind CSS 4, HeroUI (NextUI), Framer Motion
* **Data Flow:** TanStack Query v5 (React Query), Zustand (Client State)
* **Backend (Plan):** Spring Boot 3.4 (Java 21), PostgreSQL (Supabase)
* **AI:** Gemini API + pgvector (для AI-Сомелье)
* **i18n:** Собственная система локализации (DE/EN)

## 📁 Полная Структура Проекта (ACTUAL)

```text
proProjectWineStore/
├── .gitignore
├── .npmrc
├── DEVELOPMENT_STANDARDS.md            # Стандарты разработки
├── PLAN.md                             # План развития проекта
├── README.md                           # Документация проекта
├── eslint.config.mjs
├── next-env.d.ts
├── next.config.ts
├── package-lock.json
├── package.json
├── postcss.config.mjs
├── tailwind.config.ts
├── tsconfig.json
├── tsconfig.tsbuildinfo
├── app/                                # App Router (Страницы)
│   ├── favicon.ico
│   ├── globals.css                     # Глобальные стили
│   ├── layout.tsx                      # Корневой Layout
│   ├── page.tsx                        # Главная страница (Home)
│   ├── providers.tsx                   # Глобальные провайдеры
│   ├── (aboutUs)/                      # Группа "О Нас"
│   │   ├── nextGeneration/
│   │   │   └── page.tsx
│   │   ├── ourTeam/
│   │   │   └── page.tsx
│   │   └── whoWeAre/
│   │       └── page.tsx
│   ├── ai-sommelier/                   # AI Сомелье
│   │   └── page.tsx
│   ├── cart/                           # Корзина
│   │   └── page.tsx
│   ├── dashboard/                      # Личный кабинет
│   │   └── page.tsx
│   ├── events/                         # Мероприятия
│   │   ├── [id]/
│   │   │   └── book/
│   │   │       └── page.tsx            # Бронирование
│   │   ├── afterwork/
│   │   │   └── page.tsx
│   │   ├── kellerblicke/
│   │   │   └── page.tsx
│   │   ├── page.tsx                    # Список мероприятий
│   │   ├── wein-weiter/
│   │   │   └── page.tsx
│   │   ├── weinfeste/
│   │   │   └── page.tsx
│   │   ├── weinproben/
│   │   │   └── page.tsx
│   │   └── weintreff/
│   │       └── page.tsx
│   ├── kontakt/                        # Контакты
│   │   └── page.tsx
│   ├── loyalty/                        # Программа лояльности
│   │   ├── page.tsx
│   │   └── qr-code/
│   │       └── page.tsx
│   └── shop/                           # Магазин
│       ├── [wineId]/
│       │   └── page.tsx
│       └── page.tsx                    # Каталог (Infinite Scroll)
├── components/                         # Компоненты UI
│   ├── ai/
│   │   ├── MoodSelector.tsx
│   │   └── SommelierChat.tsx
│   ├── dashboard/
│   │   ├── OrderHistory.tsx
│   │   └── UserProfile.tsx
│   ├── events/
│   │   ├── EventCard.tsx
│   │   ├── EventHero.tsx
│   │   └── EventList.tsx
│   ├── layout/
│   │   ├── BottomNav.tsx
│   │   ├── CookieConsent.tsx
│   │   ├── Footer.tsx
│   │   └── Header.tsx
│   ├── login/
│   │   ├── AuthModal.tsx
│   │   └── LoginForm.tsx
│   ├── ui/
│   │   ├── Skeletons/
│   │   │   ├── EventCardSkeleton.tsx
│   │   │   ├── WineCardSkeleton.tsx
│   │   │   └── WineDetailSkeleton.tsx
│   │   ├── badge.tsx
│   │   ├── button.tsx
│   │   ├── card.tsx
│   │   └── ... (shadcn/ui components)
│   └── wine/
│       ├── ActiveFilters.tsx
│       ├── FilterSection.tsx
│       ├── ProductCard.tsx
│       ├── SidebarFilters.tsx
│       ├── WineCard.tsx
│       └── WineDetail.tsx
├── lib/                                # Бизнес-логика
│   ├── i18n.tsx                        # Контекст локализации
│   ├── api/
│   │   └── products.ts                 # API функции (Mock + Filter)
│   ├── constants/
│   │   ├── contact.ts
│   │   └── navigation.ts
│   ├── contexts/
│   │   ├── AuthContext.tsx
│   │   └── OrdersContext.tsx
│   ├── data/                           # Mock Данные
│   │   ├── events.json
│   │   ├── events.ts
│   │   └── products.json
│   ├── hooks/                          # Кастомные хуки
│   │   ├── useEvents.ts
│   │   └── useWines.ts
│   ├── store/                          # Zustand Stores
│   │   ├── useBookingStore.ts
│   │   ├── useCartStore.ts
│   │   ├── useUIStore.ts
│   │   ├── useWinesStore.ts
│   │   └── useWishlistStore.ts
│   └── types/                          # TypeScript типы
│       ├── event.ts
│       ├── index.ts
│       └── wine.ts
└── public/                             # Статические файлы
    ├── images/
    └── ...
```

## 🛠 Стандарты разработки (Compliance)
Проект строго следует правилам, описанным в `DEVELOPMENT_STANDARDS.md`:
* **Russian Documentation Headers:** Каждый файл снабжен описанием на русском языке.
* **Mobile First:** Все компоненты адаптированы под мобильные устройства в первую очередь.
* **Strict i18n:** Полное отсутствие хардкодного текста. Используется `t()`.
* **Clean Data:** Серверные данные отделены от клиентского стейта через React Query.
