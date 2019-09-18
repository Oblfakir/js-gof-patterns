export function Prototype(logger) {
    const proto = new Item('some item value', logger);
    proto.log();
    const prototype = new ItemPrototype(proto, logger);
    const clonedItem = prototype.clone();
    clonedItem.log();

    showDescription();
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

function showDescription() {
    document.getElementById('description').textContent = '';

    [`The Prototype Pattern creates new objects, but rather than creating 
    non-initialized objects it returns objects that are initialized with 
    values it copied from a prototype - or sample - object. The Prototype 
    pattern is also referred to as the Properties pattern.`
    ,`An example of where the Prototype pattern is useful is the initialization 
    of business objects with values that match the default values in the database. 
    The prototype object holds the default values that are copied over into a newly 
    created business object.`
    ,`Classical languages rarely use the Prototype pattern, but JavaScript being 
    a prototypal language uses this pattern in the construction of new objects 
    and their prototypes.`]
        .map(x => {
            const p = document.createElement('p');
            p.textContent = x;
            return p;
        })
        .forEach(x => document.getElementById('description').appendChild(x));
}