import { Employee } from './index.js';

describe('Employee', () => {
  it('should have a name', () => {
    const employee = new Employee('John Doe', 'E');
    expect(employee.name).toBe('John Doe');
  });

  it('should have a type', () => {
    const employee = new Employee('John Doe', 'E');
    expect(employee.type).toBe('Engineer');
  });
});
