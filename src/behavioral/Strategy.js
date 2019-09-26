import showPatternDescription from '../description';

export function Strategy(logger) {
    showDescription();

    const calculator = new Calculator(logger);

    const firstCalculationMethod = new FirstCalculationMethod(logger);
    const secondCalculationMethod = new SecondCalculationMethod(logger);
    const thirdCalculationMethod = new ThirdCalculationMethod(logger);

    calculator.setMethod(firstCalculationMethod);
    logger.add(calculator.calculate('some value'));
    calculator.setMethod(secondCalculationMethod);
    logger.add(calculator.calculate('some value'));
    calculator.setMethod(thirdCalculationMethod);
    logger.add(calculator.calculate('some value'));
}

class Calculator {
    constructor(logger) {
        this.logger = logger;
        this.method = null;

        this.logger.add('Calculator: Created instance of Calculator');
    }

    setMethod(method) {
        this.logger.add('Calculator: Changed calculations method');
        this.method = method; 
    }

    calculate(value) {
        this.logger.add(`Calculator: Calculations with value ${value}`);
        return this.method.calculate(value);
    }
}

class FirstCalculationMethod {
    constructor(logger) {
        this.logger = logger;

        this.logger.add('SecondCalculationMethod: Created instance of FirstCalculationMethod');
    }

    calculate(value) {
        return `Results of calculations with FirstCalculationMethod on value ${value}`;
    }
}

class SecondCalculationMethod {
    constructor(logger) {
        this.logger = logger;

        this.logger.add('SecondCalculationMethod: Created instance of SecondCalculationMethod');
    }

    calculate(value) {
        return `Results of calculations with SecondCalculationMethod on value ${value}`;
    }
}

class ThirdCalculationMethod {
    constructor(logger) {
        this.logger = logger;

        this.logger.add('SecondCalculationMethod: Created instance of ThirdCalculationMethod');
    }

    calculate(value) {
        return `Results of calculations with ThirdCalculationMethod on value ${value}`;
    }
}

function showDescription() {
    showPatternDescription('Strategy',
        [`The Strategy pattern encapsulates alternative algorithms (or strategies) 
        for a particular task. It allows a method to be swapped out at runtime by 
        any other method (strategy) without the client realizing it. Essentially, 
        Strategy is a group of algorithms that are interchangeable.`,
        `Say we like to test the performance of different sorting algorithms to an 
        array of numbers: shell sort, heap sort, bubble sort, quicksort, etc. 
        Applying the Strategy pattern to these algorithms allows the test program 
        to loop through all algorithms, simply by changing them at runtime and test
         each of these against the array. For Strategy to work all method signatures 
         must be the same so that they can vary without the client program knowing about it.`,
        `In JavaScript the Strategy pattern is widely used as a plug-in mechanism 
        when building extensible frameworks. This can be a very effective approach.`]
    )
}