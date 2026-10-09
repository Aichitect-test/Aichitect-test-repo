const request = require('supertest');
const app = require('./server');
test('rejects unauthenticated', async () => {
  const res = await request(app).get('/api/refunds?userId=1');
  expect(res.status).toBe(401);
});