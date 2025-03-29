# Tsvetan Tsaryanski exam project for React February 2025 course in SoftUni

## Project Setup and Start Guide

This guide explains how to install dependencies and start both the server and the client of the project.

### Installation and start the server

1.  Install dependencies for the REST API server:

    Open Terminal, navigate and install:

    -   cd Rest API
    -   npm install

2.  Environment Variables Configuration

    -   **If use local database (e.g., MongoDB Compass) then `CLOUD_DB_URL` you won't need this!!!**
    -   **If you are not going to use the upload functionality from local storage then `AWS_ACCESS_KEY` and `AWS_SECRET_ACCESS_KEY` you won't need them!!!**

    To run this server, you need to set up the following environment variables in a `.env` file located in the root of the server. Here's a brief explanation of each variable:

    -   JWT_SECRET: A secret key used for signing JSON Web Tokens (JWT). This should be a strong, random string.  
         Example: `your_super_secret_key`

    -   CLOUD_DB_URL: The connection string to your cloud database (e.g., MongoDB Atlas). You can use a test database URL if running in a development environment.  
         Example: `mongodb+srv://username:password@cluster0.mongodb.net/dbname`

    -   AWS_ACCESS_KEY: Your AWS Access Key for interacting with AWS services (e.g., S3 for file storage). You can obtain this from your AWS account.

    -   AWS_SECRET_ACCESS_KEY: Your AWS Secret Key, paired with the AWS Access Key. This is also generated in your AWS account.

    Steps to Set Up the `.env` File:

    -   Create a file named `.env` in the root directory of the server.
    -   Add the required environment variables in the following format:

        -   JWT_SECRET = <your-jwt-secret>
        -   CLOUD_DB_URL = <your-cloud-database-url>
        -   AWS_ACCESS_KEY = <your-aws-access-key>
        -   AWS_SECRET_ACCESS_KEY = <your-aws-secret-access-key>

    -   Save the file.

3.  Start the REST API Server:

    -   npm start

If everything is normal you will see the following messages:

    Server running on http://localhost:3000
    Successfully connect to local(cloud) DB!

### Installation and start the client

1.  Install dependencies for the client (SPA):

    Open Terminal, navigate and install:

    -   cd client
    -   npm install

2.  Start the Application:

    -   npm start

The SPA will typically be available at http://localhost:5173.

Ensure the Rets API server is running before starting the SPA to enable proper integration.

<!------------------------------------------------------------------------------------------------------------------------------------------------------------------>

# Cooking Together - [към приложението](https://test-client-hgl0.onrender.com)

## Project Overview

Това е едностранично приложение (Single Page Application), имащо за цел да колекционира и предоставя на своите потребители готварски рецепти. Проектът включва публична и частна част, като спазва зададените изисквания. В приложението демонстрирам динамични функционалности, интеракция с REST API и използването на основни концепции и технологии на Angular.

---

## Features and Functionality

### Public Part

Публичната част е достъпна за всички потребители и включва:

-   **Начална страница**: Приветствие към посетителите и три от рецептите които са събрали най-много потребителски харесвания.
-   **Каталог**: Списък с всички налични рецепти, достъпни за разглеждане.
-   **Търсене**: Възможност за търсене по ключова дума или част от нея.
-   **Детайли**: Подробна информация за конкретена рецепта.
-   **Форми за автентикация**: Регистрация и вход в частната част на приложението предоставяща повече функционалност.

### Private Part

Частната част е достъпна само за регистрирани и вписани потребители и предоставя:

-   **Управление на записи**: Създаване, редактиране и изтриване на собствени рецепти.
-   **Интеракция**: Възможност за поставяне на положителна оценка стига текущия потребител да не е неин автор.
-   **Потребителски профил**: Профила на потребителя включващ списък с добавените от него рецепти и списък с харесаните от него рецепти.

---

## Technologies and Concepts

### Основни технологии

-   **Angular**: Основната рамка за клиентската част.
-   **REST API**: За комуникация с отдалечен сървър.
-   **TypeScript**: Строго типизиране и използване на интерфейси.
-   **RxJS**: Използване на наблюдения и оператори за реактивно програмиране.
-   **CSS**: За стил и визуална презентация.

### Основни Angular концепции

-   **Роутинг**: Клиентски маршрути за различни.
-   **Интерфейси**: Дефинирани са повече от 2 интерфейса за типизиране.
-   **Lifecycle Hooks**: Използвани са специфични lifecycle hooks за управление на компонентите.
-   **RxJS Operators**: Използвани са повече от 2 оператора за обработка на данни.
-   **Pipes**: Използвани са за форматиране на данни.
-   **Route Guards**: За защита на публичната и частната част.

### Функционалности

-   **CRUD Операции**: Пълна поддръжка на създаване, четене, редактиране и изтриване на рецепти.
-   **Валидация на данни**: Клиентска валидация за предотвратяване на грешки.
-   **Обработка на грешки**: Управление на грешки при комуникация с API.
-   **Автоматично оставане вписан**: Потребителите остават вписани след презареждане на страницата.

---

## Folder Structure

Приложението е организирано в добре дефинирана структура, която улеснява поддръжката и разширяването на проекта:

-   `/src/app` - Главната папка за Angular приложението.

    -   `/authenticate` - Модул за автентикация.
    -   `/core` - Основни компоненти в приложението: хедър, футър и компонент за извеждане на грешки.
    -   `/directives` - Директиви за допълнителна логика.
    -   `/home` - Компоненти за началната страница.
    -   `/interceptors` - Интерсептори за обработка на HTTP заявки.
    -   `/page404` - Компоненти за страница "404 - Не е намерено".
    -   `/recipes` - Функционалности, свързани с управление на рецепти:
        -   `/catalog` - Преглед на всички налични рецепти.
        -   `/create` - Създаване на нови рецепти.
        -   `/details` - Детайлен изглед на рецепта.
        -   `/edit` - Редактиране на рецепти.
        -   `/recipe` - Основна логика за отделна рецепта.
        -   `/search` - Търсене на рецепти.
        -   `recipes.service.ts` - Сервиз за работа с данните за рецепти.
    -   `/shared` - Споделени модули и компоненти.
    -   `/types` - Типове и интерфейси за TypeScript.
    -   `/user` - Модули, свързани с потребителите:
        -   `/login` - Компонент за вход.
        -   `/profile` - Управление на потребителския профил.
        -   `/register` - Компонент за регистрация.
        -   `user.service.ts` - Сервиз за управление на данни за потребители.
    -   `/utils` - Помощни функции като `setClasses.ts`.

-   `app.component.*` - Главният компонент на приложението.
-   `app.routes.ts` - Дефинирани маршрути за приложението.
-   `environments/` - Конфигурации за различни среди (production/development).
-   `index.html` - Основният HTML файл на приложението.
-   `main.ts` - Входната точка за Angular приложението.
-   `styles.css` - Глобални стилове.
