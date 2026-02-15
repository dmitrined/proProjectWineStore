# 🤖 Модуль: AI Sommelier (ИИ Сомелье)

Интеллектуальная система рекомендаций вин на основе предпочтений пользователя.

## 1. 🧠 Algorithm (Match Score Engine)

Используется детерминированный алгоритм взвешенной оценки (**Match Score**).

### Правила оценки (Scoring Rules)

1.  **Dish Match (+50 баллов)**
    *   Прямое совпадение блюда в списке `recommendedDishes` у вина.
2.  **Type Match (+30 баллов)**
    *   Эвристическое соответствие типа вина и категории блюда.
    *   *Пример:* Steak -> RED, Fish -> WHITE/SPARKLING/ROSE, Dessert -> WHITE/SPARKLING.
3.  **Budget Match (+20 баллов)**
    *   Попадание цены вина в выбранный диапазон (`priceRange`).
4.  **Meta Bonuses**
    *   **Featured**: +5 баллов.
    *   **Rating**: Рейтинг * 2 баллов.

## 2. 🔄 API Contracts

### Request (`SommelierRequest`)
```json
{
  "dish": "Steak",           // required
  "occasion": "Dinner",      // optional
  "priceRange": "20-50",     // "under-20", "20-50", "50-plus"
  "mood": "Elegant"          // optional
}
```

### Response (`SommelierResponse`)
```json
[
  {
    "wine": { ...WineDTO... },
    "matchScore": 85,
    "matchReasoning": "Perfect for Steak. Good type match for Steak. Fits your budget."
  }
]
```

## 3. ⚙️ Implementation

*   **Service**: `AiSommelierService.java`
*   **Controller**: `AiController.java` (`POST /api/ai/recommend`)
*   **Logic**: No external API calls. Runs locally in-memory.
