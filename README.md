# 📝 Task Manager App (React + TypeScript)

A simple task management application built with **React**, **TypeScript**, and **localStorage persistence**.

The app supports creating, editing, deleting, and filtering tasks, with a clean separation between UI and data logic.

This project was built to practice **React fundamentals, custom hooks, controlled forms, and state management without external libraries**.

---

## ✨ Features

- ✅ Create tasks with title and status
- ✏️ Edit existing tasks
- ❌ Delete tasks
- 🔍 Filter tasks by status (All / Todo / In-Progress / Done)
- 💾 Persist tasks using `localStorage`
- 🧠 Custom React hook for task logic
- 🧾 Controlled form with validation
- 🔁 Single form reused for Create & Edit
- 🧩 Typed with TypeScript end-to-end


---

## 🛠 Tech Stack

- **React**
- **TypeScript**
- **SCSS Modules**
- **localStorage** (persistence)
- **Vite** (or CRA, depending on your setup)

No external state management libraries were used.

---

## 🧠 Architecture Decisions

### Custom Hook (`useTasks`)

All task-related logic is centralized in a custom hook:

- Initial load from `localStorage`
- Fallback to dummy JSON data
- Create / Update / Delete operations
- Automatic persistence on state changes

This keeps components focused on **rendering**, not business logic.

---

### Single Source of Truth

- The task list is managed only inside `useTasks`
- UI components never mutate state directly
- Filtered tasks are derived state, not duplicated data

---

### Form Design

- One form handles both **Create** and **Edit**
- When editing, task data is injected into the form
- Cancel action exits edit mode without mutating data
- Validation is handled at the form level

---

## 🧪 Validation Rules

- Title is required
- Empty or whitespace-only titles are rejected
- Validation errors are displayed inline

---

## 🚀 Getting Started

### 1. Clone the repository

```bash
git clone https://github.com/shkondachki/taskboard.git
cd taskboard
```

### 2. Install dependencies

```bash
npm install
```

### 3. Start the development server

```bash
npm run dev
```

---

## 🗂 Initial Data

On first load:

- Tasks are loaded from a local JSON file
- The data is saved into `localStorage`
- All subsequent operations use `localStorage`

---

## 🎯 Learning Goals

This project focuses on:

- Proper React state management
- Custom hooks
- Controlled components
- Type safety with TypeScript
- Avoiding over-engineering
- Clean and maintainable structure

---

## 📄 License

MIT License