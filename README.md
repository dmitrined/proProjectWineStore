# ProProject Wine Store (Mono-repo)

## 🍷 Описание Проекта
Современный интернет-магазин вина с элементами AI-сомелье, системой лояльности и организацией мероприятий. Проект построен как монорепозиторий (Turborepo) с использованием Next.js (Frontend) и Spring Boot (Backend).

## 📚 Документация (Documentation)

Вся техническая документация перенесена в папку `/docs`.

### Backend & Database
*   [🗄 Database Schema](docs/database/01_SCHEMA.sql) — Актуальная структура БД (SQL).
*   [🍷 Wine Catalog Module](docs/backend/MODULE_WINE_CATALOG.md) — Сущности и API вин.
*   [📅 Events Module](docs/backend/MODULE_EVENTS.md) — Сущности и API мероприятий.
*   [🤖 AI Sommelier Module](docs/backend/MODULE_AI_SOMMELIER.md) — Логика рекомендаций.

### General
*   [📏 Development Standards](docs/general/DEVELOPMENT_STANDARDS.md) — Стандарты разработки.
*   [🗺 Project Plan](docs/general/PLAN.md) — План развития и статус.

## 🗂 Структура Проекта (ACTUAL)

```text
.
├── apps
│   ├── backend                   # Spring Boot 3.4+ Application
│   │   ├── src/main/java         # Java Source Code (Controllers, Services, Models)
│   │   └── src/main/resources    # Config & Migrations (Liquibase)
│   │
│   └── frontend                  # Next.js 16+ App Router Application
│       ├── app                   # Pages (Shop, Events, AI)
│       ├── components            # React Components
│       └── lib                   # Utilities & Stores
│
├── docs                          # Проектная документация
│   ├── backend                   # Backend модули
│   ├── database                  # Схемы БД
│   ├── frontend                  # (Reserved)
│   └── general                   # Общие стандарты и планы
│
├── package.json
└── turbo.json
```

## ✅ Реализованный Функционал

### Frontend (Next.js)
- **Каталог Вин (`/shop`):** Фильтрация, поиск, детальная страница.
- **AI-Сомелье (`/ai-sommelier`):** Форма подбора вина по блюду и настроению.
- **Мероприятия (`/events`):** Список туров и дегустаций.

### Backend (Spring Boot)
- **API Endpoints:**
  - `WineController` — CRUD (Admin) + Public View.
  - `EventController` — CRUD (Admin) + Public View.
  - `AiController` — Рекомендации (Match Score).
- **Data Model:**
  - Сущности: `User`, `Wine`, `Order`, `Event`, `Booking`.
  - Миграции: Liquibase.

## 🚀 План Развития (Roadmap)
См. [PLAN.md](docs/general/PLAN.md)

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
