import { createEngineer } from './index.js';

describe('createEngineer', () => {
  it('should create an employee, given a name and a type code', () => {
    const employee = createEngineer('John Doe', 'E');
    expect(employee.name).toBe('John Doe');
    expect(employee.type).toBe('Engineer');
  });
});
