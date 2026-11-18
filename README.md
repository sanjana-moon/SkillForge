# 🚀 SkillForge AI

> **SkillForge AI** is a modern AI-powered e-learning platform where students can discover, purchase, and complete technology courses while receiving personalized guidance from an intelligent AI Mentor. It provides a complete learning ecosystem with role-based access for Students, Instructors, and Admins.

## 🌐 Live Demo

- **Live Application:** [SkillForge AI](https://skillforge-ai-eta.vercel.app)
- **Client Repository:** [GitHub](https://github.com/sanjana-moon/SkillForge)
- **Server Repository:** [GitHub](https://github.com/sanjana-moon/skillforge-server)

---

## ✨ Key Features

The platform provides dedicated dashboards and functionality for three different user roles.

<table>
<tr>
<td width="33%" valign="top">

### 👨‍🎓 Student

1. Browse and search courses with advanced filtering.
2. Purchase and enroll in courses.
3. Track learning progress and statistics.
4. Interact with an AI Mentor for personalized guidance.
5. Manage profile information and learning activities.

</td>
<td width="33%" valign="top">

### 👨‍🏫 Instructor

1. Create and manage courses.
2. Update course information and content.
3. Delete existing courses.
4. Publish or unpublish courses.
5. Monitor course analytics and enrolled students.

</td>
<td width="33%" valign="top">

### 👨‍💼 Admin

1. Approve or reject submitted courses.
2. Manage platform users.
3. Block or unblock user accounts.
4. Manage all platform courses.
5. Monitor platform-wide analytics.

</td>
</tr>
</table>

### 🤖 AI Mentor

- AI-powered learning assistant using Google Gemini.
- Persistent conversation history.
- Programming and technology guidance.
- Career advice and learning recommendations.
- Personalized assistance through conversational interactions.

---

## 🛠️ Tech Stack

<table>
<tr>
<td width="33%" valign="top">

### 🎨 Frontend

- Next.js
- React
- TypeScript
- Tailwind CSS
- HeroUI
- TanStack Query
- React Hook Form
- React Icons
- Framer Motion
- Axios

</td>
<td width="33%" valign="top">

### ⚙️ Backend

- Node.js
- Express.js
- TypeScript
- MongoDB
- JOSE (JWT Verification)
- Google Gemini AI API

</td>
<td width="33%" valign="top">

### 🔐 Authentication & Authorization

- Better Auth
- JWT Authentication
- Role-Based Access Control (RBAC)

</td>
</tr>
</table>
---

## 🏗️ System Architecture

SkillForge AI follows a client-server architecture.


```text
                 ┌──────────────────────┐
                 │      Frontend        │
                 │  Next.js + React     │
                 └──────────┬───────────┘
                            │
                            │ HTTP Requests
                            ▼
                 ┌──────────────────────┐
                 │      Express.js      │
                 │       Backend       │
                 └──────────┬───────────┘
                            │
                            ▼
                 ┌──────────────────────┐
                 │     Middleware       │
                 │ Authentication &     │
                 │ Authorization       │
                 └──────────┬───────────┘
                            │
                            ▼
                 ┌──────────────────────┐
                 │   Routes & Logic     │
                 │ Request Processing   │
                 └──────────┬───────────┘
                            │
                 ┌──────────┴───────────┐
                 ▼                      ▼
        ┌────────────────┐    ┌────────────────┐
        │    MongoDB     │    │  Gemini AI API │
        │  Data Storage  │    │   AI Mentor    │
        └────────────────┘    └────────────────┘
```

---

## ⚙️ Major Technical Challenges

During development, projects like SkillForge AI can involve several challenging technical issues. Here are five important challenges and their practical solutions.

### 1. Authentication & JWT Verification

**Problem:**
Managing authentication between Better Auth and a separate Express.js backend can be challenging. Incorrect token handling or verification may result in unauthorized requests.

**Solution:**
- Implement JWT verification using JOSE.
- Validate incoming tokens on protected backend routes.
- Implement role-based authorization.
- Handle expired or invalid tokens appropriately.

### 2. Role-Based Access Control (RBAC)

**Problem:**
Students, Instructors, and Admins require different permissions. Without proper authorization, users might access resources or perform actions outside their roles.

**Solution:**
- Implement role-based middleware.
- Verify user roles on the server.
- Protect sensitive API endpoints.
- Enforce ownership checks for instructor-managed resources.

### 3. Managing Asynchronous API State

**Problem:**
Handling loading states, API errors, caching, and data synchronization across multiple dashboards can become complicated.

**Solution:**
- Use TanStack Query for server-state management.
- Implement reusable API functions with Axios.
- Handle loading, success, and error states.
- Invalidate or refetch relevant queries after mutations.

### 4. MongoDB Data Relationships & Enrollment Management

**Problem:**
Managing relationships between users, courses, enrollments, and payments can create data consistency issues, especially when handling course enrollment and progress tracking.

**Solution:**
- Design a consistent document structure.
- Maintain proper references between related records.
- Validate enrollment before granting course access.
- Use appropriate database operations and transactions where necessary.

### 5. Gemini AI API Integration & Conversation History

**Problem:**
Integrating an external AI API introduces challenges such as API failures, asynchronous responses, conversation management, and maintaining chat history.

**Solution:**
- Handle Gemini API requests through the backend.
- Keep API credentials in environment variables.
- Store conversation sessions and messages in MongoDB.
- Handle API errors and loading states.
- Maintain conversation context when sending subsequent messages.

---

## 📂 Project Structure

```text
SkillForge/
│
├── SkillForge-Client/
│   ├── src/
│   ├── public/
│   ├── package.json
│   └── ...
│
└── SkillForge-Server/
    ├── src/
    ├── package.json
    ├── .env
    └── ...
```

---

## 📡 API Overview

| Module | Main Functionalities |
|---|---|
| Users | Create User, Update Profile, Get Profile |
| Courses | Get All Courses, Featured Courses, Categories, Course Details |
| Instructor | Create, Update, Delete, Publish/Unpublish Courses |
| Enrollments | Create Enrollment, Update Progress, Check Enrollment, Student Enrollments |
| Checkout | Store Payment, Create Enrollment |
| AI Mentor | Create Session, Fetch Sessions, Send Messages, Delete Session |
| Admin | Dashboard Analytics, Manage Users, Manage Courses, Course Approval |

---

## 📦 Installation & Setup

### Prerequisites

- Node.js
- npm
- MongoDB
- Google Gemini API Key

### 1. Clone the Client Repository

```bash
git clone https://github.com/sanjana-moon/SkillForge.git

cd SkillForge
npm install
```

### 2. Start the Client

```bash
npm run dev
```

### 3. Clone the Server Repository

Open another terminal:

```bash
git clone https://github.com/sanjana-moon/skillforge-server.git

cd skillforge-server
npm install
```

### 4. Configure Environment Variables

Create a `.env` file in the server directory and configure the required environment variables.

```env
PORT=5000
MONGODB_URI=your_mongodb_connection_string
GEMINI_API_KEY=your_gemini_api_key
```

Add other authentication, frontend-origin, and database configuration variables required by your implementation.

### 5. Start the Server

```bash
npm run dev
```

---

## 🔮 Future Improvements

- ⭐ Course reviews and ratings
- 🎥 Video-based lessons
- 🏆 Course completion certificates
- ❤️ Wishlist functionality
- 💰 Instructor earnings dashboard
- 🔔 Real-time notifications
- 📹 Live classes
- 📝 Quizzes and assignments
- 💳 Stripe payment integration
- 💬 Discussion forums

---

## 🤝 Contributing

Contributions are always welcome!

1. Fork the repository.
2. Create a new feature branch.
3. Commit your changes.
4. Push the branch to your fork.
5. Open a Pull Request.

---

## 📄 License

This project is licensed under the MIT License.

---

## 👩‍💻 Author

**Sanjana Moon**

- **GitHub:** [sanjana-moon](https://github.com/sanjana-moon)
- **LinkedIn:** [Sanjana Moon](https://linkedin.com/in/sanjana-moon)
- **Portfolio:** [Visit Portfolio](https://sanjana-portfolio-eight-eta.vercel.app)

---

⭐ If you find SkillForge AI interesting, consider giving the repository a star!

**Built with ❤️ by Sanjana Moon**
