# Calculator Application

## Setup
1. Run `npm install`.
2. Set `TASK_TOKEN=local-dev` in your environment.
3. Run `npm start`.

## Access
Open http://localhost:3010 in your browser.

## Testing
Run `npm test` to verify functionality.

## Architecture
The application uses Express for routing, sql.js for SQLite persistence, and vanilla JS for client-side arithmetic.
Extension point: Add new operations in `public/index.html` and `server.js`.