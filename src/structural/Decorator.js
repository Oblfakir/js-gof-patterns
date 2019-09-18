export function Decorator(logger) {
    const item = new Item('some value', logger);
    const decoratedItem = new DecoratedItem(item, 'some additional value', logger);

    item.log();
    decoratedItem.log();

    showDescription();
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

function showDescription() {
    document.getElementById('description').textContent = '';

    [`The Decorator pattern extends 
    (decorates) an object’s behavior dynamically. The ability to add new behavior at 
    runtime is accomplished by a Decorator object which ‘wraps itself’ around the 
    original object. Multiple decorators can add or override functionality to the original object.`
    ,`An example of a decorator is security management where business objects are given 
    additional access to privileged information depending on the privileges of 
    the authenticated user. For example, an HR manager gets to work with an 
    employee object that has appended (i.e. is decorated with) the employee's 
    salary record so that salary information can be viewed.`
    ,`Decorators provide flexibility to statically typed languages by allowing 
    runtime changes as opposed to inheritance which takes place at compile time. 
    JavaScript, however, is a dynamic language and the ability to extend an object 
    at runtime is baked into the language itself.`]
        .map(x => {
            const p = document.createElement('p');
            p.textContent = x;
            return p;
        })
        .forEach(x => document.getElementById('description').appendChild(x));
}