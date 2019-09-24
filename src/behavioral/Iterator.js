import showPatternDescription from '../description';

export function Iterator(logger) {
    const items = ['item1', 2, true, 'four', 5];
    const iterator = new ItemIterator(items, logger);

    for (let item = iterator.first(); iterator.hasNext(); item = iterator.next()) {
        logger.add(`Iterator: for loop item: ${item}`)
    }

    iterator.each((item) => {
        logger.add(`Iterator: each method item: ${item}`)
    });

    showDescription();
}

class ItemIterator {
    constructor(items, logger) {
        this.items = items;
        this.index = 0;

        logger.add(`ItemIterator: Created instance of ItemIterator with values: ${ items.join(', ') }`)
    }

    first() {
        this.reset();
        return this.next();
    }

    next() {
        return this.items[this.index++];
    }

    hasNext() {
        return this.index <= this.items.length;
    }

    reset() {
        this.index = 0;
    }

    each(callback) {
        for (let item = this.first(); this.hasNext(); item = this.next()) {
            callback(item);
        }
    }
}

function showDescription() {
    showPatternDescription('Iterator',
        [`The Iterator pattern allows clients to effectively loop over a collection of objects`,
        `A common programming task is to traverse and manipulate a collection of objects. These 
        collections may be stored as an array or perhaps something more complex, such as a tree 
        or graph structure. In addition, you may need to access the items in the collection in a 
        certain order, such as, front to back, back to front, depth first (as in tree searches), 
        skip evenly numbered objects, etc.`,
        `The Iterator design pattern solves this problem by separating the collection of objects 
        from the traversal of these objects by implementing a specialized iterator.`,
        `Today, many languages have Iterators built-in by supporting 'for-each'-type constructs 
        and IEnumerable and IEnumerator interfaces. However, JavaScript only supports basic 
        looping in the form of for, for-in, while, and do while statements.`,
        `The Iterator pattern allows JavaScript developers to design looping constructs that 
        are far more flexible and sophisticated.`]
    )
}