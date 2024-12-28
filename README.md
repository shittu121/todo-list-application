# Todo List Application

A full-stack Todo List application designed for efficient task management. This project includes user authentication, secure data handling, and comprehensive CRUD operations.

## Live Demo

Frontend is deployed at: [https://todo-list-application-kappa.vercel.app/](https://todo-list-application-kappa.vercel.app/)

## Features

- **User Authentication**
  - Secure user registration and login using backend endpoints.
  - JWT-based authentication for session management.
  - Automatic logout when the token expires.

- **Todo List Management**
  - **Create**: Add new tasks with a title, description, status, and due date.
  - **Read**: View tasks in a responsive and user-friendly interface.
  - **Update**: Edit existing tasks.
  - **Delete**: Remove tasks.

- **User-Specific Data**
  - Todos are private and accessible only to their respective users.

- **Additional Features**
  - Sorting and filtering options for tasks.
  - Dark mode toggle for improved accessibility.
  - User notifications for actions like task creation, updates, and deletions.

## Technologies Used

### Frontend

- React.js
- Shadcn UI
- Zod (for validation)
- TypeScript (for type-safe code)
- Redux (for global state management)
- Vite (as a build tool for fast development)

## Installation and Setup

### Frontend

The frontend is deployed on Vercel, making it easily accessible. Note that the deployed frontend requires a running backend server. Without an active backend, the application will display a failure message due to an inability to connect to the server.

**Live Demo:** [https://todo-list-application-kappa.vercel.app/](https://todo-list-application-kappa.vercel.app/)

### Backend

1. Clone the repository:
   ```bash
   git clone https://github.com/every-vote/hiring-task.git
   ```

2. Install dependencies:
   ```bash
   npm install
   ```

3. Configure the environment:
   - Rename the `.env.example` file to `.env`.
   - Open your MySQL server running.
   - Create a database named `todo_list`.


4. Start the backend server:
   ```bash
   yarn dev
   ```
   - You should see `Server is listening on 8000.` as the server starts. The API base url is `http://localhost:8000/api/v1/auth/`, which is used by the frontend.

## Usage

1. **User Authentication**
   - Register or log in to access the application via the provided backend endpoints.

2. **Adding Todos**
   - Click "Add Todo" and fill in the required details to create a new task.

3. **Managing Todos**
   - View, update, or delete tasks directly from the dashboard.

4. **Sorting and Filtering**
   - Use options to sort or filter tasks based on their status and due date.
   - Search tasks by title or description.

5. **Dark Mode**
   - Switch between light and dark themes for a customized user experience.

---

For further assistance, please contact me via email at shittufaruq6@gmail.com.

