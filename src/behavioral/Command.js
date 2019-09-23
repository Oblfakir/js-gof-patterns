import showPatternDescription from '../description';

export function Command(logger) {
    const calculator = new Calculator(logger, 777);

    calculator.execute(AddCommand(1536, logger));
    calculator.getCurrentValue();
    calculator.execute(SubCommand(36, logger));
    calculator.getCurrentValue();
    calculator.execute(MulCommand(4, logger));
    calculator.getCurrentValue();
    calculator.execute(DivCommand(17, logger));
    calculator.getCurrentValue();
    calculator.undo();
    calculator.getCurrentValue();
    calculator.undo();
    calculator.getCurrentValue();
    calculator.undo();
    calculator.getCurrentValue();
    calculator.undo();
    calculator.getCurrentValue();

    showDescription();
}

function add(x, y) { return x + y; }
function sub(x, y) { return x - y; }
function mul(x, y) { return x * y; }
function div(x, y) { return x / y; }

class CommandClass {
    constructor(action, undo, value, logger) {
        this.execute = action;
        this.undo = undo;
        this.value = value;

        logger.add('Command: Created instance of Command');
    }
}

function AddCommand(value, logger) {
    return new CommandClass(add, sub, value, logger);
}

function SubCommand(value, logger) {
    return new CommandClass(sub, add, value, logger);
}

function MulCommand(value, logger) {
    return new CommandClass(mul, div, value, logger);
}

function DivCommand(value, logger) {
    return new CommandClass(div, mul, value, logger);
}

class Calculator {
    constructor(logger, initialValue) {
        this.currentValue = initialValue;
        this.commands = [];
        this.logger = logger;

        this.logger.add(`Calculator: Created instance of Calculator with value ${initialValue}`);
    }

    getCommandAction(command) {
        const name = command.execute.toString().substr(9, 3);
        return name.charAt(0).toUpperCase() + name.slice(1);
    }

    execute(command) {
        this.currentValue = command.execute(this.currentValue, command.value);
        this.commands.push(command);
        this.logger.add(`Calculator: Executed action ${this.getCommandAction(command)} with value  ${command.value}`);
    }

    undo() {
        const command = this.commands.pop();
        this.currentValue = command.undo(this.currentValue, command.value);
        this.logger.add(`Calculator: Undo ${this.getCommandAction(command)}: ${command.value}`);
    }

    getCurrentValue() {
        this.logger.add(`Calculator: Current value is ${this.currentValue}`);
        return this.currentValue;
    }
}

function showDescription() {
    showPatternDescription('Command',
        [`The Command pattern encapsulates actions as objects. 
        Command objects allow for loosely coupled systems by
         separating the objects that issue a request from the objects that 
         actually process the request. These requests are called events and the code
          that processes the requests are called event handlers.`,
        `Suppose you are building an application that supports the Cut, Copy, and 
        Paste clipboard actions. These actions can be triggered in different ways 
        throughout the app: by a menu system, a context menu (e.g. by right clicking on a 
            textbox), or by a keyboard shortcut.`,
        `Command objects allow you to centralize the processing of these actions, 
        one for each operation. So, you need only one Command for processing all Cut 
        requests, one for all Copy requests, and one for all Paste requests.`,
        `Because commands centralize all processing, they are also frequently involved 
        in handling Undo functionality for the entire application.`]
    )
}