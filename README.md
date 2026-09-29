# TODOLIST-S5

## Setup
1. Run `npm install`.
2. Set `TASK_TOKEN=local-dev` in your environment.
3. Run `npm start`.

## Usage
Open http://localhost:3010 in your browser.

## Testing
Run `npm test` to execute the validation and persistence tests.

## Architecture
The application uses Express for routing, sql.js for SQLite persistence, and a simple HTML frontend.
Extension point: The `TaskRepository` interface in `repository.js` can be extended to support new storage backends.