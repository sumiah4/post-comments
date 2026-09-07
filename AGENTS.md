# Fullstack Project Agent Instructions

## Project Overview
Fullstack Node.js application with a React frontend (Create React App) and Express.js backend with MySQL database. The frontend runs on port 3000, backend on port 5000.

## Architecture
- **Client** (`client/my-app`): React SPA with pages in `src/pages/`
- **Server** (`server`): Express API with Sequelize ORM for MySQL
- **API**: Axios client configured for backend communication
- **Database**: MySQL with Sequelize models in `server/models/` and migrations in `server/migrations/`

## Development Workflow

### Starting the Application
1. **Backend** (from `server/` directory):
   ```bash
   npm start  # Runs on port 5000 with nodemon auto-reload
   ```

2. **Frontend** (from `client/my-app/` directory):
   ```bash
   npm start  # Runs on port 3000 with hot reload
   ```

### Key Commands
- **Server tests**: `npm test` (currently not configured)
- **Client build**: `npm run build` (production-optimized bundle)
- **Database migrations**: Use `sequelize-cli` commands in `server/` directory

## Project Structure

| Path | Purpose |
|------|---------|
| `server/models/` | Sequelize model definitions (Posts.js, etc.) |
| `server/routes/` | Express route handlers (Posts.js) |
| `server/config/config.json` | Database configuration |
| `server/migrations/` | Sequelize database migrations |
| `client/my-app/src/pages/` | React page components (ListPost.js, etc.) |
| `client/my-app/src/App.js` | Root React component |

## Common Patterns

- **API Calls**: Use Axios in React components to call `http://localhost:5000` endpoints
- **Models**: Sequelize models in `server/models/` define database schema
- **Routing**: Express routes in `server/routes/` handle API endpoints
- **Components**: React components in `src/pages/` for page-level features

## Important Notes
- Ensure both server (port 5000) and client (port 3000) are running simultaneously during development
- Database must be configured in `server/config/config.json` before running migrations
- Use Sequelize CLI for database schema changes: `npx sequelize-cli migration:generate --name migration-name`
