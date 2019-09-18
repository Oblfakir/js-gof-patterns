export function AbstractFactory(logger) {
    const values = ['some value', 'another value', 'one more thing', 'example item'];
    const itemFactory = new ItemFactory(logger);
    const items = values.map(value => itemFactory.create(value));

    items.forEach(item => item.getValue());

    showDescription();
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

function showDescription() {
    document.getElementById('description').textContent = '';

    [`An Abstract Factory creates objects that are related by a common theme.
     In object-oriented programming a Factory is an object that creates other objects.
      An Abstract Factory has abstracted out a theme which is shared by the newly created objects.`
    ,`Suppose we have two Abstract Factories whose task it is to create page controls, 
    such as, buttons, textboxes, radio buttons, and listboxes. One is the Light Factory
     which creates controls that are white and the other the Dark Factory which 
     creates controls that are black. Both Factories creates the same types of 
     controls, but they differ in color, which is their common theme. This is an 
     implementation of the Abstract Factory pattern.`
    ,`Over time the Abstract Factory and Factory Method patterns have merged into 
    a more general pattern called Factory. A Factory is simply an object that 
    creates other objects.`
    ,`You may be wondering why you would want to leave the responsibility of the 
    construction of objects to others rather than simply calling a constructor function 
    with the new keyword directly. The reason is that that constructor functions are 
    limited in their control over the overall creation process and sometimes you will 
    need to hand over control to a factory that has broader knowledge.`
    ,`This includes scenarios in which the creation process involves object caching, 
    sharing or re-using of objects, complex logic, or applications that maintain object 
    and type counts, and objects that interact with different resources or devices. If 
    your application needs more control over the object creation process, consider using 
    a Factory.`]
        .map(x => {
            const p = document.createElement('p');
            p.textContent = x;
            return p;
        })
        .forEach(x => document.getElementById('description').appendChild(x));
}