# Billing Configuration Interface

## Setup
1. Install dependencies: `npm install`
2. Set environment variable: `export TASK_TOKEN=local-dev`
3. Start server: `npm start`
4. Access at: http://localhost:3010

## Testing
Run tests with: `npm test`

## Architecture
- `server.js`: Express server and routes.
- `repository.js`: SQLite database interactions.
- `public/index.html`: UI with embedded calculator.
- Extension point: Add new billing parameters in `repository.js` and `index.html`.