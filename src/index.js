import { Employee } from './employee/index.js';

const candidateDoc = { name: 'John Doe', empType: 'E' };
const candidate = createEngineer(candidateDoc.name, candidateDoc.empType);

const leadEngineerDoc = { leadEngineer: 'Jane Doe' };
const leadEngineer = createEngineer(leadEngineerDoc.leadEngineer, 'E');

console.log(`Candidate: ${candidate.name}, ${candidate.type}`);
console.log(`Lead engineer: ${leadEngineer.name}, ${leadEngineer.type}`);

export function createEngineer(name) {
  return new Employee(name, 'E');
}
