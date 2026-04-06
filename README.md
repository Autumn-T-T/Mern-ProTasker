
Pro-Tasker is a full-stack task management application built with the MERN stack (MongoDB, Express, React, Node.js). It allows users to register, log in, create projects, add tasks, and manage their workflow efficiently. The app also features a cute little pink character in the corner that occassionally gives you tips every once in a while

Live URLs
Backend Web Service: https://mern-protasker.onrender.com
Frontend Static Site: https://mern-protasker-frontend.onrender.com
Features
User registration and login with authentication
Create, view, and manage projects
Add, update, and complete tasks within projects
Responsive dashboard and project detail pages
Animated assistant for interactive guidance
Installation & Running Locally
Backend
Clone the repo:
git clone https://github.com/Autumn-T-T/Mern-ProTasker.git
Go to the backend folder:
cd Mern-ProTasker/backend
Install dependencies:
npm install
Set up a .env file with:
MONGO_URI=your_mongodb_connection_string
PORT=5000
Start the backend:
npm run dev
Frontend
Go to the frontend folder:
cd ../frontend/pro-tasker-frontend
Install dependencies:
npm install
Set up a .env file with:
VITE_API_URL=http://localhost:5000
Start the frontend:
npm run dev
API Endpoints
Users
POST /api/users/register – Register a new user
POST /api/users/login – Log in an existing user
GET /api/users/me – Get current logged-in user details
Projects
GET /api/projects – List all projects for the user
POST /api/projects – Create a new project
GET /api/projects/:projectId – Get details of a specific project
PUT /api/projects/:projectId – Update a project
DELETE /api/projects/:projectId – Delete a project
Tasks
GET /api/projects/:projectId/tasks – List all tasks for a project
POST /api/projects/:projectId/tasks – Add a new task
PUT /api/projects/:projectId/tasks/:taskId – Update a task
DELETE /api/projects/:projectId/tasks/:taskId – Delete a task