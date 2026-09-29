# TODOLIST-S1 Task Management Service

## How to install
npm install

## How to run
npm start

## How to test
npm test

## Module Layout
- `src/server.js`: Express application entry point
- `src/taskInterface.js`: HTTP endpoint handler for POST /tasks
- `src/taskStore.js`: Storage layer for tasks
- `src/taskValidator.js`: Validation rules for task payloads

## Extension Point
The next story should extend `src/taskStore.js` and `src/taskValidator.js` behind the existing interfaces without rewriting the web surface.