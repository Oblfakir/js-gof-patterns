import showPatternDescription from '../description';

export function Memento(logger) {
    showDescription();

    const item1 = new Item('item1', 'state1', 'value1', logger);
    const item2 = new Item('item2', 'state2', 'value2', logger);
    const item3 = new Item('item3', 'state3', 'value3', logger);

    const stateSaver = new StateSaver(logger);

    item1.describe();
    item2.describe();
    item3.describe();

    stateSaver.add(1, item1.serialize());
    stateSaver.add(2, item2.serialize());
    stateSaver.add(3, item3.serialize());

    item1.changeState('definetly changed state');
    item2.changeState('some other state');
    item3.changeState('new state, not state that was before');

    item1.describe();
    item2.describe();
    item3.describe();

    item1.deserialize(stateSaver.get(1));
    item2.deserialize(stateSaver.get(2));
    item3.deserialize(stateSaver.get(3));

    item1.describe();
    item2.describe();
    item3.describe();
}

class Item {
    constructor(name, state, value, logger) {
        this.logger = logger;
        this.name = name;
        this.state = state;
        this.value = value;

        logger.add(`Item: Created item with props: ${name}, ${state}, ${value}`)
    }

    changeState(state) {
        this.logger.add(`Item: changed state from ${this.state} to ${state}`);
        this.state = state;
    }

    serialize() {
        this.logger.add(`Item: saved state of item: ${this.name}, ${this.state}, ${this.value}`);
        return JSON.stringify(this);
    }

    deserialize(data) {
        try {
            const savedItem = JSON.parse(data);

            this.name = savedItem.name;
            this.state = savedItem.state;
            this.value = savedItem.value;
            this.logger.add(`Item: returned state of item: ${this.name}, ${this.state}, ${this.value}`);
        } catch (error) {
            this.logger.add('Item: no saved state');
        }
    }

    describe() {
        this.logger.add(`Item: current state of item ${this.name}: ${this.state}, ${this.value}`);
    }
}

class StateSaver {
    constructor(logger) {
        this.logger = logger;
        this.cache = {};
    }

    add(key, state) {
        this.logger.add(`StateSaver: saved state with key ${key}`);
        this.cache[key] = state;
    }

    get(key) {
        this.logger.add(`StateSaver: get state with key ${key}`);
        return this.cache[key];
    }
}

function showDescription() {
    showPatternDescription('Memento',
        [`The Memento pattern provides temporary storage as well as restoration of an object. 
        The mechanism in which you store the object’s state depends on the required duration 
        of persistence, which may vary.`,
        `You could view a database as an implementation of the Memento design pattern in 
        which objects are persisted and restored. However, the most common reason for using
         this pattern is to capture a snapshot of an object’s state so that any subsequent 
         changes can be undone easily if necessary.`,
        `Essentially, a Memento is a small repository that stores an object’s state. 
        Scenarios in which you may want to restore an object into a state that existed
         previously include: saving and restoring the state of a player in a computer game 
         or the implementation of an undo operation in a database.`,
        `In JavaScript Mementos are easily implemented by serializing and de-serializing 
        objects with JSON.`]
    )
}