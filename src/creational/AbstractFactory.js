export function AbstractFactory(logger) {
    const values = ['some value', 'another value', 'one more thing', 'example item'];
    const itemFactory = new ItemFactory(logger);
    const items = values.map(value => itemFactory.create(value));

    items.forEach(item => item.getValue());
}

class Item {
    constructor(value, logger) {
        this.value = value;
        this.logger = logger;

        logger.add('Item: Item was created by ItemFactory');
    }

    getValue() {
        this.logger.add('Item: Called a item method. Current value is: ' + this.value);
        return this.value;
    }
}

class ItemFactory {
    constructor(logger) {
        this.logger = logger;

        logger.add('ItemFactory: ItemFactory was created');
    }

    create(value) {
        this.logger.add('ItemFactory: Created item with value: ' + value);
        return new Item(value, this.logger);
    }
}
