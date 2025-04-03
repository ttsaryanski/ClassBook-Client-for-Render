# ClassBook - [Live App](https://classbook-client-for-render.onrender.com) - Render

⚠️ **Note:** The Rest API is hosted on a free-tier service and may take up to **50 seconds to wake up** after a period of inactivity. Please be patient when making the first request.

## Project Overview

This is a Single Page Application (SPA) designed to serve as a school diary. The project includes both public and private sections, following the required specifications. The app demonstrates dynamic functionalities, interaction with the REST API, and the use of core concepts and technologies in React.

⚠️ How to Use the School Diary App:

-   📌Guest Users

    -   Guests can view general school information, available classes, student count per class, and a full list of students.

-   📌Students

    -   During registration, students must enter their 10-digit ID (personal identification number) to link their account to an existing student record. They can then access their personal gradebook.

    -   You can log in as a student using "`student@gmail.com`" with the password "`student`". ⚠️Only Live App!

-   📌Teachers

    -   Teachers register using a "`teacher_secret_key`". After registration, they should update their profile with their subject specialty. They can view their assigned classes and manage student grades with comments.

    -   You can log in as a teacher using "`teacher@gmail.com`" with the password "`teacher`". ⚠️Only Live App!

-   📌Director

    -   The director registers using a "`director_secret_key`". They can add students, create and manage classes, assign teachers, and modify student enrollment.

    -   You can log in as a director using "`director@gmail.com`" with the password "`director`". ⚠️Only Live App!

---

## Features and Functionality

### Public Part

Public Section is accessible to all users and includes:

-   📌**Home Page**: Brief introduction to the school.
-   📌**Classes**: A page listing all existing classes along with their assigned teachers and the number of students in each class.
-   📌**Students**: A page displaying a list of all registered students, showing their average grades.
-   📌**Contacts**: A page with contact information for the school.
-   📌**Help**: A help page that guides users in navigating and using the application.
-   📌**Authentication Forms**: Registration and login forms to access the private part of the app, providing more functionalities.

### Private Part

⚠️ The private section is accessible only to registered users and includes:

-   📌**Personal Gradebook**: A page where students can view their grades, as well as receive comments from teachers.

-   📌**Class Management**: Teachers can view and manage their assigned classes and adding student grades.

-   📌**Student Management**: Directors can add new students, create, edit and delete classes, and assign teachers to the respective classes.

-   📌**User Profile**: A page where each user can edit their personal information and update their profile (e.g., teachers can add their subject specialty).

---

## Technologies and Concepts

### Core Technologies

-   📌**React**: The main library for the client-side part.
-   📌**REST API**: For communication with a remote server.
-   📌**JavaScript**: Used for dynamic interaction within the app.
-   📌**CSS**: For styling and visual presentation.

### Core React Concepts

-   📌**Routing**: React Router is used to manage client-side routing for different pages.
-   📌**Component State**: useState and useReducer are used for managing state within components.
-   📌**React Hooks**: Various hooks like useEffect, useContext are used to manage component behavior and state.
-   📌**Context API**: Used to share state across components without passing props.
-   📌**React Router Guards**: Used to protect both public and private sections of the app (e.g., authentication checks).
-   📌**Styling**: External CSS files are used for styling the components.

### Core Features

-   📌**CRUD Operations**: Full support for creating, reading, updating, and deleting records (e.g., classes, students, and grades).
-   📌**Data Validation**: Client-side validation to prevent errors when entering data.
-   📌**Error Handling**: Management of errors during communication with the REST API, displaying error messages for failed requests.
-   📌**Stay Logged In**: Users remain logged in after a page reload using cookies.

---

## Folder Structure

-   📌The application follows a well-defined folder structure, which ensures maintainability and scalability of the project.

## Bonuses

-   📌**Using a Cloud File Storage API**: Use AWS for uploading files, such as profile pictures.
-   📌**Connecting to an External API**: The contact page integrates a map with location using Google Maps.
-   📌**Deploying the application in the cloud**: The application is deployed on Render.
