# CT Ticket System

A ticket management application built as part of my transition from front-end development into full-stack and web platform engineering.

The project is being developed incrementally, beginning with core JavaScript business logic and evolving into a production-ready full-stack application.

## Current Version

### v0.6 — React CRUD Interface

The application now includes a React and TypeScript user interface built on top of the ticket-management logic developed in previous versions.

Current functionality includes:

- React application with TypeScript
- Reusable React components
- Typed props and state
- Ticket creation
- Ticket editing and updating
- Ticket deletion
- Controlled form inputs
- Form validation
- Input normalization and trimming
- Priority selection
- Assignee selection
- Status filtering
- Case-insensitive ticket search
- Combined search and status filtering
- Conditional rendering
- Derived state
- Immutable state updates
- Edit-mode state management
- `useEffect` synchronization between selected tickets and form state
- Cancel/reset edit functionality
- Defensive ID generation for an empty ticket list
- Existing TypeScript business logic and domain models
- Automated unit testing with Vitest

## Technologies

Currently:

- React
- TypeScript
- JavaScript
- Node.js
- Vitest
- Git
- GitHub

## Automated Testing

The project uses Vitest for automated unit testing.

Run tests in watch mode:

```bash
npm test
```

Run the test suite once:

```bash
npm test -- --run
```

Run TypeScript type checking:

```bash
npx tsc --noEmit
```

Current test coverage includes:

- Priority validation
- Status validation
- Ticket validation
- Ticket lookup
- Ticket ID duplicate detection
- Adding valid tickets
- Rejecting invalid tickets
- Rejecting duplicate IDs
- Immutable ticket status updates
- Ticket deletion
- Ticket filtering by status
- Edge cases and defensive inputs

Current test suite: **20 passing tests**

## Version History

### v0.1 — JavaScript & Modules
- Core ticket data model
- ES modules
- Ticket lookup and filtering utilities

### v0.2 — Immutable Business Logic
- Immutable ticket updates
- Status changes
- Add/delete operations

### v0.3 — Validation & Defensive JavaScript
- Priority validation
- Status validation
- Ticket validation
- Duplicate ID detection
- Defensive input handling

### v0.4 — Automated Testing
- Vitest setup
- Unit tests for ticket utilities and business logic
- Regression testing

### v0.5 — TypeScript
- Typed Ticket interface and domain models
- Union types for ticket priority and status
- Typed function parameters and return values
- Type guards and type narrowing
- Compile-time type checking

### v0.6 — React CRUD Interface
- React and TypeScript UI
- Reusable components
- Create, read, update, and delete ticket functionality
- Controlled forms
- Form validation
- Priority and assignee controls
- Status filtering
- Case-insensitive title search
- Combined filtering and search
- Edit and cancel-edit modes
- Derived state
- Immutable React state updates
- `useEffect` synchronization

## Project Roadmap

### v0.7 — Node.js / Express API

Next milestone:

- Express server setup
- REST API architecture
- Ticket endpoints
- GET tickets
- GET ticket by ID
- POST ticket
- PUT/PATCH ticket
- DELETE ticket
- Server-side validation
- HTTP status codes
- Error handling
- Connect React frontend to API

### v0.8 — PostgreSQL

- PostgreSQL database
- Relational data modeling
- Persistent ticket storage
- Database migrations
- Database constraints
- Connect API to PostgreSQL

### v0.9 — Authentication & Users

- User accounts
- Authentication
- Authorization
- Protected API routes
- Ticket ownership and assignments

### v1.0 — Deployment

- Docker
- GitHub Actions
- CI/CD
- Azure deployment
- Cloudflare
- Environment and secrets management
- Production configuration

## Future Front-End Enhancements

- Responsive dashboard
- Improved ticket grid and detail views
- Sorting
- Additional categorization
- Loading and error states for API requests
- Improved form and interface styling
- Redux Toolkit where shared client state justifies it
- Server-state management as the API architecture evolves

## Testing Roadmap

- React component testing
- API/integration testing
- Expanded validation testing
- End-to-end testing

## Development Approach

This project is intentionally being built in stages so that each layer of the application—from JavaScript and TypeScript fundamentals through React, full-stack architecture, databases, testing, and cloud deployment—is implemented and understood incrementally.

Each version introduces a new engineering layer while retaining and building upon concepts implemented in previous versions.