# 📚 XLMS - Library Management System

A modern, full-featured **Library Management System** built with **Next.js** and **React**, designed to simplify and automate library operations — from cataloging and reservations to book lending and returns.

---

<p align="center">
  <img src="https://img.shields.io/badge/Next.js-000000?style=for-the-badge&logo=nextdotjs&logoColor=white" alt="Next.js">
  <img src="https://img.shields.io/badge/React-20232A?style=for-the-badge&logo=react&logoColor=61DAFB" alt="React">
  <img src="https://img.shields.io/badge/TailwindCSS-38B2AC?style=for-the-badge&logo=tailwindcss&logoColor=white" alt="TailwindCSS">
  <img src="https://img.shields.io/badge/MS%20SQL-CC2927?style=for-the-badge&logo=microsoftsqlserver&logoColor=white" alt="MS SQL">
  <img src="https://img.shields.io/badge/NextAuth.js-000000?style=for-the-badge&logo=auth0&logoColor=white" alt="NextAuth.js">
  <img src="https://img.shields.io/badge/FastAPI-005571?style=for-the-badge&logo=fastapi&logoColor=white" alt="FastAPI">
</p>

---

## 🧭 **Table of Contents**

* [Overview](#-overview)
* [Project Architecture](#-project-architecture)
* [Installation](#️-installation)
* [Usage](#️-usage)
* [Features](#-features)
* [Technologies Used](#-technologies-used)
* [Contributing](#-contributing)
* [Support](#-support)

---

## 🏗️ **Overview**

**XLMS (Xheikh Library Management System)** is a comprehensive web-based application that empowers libraries to streamline their daily operations. It offers intuitive tools for **borrowing**, **reservations**, **returns**, and **inventory management**, ensuring an efficient experience for both administrators and library members.

Built with a focus on scalability, security, and user-friendliness, XLMS features a responsive interface that works seamlessly across devices. Whether you're a librarian managing stock or a patron discovering new reads, XLMS makes library interactions effortless and enjoyable.

---

## 🔄 **Project Architecture**

XLMS follows a **modular, layered architecture** to ensure clean separation of concerns, scalability, and maintainability. The system is divided into three core layers: **Frontend**, **Backend API**, and **Database**.

### High-Level Flow

- **Frontend (Client-Side)**: Handles user interactions, rendering, and state management using Next.js and React.
- **Backend (Server-Side)**: Processes business logic, authentication, and data validation via FastAPI with SQLAlchemy ORM.
- **Database**: Stores persistent data in Microsoft SQL Server, with secure CRUD
  operations.

## ⚙️ **Installation**

To get started with XLMS on your local system, follow these steps. Note: You'll need Node.js (v18+), Python (v3.10+), and MS SQL Server installed.

### Frontend (Client)

```bash
# 1️⃣ Clone the repository
git clone https://github.com/moeez5251/Library-Management-System-Client.git

# 2️⃣ Navigate to the project directory
cd Library-Management-System-Client

# 3️⃣ Install dependencies
npm install

# 4️⃣ Run the development server
npm run dev
```

Visit your app at 👉 **[http://localhost:3000](http://localhost:3000)**

---

## 🚀 **Usage**

Once set up, dive into XLMS with these core workflows:

- **👤 Authentication**: Login/Register as a **Member** or **Admin** using NextAuth.js (supports email/password or OAuth).
- **📚 Catalog Exploration**: Search and filter books by title, author, genre, or availability.
- **🔖 Reservations**: Place holds on out-of-stock items with automatic notification on availability.
- **🔄 Borrowing & Returns**: Issue/return books with due date calculations and fine tracking.
- **📊 Personal Dashboard**: View borrowing history, overdue alerts, and recommendations.
- **🔔 Real-Time Updates**: In-app notifications via Sonner for reservations, returns, and reminders.
- **💬 Support Hub**: Access FAQs, contact forms, and admin chat integration.

Pro Tip: Admins can access a dedicated panel for inventory audits and user management.

---

## ✨ **Features**

| Category                        | Feature Description                                                           |
| ------------------------------- | ----------------------------------------------------------------------------- |
| 👤**User Management**     | Secure authentication & role-based access (Admin/Member) via NextAuth.js      |
| 📚**Dynamic Catalog**     | Advanced search, filtering, and sorting with real-time availability checks    |
| 🔖**Smart Reservations**  | Queue-based holds with auto-assignment and email/SMS notifications            |
| 🔄**Lending Workflow**    | Automated borrowing, returns, due dates, and overdue fine calculations        |
| 🔔**Notification System** | Toast alerts and push notifications using Sonner for key events               |
| 📊**Analytics Dashboard** | Personalized history, stats, and exportable reports (CSV/PDF)                 |
| 💬**Support Interface**   | Built-in FAQ, ticket system, and feedback forms                               |
| 📱**Responsive Design**   | Mobile-first UI optimized for tablets, phones, and desktops with Tailwind CSS |
| 🔒**Security**            | JWT tokens, input validation (Pydantic), and SQL injection prevention         |

---

## 🧰 **Technologies Used**

| Category                     | Technologies & Tools                                                                                                                                                                                                                                                                                                                          |
| ---------------------------- | --------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| **Frontend**           | ![Next.js 14](https://img.shields.io/badge/Next.js%2014-000000?style=for-the-badge&logo=nextdotjs&logoColor=white) ![React 18](https://img.shields.io/badge/React%2018-20232A?style=for-the-badge&logo=react&logoColor=%2361DAFB) ![TypeScript](https://img.shields.io/badge/TypeScript-007ACC?style=for-the-badge&logo=typescript&logoColor=white) |
| **Styling & UI**       | ![Tailwind CSS](https://img.shields.io/badge/Tailwind%20CSS-38B2AC?style=for-the-badge&logo=tailwind-css&logoColor=white) ![Lucide React Icons](https://img.shields.io/badge/Lucide-000000?style=for-the-badge&logo=lucide&logoColor=white)                                                                                                      |
| **Authentication**     | ![NextAuth.js v5](https://img.shields.io/badge/NextAuth.js%20v5-000000?style=for-the-badge&logo=auth0&logoColor=white)                                                                                                                                                                                                                          |
| **Notifications**      | ![Sonner](https://img.shields.io/badge/Sonner-000000?style=for-the-badge&logo=sonner&logoColor=white)                                                                                                                                                                                                                                           |
| **Backend Framework**  | ![FastAPI](https://img.shields.io/badge/FastAPI-005571?style=for-the-badge&logo=fastapi&logoColor=white)                                                                                                                                                                                                                                        |
| **Database & ORM**     | ![Microsoft SQL Server](https://img.shields.io/badge/Microsoft%20SQL%20Server-CC2927?style=for-the-badge&logo=microsoft-sql-server&logoColor=white)                                                                                                                                                                                            |
| **Validation & Utils** | ![Pydantic v2](https://img.shields.io/badge/Pydantic%20v2-E92063?style=for-the-badge&logo=pydantic&logoColor=white) ![Alembic](https://img.shields.io/badge/Alembic-4CB8C4?style=for-the-badge&logo=alembic&logoColor=white)                                                                                                                     |
| **Deployment**         | ![Netlify](https://img.shields.io/badge/Netlify-00C7B7?style=for-the-badge&logo=netlify&logoColor=white)   ![Docker](https://img.shields.io/badge/Docker-2496ED?style=for-the-badge&logo=docker&logoColor=white)    ![Render](https://img.shields.io/badge/Render-000000?style=for-the-badge&logo=render&logoColor=white)                           |
| **Testing & CI/CD**    | ![Git & GitHub](https://img.shields.io/badge/Git%20&%20GitHub-000000?style=for-the-badge&logo=github&logoColor=white)                                                                                                                                                                                                                           |

---

## 🤝 **Contributing**

We love contributions! Whether it's bug fixes, new features, or documentation improvements, your input helps XLMS grow. 🌱

### Quick Start

1. **Fork** the repo and **clone** your fork:
   ```bash
   git clone https://github.com/YOUR_USERNAME/Library-Management-System-Client.git
   cd Library-Management-System-Client
   ```
2. **Create a feature branch**:
   ```bash
   git checkout -b feature/amazing-new-feature
   ```
3. **Commit your changes**:
   ```bash
   git commit -m "feat: add amazing new feature"
   ```
4. **Push to the branch**:
   ```bash
   git push origin feature/amazing-new-feature
   ```
5. **Open a Pull Request** on GitHub — we'll review it promptly! 🚀

---

## 💬 **Support**

Encountering issues? We'd love to help!

- 🐛 **Report Bugs**: [Open an Issue](https://github.com/moeez5251/Library-Management-System-Client/issues/new)
- 💡 **Feature Requests**: Start a [Discussion](https://github.com/moeez5251/Library-Management-System-Client/discussions)
- 📚 **Documentation**: Check [Wiki](https://github.com/moeez5251/Library-Management-System-Client/wiki)
- 📧 **Contact**: Reach out via GitHub or email (moeez@example.com)

---

## 📄 **License**

This project is licensed under the MIT License.

---

## 🌟 **Show Your Support**

Loving XLMS? Show some love! ❤️

- ⭐ **Star** the repo on GitHub
- 🐛 **Report Issues** to help improve it
- 📢 **Share** with fellow developers and library enthusiasts

Thanks for checking out XLMS — let's build better libraries together! 🚀
