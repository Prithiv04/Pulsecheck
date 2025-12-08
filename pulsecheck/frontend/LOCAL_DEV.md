# Local Development Guide

## 1. Backend Setup

1.  Navigate to `backend` folder:
    ```bash
    cd backend
    ```
2.  Install dependencies:
    ```bash
    npm install
    ```
3.  Create a `.env` file in `backend/` with:
    ```
    MONGO_URI=your_mongodb_connection_string
    PORT=10000
    JWT_SECRET=your_secret_key
    ```
    *Note: If you don't have a local MongoDB, you can use a free MongoDB Atlas cluster.*
4.  Start server:
    ```bash
    npm start
    ```
    Server will run at `http://localhost:10000`.

## 2. Frontend Setup

1.  Navigate to `frontend` folder:
    ```bash
    cd frontend
    ```
2.  Install dependencies:
    ```bash
    npm install
    ```
3.  Create/Update `.env` file in `frontend/` for local dev:
    ```
    # For local backend:
    VITE_BACKEND_URL=http://localhost:10000

    # For production backend (default is set to live):
    # VITE_BACKEND_URL=https://pulsecheck-backend-wqx6.onrender.com
    ```
4.  Start React app:
    ```bash
    npm run dev
    ```
    App will run at `http://localhost:5173`.
