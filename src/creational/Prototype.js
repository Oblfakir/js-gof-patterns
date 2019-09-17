export function Prototype(logger) {
    const proto = new Item('some item value', logger);
    proto.log();
    const prototype = new ItemPrototype(proto, logger);
    const clonedItem = prototype.clone();
    clonedItem.log();
}

class ItemPrototype {
    constructor(proto, logger) {
        this.proto = proto;
        this.logger = logger;

        logger.add('ItemPrototype: Created instance of type ItemPrototype with proto value of: ' + proto.value);
    }
    

    clone() {
        this.logger.add('ItemPrototype: Item cloned with value: ' + this.proto.value);
        const item = new Item(null, this.logger);

        item.value = this.proto.value;

        return item;
    }
}

class Item {
    constructor(value, logger) {
        this.value = value;
        this.logger = logger;

        logger.add('Item: Created instance of type Item');
    }

    log() {
        this.logger.add('Item: Item with value: ' + this.value);
    }
}