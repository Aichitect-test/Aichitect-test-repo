# Task Management Service

## Setup
`npm install`

## Run
`npm start`

## Test
`npm test`

## Module Layout
- `src/task.js`: Interface and implementation for task registration.
- `src/task.test.js`: Test suite covering authentication, validation, and persistence.

## Extension Point
To add new task statuses, update the `ALLOWED_STATUSES` constant in `src/task.js`.