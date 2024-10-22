import { createEmployee } from './index.js';

describe('createEmployee', () => {
  it('should create an employee, given a name and a type code', () => {
    const employee = createEmployee('John Doe', 'E');
    expect(employee.name).toBe('John Doe');
    expect(employee.type).toBe('Engineer');
  });
});
