const { validateTask } = require('../src/taskValidator');

describe('Task Validator', () => {
  test('Given valid future deadline and allowed status, when validation runs, then it succeeds', () => {
    const futureDate = new Date();
    futureDate.setDate(futureDate.getDate() + 1);
    const payload = {
      title: 'Complete report',
      deadline: futureDate.toISOString(),
      status: 'PENDING'
    };
    const result = validateTask(payload, new Date());
    expect(result.valid).toBe(true);
  });

  test('Given status outside allowed set, when validation runs, then it rejects with error', () => {
    const futureDate = new Date();
    futureDate.setDate(futureDate.getDate() + 1);
    const payload = {
      title: 'Complete report',
      deadline: futureDate.toISOString(),
      status: 'INVALID_STATUS'
    };
    const result = validateTask(payload, new Date());
    expect(result.valid).toBe(false);
    expect(result.error).toBeDefined();
  });

  test('Given past deadline, when validation runs, then it rejects with error', () => {
    const pastDate = new Date();
    pastDate.setDate(pastDate.getDate() - 1);
    const payload = {
      title: 'Complete report',
      deadline: pastDate.toISOString(),
      status: 'PENDING'
    };
    const result = validateTask(payload, new Date());
    expect(result.valid).toBe(false);
  });
});