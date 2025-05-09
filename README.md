# Student Management Platform (SPA)

A responsive, single‑page application built with **React** that lets administrators:

* View, sort, and search a roster of students
* Add new students with validation and instant table refresh
* Chat with each student in an advisor–student style messaging window

All data lives **in the browser only** (no backend) and is persisted via `localStorage` so your work survives a refresh.

---

## 🌟 Project Overview

| Area                    | Highlights                                                                           |
| ----------------------- | ------------------------------------------------------------------------------------ |
| **Tech Stack**          | React 18, React Router, Context API, Tailwind CSS, Heroicons, nanoid                 |
| **State & Persistence** | Context stores students + chat threads<br>Automatically serialized to `localStorage` |
| **Routing**             | `/students` & `/chat` with deep‑link support and last‑view persistence               |
| **Responsiveness**      | Flex/Gird layouts & Tailwind breakpoints for mobile → desktop                        |
| **Extras**              | Demo seed data, automatic welcome message for new students                           |

---

## 🚀 Setup Instructions

> **Prerequisites:** Node ≥ 18 & npm ≥ 9 installed.

```bash
# 1 ‒ Create a new CRA worktree (or use an empty folder)
npx create-react-app student-management-platform
cd student-management-platform

# 2 ‒ Install dependencies we used
npm install react-router-dom classnames nanoid @heroicons/react tailwindcss postcss autoprefixer

# 3 ‒ Initialize Tailwind (one‑time)
npx tailwindcss init -p
#   → replace the generated tailwind.config.js content with the snippet in src/index.css if you like

# 4 ‒ Drop the codebase from the /src directory in the canvas into your local /src

# 5 ‒ Start hacking 🔥
npm start
```

<details>
<summary>Tailwind quick patch</summary>
Add the Tailwind directives to <code>src/index.css</code>:

```css
@tailwind base;
@tailwind components;
@tailwind utilities;
```

</details>

---

## 🧩 Explanation of the Approach

### 1. Component & Folder Structure

```
/src
 ├─ pages/          // route‑level views
 │   ├─ StudentsPage.jsx
 │   └─ ChatPage.jsx
 ├─ components/     // reusable UI pieces
 │   ├─ Navigation.jsx
 │   ├─ StudentTable.jsx
 │   ├─ AddStudentForm.jsx
 │   ├─ ThreadList.jsx
 │   └─ MessageWindow.jsx
 ├─ context/
 │   └─ StudentContext.jsx   // global state + helpers
 ├─ App.jsx        // routes + layout shell
 └─ index.js       // entry point
```

### 2. State Management & Persistence

* **Context API** keeps global `students` and `threads`, exposing helpers `addStudent` & `sendMessage`.
* Each mutation immediately syncs to `localStorage`; data is re‑hydrated on load for a true SPA feel without a server.

### 3. Routing & UX

* **React Router v6** provides `/students` & `/chat` paths; the last visited path is stored so refreshes reopen the same tab.
* The sidebar nav uses `<NavLink>` for active styling.
* URL deep‑links make the assignment reviewable without navigation.

### 4. Table & Search

* A memoized `sortedFiltered` array handles both search (by name or ID) and click‑toggle column sorting.
* Tailwind utility classes deliver hover, even‑row, and active‑sort indicators.

### 5. Chat Interface

* Chat threads are keyed by student ID – adding a student auto‑creates a thread with a friendly welcome message.
* Flexbox flips message bubbles left/right based on `sender` for clear visual distinction.
* An `overflow-auto` chat log auto‑scrolls to the bottom on new messages.

---

## ➕ Additional Features

* **Sample Data & Demo Threads** – The app seeds two students and active chats so reviewers can play instantly.
* **LocalStorage View Memory** – The app remembers whether you last looked at the Students table or Chat and restores that view on reload.
* **Heroicons & tiny UI polish** – Crisp icons and subtle shadows/rounded corners for a modern, friendly feel.
* **Fully Offline‑Capable** – Runs 100 % in‑browser; no external API calls, fulfilling the AI‑assistant friendly requirement.

