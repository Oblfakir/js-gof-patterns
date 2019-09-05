export function Prototype(logger) {
    const proto = new Item('some item value', logger);
    proto.log();
    const prototype = new ItemPrototype(proto, logger);
    var clonedItem = prototype.clone();
    clonedItem.log();
}

function ItemPrototype(proto, logger) {
    this.proto = proto;

    this.clone = function () {
        logger.add('ItemPrototype: Item cloned with value: ' + this.proto.value);
        const item = new Item(null, logger);

        item.value = this.proto.value;

        return item;
    }

    logger.add('ItemPrototype: Created instance of type ItemPrototype with proto value of: ' + this.proto.value);
}

function Item(value, logger) {
    this.value = value;

    this.log = function() {
        logger.add('Item: Item with value: ' + this.value);
    }

    logger.add('Item: Created instance of type Item');
}