[![Continuous Integration](https://github.com/kaiosilveira/replace-constructor-with-factory-function-refactoring/actions/workflows/ci.yml/badge.svg)](https://github.com/kaiosilveira/replace-constructor-with-factory-function-refactoring/actions/workflows/ci.yml)

ℹ️ _This repository is part of my Refactoring catalog based on Fowler's book with the same title. Please see [kaiosilveira/refactoring](https://github.com/kaiosilveira/refactoring) for more details._

---

# Replace Constructor With Factory Function

**Formerly: Replace Constructor with Factory Method**

<table>
<thead>
<th>Before</th>
<th>After</th>
</thead>
<tbody>
<tr>
<td>

```javascript
leadEngineer = new Employee(document.leadEngineer, 'E');
```

</td>

<td>

```javascript
leadEngineer = createEngineer(document.leadEngineer);
```

</td>
</tr>
</tbody>
</table>

Sometimes we need more control over initialization than a constructor can possibly provide, and that's where a [Factory Method](https://github.com/kaiosilveira/design-patterns/tree/main/factory-method) comes in handy: it can hide complex initialization logic, replace the resulting instance with a proxy or decorate it with complementary behavior. This refactoring helps with moving towards this approach.

## Working example

Our working example is a program that creates `Employee` instances based on a document input plus employee type. The `Employee` class is straightforward:

```javascript
export class Employee {
  constructor(name, typeCode) {
    this._name = name;
    this._typeCode = typeCode;
  }

  get name() {
    return this._name;
  }

  get type() {
    return Employee.legalTypeCodes[this._typeCode];
  }

  static get legalTypeCodes() {
    return { E: 'Engineer', M: 'Manager', S: 'Salesperson' };
  }
}
```

And some possible usages are:

```javascript
const candidateDoc = { name: 'John Doe', empType: 'E' };
const candidate = new Employee(candidateDoc.name, candidateDoc.empType);

const leadEngineerDoc = { leadEngineer: 'Jane Doe' };
const leadEngineer = new Employee(leadEngineerDoc.leadEngineer, 'E');

console.log(`Candidate: ${candidate.name}, ${candidate.type}`);
console.log(`Lead engineer: ${leadEngineer.name}, ${leadEngineer.type}`);
```

Our goal here is to introduce a factory function, so clients don't do `new` employees any longer.

### Test suite

Since we're doing with a simple class, there is no test suite in place. Tests will be introduced as we go, though, for the `createEmployee` factory function.

### Steps

We start by introducing the `createEmployee` function:

```diff
diff --git top level...
+export function createEmployee(name, typeCode) {
+  return new Employee(name, typeCode);
+}
```

Then, we update the callers to use the function instead of initializing the class themselves:

```diff
diff --git top level...
-const candidate = new Employee(candidateDoc.name, candidateDoc.empType);
+const candidate = createEmployee(candidateDoc.name, candidateDoc.empType);
// ...
-const leadEngineer = new Employee(leadEngineerDoc.leadEngineer, 'E');
+const leadEngineer = createEmployee(leadEngineerDoc.leadEngineer, 'E');
```

With that in place, and since we're only creating engineer employees, a decision was made to make the function more specific. We start by renaming `createEmployee` to `createEngineer`:

```diff
diff --git top level...
-const candidate = createEmployee(candidateDoc.name, candidateDoc.empType);
+const candidate = createEngineer(candidateDoc.name, candidateDoc.empType);
// ...
-const leadEngineer = createEmployee(leadEngineerDoc.leadEngineer, 'E');
+const leadEngineer = createEngineer(leadEngineerDoc.leadEngineer, 'E');
// ...
-export function createEmployee(name, typeCode) {
+export function createEngineer(name, typeCode) {
```

And then, we make the employee type fixed to `'E'` at `createEngineer`:

```diff
diff --git top level...
 export function createEngineer(name, typeCode) {
-  return new Employee(name, typeCode);
+  return new Employee(name, 'E');
```

Finally, we can [remove the flag argument](https://github.com/kaiosilveira/remove-flag-argument-refactoring) `typeCode` from `createEngineer`:

```diff
diff --git top level...
-export function createEngineer(name, typeCode) {
+export function createEngineer(name) {
```

And that's it!

### Commit history

Below there's the commit history for the steps detailed above.

| Commit SHA                                                                                                                                       | Message                                                                             |
| ------------------------------------------------------------------------------------------------------------------------------------------------ | ----------------------------------------------------------------------------------- |
| [3ff0ba7](https://github.com/kaiosilveira/replace-constructor-with-factory-function-refactoring/commit/3ff0ba7a63d438f2c52835038fecbc32abd566dc) | introduce `createEmployee` function                                                 |
| [75b2e05](https://github.com/kaiosilveira/replace-constructor-with-factory-function-refactoring/commit/75b2e05b7bc438e28634607907cea334524c8f13) | update callers to use `createEmployee` instead of initializing the class themselves |
| [e48639d](https://github.com/kaiosilveira/replace-constructor-with-factory-function-refactoring/commit/e48639dc8b4318c8619e92a7a4d300fe98e9b08b) | rename `createEmployee` to `createEngineer`                                         |
| [9886939](https://github.com/kaiosilveira/replace-constructor-with-factory-function-refactoring/commit/988693979e648c571d8ed30097df3fe25329fc4a) | make employee type fixed to `'E'` at `createEngineer`                               |
| [b15df82](https://github.com/kaiosilveira/replace-constructor-with-factory-function-refactoring/commit/b15df829e562eff6d02e1cc61b36dcf6e66634c4) | remove `typeCode` argument from `createEngineer`                                    |

For the full commit history for this project, check the [Commit History tab](https://github.com/kaiosilveira/replace-constructor-with-factory-function-refactoring/commits/main).
