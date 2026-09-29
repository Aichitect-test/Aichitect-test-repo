# Task Management Service

## Setup
1. Run `npm install`.
2. Set environment variable `TASK_TOKEN=local-dev`.
3. Run `npm start`.

## Usage
Access the application at http://localhost:3010.

## Testing
Run `npm test` to execute the test suite.

## Architecture
The system uses `sql.js` for persistence in `data/app.sqlite`.
The `taskRepository` module handles database interactions.
The `taskService` module handles business logic and validation.
Extension point: Add new validation rules in `taskService.js`.