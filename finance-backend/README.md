# Finance Dashboard Backend

A RESTful backend service for a finance dashboard system. Built with Node.js, Express, and better-sqlite3 for simplicity and ease of setup.

## Features

- **Authentication & Authorization**: JWT-based authentication.
- **Role-Based Access Control (RBAC)**:
  - **Viewer**: Read-only access to dashboard summaries.
  - **Analyst**: Access to dashboard summaries and detailed records.
  - **Admin**: Full access. Can create/manage users, and perform CRUD operations on financial records.
- **Financial Records Management**: Complete CRUD operations for records (income, expenses).
- **Dashboard APIs**: Aggregated data endpoints for total income, expenses, category-wise breakdowns, and recent activity.
- **Data Persistence**: Uses SQLite (`better-sqlite3`) for simplicity without needing separate DB setup.

## Project Structure

- \`src/db/database.js\`: SQLite initialization and query instances.
- \`src/controllers/\`: Business logic for different entities.
- \`src/middlewares/\`: Authentication, role-checking, and error-handling logic.
- \`src/routes/\`: Express routers grouping related endpoints.
- \`src/app.js\`: Core Express app assembly.
- \`server.js\`: Application entry point.

## Setup & Running

1. Install dependencies:
   \`\`\`bash
   cd finance-backend
   npm install
   \`\`\`

2. Environment Variables:
   Create a \`.env\` file in the root folder (or use the one provided):
   \`\`\`env
   PORT=3000
   JWT_SECRET=super_secret_finance_dashboard_key
   DB_FILE=finance.sqlite
   \`\`\`

3. Start the server:
   \`\`\`bash
   node server.js
   \`\`\`
   
   *Upon the first run, the SQLite database (\`finance.sqlite\`) is automatically created and an initial admin user is seeded.*
   - **Default Admin Credentials**:
     - Username: \`admin\`
     - Password: \`admin123\`

## API Endpoints

### Authentication
- \`POST /api/auth/login\`: Accepts \`username\` and \`password\` to return a JWT token.
- \`POST /api/auth/register\`: Creates a bare-minimum 'viewer' user.

### Users (Admin only)
- \`GET /api/users\`: Fetch all users.
- \`POST /api/users\`: Create a user with a specific role (\`viewer\`, \`analyst\`, \`admin\`) and status (\`active\`, \`inactive\`).
- \`PUT /api/users/:id\`: Update a user's role or status.

### Records
- \`GET /api/records\`: List records with optional filtering & pagination (Analyst, Admin).
- \`GET /api/records/:id\`: Retrieve a specific record (Analyst, Admin).
- \`POST /api/records\`: Create a new record (Admin only).
- \`PUT /api/records/:id\`: Update a record (Admin only).
- \`DELETE /api/records/:id\`: Delete a record (Admin only).

### Dashboard (Viewer, Analyst, Admin)
- \`GET /api/dashboard/summary\`: Returns aggregated total income, total expenses, and net balance.
- \`GET /api/dashboard/category-totals\`: Returns total amounts grouped by category and type.
- \`GET /api/dashboard/recent-activity\`: Returns the latest 5 records.

## Design Decisions

- **SQLite via better-sqlite3**: Chosen for quick local testing without needing containerization, Postgres installation, or ORM configuration. Synchronous APIs make logic straightforward.
- **Express + JS**: Provides a reliable and well-understood backbone for web APIs without transpilation steps (like TS) to keep things simple for review.
- **JWT Authentication**: Ensures the API remains fully stateless. Roles are baked into the token payload and validated against the freshest DB state dynamically.
- **Status Toggles instead of Hard Deletes for Users**: Supports "inactive" users, adhering to finance auditing standards where previous records linked to an employee shouldn't lose their owner metadata.
