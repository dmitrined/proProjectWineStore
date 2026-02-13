# ProProject Wine Store (Mono-repo)

## 🍷 Описание Проекта
Современный интернет-магазин вина с элементами AI-сомелье, системой лояльности и организацией мероприятий. Проект построен как монорепозиторий (Turborepo) с использованием Next.js (Frontend) и Spring Boot (Backend).

## 🗂 Структура Проекта (ACTUAL)

Полное дерево файлов проекта (исключая системные файлы и зависимости):

```text
.
├── apps
│   ├── backend                   # Spring Boot 3.4+ Application
│   │   ├── pom.xml
│   │   └── src/main/java/com/wine/store
│   │       ├── ProProjectWineStoreApplication.java
│   │       ├── DataInitializer.java
│   │       ├── controller        # REST API Controllers
│   │       │   ├── AiController.java
│   │       │   ├── EventController.java
│   │       │   └── WineController.java
│   │       ├── model             # JPA Entities
│   │       │   ├── Event.java
│   │       │   ├── Order.java
│   │       │   ├── User.java
│   │       │   └── Wine.java
│   │       ├── repository        # Spring Data Repositories
│   │       └── service           # Business Logic
│   │
│   └── frontend                  # Next.js 16+ App Router Application
│       ├── app                   # Pages (App Router)
│       │   ├── page.tsx          # Главная страница (Home)
│       │   ├── shop/             # Каталог вин
│       │   ├── events/           # Страница мероприятий
│       │   ├── ai-sommelier/     # Страница AI-сомелье
│       │   ├── dashboard/        # Личный кабинет пользователя
│       │   ├── loyalty/          # Система лояльности
│       │   ├── cart/             # Корзина
│       │   └── aboutUs/          # О компании
│       ├── components            # React Components
│       │   ├── ai/               # Компоненты AI (Chat, Voice, etc.)
│       │   ├── layout/           # Header, Footer, BottomNav
│       │   ├── login/            # Auth Modals
│       │   ├── wine/             # Карточки вин, фильтры
│       │   └── ui/               # Базовые UI элементы (Buttons, Inputs)
│       ├── lib                   # Utilities & Business Logic
│       │   ├── api/              # API Clients
│       │   ├── contexts/         # React Contexts (Auth, Cart, Strings)
│       │   ├── hooks/            # Custom Hooks
│       │   ├── i18n.tsx          # Internationalization
│       │   └── store/            # Zustand Stores
│       └── public                # Static Assets (Images, Icons)
├── package.json
└── turbo.json
```

## ✅ Реализованный Функционал

### Frontend (Next.js)
- **Пользовательский интерфейс (UI/UX):**
  - Адаптивный дизайн (Mobile-First) с поддержкой темной темы.
  - Анимации перехода и взаимодействия (Framer Motion / CSS).
  - Навигация: Header (Desktop), BottomNav (Mobile).
- **Каталог Вин (`/shop`):**
  - Отображение списка вин с пагинацией/бесконечной прокруткой (Server-Side).
  - Фильтрация (по типу, цене и т.д.) и Сортировка (через Spring Boot API).
  - Детальная страница вина.
- **Интерактив:**
  - Корзина покупок (Client-side state).
  - Список избранного (Wishlist).
  - Регистрация/Вход через модальное окно.
- **AI-Сомелье (`/ai-sommelier`):**
  - Интерфейс чата с сомелье.
  - Выбор настроения, еды и предпочтений.
- **Мероприятия (`/events`):**
  - Список предстоящих дегустаций и винных туров.

### Backend (Spring Boot)
- **API Endpoints:**
  - `WineController` — получение списка вин, динамическая фильтрация (Specification), детальная информация.
  - `EventController` — управление мероприятиями.
  - `AiController` — заглушки для интеграции с AI сервисами.
- **Data Model:**
  - Сущности: `User` (Пользователь), `Wine` (Вино), `Order` (Заказ), `Event` (Мероприятие).
  - Интеграция с базой данных через Spring Data JPA.

## 🚀 План Развития (Roadmap)

В разработке находятся следующие модули:

- [ ] **Backend: Order Processing** — полноценная обработка заказов и интеграция платежей.
- [ ] **Backend: AI Integration** — подключение `Spring AI` для реализации умного поиска и рекомендаций.
- [ ] **Frontend: User Dashboard** — личный кабинет с историей заказов и настройками профиля.
- [ ] **Backend: Security** — настройка Spring Security (JWT/OAuth2) для защиты API.
- [ ] **Loyalty System** — начисление баллов (Cork Points) и уровней лояльности.
- [ ] **Admin Panel** — интерфейс для управления товарами и контентом.

## 🛠 Запуск Проекта

### Требования
- **Java 21** (Обязательно!)
- **Node.js 18+**

### Команды
1. Установка зависимостей:
   ```bash
   npm install
   ```
2. Запуск локальной разработки (Frontend + Backend):
   ```bash
   npx turbo dev
   ```

---

