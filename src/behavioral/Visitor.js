import showPatternDescription from '../description';

export function Visitor(logger) {
    showDescription();

    const employee = new Employee('employee', logger);
    const manager = new Manager('manager', logger);
    const worker = new Worker('worker', logger);

    logger.add(`${employee.name} accepted Salary`);
    employee.accept(Salary);
    logger.add(`${employee.name} accepted Vacation`);
    employee.accept(Vacation);
    logger.add(`${manager.name} accepted Salary`);
    manager.accept(Salary);
    logger.add(`${manager.name} accepted Vacation`);
    manager.accept(Vacation);
    logger.add(`${worker.name} accepted Salary`);
    worker.accept(Salary);
    logger.add(`${worker.name} accepted Vacation`);
    worker.accept(Vacation);

    employee.describe();
    manager.describe();
    worker.describe();
}

class Employee {
    constructor(name, logger) {
        this.logger = logger;
        this.name = name;
        this.salary = 0;
        this.vacation = 0;

        logger.add('Employee: Created instance of Employee');
    }

    accept(visitor) {
        visitor(this);
    }

    describe() {
        this.logger.add(`Employee name: ${this.name}, salary: ${this.salary}, vacation: ${this.vacation}`);
    }
}

class Manager extends Employee {
    constructor(name, logger) {
        super(name, logger);

        logger.add('Manager: Created instance of Manager');
    }
}

class Worker extends Employee {
    constructor(name, logger) {
        super(name, logger);

        logger.add('Worker: Created instance of Worker');
    }
}

function Salary(employee) {
    if (employee instanceof Manager) {
        employee.salary = 'Manager salary';
    } else if (employee instanceof Worker) {
        employee.salary = 'Worker salary';
    } else {
        employee.salary = 'Standard salary';
    }
}

function Vacation(employee) {
    if (employee instanceof Manager) {
        employee.vacation = 'Manager vacation';
    } else if (employee instanceof Worker) {
        employee.vacation = 'Worker vacation';
    } else {
        employee.vacation = 'Standard vacation';
    }
}

function showDescription() {
    showPatternDescription('Visitor',
        [`The Visitor pattern defines a new operation to a collection of objects
         without changing the objects themselves. The new logic resides in a separate
          object called the Visitor.`,
        `Visitors are useful when building extensibility in a library or framework.
         If the objects in your project provide a 'visit' method that accepts a
          Visitor object which can make changes to the receiving object then you 
          are providing an easy way for clients to implement future extensions.`,
        `In most programming languages the Visitor pattern requires that the 
        original developer anticipates functional adjustments in the future. 
        This is done by including methods that accept a Visitor and let it operate
         on the original collection of objects.`,
        `Visitor is not important to JavaScript because it offers far more flexibility 
        by the ability to add and remove methods at runtime.`]
    )
}