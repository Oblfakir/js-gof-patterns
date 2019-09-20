import showPatternDescription from '../description';

export function Facade(logger) {
    const facade = new SubsystemsFacade(logger);
    facade.unitedMethod();

    showDescription();
}

class SubsystemsFacade {
    constructor(logger) {
        this.logger = logger;

        this.logger.add('SubsystemsFacade: Created instance of SubsystemsFacade');

        this.subsystemOne = new SubsystemOne(logger);
        this.subsystemTwo = new SubsystemTwo(logger);
        this.subsystemThree = new SubsystemThree(logger);
    }

    unitedMethod() {
        const s1value = this.subsystemOne.subsystemOneMethod();
        const s2value = this.subsystemTwo.subsystemTwoMethod();
        const s3value = this.subsystemThree.subsystemThreeMethod();
        this.logger.add(`SubsystemsFacade: Result of unitedMethod call: ${s1value}, ${s2value}, ${s3value}`)
    }
}

class SubsystemOne {
    constructor(logger) {
        this.logger = logger;

        this.logger.add('SubsystemOne: Created instance of SubsystemOne');
    }

    subsystemOneMethod() {
        this.logger.add('SubsystemOne: Called method of SubsystemOne');

        return 'subsystem One value';
    }
}

class SubsystemTwo {
    constructor(logger) {
        this.logger = logger;

        this.logger.add('SubsystemTwo: Created instance of SubsystemTwo');
    }

    subsystemTwoMethod() {
        this.logger.add('SubsystemTwo: Called method of SubsystemTwo');

        return 'subsystem Two value';
    }
}

class SubsystemThree {
    constructor(logger) {
        this.logger = logger;

        this.logger.add('SubsystemThree: Created instance of SubsystemThree');
    }

    subsystemThreeMethod() {
        this.logger.add('SubsystemThree: Called method of SubsystemThree');

        return 'subsystem Three value';
    }
}

function showDescription() {
    showPatternDescription('Facade',
    [`The Façade pattern provides an interface which shields clients from 
    complex functionality in one or more subsystems. It is a simple pattern 
    that may seem trivial but it is powerful and extremely useful. It is often 
    present in systems that are built around a multi-layer architecture.`
    ,`The intent of the Façade is to provide a high-level interface (properties 
        and methods) that makes a subsystem or toolkit easy to use for the client.`
    ,`On the server, in a multi-layer web application you frequently have a presentation 
    layer which is a client to a service layer. Communication between these two 
    layers takes place via a well-defined API. This API, or façade, hides the 
    complexities of the business objects and their interactions from the presentation layer.`
    ,`Another area where Façades are used is in refactoring. Suppose you have a 
    confusing or messy set of legacy objects that the client should not be concerned 
    about. You can hide this code behind a Façade. The Façade exposes only what is 
    necessary and presents a cleaner and easy-to-use interface.`
    ,`Façades are frequently combined with other design patterns. Facades themselves
     are often implemented as singleton factories.`]);
}