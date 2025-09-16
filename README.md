# SWAPI React App

Небольшое SPA на **React + TypeScript** с использованием [SWAPI](https://swapi.py4e.com/) (Star Wars API).

## Функционал
- Главная страница: список персонажей со **страничной пагинацией** и **поиском**.
- Детальная страница персонажа: форма редактирования данных.
- Изменения сохраняются:
    - **Draft** — во временной памяти (теряются при перезагрузке).
    - **Save locally** — сохраняет правки в `localStorage`.
- Возможность сброса:
    - **Reset draft** — очистка текущих несохранённых изменений.
    - **Reset changes** — удаление сохранённых изменений из `localStorage`.

## Технологии
- ⚛️ React 18 + React Router
- 📦 TypeScript
- 🎨 MUI (Material UI)
- 🔄 React Query для работы с API
- 🗂 Zustand для хранения draft/saved изменений
- ✅ Vitest + React Testing Library + MSW для тестов

## Установка и запуск
```bash
npm install
npm run dev
