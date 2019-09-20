import showPatternDescription from '../description';

export function ChainOfResponsibility(logger) {
    showDescription();

    const counter1 = new Counter(123, logger);

    counter1.plus(12).minus(44).minus(444).plus(324).plus(322).minus(14).getValue();

    logger.add('===============');

    const counter2 = new Counter(4123, logger);

    counter2.plus(142).minus(448).minus(44).plus(34).plus(321).minus(14).getValue();
}

class Counter {
    constructor(value, logger) {
        this.value = value;
        this.logger = logger;

        this.logger.add(`Counter: Created instance of Counter with value ${value}`);
    }

    plus(value) {
        this.value += value;
        this.logger.add(`Counter: Called plus method with amount of ${value}. Current value is ${this.value}`);
        return this;
    }

    minus(value) {
        this.value -= value;
        this.logger.add(`Counter: Called minus method with amount of ${value}. Current value is ${this.value}`);
        return this;
    }

    getValue() {
        this.logger.add(`Counter: Called getValue method. Current value is ${this.value}`);
        return this.value;
    }
}

function showDescription() {
    showPatternDescription('Chain Of Responsibility',
        [`The Chain of Responsibility pattern provides a chain of loosely 
        coupled objects one of which can satisfy a request. This pattern is
         essentially a linear search for an object that can handle a particular request.`,
        `An example of a chain-of-responsibility is event-bubbling in which an
         event propagates through a series of nested controls one of which may 
         choose to handle the event.`,
        `The Chain of Responsiblity patterns is related to the Chaining Pattern 
        which is frequently used in JavaScript (jQuery makes extensive use of this pattern).`]
    )
}