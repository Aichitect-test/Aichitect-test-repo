import { TaskService } from './task';

describe('TaskService', () => {
  let service, mockDb, mockAuth;

  beforeEach(() => {
    mockDb = { save: jest.fn() };
    mockAuth = { isAuthenticated: jest.fn() };
    service = new TaskService(mockDb, mockAuth);
  });

  test('should persist task when authenticated and valid', async () => {
    mockAuth.isAuthenticated.mockReturnValue(true);
    const payload = { title: 'Test', deadline: '2099-01-01', status: 'TODO' };
    await service.registerTask('token', payload);
    expect(mockDb.save).toHaveBeenCalled();
  });

  test('should return 401 when unauthenticated', async () => {
    mockAuth.isAuthenticated.mockReturnValue(false);
    await expect(service.registerTask('bad', {})).rejects.toMatchObject({ status: 401 });
  });

  test('should reject invalid status', async () => {
    mockAuth.isAuthenticated.mockReturnValue(true);
    const payload = { title: 'Test', deadline: '2099-01-01', status: 'INVALID' };
    await expect(service.registerTask('token', payload)).rejects.toMatchObject({ status: 400 });
  });
});