# 🔷 Oynx | Enterprise Project Management Dashboard

![Oynx Dashboard Preview](https://via.placeholder.com/1200x600/0d1117/a2b2f8?text=Add+a+Screenshot+of+your+Dashboard+Here)

Oynx is a modern, full-stack enterprise project management dashboard designed for high-efficiency teams. Built with a serverless architecture, it features real-time database synchronization, dynamic data visualization, and responsive design. 

This project was developed as a Final Year Academic Project to demonstrate proficiency in full-stack web development, relational database modeling, and serverless deployment.

---

## ✨ Key Features

* **Real-time Analytics Engine:** Custom-built algorithms calculate System Efficiency, Overdue Tasks, and Active Projects on the fly, visualizing them via dynamic SVG progress rings.
* **Relational Database Management:** Full CRUD (Create, Read, Update, Delete) capabilities for both Projects and Team Members, linked via Prisma foreign-key relations.
* **Dynamic UI & Visual Hierarchy:** Project cards dynamically shift color themes (using custom RGB thresholds) based on status and deadline proximity (e.g., automatically glowing red when a task is overdue).
* **Live Activity Feed:** Auto-generates human-readable activity logs based on database timestamp mutations (`updatedAt`).
* **Secure Routing & Auth:** Implements a frontend Authentication Context with Protected Routes and LocalStorage token memory to secure the manager's view.
* **Mobile-First Responsive Design:** Features a custom fluid layout with a sliding off-canvas hamburger menu for mobile devices.

---

## 🛠️ Tech Stack

**Frontend**
* React.js (Vite)
* Tailwind CSS (Custom enterprise dark theme)
* Lucide React (Iconography)
* React Router DOM

**Backend & Database**
* Vercel Serverless Functions (`/api` routes)
* Node.js
* Prisma ORM (Object-Relational Mapping)
* Neon Database (Serverless PostgreSQL)

---

## 🗄️ Database Schema

The application relies on a relational PostgreSQL database with two primary models:

1. **User Model:** Manages team members (Name, Handle, Role).
2. **Project Model:** Tracks tasks (Title, Description, Status, DueDate) and maintains a relational link (`assigneeId`) to the User model.

---

## 🚀 Local Development Setup

Follow these steps to run the Oynx dashboard locally on your machine.

### 1. Clone the repository
```bash
git clone [https://github.com/YOUR_USERNAME/oynx-dashboard.git](https://github.com/YOUR_USERNAME/oynx-dashboard.git)
cd oynx-dashboard
