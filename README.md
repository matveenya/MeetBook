# MeetBook Frontend

The client-side application for the **MeetBook** booking system, built with **Vue 3**, **TypeScript**, and **Vite**. This application features an interactive calendar, a comprehensive authentication system including Google OAuth, and a custom UI kit.

## 🚀 Tech Stack

* **Framework:** [Vue 3](https://vuejs.org/) using the Composition API and `<script setup>`.
* **Build Tool:** [Vite 7](https://vitejs.dev/).
* **Language:** [TypeScript](https://www.typescriptlang.org/).
* **State Management:** [Pinia](https://pinia.vuejs.org/).
* **Styling:** [Tailwind CSS 4](https://tailwindcss.com/).
* **UI Components:** [PrimeVue 4](https://primevue.org/) with the **Aura** theme.
* **Calendar:** [FullCalendar 6](https://fullcalendar.io/) (Resource TimeGrid).
* **Form Management:** [Vee-Validate](https://vee-validate.logaretm.com/v4/) + [Zod](https://zod.dev/).
* **Authentication:** [vue-auth3](https://github.com/websanova/vue-auth3).

## ✨ Features

* **Interactive Dashboard:** A centralized view for managing bookings and schedules using FullCalendar with integrated resource management.
* **Resource Management:** Dynamically loads members (resources) from the backend API for calendar assignment.
* **Secure Routing:** Navigation guards that verify authentication status and wait for the auth driver to be ready before granting access to protected routes.
* **OAuth2 Integration:** Native support for Google Authentication.
* **Token Refresh:** Automated JWT handling using Axios interceptors to refresh access tokens via the `/auth/refresh` endpoint.
* **Custom UI Kit:** Reusable atomic components including `Button`, `Input`, and `SidebarItem` with specialized variants and Tailwind CSS integration.

## ⚙️ Setup & Installation

### Prerequisites
* Node.js (v20+ recommended)
* [pnpm](https://pnpm.io/) package manager

### Installation
1.  Clone the repository.
2.  Install dependencies:
    ```bash
    pnpm install
    ```
3.  Create a `.env` file in the root directory:
    ```env
    VITE_API_BASE_URL=http://localhost:3001
    VITE_CLIENT_ID=your_google_client_id
    ```

### Development
Run the development server:
```bash
pnpm run dev