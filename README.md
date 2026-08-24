# CT Ticket System

A ticket management application built as part of my transition from
front-end development into full-stack and web platform engineering.

The project is being developed incrementally, beginning with core
JavaScript business logic and evolving into a production-ready
full-stack application.

## Current Version

### v0.5 — TypeScript

Current functionality includes:

- Modular TypeScript using ES modules
- Typed Ticket interface and domain models
- Union types for ticket priority and status
- Typed function parameters and return values
- Defensive handling of unknown input
- Type guards and type narrowing
- Compile-time type checking
- Automated unit testing with Vitest

## Technologies

Currently:

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

## Project Roadmap

### v0.6 — React UI

- React application setup
- TypeScript integration
- Responsive ticket dashboard
- Ticket grids and detail views
- Search, filtering, sorting, and categorization
- Forms and validation

### Front End

- React
- TypeScript
- Responsive ticket dashboard
- Ticket grids and detail views
- Search, filtering, sorting, and categorization
- Forms and validation

### Back End

- Node.js API
- REST endpoints
- Business logic and validation
- Error handling
- Authentication and authorization
- User account creation and management

### Database

- PostgreSQL
- Relational data modeling
- Users, tickets, categories, comments, and assignments
- Database migrations and constraints

### Testing

- Unit testing
- API/integration testing

### Platform & Deployment

- Docker
- GitHub Actions
- CI/CD
- Azure deployment
- Cloudflare
- Environment and secrets management

## Development Approach

This project is intentionally being built in stages so that each layer
of the application—from JavaScript fundamentals through full-stack
architecture and cloud deployment—is implemented and understood
incrementally.