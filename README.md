# TODOLIST-S1
## Setup
npm install
export TASK_TOKEN=local-dev
npm start
## Usage
URL: http://localhost:3010
## Testing
npm test
## Architecture
server.js: HTTP routing
repository.js: SQLite persistence
validator.js: Business rules
Extension point: Add new fields to validator.js and repository.js.