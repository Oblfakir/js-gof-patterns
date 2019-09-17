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