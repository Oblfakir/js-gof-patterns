import showPatternDescription from '../description';

export function Builder(logger) {
    const itemBuilder = new ItemBuilder(logger);
    const item1 = itemBuilder.build().builderStep0().builderStep1().builderStep3().get();
    item1.log();
    logger.add('==============');
    const item2 = itemBuilder.build().builderStep1().builderStep0().builderStep2().get();
    item2.log();

    showDescription();
}

class ItemBuilder {
    constructor(logger) {
        this.logger = logger;
        this.item = null;

        this.values = ['some value', 'another value', 'one more thing', 'example item'];

        logger.add('ItemBuilder: ItemBuilder was created');
    }

    build () {
        this.logger.add('ItemBuilder: Called a item build init method.');
        this.item = new Item(this.logger);
        return this;
    };

    get () {
        return this.item;
    }

    builderStep0 () {
        this.logger.add('ItemBuilder: Called builderStep0');
        this.item.addValue(this.values[0]);
        return this;
    }

    builderStep1 () {
        this.logger.add('ItemBuilder: Called builderStep1');
        this.item.addValue(this.values[1]);
        return this;
    }

    builderStep2 () {
        this.logger.add('ItemBuilder: Called builderStep2');
        this.item.addValue(this.values[2]);
        return this;
    }

    builderStep3 () {
        this.logger.add('ItemBuilder: Called builderStep3');
        this.item.addValue(this.values[3]);
        return this;
    }
}

class Item {
    constructor(logger) {
        this.values = [];
        this.logger = logger;

        logger.add('Item: Item was created by ItemFactory');
    }

    addValue(value) {
        this.logger.add('Item: Item was modified with value: ' + value);
        this.values.push(value);
        return this;
    }

    log() {
        this.logger.add('Item: item was build with values: ' + this.values.join(', '));
    }
}

function showDescription() {
    showPatternDescription('Builder',
    [`The Builder pattern allows a client to construct a complex object
     by specifying the type and content only. Construction details are hidden
      from the client entirely.`
    ,`The most common motivation for using Builder is to simplify client code that 
    creates complex objects. The client can still direct the steps taken by the 
    Builder without knowing how the actual work is accomplished. Builders frequently 
    encapsulate construction of Composite objects (another GoF design pattern) because 
    the procedures involved are often repetitive and complex.`
    ,`Usually it is the last step that returns the newly created object which makes 
    it easy for a Builder to participate in fluent interfaces in which multiple method 
    calls, separated by dot operators, are chained together (note: fluent interfaces 
        are implementation of the Chaining Pattern as presented in the Modern patterns section).`]);
}