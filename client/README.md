# 🔐 MERN Authentication System

A production-ready authentication system built with the **MERN stack** (MongoDB, Express.js, React.js, Node.js), designed with a focus on **security, scalability, and clean architecture**.

This project demonstrates industry-standard practices for implementing authentication workflows, including secure credential handling, token-based authorization, and structured API design.

---

## 🚀 Overview

This application enables users to register, authenticate, and access protected resources through a secure and seamless experience. It follows a modular backend structure and a modern frontend architecture using React and Vite.

---

## ✨ Key Features

* **Secure User Authentication**

  * Registration and login with encrypted passwords
  * JWT-based session management

* **Robust Backend Architecture**

  * MVC-inspired folder structure
  * Centralized error handling and middleware

* **Frontend Experience**

  * Responsive UI built with Tailwind CSS
  * Smooth navigation using React Router
  * Real-time feedback with toast notifications

* **Email Integration**

  * SMTP-based email functionality (e.g., verification or alerts)

* **Protected Routes**

  * Backend route protection using middleware
  * Frontend route guarding for authenticated access

---

## 🏗️ Tech Stack

### Frontend

* React.js (Vite)
* Tailwind CSS
* React Router DOM
* Axios
* React Toastify

### Backend

* Node.js
* Express.js
* MongoDB with Mongoose
* JSON Web Tokens (JWT)
* Bcrypt.js
* Nodemailer

---

## 📁 Project Structure

```
MERN_Authentication/
│
├── client/                # Frontend (React + Vite)
│   ├── src/
│   ├── public/
│   ├── vite.config.js
│   └── package.json
│
├── server/                # Backend (Node.js + Express)
│   ├── controllers/
│   ├── routes/
│   ├── models/
│   ├── middleware/
│   └── package.json
│
└── README.md
```

---

## ⚙️ Getting Started

### 1. Clone the Repository

```bash
git clone https://github.com/jeba57/login-Auth.git
cd login-Auth
```

---

### 2. Configure Backend

```bash
cd server
npm install
```

Create a `.env` file inside the `server` directory:

```
PORT=5000
MONGO_URI=your_mongodb_connection_string
JWT_SECRET=your_jwt_secret
EMAIL_USER=your_email_address
EMAIL_PASS=your_email_password
```

Start the backend server:

```bash
npm run dev
```

---

### 3. Configure Frontend

```bash
cd client
npm install
npm run dev
```

---

## 🔐 Authentication Workflow

1. User submits registration/login credentials
2. Server validates input and hashes passwords
3. JWT token is generated upon successful authentication
4. Token is stored client-side
5. Protected routes validate token for authorized access

---

## 📡 API Overview

| Method | Endpoint           | Description           |
| ------ | ------------------ | --------------------- |
| POST   | /api/auth/register | Register a new user   |
| POST   | /api/auth/login    | Authenticate user     |
| GET    | /api/auth/user     | Retrieve user profile |

---

## 🔧 Future Enhancements

* Role-based access control (RBAC)
* OAuth integration (Google, GitHub)
* Refresh token mechanism
* Dark mode UI
* Deployment (Docker / CI-CD pipeline)

---

## 🧪 Development Notes

* Environment variables are securely managed using `.env`
* Sensitive files are excluded via `.gitignore`
* Dependency consistency ensured with `package-lock.json`

---

## 🤝 Contribution

Contributions, issues, and feature requests are welcome.
Feel free to fork the repository and submit a pull request.

---

## 👤 Author

**Jeba Khatun**
GitHub: https://github.com/jeba57
