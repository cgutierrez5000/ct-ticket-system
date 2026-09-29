# CT Ticket System

A full-stack ticket management application built with React, TypeScript, Node.js, Express, and PostgreSQL, with authentication, role-based authorization, containerized deployment to Microsoft Azure, and automated CI/CD through GitHub Actions.

CT Ticket System provides authenticated users with a workflow for creating, managing, assigning, searching, filtering, and updating support tickets, with administrative permissions for protected operations.

## Live Application

**Frontend:**
https://tickets.carlogia.com/

**Production API:**
https://api.carlogia.com/

The application is deployed to Microsoft Azure, with the React frontend hosted on Azure Static Web Apps and the containerized Express API running on Azure Container Apps.

---

## Application Preview

### Admin Dashboard

![CT Ticket System Admin Dashboard](docs/screenshots/dashboard-admin.jpg)

The administrator dashboard provides ticket metrics, search and status filtering, ticket creation and assignment, priority and status tracking, and administrative controls for editing and deleting tickets.

### Role-Based Access

![CT Ticket System Standard User Dashboard](docs/screenshots/dashboard.jpg)

Standard users can create and edit tickets but do not receive administrator-only deletion controls. Authorization for protected operations is enforced by the backend API.

### Authentication

<img src="docs/screenshots/login.jpg" alt="CT Ticket System Login" width="500">

CT Ticket System uses session-based authentication with PostgreSQL-backed persistent sessions.

---

## Current Version

### v1.0 — Full-Stack Cloud Deployment

CT Ticket System is deployed as a full client/server/database application.

The React and TypeScript frontend is hosted on Azure Static Web Apps. The Node.js and Express REST API is packaged as a Docker container and deployed to Azure Container Apps, with PostgreSQL providing persistent application, user, and session data.

Backend deployments are automated through GitHub Actions. Changes pushed to the `master` branch are tested with Vitest, authenticated to Azure using OpenID Connect (OIDC), packaged into a Docker image, pushed to Azure Container Registry, and deployed to Azure Container Apps.

Docker images are tagged with the Git commit SHA, providing traceability between source code, GitHub Actions runs, container images, and production deployments.

---

## Key Features

- React application with TypeScript
- Node.js and Express REST API
- PostgreSQL persistent storage
- PostgreSQL connection pooling with `pg`
- User registration
- Password hashing with `bcrypt`
- Login and logout
- Session-based authentication
- PostgreSQL-backed persistent sessions
- Role-based authorization
- Admin and standard user roles
- Protected API routes
- Admin-only ticket deletion
- User-to-ticket assignments
- RESTful ticket operations
- PostgreSQL-generated ticket IDs
- PostgreSQL default ticket status
- Database constraints
- Parameterized SQL queries
- Server-side request validation
- Frontend API error handling
- Controlled form inputs
- Editable ticket status
- Form validation
- Status filtering
- Case-insensitive ticket search
- Combined search and status filtering
- Conditional rendering
- Derived state
- Immutable state updates
- Automated unit testing with Vitest

---

## Technology Stack

### Frontend

- React
- TypeScript
- Vite
- Fetch API
- HTML
- CSS

### Backend

- Node.js
- Express
- TypeScript
- REST API
- `bcrypt`
- `express-session`
- `connect-pg-simple`

### Database

- PostgreSQL
- `pg`
- Parameterized SQL
- PostgreSQL-backed session storage

### Testing

- Vitest
- Automated tests executed as part of the backend CI/CD pipeline

### Cloud & DevOps

- Docker
- Microsoft Azure
- Azure Static Web Apps
- Azure Container Apps
- Azure Container Registry
- GitHub Actions
- OpenID Connect (OIDC)
- Environment-based configuration
- Automated CI/CD

---

## Application Architecture

```text
                    USERS
                      │
                      ▼
              React + TypeScript
             Azure Static Web Apps
                      │
                 HTTPS / JSON
                  Fetch API
                      │
                      ▼
             Express + TypeScript
             Azure Container Apps
                      │
                Authentication
                Authorization
                  Validation
                   REST API
                      │
              Parameterized SQL
                      │
                      ▼
                  PostgreSQL
                      │
          ┌───────────┼───────────┐
          │           │           │
       Tickets       Users      Sessions
```

The frontend communicates with the Express API over HTTPS using JSON. The API handles authentication, authorization, validation, application logic, and database access.

PostgreSQL provides persistent storage for application users, tickets, and authenticated sessions.

---

## Authentication & Authorization

CT Ticket System implements session-based authentication rather than storing authentication state only in the browser.

Passwords are hashed with `bcrypt` before storage. Authenticated sessions are persisted using PostgreSQL-backed session storage.

The application supports two roles:

### Standard User

Standard users can work with ticket information through the authenticated application interface.

### Administrator

Administrators receive additional permissions for protected operations, including ticket deletion.

Authorization is enforced by the backend API rather than relying only on conditional rendering in the frontend.

---

## Database

CT Ticket System uses PostgreSQL for persistent application data.

The database schema includes `users` and `tickets` tables, while application sessions are also persisted in PostgreSQL.

The `users` table includes:

- PostgreSQL-generated identity IDs
- Name
- Unique email address
- Password hash
- User role

The `tickets` table includes:

- PostgreSQL-generated identity IDs
- Title
- Description
- Priority
- Status
- Assigned user relationship

Database-level constraints restrict valid roles, priorities, and ticket statuses.

