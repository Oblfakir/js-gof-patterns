import showPatternDescription from '../description';

export function Interpreter(logger) {
    const roman = 'MCMXXVIII';
    const context = new Context(roman, logger);
    const expression1 = new Expression("thousand", "M", " " , " ", " " , 1000, logger);
    const expression2 = new Expression("hundred",  "C", "CD", "D", "CM", 100, logger);
    const expression3 = new Expression("ten",      "X", "XL", "L", "XC", 10, logger);
    const expression4 = new Expression("one",      "I", "IV", "V", "IX", 1, logger);

    expression1.interpret(context);
    logger.add(`Interpreter: current output is ${context.output}`);
    expression2.interpret(context);
    logger.add(`Interpreter: current output is ${context.output}`);
    expression3.interpret(context);
    logger.add(`Interpreter: current output is ${context.output}`);
    expression4.interpret(context);
    logger.add(`Interpreter: current output is ${context.output}`);

    logger.add(`Interpreter: expression ${roman} result is ${context.output}`);

    showDescription();
}

class Context {
    constructor(input, logger) {
        this.logger = logger;
        this.input = input;
        this.output = 0;

        logger.add('Context: Created instance of Context');
    }

    startsWith(string) {
        return this.input.substr(0, string.length) === string;
    }

    isEmpty() {
        return this.input.length === 0;
    }
}

class Expression {
    constructor(name, one, four, five, nine, multiplier, logger) {
        this.logger = logger;

        this.name = name;
        this.one = one;
        this.four = four;
        this.five = five;
        this.nine = nine;
        this.multiplier = multiplier;

        logger.add('Context: Created instance of Expression');
    }

    interpret(context) {
        if (context.isEmpty()) {
            return;
        } else if (context.startsWith(this.nine)) {
            context.output += (9 * this.multiplier);
            context.input = context.input.substr(2);
        } else if (context.startsWith(this.four)) {
            context.output += (4 * this.multiplier);
            context.input = context.input.substr(2);
        } else if (context.startsWith(this.five)) {
            context.output += (5 * this.multiplier);
            context.input = context.input.substr(1);
        }

        while (context.startsWith(this.one)) {
            context.output += this.multiplier;
            context.input = context.input.substr(1);
        }
    }
}

function showDescription() {
    showPatternDescription('Interpreter',
        [`The Interpreter pattern offers a scripting language that allows end-users
         to customize their solution.`,
        `Some applications are so complex that they require advanced configuration. 
        You could offer a basic scripting language which allows the end-user to 
        manipulate your application through simple instructions. The Interpreter
         pattern solves this particular problem – that of creating a simple scripting language.`,
        `Certain types of problems lend themselves to be characterized by a language. 
        This language describes the problem domain which should be well-understood and 
        well-defined. To implement this you need to map the language to a grammar. 
        Grammars are usually hierarchical tree-like structures that step through multiple 
        levels and then end up with terminal nodes (also called literals).`,
        `Problems like this, expressed as a grammar, can be implemented using the
         Interpreter design pattern.`,
        `Today, if you really need this type of control in JavaScript it is probably 
        easier to use a code generator like ANTLR which will allow you to build your own 
        command interpreters based on a grammar that you provide.`]
    )
}