export function Flyweight(logger) {
    showDescription();

    const items = new ItemCollection(logger);

    items.add('Source 1', 'value 1', 'some property', 'hsf834fdn3');
    items.add('Source 1', 'value 1', 'some property', 'b655895323');
    items.add('Source 1', 'value 1', 'some property', 'hjcfewj234');
    items.add('Source 1', 'value 1', 'some property', 'nx23405vj8');
    items.add('Source 2', 'value 1', 'some property', 'fmrc5jvg40');
    items.add('Source 2', 'value 1', 'some property', 'xm239mc494');
    items.add('Source 2', 'value 2', 'some property', 'qcn34gf5sx');
    items.add('Source 2', 'value 2', 'some property', 'fmrc5jvg40');
    items.add('Source 2', 'value 2', 'some property', 'xm239mc494');
    items.add('Source 2', 'value 2', 'some property', 'qcn34gf5sx');

    logger.add(`Item Collection length is: ${ items.getCount()}`);
    logger.add(`Flyweights count is: ${ ItemFlyweightFactory.getCount(logger)}`);
}

class ItemFlyweight {
    constructor(source, value, property, logger) {
        this.source = source;
        this.value = value;
        this.property = property;

        logger.add(`Item: Created instance of ItemFlyweight with args: ${source}, ${value}, ${property}`);
    }
}

class Item {
    constructor(source, value, property, id, logger) {
        this.flyweight = ItemFlyweightFactory.get(source, value, property, logger);
        this.id = id;
        this.logger = logger;

        logger.add(`Item: Created instance of Item with args: ${source}, ${value}, ${property}, ${id}`);
    }

    getProperty() {
        logger.add('Item: Called getProperty method');
        return this.flyweight.property;
    }
}

class ItemCollection {
    constructor(logger) {
        this.logger = logger;
        this.items = {};
        this.count = 0;

        logger.add('ItemCollection: Created instance of ItemCollection');
    }

    add(source, value, property, id) {
        this.logger.add('ItemCollection: Called add method');
        this.items[id] = new Item(source, value, property, id, this.logger);
        this.count ++;
    }
    
    get(id) {
        this.logger.add('ItemCollection: Called get method');
        return this.items[id];
    }

    getCount() {
        this.logger.add('ItemCollection: Called getCount method');
        return this.count;
    }
}

const ItemFlyweightFactory = (() => {
    const flyweights = {};

    return {
        get(source, value, property, logger) {
            logger.add(`ItemFlyweightFactory: Called get method with source ${source} and value ${value}`);

            if (!flyweights[source + value]) {
                logger.add(`ItemFlyweightFactory: No flyweight found with source ${source} and value ${value}, creating one`);
                flyweights[source + value] = new ItemFlyweight(source, value, property, logger);
            }

            return flyweights[source + value];
        },
        getCount(logger) {
            logger.add(`ItemFlyweightFactory: Called getCount method`);
            return Object.keys(flyweights).length;
        }
    };
})();

function showDescription() {
    document.getElementById('description').textContent = '';

    [`The Flyweight pattern conserves memory by sharing large numbers of fine-grained objects 
    efficiently. Shared flyweight objects are immutable, that is, they cannot be changed 
    as they represent the characteristics that are shared with other objects.`
    ,`Essentially Flyweight is an 'object normalization technique' in which common 
    properties are factored out into shared flyweight objects. (Note: the idea is similar
         to data model normalization, a process in which the modeler attempts to minimize
          redundancy).`
    ,`An example of the Flyweight Pattern is within the JavaScript engine itself which 
    maintains a list of immutable strings that are shared across the application.`
    ,`Other examples include characters and line-styles in a word processor, or 'digit 
    receivers' in a public switched telephone network application. You will find flyweights
     mostly in utility type applications such as word processors, graphics programs, 
     and network apps; they are less often used in data-driven business type applications.`]
        .map(x => {
            const p = document.createElement('p');
            p.textContent = x;
            return p;
        })
        .forEach(x => document.getElementById('description').appendChild(x));
}