The backend uses parameterized SQL queries and PostgreSQL connection pooling through the `pg` package.

The database schema is located at:

```text
server/database/schema.sql
```

---

## Deployment & CI/CD

### Frontend Deployment

```text
GitHub
   │
   │ push to master
   ▼
GitHub Actions
   │
   ▼
Vite Production Build
   │
   ▼
Azure Static Web Apps
   │
   ▼
tickets.carlogia.com
```

The React frontend is automatically built and deployed to Azure Static Web Apps.

### Backend Deployment

```text
GitHub
   │
   │ push to master
   ▼
GitHub Actions
   │
   ├── Install dependencies
   ├── Run Vitest tests
   ├── Authenticate to Azure with OIDC
   ├── Build Docker image
   ├── Tag image with Git commit SHA
   ├── Push image to Azure Container Registry
   │
   ▼
Azure Container Apps
   │
   ▼
api.carlogia.com
```

Backend deployments use GitHub Actions and OpenID Connect authentication with Azure, avoiding the need to store a long-lived Azure client secret in GitHub.

Each Docker image is tagged with the Git commit SHA so a deployed container can be traced back to the source revision that produced it.

Documentation-only changes such as updates to the README or files under `docs/` are excluded from production deployment workflows.

---

## Getting Started

### Prerequisites

Before running the project locally, make sure you have:

- Node.js
- npm
- PostgreSQL

### 1. Clone the Repository

```bash
git clone https://github.com/cgutierrez5000/ct-ticket-system.git
cd ct-ticket-system
```

### 2. Install Dependencies

```bash
npm install
```

### 3. Configure Environment Variables

Copy the provided environment template:

```bash
cp .env.example .env
```

The application uses the following backend environment variables:

```env
SESSION_SECRET=replace-with-a-secure-random-secret
CLIENT_ORIGIN=http://localhost:5173
DATABASE_URL=postgresql://YOUR_USERNAME@localhost:5432/ct_ticket_system
```

Replace the example values as needed for your local PostgreSQL environment.

### 4. Create the PostgreSQL Database

Create the local database:

```bash
createdb ct_ticket_system
```

Initialize the application tables using the included schema:

```bash
psql ct_ticket_system < server/database/schema.sql
```

If `DATABASE_URL` is not provided, the backend defaults to a PostgreSQL database named:

```text
ct_ticket_system
```

### 5. Start the Backend API

```bash
npm run server
```

The backend defaults to:

```text
http://localhost:3001
```

### 6. Start the Frontend

Open a second terminal and run:

```bash
npm run dev
```

Vite will display the local development URL in the terminal.

### 7. Create an Account

Open the frontend in your browser and use the registration interface to create a local user account.

You can then sign in and begin creating and managing tickets.

---

## Testing

The project uses Vitest for automated testing.

Run the test suite once with:

```bash
npm test -- --run
```

Or start Vitest in watch mode during development:

```bash
npm test
```

Automated tests are also executed by the backend GitHub Actions workflow before a new container image is deployed.

A failed test prevents the automated backend deployment from proceeding.

---

## Available Scripts

### Frontend Development

```bash
npm run dev
```

Starts the Vite development server.

### Backend Development

```bash
npm run server
```

Starts the Express TypeScript server using `tsx`.

### Run Tests

```bash
npm test
```

Runs Vitest.

### Build Frontend

```bash
npm run build
```

Creates the Vite production build.

### Preview Frontend Build

```bash
npm run preview
```

Runs the local Vite production preview server.

### Build Backend

```bash
npm run build:server
```

Compiles the server using the backend TypeScript configuration.

---

## Environment Configuration

The application uses environment-based configuration so development and production environments can use different services and credentials without hard-coding secrets into the application.

Backend configuration includes:

```text
SESSION_SECRET
CLIENT_ORIGIN
DATABASE_URL
```

The server also recognizes:

```text
NODE_ENV
PORT
```

When `PORT` is not provided, the Express server defaults to port `3001`.

Real environment files containing credentials or secrets should not be committed to source control. The repository includes `.env.example` as a safe configuration template.

---

## Production Build

The frontend production build is generated with:

```bash
npm run build
```

The backend TypeScript production build is generated with:

```bash
npm run build:server
```

The backend is packaged as a Docker container for deployment to Azure Container Apps.

---

## Project Evolution

CT Ticket System was developed incrementally, with each stage introducing another layer of full-stack and platform engineering.

```text
JavaScript business logic
        │
        ▼
TypeScript
        │
        ▼
Automated testing
        │
        ▼
React frontend
        │
        ▼
Express REST API
        │
        ▼
PostgreSQL persistence
        │
        ▼
Authentication & authorization
        │
        ▼
Docker
        │
        ▼
Microsoft Azure
        │
        ▼
GitHub Actions / CI/CD
        │
        ▼
Production full-stack application
```

This incremental approach allowed each layer to be implemented and tested before adding the next level of complexity.

---

## Project Background

CT Ticket System began as a JavaScript and TypeScript exercise focused on ticket-management business logic and automated testing.

It evolved into a full-stack application as part of my continued development from front-end web development into full-stack and web platform engineering.

The project demonstrates the progression from client-side application development into API design, relational data persistence, authentication and authorization, containerization, cloud deployment, and automated CI/CD.

Rather than treating those technologies as isolated exercises, CT Ticket System integrates them into a single deployed application with a production frontend, backend API, database, authentication system, automated tests, and cloud deployment pipeline.