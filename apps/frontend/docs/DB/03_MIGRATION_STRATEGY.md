# 🚚 Data Migration Strategy

План переноса данных из текущих JSON фалов (`lib/data/*.json`) в PostgreSQL.

## 🛠 Инструменты
Мы напишем простой Node.js скрипт (`scripts/seed-db.js`), используя `supabase-js` клиент. Это быстрее, чем писать Java-миграцию, так как у нас уже есть JSON.

## 1. Подготовка
Установите зависимости в корне проекта (временно):
```bash
npm install @supabase/supabase-js dotenv
```

## 2. Алгоритм Миграции

### Шаг 1: Загрузка Вин (`products.json`)
*   Чтение `lib/data/products.json`.
*   Маппинг полей JSON -> SQL Columns.
    *   `price`: Очистка от валюты (строка -> число).
    *   `tags`: Массив строк сохраняем как PostgreSQL Array.
    *   `type`: Приводим к Upper Case для ENUM (`red` -> `RED`).
*   **Изображения**:
    *   Вариант А: Оставляем ссылки как есть (если они ведут на внешний CDN).
    *   Вариант Б (Правильный): Скрипт скачивает картинку и загружает в Supabase Storage `product-images`, получая новый URL.

### Шаг 2: Векторизация (AI Embedding)
*   *Опционально на этом этапе*.
*   Для каждого вина генерируем текстовое описание: `"{Name} is a {Type} wine with {Grape} grape. Flavor: {Flavor}."`.
*   Отправляем в OpenAI API (`text-embedding-ada-002`).
*   Полученный вектор сохраняем в колонку `embedding`.

### Шаг 3: Загрузка Событий (`events.json`)
*   Аналогично винам.
*   Дата и время: парсим ISO строки в SQL `DATE` и `TIME`.

## 3. Пример скрипта (Draft)

```javascript
/* scripts/seed-db.js */
require('dotenv').config();
const { createClient } = require('@supabase/supabase-js');
const wines = require('../lib/data/products.json');

const supabase = createClient(process.env.SUPABASE_URL, process.env.SUPABASE_SERVICE_KEY);

async function migrateWines() {
  for (const wine of wines) {
    if (!wine.grapeVariety) continue; // Пропускаем не-вина

    const { error } = await supabase.from('wines').insert({
      slug: wine.id, // Используем id как slug пока
      name: wine.name,
      type: wine.type.toUpperCase(),
      price: parseFloat(wine.price),
      description: wine.description,
      // ... mapping other fields
    });

    if (error) console.error('Error inserting:', wine.name, error);
    else console.log('Inserted:', wine.name);
  }
}

migrateWines();
```

## 4. Верификация
После запуска скрипта:
1. Зайти в Supabase Dashboard -> Table Editor.
2. Проверить количество записей.
3. Проверить корректность ENUM полей.
