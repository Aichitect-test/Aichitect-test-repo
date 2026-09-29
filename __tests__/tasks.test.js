const request = require('supertest');
const app = require('../server');

describe('POST /tasks', () => {
  const futureDate = new Date(Date.now() + 86400000).toISOString();

  it('should successfully register a task when authenticated and payload is valid within 200ms', async () => {
    const start = Date.now();
    const res = await request(app)
      .post('/tasks')
      .set('Authorization', 'Bearer valid-token')
      .send({
        title: 'Test Task',
        deadline: futureDate,
        status: 'PENDING'
      });
    const duration = Date.now() - start;
    expect(res.statusCode).toEqual(201);
    expect(res.body.success).toBe(true);
    expect(res.body.task).toHaveProperty('id');
    expect(duration).toBeLessThan(200);
  });

  it('should return 401 Unauthorized for unauthenticated visitors', async () => {
    const res = await request(app)
      .post('/tasks')
      .send({
        title: 'Test Task',
        deadline: futureDate,
        status: 'PENDING'
      });
    expect(res.statusCode).toEqual(401);
    expect(res.body.error).toEqual('Unauthorized');
  });

  it('should reject entry and display validation error when status is outside allowed set', async () => {
    const res = await request(app)
      .post('/tasks')
      .set('Authorization', 'Bearer valid-token')
      .send({
        title: 'Test Task',
        deadline: futureDate,
        status: 'INVALID_STATUS'
      });
    expect(res.statusCode).toEqual(400);
    expect(res.body.error).toContain('Invalid status');
  });

  it('should reject entry when deadline is not in the future', async () => {
    const pastDate = new Date(Date.now() - 86400000).toISOString();
    const res = await request(app)
      .post('/tasks')
      .set('Authorization', 'Bearer valid-token')
      .send({
        title: 'Test Task',
        deadline: pastDate,
        status: 'PENDING'
      });
    expect(res.statusCode).toEqual(400);
    expect(res.body.error).toContain('Deadline must be a valid future date');
  });
});
