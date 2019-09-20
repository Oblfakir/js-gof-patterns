import showPatternDescription from '../description';

export function FactoryMethod(logger) {
    const itemFactory = new ItemFactory(logger);
    const item1 = itemFactory.createItem('1');
    const item2 = itemFactory.createItem('2');
    const item3 = itemFactory.createItem('3');
    const item4 = itemFactory.createItem('4');

    item1.log();
    item2.log();
    item3.log();
    item4.log();

    showDescription();
}

class ItemFactory {
    constructor(logger) {
        this.logger = logger;

        logger.add('ItemFactory: Created instance of ItemFactory');
    }

    createItem(type) {
        this.logger.add('ItemFactory: Called createItem with type ' + type);
        let item = null;
        const logger = this.logger;

        switch (type) {
            case '1': {
                item = new ItemType1(logger);
                break;
            }
            case '2': {
                item = new ItemType2(logger);
                break;
            }
            case '3': {
                item = new ItemType3(logger);
                break;
            }
            case '4': {
                item = new ItemType4(logger);
                break;
            }
        }

        item.type = type;

        item.log = function () {
            logger.add('Item: Created instance of type ' + this.type + ' with value ' + this.value);
        }

        return item;
    }
}

class ItemType1 {
    constructor(logger) {
        this.value = 'value 1';
        logger.add('Item: Created instance of ItemType1');
    }
}

class ItemType2 {
    constructor(logger) {
        this.value = 'value 2';
        logger.add('Item: Created instance of ItemType2');
    }
}

class ItemType3 {
    constructor(logger) {
        this.value = 'value 3';
        logger.add('Item: Created instance of ItemType3');
    }
}

class ItemType4 {
    constructor(logger) {
        this.value = 'value 4';
        logger.add('Item: Created instance of ItemType4');
    }
}

function showDescription() {
    showPatternDescription('Factory Method',
    [`A Factory Method creates new objects as instructed by the client. One way 
    to create objects in JavaScript is by invoking a constructor function with 
    the new operator. There are situations however, where the client does not, 
    or should not, know which one of several candidate objects to instantiate. 
    The Factory Method allows the client to delegate object creation while still 
    retaining control over which type to instantiate.`
    ,`The key objective of the Factory Method is extensibility. Factory Methods 
    are frequently used in applications that manage, maintain, or manipulate 
    collections of objects that are different but at the same time have many 
    characteristics (i.e. methods and properties) in common. An example would be a 
    collection of documents with a mix of Xml documents, Pdf documents, and Rtf documents.`]);
}