# 🌸 Pro-Tasker

Pro-Tasker is a full-stack task management application built with the MERN stack (MongoDB, Express, React, Node.js).

It allows users to register, log in, create projects, add tasks, and manage their workflow efficiently. The app also features a small animated pink assistant that provides occasional tips for guidance.

---

## 🚀 Live Demo

* **Backend Web Service:**
  https://mern-protasker.onrender.com

* **Frontend Static Site:**
  https://mern-protasker-frontend.onrender.com

---

## ✨ Features

* 🔐 User authentication (register, login, logout with JWT)
* 📁 Create, view, update, and delete projects
* ✅ Manage tasks within each project

  * Add tasks
  * Update status (To Do, In Progress, Done)
  * Delete tasks
* 📊 Dashboard for viewing all projects
* 📱 Responsive design (desktop, tablet, mobile)
* 🎀 Animated assistant for user interaction

---

## 🛠️ Tech Stack

**Frontend**

* React (Vite)
* React Router
* Axios

**Backend**

* Node.js
* Express
* MongoDB (Mongoose)

**Authentication**

* JWT (JSON Web Tokens)
* bcrypt (password hashing)

**Deployment**

* Render (Web Service + Static Site)

---

## ⚙️ Installation & Local Setup

### 1. Clone the Repository

```bash
git clone https://github.com/Autumn-T-T/Mern-ProTasker.git
cd Mern-ProTasker
```

---

### 2. Backend Setup

```bash
cd backend
npm install
```

Create a `.env` file:

```env
MONGO_URI=your_mongodb_connection_string
PORT=5000
JWT_SECRET=your_secret_key
```

Start backend:

```bash
npm run dev
```

---

### 3. Frontend Setup

```bash
cd ../frontend/pro-tasker-frontend
npm install
```

Create a `.env` file:

```env
VITE_API_URL=http://localhost:5000
```

Start frontend:

```bash
npm run dev
```

---

## 🔗 API Endpoints

### 👤 Users

| Method | Endpoint            | Description         |
| ------ | ------------------- | ------------------- |
| POST   | /api/users/register | Register a new user |
| POST   | /api/users/login    | Login user          |
| GET    | /api/users/me       | Get current user    |

---

### 📁 Projects

| Method | Endpoint                 | Description           |
| ------ | ------------------------ | --------------------- |
| GET    | /api/projects            | Get all user projects |
| POST   | /api/projects            | Create project        |
| GET    | /api/projects/:projectId | Get project details   |
| PUT    | /api/projects/:projectId | Update project        |
| DELETE | /api/projects/:projectId | Delete project        |

---

### ✅ Tasks

| Method | Endpoint                               | Description             |
| ------ | -------------------------------------- | ----------------------- |
| GET    | /api/projects/:projectId/tasks         | Get tasks for a project |
| POST   | /api/projects/:projectId/tasks         | Create task             |
| PUT    | /api/projects/:projectId/tasks/:taskId | Update task             |
| DELETE | /api/projects/:projectId/tasks/:taskId | Delete task             |

---

## 🔐 Security Features

* Passwords are hashed using bcrypt
* Authentication handled with JWT
* Protected routes require valid tokens
* Users can only access and modify their own data

---

## 📌 Future Improvements

* 👥 Collaboration (invite users to projects)
* 🔔 Notifications
* 📅 Due dates and reminders
* 🎨 UI enhancements and animations

---

## 📖 Project Purpose

This project was built as a MERN stack capstone project, demonstrating:

* Full-stack architecture
* Secure authentication & authorization
* RESTful API design
* React state management and routing
* Deployment with Render

---

## 👤 Author

**Autumn T**
GitHub: https://github.com/Autumn-T-T
