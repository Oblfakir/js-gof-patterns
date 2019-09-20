export function Proxy(logger) {
    showDescription();

    const itemProxy = new ItemProxy(logger);

    itemProxy.getItem(1);
    itemProxy.getItem(2);
    itemProxy.getItem(3);
    itemProxy.getItem(4);
    itemProxy.getItem(5);
    itemProxy.getItem(2);
    itemProxy.getItem(3);
    itemProxy.getItem(2);
    itemProxy.getItem(4);
    itemProxy.getItem(4);
    itemProxy.getItem(4);
    itemProxy.getItem(4);

    logger.add('Proxy cache size: ' + itemProxy.getCount());
}

class ItemProxy {
    constructor(logger) {
        this.logger = logger;
        this.itemProvider = new ItemProvider(logger);
        this.cache = {};

        this.logger.add('ItemProxy: Created instance of ItemProxy');
    }

    getItem(id) {
        if (!this.cache[id]) {
            this.cache[id] = this.itemProvider.getItem(id);
        }

        this.logger.add('ItemProxy: Requested item with id: ' + id);

        return this.cache[id];
    }

    getCount() {
        this.logger.add('ItemProxy: Requested item count');

        return Object.keys(this.cache).length;
    }
}

class ItemProvider {
    constructor(logger) {
        this.logger = logger;
        this.items = [];

        this.logger.add('ItemProvider: Created instance of ItemProvider');
    }

    getItem(id) {
        this.logger.add('ItemProvider: Requested item with id: ' + id);
        const item = this.items.find(x => x.id === id);

        if (item) return item;

        const newItem = new Item('value ' + id, id, this.logger)
        this.items.push(newItem);

        return newItem;
    }
}

class Item {
    constructor(value, id, logger) {
        this.value = value;
        this.id = id;
        this.logger = logger;

        this.logger.add('Item: Created instance of Item');
    }
}

function showDescription() {
    document.getElementById('description').textContent = '';

    [`The Proxy pattern provides a surrogate or placeholder object for another 
    object and controls access to this other object.`
    ,`In object-oriented programming, objects do the work they advertise through 
    their interface (properties and methods). Clients of these objects expect this 
    work to be done quickly and efficiently. However, there are situations where 
    an object is severely constrained and cannot live up to its responsibility. 
    Typically this occurs when there is a dependency on a remote resource (resulting 
        in network latency) or when an object takes a long time to load.`
    ,`In situations like these you apply the Proxy pattern and create a proxy object 
    that ‘stands in’ for the original object. The Proxy forwards the request to a 
    target object. The interface of the Proxy object is the same as the original object 
    and clients may not even be aware they are dealing with a proxy rather than the real object.`]
        .map(x => {
            const p = document.createElement('p');
            p.textContent = x;
            return p;
        })
        .forEach(x => document.getElementById('description').appendChild(x));
}