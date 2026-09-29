const request = require('supertest');
const { createApp } = require('../src/server');

describe('POST /tasks API', () => {
  let app;

  beforeEach(() => {
    app = createApp();
  });

  test('Given authenticated owner, when submitting valid payload, then system persists task and returns success within 200ms', async () => {
    const futureDate = new Date();
    futureDate.setDate(futureDate.getDate() + 5);
    const payload = {
      title: 'Daily Review',
      deadline: futureDate.toISOString(),
      status: 'IN_PROGRESS'
    };

    const start = Date.now();
    const response = await request(app)
      .post('/tasks')
      .set('Authorization', 'Bearer token123')
      .send(payload);
    const duration = Date.now() - start;

    expect(response.status).toBe(201);
    expect(response.body.id).toBeDefined();
    expect(duration).toBeLessThan(200);
  });

  test('Given unauthenticated visitor, when submitting task registration, then system refuses with 401 Unauthorized', async () => {
    const futureDate = new Date();
    futureDate.setDate(futureDate.getDate() + 5);
    const payload = {
      title: 'Daily Review',
      deadline: futureDate.toISOString(),
      status: 'IN_PROGRESS'
    };

    const response = await request(app)
      .post('/tasks')
      .send(payload);

    expect(response.status).toBe(401);
    expect(response.body.error).toBe('Unauthorized');
  });

  test('Given owner submits invalid status, when validation runs, then system rejects entry with validation error', async () => {
    const futureDate = new Date();
    futureDate.setDate(futureDate.getDate() + 5);
    const payload = {
      title: 'Daily Review',
      deadline: futureDate.toISOString(),
      status: 'UNKNOWN'
    };

    const response = await request(app)
      .post('/tasks')
      .set('Authorization', 'Bearer token123')
      .send(payload);

    expect(response.status).toBe(400);
    expect(response.body.error).toBeDefined();
  });
});