# SerenityScheduler

[![Deploy to Cloudflare](https://deploy.workers.cloudflare.com/button)](https://deploy.workers.cloudflare.com/?url=https://github.com/Shivani18012000/generated-app-20251002-015646)

> A visually stunning and elegant web page for booking salon appointments with a seamless, intuitive user experience.

SerenityScheduler is a visually breathtaking, single-page web application for a high-end salon, designed to provide a seamless and luxurious appointment booking experience. The application prioritizes aesthetic elegance and intuitive user interaction. It features a stunning hero section to capture user attention, a beautifully organized grid of salon services, and a streamlined, multi-step booking process encapsulated within a sophisticated modal. The entire experience is designed to be smooth, responsive, and delightful, reflecting the premium quality of the salon itself.

## ✨ Key Features

*   **Elegant & Modern UI**: A minimalist luxury design with a sophisticated color palette and beautiful typography.
*   **Interactive Service Showcase**: A responsive grid of salon services with smooth hover effects and clear calls-to-action.
*   **Seamless Booking Modal**: A multi-step booking process (Service -> Date -> Time -> Details) that never requires a page refresh.
*   **Intuitive Date & Time Selection**: An elegant calendar for date picking and a clean list of available time slots.
*   **Delightful Micro-interactions**: Subtle animations and transitions that enhance the user experience.
*   **Fully Responsive**: A flawless layout that adapts perfectly to all device sizes, from mobile to desktop.
*   **Instant Feedback**: User actions are confirmed with elegant toast notifications.

## 🚀 Technology Stack

*   **Frontend**: [React](https://react.dev/), [Vite](https://vitejs.dev/), [Tailwind CSS](https://tailwindcss.com/)
*   **UI Components**: [shadcn/ui](https://ui.shadcn.com/), [Lucide React](https://lucide.dev/)
*   **State Management**: [Zustand](https://github.com/pmndrs/zustand)
*   **Animation**: [Framer Motion](https://www.framer.com/motion/)
*   **Forms**: [React Hook Form](https://react-hook-form.com/) with [Zod](https://zod.dev/)
*   **Date & Time**: [date-fns](https://date-fns.org/), [React Day Picker](https://react-day-picker.js.org/)
*   **Notifications**: [Sonner](https://sonner.emilkowal.ski/)
*   **Deployment**: [Cloudflare Workers](https://workers.cloudflare.com/)

## 🏁 Getting Started

Follow these instructions to get the project up and running on your local machine for development and testing purposes.

### Prerequisites

Make sure you have the following installed on your system:
*   [Node.js](https://nodejs.org/) (v18 or later recommended)
*   [Bun](https://bun.sh/)

### Installation

1.  **Clone the repository:**
    ```bash
    git clone <repository-url>
    cd serenity_scheduler
    ```

2.  **Install dependencies:**
    This project uses `bun` as the package manager.
    ```bash
    bun install
    ```

### Running the Development Server

To start the local development server, run the following command:

```bash
bun run dev
```

The application will be available at `http://localhost:3000` (or the port specified in your environment).

## 🏗️ Project Structure

The project follows a standard Vite + React structure with some key directories:

*   `src/pages/HomePage.tsx`: The main and only page of the application, containing all sections.
*   `src/components/BookingDialog.tsx`: The core component for the multi-step booking modal.
*   `src/lib/data.ts`: Contains all mock data for salon services and available time slots.
*   `shared/types.ts`: Defines shared TypeScript types for data structures like `Service` and `Booking`.
*   `src/index.css`: Global styles and custom Tailwind CSS theme variables.
*   `src/components/ui/`: Contains all pre-installed shadcn/ui components.

## 📦 Deployment

This application is configured for seamless deployment to Cloudflare Workers.

To deploy the application, ensure you have the `wrangler` CLI installed and configured. Then, run the build and deploy commands:

```bash
# Build the application for production
bun run build

# Deploy to Cloudflare Workers
bun run deploy
```

Alternatively, you can deploy directly from your GitHub repository with a single click.

[![Deploy to Cloudflare](https://deploy.workers.cloudflare.com/button)](https://deploy.workers.cloudflare.com/?url=https://github.com/Shivani18012000/generated-app-20251002-015646)