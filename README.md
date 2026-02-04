# Task Management App

The Task Management application built with React, TypeScript, and Vite. Designed with a clean aesthetic and a scalable architecture.

## 🚀 Key Features

- **Categorized Tasks**: View tasks grouped by status (Pending, In Progress, Completed).
- **Interactive Search**: Real-time filtering of tasks by title or description.
- **Dynamic CRUD**: Seamlessly add, edit, and delete tasks.
- **Status Management**: Custom dropdown for quick status updates with click-outside detection.
- **Modern UI**: Clean typography, smooth transitions, and a responsive floating button interface.
- **100% Verified**: Comprehensive test suite covering 100% of critical logic and lines.

## 🛠 Tech Stack

- **Framework**: React 18+
- **Build Tool**: Vite
- **Language**: TypeScript
- **State Management**: React Hooks (useReducer, useState, useMemo)
- **Styling**: Vanilla CSS (Modern Variable-based Design System)
- **Testing**: Vitest + React Testing Library

## 📦 Installation

To get the project running locally, follow these steps:

1. **Clone the Repository** (assuming you haven't yet):
   ```bash
   git clone https://github.com/mahantesh207/task-management-app.git
   cd task-management-app
   ```

2. **Install Dependencies**:
   ```bash
   npm install
   ```

## 💻 Running the Application

### Development Server
Start the development server with Hot Module Replacement (HMR):
```bash
npm run dev
```
The application will be available at `http://localhost:5173`.

### Production Build
Build the application for production:
```bash
npm run build
```
The output will be in the `dist/` folder. You can preview the production build locally with:
```bash
npm run preview
```

## 🧪 Testing and Coverage

We maintain high architectural standards with near 100% test coverage.

### Run All Tests
```bash
npm test
```

### Run Tests in UI Mode
```bash
npm run test:ui
```

### Generate Coverage Report
```bash
npm run coverage
```
The detailed HTML coverage report can be found in the `coverage/` directory after running this command.

## 🏛 Architecture Overview

The codebase is organized into a feature-oriented structure for maximum scalability:

- **src/components/ui/**: Reusable UI primitives (Buttons, Badges, Dropdowns).
- **src/components/tasks/**: Feature-specific logic and complex components.
- **src/components/layout/**: High-level page structures and headers.
- **Barrel Exports**: Every directory uses `index.ts` files to simplify imports.
- **Named Exports**: Consistent use of named exports for better type inference and refactoring support.
