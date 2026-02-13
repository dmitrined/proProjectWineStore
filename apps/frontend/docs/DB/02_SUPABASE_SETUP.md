# ⚡️ Supabase Setup Guide

Инструкция по настройке проекта в Supabase.

## 1. 📦 Project Creation
1. Создайте новый проект: `Fellbach Wine Store`.
2. Регион: **Frankfurt (Germany)** (Важно для GDPR).
3. Сохраните `SUPABASE_URL` и `SUPABASE_ANON_KEY` в `.env` (но не коммитте!).

## 2. 🔐 Authentication
*В разделе Authentication -> Providers:*
1. **Email / Password**: Enabled.
    - Отключите "Confirm email" для разработки (для продакшена включить).
2. **Google Auth** (Опционально):
    - Создайте проект в Google Cloud Console.
    - Получите Client ID / Secret.
3. **Age Verification**:
    - На уровне Supabase Auth нет флага "18+". Мы проверяем это на фронтенде и сохраняем `birth_date` в таблицу `public.profiles`.

## 3. 🤖 AI & Embeddings (pgvector)
Для работы AI-сомелье нам нужна поддержка векторов.
1. Перейдите в **Database -> Extensions**.
2. Найдите `vector`.
3. Нажмите Enable.

Это позволит выполнять SQL-запросы вида:
```sql
SELECT * FROM wines ORDER BY embedding <-> '[0.12, 0.33, ...]' LIMIT 5;
```

## 4. 🗄 Storage (Bucket)
Для хранения картинок вин и мероприятий.
1. Создайте Bucket: `product-images`.
2. Access: **Public**.
3. Policy (Правила доступа):
    - SELECT: All users (Public).
    - INSERT/UPDATE: Authenticated users (Admin only) - *Настроим позже через RLS*.

## 5. 🛡 Security (RLS)
Базовые политики мы накатили в скрипте `01_SCHEMA.sql`.
Важно помнить:
- Таблицы `wines`, `events` должны быть **Read Only** для `anon` пользователей.
- Запись в `wines` только через Service Role (наш Spring Boot Backend).

## 6. 🔗 Spring Boot Connection
В `application.properties` вашего Java проекта:

```properties
spring.datasource.url=jdbc:postgresql://db.YOUR_PROJECT_REF.supabase.co:5432/postgres
spring.datasource.username=postgres
spring.datasource.password=[YOUR_DB_PASSWORD]
spring.jpa.properties.hibernate.dialect=org.hibernate.dialect.PostgreSQLDialect
```
