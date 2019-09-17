export function Decorator(logger) {
    const item = new Item('some value', logger);
    const decoratedItem = new DecoratedItem(item, 'some additional value', logger);

    item.log();
    decoratedItem.log();
}

class Item {
    constructor(value, logger) {
        this.value = value;
        this.logger = logger;

        this.logger.add('Item: Created instance of Item with value: ' + value);
    }

    log() {
        this.logger.add('Item: Called method of Item with value: ' + this.value);
    }
}

class DecoratedItem {
    constructor(item, someAdditionalValue, logger) {
        this.item = item;
        this.someAdditionalValue = someAdditionalValue;
        this.logger = logger;

        this.logger.add('DecoratedItem: Created instance of DecoratedItem with Item value: ' + item.value + ' and additional value ' + this.someAdditionalValue);
    }

    log() {
        this.logger.add('DecoratedItem: Called method of DecoratedItem with value: ' + this.item.value+ ' and additional value ' + this.someAdditionalValue);
    }
}