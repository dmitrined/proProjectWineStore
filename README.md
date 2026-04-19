# ProProject Wine Store (Mono-repo)

[🇬🇧 English](#-english) | [🇩🇪 Deutsch](#-deutsch) | [🇷🇺 Русский](#-русский)

---

<a id="-english"></a>
## 🇬🇧 English

### 🍷 Project Description
A modern wine e-commerce platform featuring an AI sommelier, a loyalty system, and event management. The application is built as a monorepo (Turborepo) using Next.js (Frontend) and Spring Boot (Backend).

**Tech Stack:**  
![Turborepo](https://img.shields.io/badge/Turborepo-000000?style=for-the-badge&logo=turborepo&logoColor=white) ![Next.js](https://img.shields.io/badge/Next.js%2016-black?style=for-the-badge&logo=next.js&logoColor=white) ![Spring Boot](https://img.shields.io/badge/Spring%20Boot%203.4-6DB33F?style=for-the-badge&logo=springboot&logoColor=white) ![Java](https://img.shields.io/badge/Java%2021-ED8B00?style=for-the-badge&logo=openjdk&logoColor=white) ![Liquibase](https://img.shields.io/badge/Liquibase-2962FF?style=for-the-badge&logo=liquibase&logoColor=white)

### 📚 Documentation
Technical documentation is located in the `/docs` folder.
*   [🗄 Database Schema](docs/database/01_SCHEMA.sql) — Current DB structure (SQL).
*   [🍷 Wine Catalog Module](docs/backend/MODULE_WINE_CATALOG.md) — Wine entities and API.
*   [📅 Events Module](docs/backend/MODULE_EVENTS.md) — Event entities and API.
*   [🤖 AI Sommelier Module](docs/backend/MODULE_AI_SOMMELIER.md) — Recommendation logic.
*   [📏 Development Standards](docs/general/DEVELOPMENT_STANDARDS.md) — Coding standards.
*   [🗺 Project Plan](docs/general/PLAN.md) — Roadmap and status.

### ✅ Implemented Features
**Frontend (Next.js)**
- **Wine Catalog (`/shop`):** Filtering, search, detailed product pages.
- **AI-Sommelier (`/ai-sommelier`):** Wine selection based on food pairings and mood.
- **Events (`/events`):** List of tours and tastings.

**Backend (Spring Boot)**
- **API Endpoints:** `WineController`, `EventController`, `AiController`.
- **Data Model:** Entities (`User`, `Wine`, `Order`, `Event`, `Booking`), Liquibase migrations.

### 🛠 Running the Project
**Requirements:** Java 21, Node.js 18+

1. Install dependencies:
   ```bash
   npm install
   ```
2. Start local development (Frontend + Backend):
   ```bash
   npx turbo dev
   ```

---

<a id="-deutsch"></a>
## 🇩🇪 Deutsch

### 🍷 Projektbeschreibung
Eine moderne E-Commerce-Plattform für Wein mit KI-Sommelier, Treuesystem und Eventmanagement. Das Projekt ist als Monorepo (Turborepo) aufgebaut, basierend auf Next.js (Frontend) und Spring Boot (Backend).

**Tech Stack:**  
![Turborepo](https://img.shields.io/badge/Turborepo-000000?style=for-the-badge&logo=turborepo&logoColor=white) ![Next.js](https://img.shields.io/badge/Next.js%2016-black?style=for-the-badge&logo=next.js&logoColor=white) ![Spring Boot](https://img.shields.io/badge/Spring%20Boot%203.4-6DB33F?style=for-the-badge&logo=springboot&logoColor=white) ![Java](https://img.shields.io/badge/Java%2021-ED8B00?style=for-the-badge&logo=openjdk&logoColor=white) ![Liquibase](https://img.shields.io/badge/Liquibase-2962FF?style=for-the-badge&logo=liquibase&logoColor=white)

### 📚 Dokumentation
Die gesamte technische Dokumentation befindet sich im Ordner `/docs`.
*   [🗄 Datenbank-Schema](docs/database/01_SCHEMA.sql) — Aktuelle DB-Struktur (SQL).
*   [🍷 Wein-Katalog Modul](docs/backend/MODULE_WINE_CATALOG.md) — API und Entitäten für Weine.
*   [📅 Event Modul](docs/backend/MODULE_EVENTS.md) — API und Entitäten für Veranstaltungen.
*   [🤖 KI-Sommelier Modul](docs/backend/MODULE_AI_SOMMELIER.md) — Empfehlungslogik.
*   [📏 Entwicklungsstandards](docs/general/DEVELOPMENT_STANDARDS.md) — Coding-Richtlinien.
*   [🗺 Projektplan](docs/general/PLAN.md) — Roadmap und Status.

### ✅ Implementierte Funktionen
**Frontend (Next.js)**
- **Weinkatalog (`/shop`):** Filter, Suche, Produktdetailseiten.
- **KI-Sommelier (`/ai-sommelier`):** Weinauswahl passend zu Gericht und Stimmung.
- **Events (`/events`):** Liste von Touren und Verkostungen.

**Backend (Spring Boot)**
- **API Endpunkte:** `WineController`, `EventController`, `AiController`.
- **Datenmodell:** Entitäten (`User`, `Wine`, `Order`, `Event`, `Booking`), Liquibase-Migrationen.

### 🛠 Projekt starten
**Voraussetzungen:** Java 21, Node.js 18+

1. Abhängigkeiten installieren:
   ```bash
   npm install
   ```
2. Lokale Entwicklung starten (Frontend + Backend):
   ```bash
   npx turbo dev
   ```

---

<a id="-русский"></a>
## 🇷🇺 Русский

### 🍷 Описание Проекта
Современный интернет-магазин вина с элементами AI-сомелье, системой лояльности и организацией мероприятий. Проект построен как монорепозиторий (Turborepo) с использованием Next.js (Frontend) и Spring Boot (Backend).

**Tech Stack:**  
![Turborepo](https://img.shields.io/badge/Turborepo-000000?style=for-the-badge&logo=turborepo&logoColor=white) ![Next.js](https://img.shields.io/badge/Next.js%2016-black?style=for-the-badge&logo=next.js&logoColor=white) ![Spring Boot](https://img.shields.io/badge/Spring%20Boot%203.4-6DB33F?style=for-the-badge&logo=springboot&logoColor=white) ![Java](https://img.shields.io/badge/Java%2021-ED8B00?style=for-the-badge&logo=openjdk&logoColor=white) ![Liquibase](https://img.shields.io/badge/Liquibase-2962FF?style=for-the-badge&logo=liquibase&logoColor=white)

### 📚 Документация 
Вся техническая документация перенесена в папку `/docs`.
*   [🗄 Database Schema](docs/database/01_SCHEMA.sql) — Актуальная структура БД (SQL).
*   [🍷 Wine Catalog Module](docs/backend/MODULE_WINE_CATALOG.md) — Сущности и API вин.
*   [📅 Events Module](docs/backend/MODULE_EVENTS.md) — Сущности и API мероприятий.
*   [🤖 AI Sommelier Module](docs/backend/MODULE_AI_SOMMELIER.md) — Логика рекомендаций.
*   [📏 Development Standards](docs/general/DEVELOPMENT_STANDARDS.md) — Стандарты разработки.
*   [🗺 Project Plan](docs/general/PLAN.md) — План развития и статус.

### ✅ Реализованный Функционал
**Frontend (Next.js)**
- **Каталог Вин (`/shop`):** Фильтрация, поиск, детальная страница.
- **AI-Сомелье (`/ai-sommelier`):** Форма подбора вина по блюду и настроению.
- **Мероприятия (`/events`):** Список туров и дегустаций.

**Backend (Spring Boot)**
- **API Endpoints:** `WineController`, `EventController`, `AiController`.
- **Data Model:** Сущности `User`, `Wine`, `Order`, `Event`, `Booking`, миграции Liquibase.

### 🛠 Запуск Проекта
**Требования:** Java 21, Node.js 18+

1. Установка зависимостей:
   ```bash
   npm install
   ```
2. Запуск локальной разработки (Frontend + Backend):
   ```bash
   npx turbo dev
   ```

---

## 🗂 Project Structure / Struktur / Структура

```text
.
├── apps
│   ├── backend                   # Spring Boot 3.4+ Application
│   │   ├── src/main/java         # Java Source Code
│   │   └── src/main/resources    # Config & Migrations (Liquibase)
│   │
│   └── frontend                  # Next.js 16+ App Router Application
│       ├── app                   # Pages (Shop, Events, AI)
│       ├── components            # React Components
│       └── lib                   # Utilities & Stores
│
├── docs                          # Documentation
│
├── package.json
└── turbo.json
```
