# Task Management Service

- Install: `npm install`
- Run: `npm start` (URL: http://localhost:3000)
- Test: `npm test`

Layout:
- `index.js`: Server entry point
- `taskService.js`: Business logic and validation
- `taskRepository.js`: SQLite persistence
- `public/index.html`: UI

Extension point: `taskService.js` validation rules.