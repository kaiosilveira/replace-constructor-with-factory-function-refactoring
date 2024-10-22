import { Employee } from './employee/index.js';

const candidateDoc = { name: 'John Doe', empType: 'E' };
const candidate = createEmployee(candidateDoc.name, candidateDoc.empType);

const leadEngineerDoc = { leadEngineer: 'Jane Doe' };
const leadEngineer = createEmployee(leadEngineerDoc.leadEngineer, 'E');

console.log(`Candidate: ${candidate.name}, ${candidate.type}`);
console.log(`Lead engineer: ${leadEngineer.name}, ${leadEngineer.type}`);

export function createEmployee(name, typeCode) {
  return new Employee(name, typeCode);
}
