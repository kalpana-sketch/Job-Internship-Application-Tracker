# Job & Internship Application Tracker

A simple full-stack web application that helps students manage and track their job and internship applications in one place.

The application allows users to add, view, edit, delete, search, and filter applications while providing a dashboard with real-time application statistics.

---

## 🚀 Features

* Add new job and internship applications
* View all applications
* Edit existing applications
* Delete applications
* Search applications by company name or role
* Filter applications by status
* Dashboard with application statistics
* Color-coded application status badges
* Reactive form validation
* Server-side validation
* Responsive user interface
* REST API for frontend-backend communication
* MongoDB database for persistent storage

### Application Statuses

* Saved
* Applied
* Assessment
* Interview
* Selected
* Rejected

---

## 🛠️ Technologies Used

| Layer             | Technology  |
| ----------------- | ----------- |
| Frontend          | Angular     |
| Styling           | Bootstrap 5 |
| Backend           | Node.js     |
| Backend Framework | Express.js  |
| Database          | MongoDB     |
| ODM               | Mongoose    |
| Communication     | REST API    |
| Configuration     | dotenv      |
| Development       | Nodemon     |

---

## 📂 Project Structure

```text
job-internship-tracker/
│
├── backend/
│   ├── models/
│   │   └── Application.js
│   ├── routes/
│   │   └── applicationRoutes.js
│   ├── seed.js
│   ├── server.js
│   ├── package.json
│   └── .env
│
└── frontend/
    ├── src/
    │   └── app/
    │       ├── models/
    │       │   └── application.model.ts
    │       ├── services/
    │       │   └── application.service.ts
    │       ├── components/
    │       │   ├── dashboard/
    │       │   ├── application-list/
    │       │   └── application-form/
    │       ├── app.routes.ts
    │       ├── app.config.ts
    │       └── app.ts
    └── package.json
```

---

## ⚙️ Prerequisites

Make sure the following are installed on your system:

* Node.js
* npm
* Angular CLI
* MongoDB

You can verify the installations using:

```bash
node --version
npm --version
ng version
mongod --version
```

---

## 🔧 Installation

### 1. Clone the repository

```bash
git clone <YOUR_GITHUB_REPOSITORY_URL>
```

Navigate into the project:

```bash
cd job-internship-tracker
```

---

### 2. Install backend dependencies

```bash
cd backend
npm install
```

---

### 3. Configure environment variables

Create a `.env` file inside the `backend` folder:

```env
PORT=5000
MONGODB_URI=mongodb://127.0.0.1:27017/job-tracker
```

> Do not commit your `.env` file to GitHub if it contains private credentials.

---

### 4. Install frontend dependencies

Open another terminal:

```bash
cd frontend
npm install
```

---

## ▶️ Running the Application

### Start MongoDB

Make sure your local MongoDB server is running.

---

### Start the Backend

From the `backend` directory:

```bash
npm run dev
```

The backend should start at:

```text
http://localhost:5000
```

You should see messages similar to:

```text
Server running on http://localhost:5000
MongoDB connected
```

---

### Load Sample Data

To populate the database with sample applications:

```bash
npm run seed
```

This creates sample job and internship applications for testing.

---

### Start the Frontend

From the `frontend` directory:

```bash
ng serve
```

Open your browser and visit:

```text
http://localhost:4200
```

---

## 🔌 REST API

The backend provides the following API endpoints.

| Method | Endpoint                | Description              |
| ------ | ----------------------- | ------------------------ |
| GET    | `/api/applications`     | Get all applications     |
| POST   | `/api/applications`     | Create a new application |
| PUT    | `/api/applications/:id` | Update an application    |
| DELETE | `/api/applications/:id` | Delete an application    |

### Example

Get all applications:

```text
GET http://localhost:5000/api/applications
```

---

## 📊 Dashboard

The dashboard provides an overview of application activity, including:

* Total Applications
* Applied
* Interviews
* Selected
* Rejected

The statistics are calculated dynamically from the current application data.

---

## 📝 Application Information

Each application can contain:

```text
Company Name
Role
Type
Location
Status
Application Date
Interview Date
Job Link
Notes
```

---

## 🔍 Search and Filtering

The application supports:

### Search

Users can search applications by:

* Company name
* Job/Internship role

### Status Filter

Applications can be filtered by:

* Saved
* Applied
* Assessment
* Interview
* Selected
* Rejected

---

## ✅ Validation

The application uses validation on both the frontend and backend.

### Required fields

* Company Name
* Role
* Type
* Status

Angular reactive forms provide immediate validation feedback, while Mongoose validation provides server-side data validation.

---

## 🔄 Application Flow

The basic flow of the application is:

```text
Angular Frontend
       │
       │ HTTP Request
       ▼
Express.js REST API
       │
       │ Mongoose
       ▼
MongoDB Database
       │
       │ Response
       ▼
Angular Frontend
```

---

## 🧪 Testing the Application

After starting both frontend and backend, test the following:

* [ ] Dashboard loads correctly
* [ ] Applications are displayed
* [ ] New application can be added
* [ ] Existing application can be edited
* [ ] Application can be deleted
* [ ] Search works correctly
* [ ] Status filter works correctly
* [ ] Dashboard statistics update
* [ ] Form validation works
* [ ] REST API returns application data

You can also verify the API directly by opening:

```text
http://localhost:5000/api/applications
```

---

## 🔮 Future Enhancements

Possible future improvements include:

* User authentication using JWT
* Separate accounts for different students
* Email or browser reminders for interviews
* Application follow-up reminders
* Dashboard charts and analytics
* CSV/PDF export
* Resume and document uploads
* Server-side search and pagination
* Deployment using cloud services
* MongoDB Atlas integration

---

## 🎓 Project Purpose

This project was developed as a full-stack web development project to demonstrate practical implementation of concepts such as:

* Angular components
* Angular reactive forms
* Data binding
* Angular services
* REST APIs
* Node.js
* Express.js
* MongoDB
* Mongoose
* CRUD operations
* HTTP communication
* Form validation
* Search and filtering

---

## 👩‍💻 Author

**Kalpana Pal**

B.Tech — Computer Science & Engineering

---

## 📄 License

This project was developed for educational and learning purposes.
