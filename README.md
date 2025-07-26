# BudgetWise - Frontend (Client)

This is the frontend for BudgetWise, a modern full-stack expense tracker application designed to provide users with a clear and easy way to manage their finances. This project was built from scratch to demonstrate modern frontend development best practices.

## ✨ Features

- **Secure User Authentication:** Full registration and login system using JWT.
- **Interactive Dashboard:** A clean and responsive dashboard to view, add, edit, and delete personal expenses.
- **Real-time UI Updates:** The interface updates instantly after every action without page reloads.
- **Modern UI/UX:** Built with Tailwind CSS and shadcn/ui for a professional and user-friendly experience.
- **Toast Notifications:** Provides clear feedback to the user for all actions (success or error).

## 🛠️ Tech Stack

- **Framework:** Next.js (App Router)
- **Language:** TypeScript
- **Styling:** Tailwind CSS
- **UI Components:** shadcn/ui
- **API Communication:** Axios
- **Global State Management:** React Context API

## 🚀 Getting Started

To run this project locally:

1. Clone the repository.
2. Install dependencies:

    ```bash
    npm install
    ```

3. Create a `.env.local` file in the root directory and add the backend API URL:

    ```env
    NEXT_PUBLIC_API_URL=http://localhost:3001
    ```

4. Run the development server:

    ```bash
    npm run dev
    ```
