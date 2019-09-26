import showPatternDescription from '../description';

export function TemplateMethod(logger) {
    showDescription();

    const executor = new Executor(logger);

    logger.add('Added first step to executor');
    executor.step1 = step1;
    logger.add('Added second step to executor');
    executor.step2 = step2;
    logger.add('Added third step to executor');
    executor.step3 = step3;

    executor.run();
}

class Executor {
    constructor(logger) {
        this.step1 = null;
        this.step2 = null;
        this.step3 = null;
        this.logger = logger;

        logger.add('Executor: Created instance of Executor');
    }

    run() {
        this.logger.add('Executor: called run method');
        this.logger.add(this.step1());
        this.logger.add(this.step2());
        this.logger.add(this.step3());
    }
}

function step1() {
    return 'Result of first step';
}

function step2() {
    return 'Result of second step';
}

function step3() {
    return 'Result of third step';
}

function showDescription() {
    showPatternDescription('Template Method',
        [`The Template Method pattern provides an outline of a series of steps for
         an algorithm. Objects that implement these steps retain the original structure
          of the algorithm but have the option to redefine or adjust certain steps. 
          This pattern is designed to offer extensibility to the client developer.`,
        `Template Methods are frequently used in general purpose frameworks or libraries 
        that will be used by other developer An example is an object that fires a sequence 
        of events in response to an action, for example a process request. The object 
        generates a 'preprocess' event, a 'process' event and a 'postprocess' event. 
        The developer has the option to adjust the response to immediately before the 
        processing, during the processing and immediately after the processing.`,
        `An easy way to think of Template Method is that of an algorithm with holes 
        (see diagram below). It is up to the developer to fill these holes with appropriate
         functionality for each step.`]
    )
}