# CT Ticket System

A full-stack ticket management application built as part of my transition from front-end development into full-stack and web platform engineering.

The project is being developed incrementally, beginning with core JavaScript business logic and evolving into a production-ready, containerized full-stack application with authentication, PostgreSQL persistence, and cloud deployment.

## Current Version

### v1.0 — Deployment & DevOps (In Progress)

The application now uses a full client/server/database architecture with a React and TypeScript frontend, Node.js and Express REST API, PostgreSQL persistence, session-based authentication, role-based authorization, and a Dockerized backend.

The Express backend can be compiled from TypeScript into production JavaScript and packaged as a Linux Docker image. Environment-specific configuration is supplied at runtime rather than embedded in the application image.

Current deployment progress:

- Production TypeScript server build
- Dockerized Node.js / Express backend
- Linux-based Docker image
- Environment-based frontend API configuration
- Environment-based backend configuration
- Dynamic server port configuration
- Environment-aware PostgreSQL configuration
- Runtime environment variables
- Persistent PostgreSQL-backed sessions
- Docker-to-PostgreSQL networking
- Dockerized authentication and API verified
- Azure cloud deployment — in progress
- CI/CD — planned

## Current Functionality

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
- Client/server/database architecture
- HTTP communication with Fetch API
- JSON request and response handling
- Environment-aware CORS configuration
- Reusable React components
- Typed props and state
- RESTful ticket endpoints
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

## Architecture

The application currently follows this architecture:

```text
React + TypeScript
       |
       | HTTP / JSON
       | Fetch API
       v
Node.js + Express
       |
       | Authentication
       | Authorization
       | Validation
       | REST API
       | Parameterized SQL
       v
PostgreSQL
       |
       | Ticket data
       | User data
       | Session data
       v
Persistent Storage