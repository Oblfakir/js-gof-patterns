export function AbstractFactory(logger) {
    const values = ['some value', 'another value', 'one more thing', 'example item'];
    const itemFactory = new ItemFactory(logger);
    const items = values.map(value => itemFactory.create(value))
    items.forEach(item => item.getValue());
}

function Item (value, logger) {
    this.value = value;
    this.getValue = function () {
        logger.add('Item: Called a item method. Current value is: ' + this.value);
        return this.value;
    };

    logger.add('Item: Item was created by ItemFactory');
}

function ItemFactory (logger) {
    this.create = function(value) {
        logger.add('ItemFactory: Created item with value: ' + value);
        return new Item(value, logger);
    }

    logger.add('ItemFactory: ItemFactory was created');
}