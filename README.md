# Қазақ Мәдени Портал

Қазақ халқының бай мәдени мұрасын, дәстүрлерін және заманауи өнерін зерттеуге арналған платформа.

## 🏗️ Архитектура

Система состоит из трех основных компонентов:

- **Backend API** (`kazculture-api`) - NestJS + TypeORM + PostgreSQL + MinIO
- **Публичный портал** (`kazakh-cultural-portal`) - Next.js + React + TanStack Query
- **Админ панель** (`kazakh-admin-dashboard`) - Next.js + React + TanStack Query

## 🚀 Быстрый старт

### 1. Backend API

```bash
cd kazculture-api

# Установка зависимостей
pnpm install

# Настройка базы данных
cp env.example .env
# Отредактируйте .env файл с вашими настройками

# Запуск миграций
pnpm migration:run

# Создание админ пользователя
pnpm seed:admin

# Запуск в режиме разработки
pnpm start:dev
```

Backend будет доступен по адресу: http://localhost:3001

### 2. Публичный портал

```bash
cd kazakh-cultural-portal

# Установка зависимостей
pnpm install

# Создание .env.local
echo "NEXT_PUBLIC_API_URL=http://localhost:3001" > .env.local

# Запуск в режиме разработки
pnpm dev
```

Портал будет доступен по адресу: http://localhost:3000

### 3. Админ панель

```bash
cd kazakh-admin-dashboard

# Установка зависимостей
pnpm install

# Создание .env.local
echo "NEXT_PUBLIC_API_URL=http://localhost:3001" > .env.local

# Запуск в режиме разработки
pnpm dev
```

Админ панель будет доступна по адресу: http://localhost:3002

## 📋 API Endpoints

### Публичные endpoints (без авторизации)

- `GET /articles` - список всех статей
- `GET /articles/:slug` - статья по slug
- `GET /videos` - список видео
- `GET /videos/:id` - видео по ID
- `GET /interviews` - список интервью
- `GET /zhanalyqtar` - список новостей
- `GET /arnaiy-zhobalar` - список специальных проектов
- `GET /search?q=...` - поиск по всему контенту

Все endpoints поддерживают параметр `?lang=kaz|qaz` для выбора языка.

### Админ endpoints (требуют JWT токен)

- `POST /auth/login` - вход для админа
- `GET /admin/users` - список пользователей
- `CRUD /admin/articles` - управление статьями
- `CRUD /admin/videos` - управление видео
- `CRUD /admin/interviews` - управление интервью
- `CRUD /admin/zhanalyqtar` - управление новостями
- `CRUD /admin/arnaiy-zhobalar` - управление проектами
- `POST /admin/upload` - загрузка файлов в MinIO

## 🔐 Аутентификация

### Админ пользователь по умолчанию

После запуска seed скрипта создается админ пользователь:

- **Email**: admin@kazculture.kz
- **Password**: admin123

## 🌐 Мультиязычность

Система поддерживает два языка:
- **kaz** - Қазақша (кириллица)
- **qaz** - Qazaqşa (латиница)

Переключение языка происходит через компонент `LanguageToggle` в публичном портале.

## 📁 Структура проекта

```
caxna-kz/
├── kazculture-api/           # Backend API
│   ├── src/
│   │   ├── articles/         # Модуль статей
│   │   ├── videos/          # Модуль видео
│   │   ├── interviews/      # Модуль интервью
│   │   ├── zhanalyqtar/     # Модуль новостей
│   │   ├── arnaiy-zhobalar/ # Модуль проектов
│   │   ├── auth/            # Аутентификация
│   │   ├── uploads/         # Загрузка файлов
│   │   └── i18n/            # Интернационализация
│   └── ...
├── kazakh-cultural-portal/   # Публичный портал
│   ├── app/                 # Next.js App Router
│   ├── components/          # React компоненты
│   ├── lib/                 # API клиент, утилиты
│   └── ...
└── kazakh-admin-dashboard/  # Админ панель
    ├── app/admin/           # Админ страницы
    ├── components/          # React компоненты
    ├── lib/                 # API клиент, утилиты
    └── ...
```

## 🛠️ Технологии

### Backend
- **NestJS** - фреймворк для Node.js
- **TypeORM** - ORM для работы с базой данных
- **PostgreSQL** - основная база данных
- **MinIO** - объектное хранилище для файлов
- **JWT** - аутентификация
- **bcrypt** - хеширование паролей
- **Swagger** - документация API

### Frontend
- **Next.js 15** - React фреймворк
- **React 18** - UI библиотека
- **TanStack Query** - управление состоянием и кеширование
- **Axios** - HTTP клиент
- **Tailwind CSS** - стилизация
- **shadcn/ui** - UI компоненты

## 📝 Функциональность

### Публичный портал
- ✅ Просмотр статей, новостей, видео, интервью
- ✅ Поиск по всему контенту
- ✅ Мультиязычность (kaz/qaz)
- ✅ Адаптивный дизайн
- ✅ Динамическая маршрутизация

### Админ панель
- ✅ Аутентификация через JWT
- ✅ CRUD операции для всех типов контента
- ✅ Загрузка файлов (изображения, видео)
- ✅ Мультиязычные формы
- ✅ Управление статусами публикации
- ✅ Защищенные маршруты

## 🔧 Разработка

### Добавление нового типа контента

1. **Backend**: Создать модуль в `kazculture-api/src/`
2. **Frontend**: Добавить API функции в `lib/api.ts`
3. **Admin**: Создать страницы CRUD в `app/admin/`
4. **Public**: Создать страницы просмотра в `app/`

### Добавление нового языка

1. Добавить переводы в `kazculture-api/src/i18n/`
2. Обновить типы в `lib/axios.ts`
3. Добавить переключатель в `LanguageToggle`

## 🚀 Production

### Сборка

```bash
# Backend
cd kazculture-api
pnpm build

# Public Portal
cd kazakh-cultural-portal
pnpm build

# Admin Dashboard
cd kazakh-admin-dashboard
pnpm build
```

### Переменные окружения

Создайте `.env.local` файлы в каждом frontend проекте:

```env
NEXT_PUBLIC_API_URL=https://your-api-domain.com
```

## 📄 Лицензия

MIT License

## 🤝 Вклад в проект

1. Fork репозитория
2. Создайте feature branch
3. Внесите изменения
4. Создайте Pull Request

## 📞 Поддержка

По вопросам и предложениям обращайтесь к команде разработки. 