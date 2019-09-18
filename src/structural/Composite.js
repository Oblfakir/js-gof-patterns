export function Composite(logger) {
    const root = new Node("root", logger);
    const left = new Node("left", logger)
    const right = new Node("right", logger);
    const leftleft = new Node("leftleft", logger);
    const leftright = new Node("leftright", logger);
    const rightleft = new Node("rightleft", logger);
    const rightright = new Node("rightright", logger);

    root.addChild(left);
    root.addChild(right);
 
    left.addChild(leftleft);
    left.addChild(leftright);
 
    right.addChild(rightleft);
    right.addChild(rightright);

    root.traverse(1);

    left.removeChild(leftright);

    root.traverse(1);

    root.removeChild(left);

    root.traverse(1);

    showDescription();
}

class Node {
    constructor(value, logger) {
        this.children = [];
        this.value = value;
        this.logger = logger;

        this.logger.add('Node: Created instance of Node with value: ' + value);
    }

    addChild(child) {
        this.children.push(child);
        this.logger.add('Node: to ' + this.value + ' added child with value: ' + child.value);
    }

    removeChild(child) {
        this.children = [...this.children.filter(x => x !== child)];

        this.logger.add('Node: from ' + this.value + ' removed child with value: ' + child.value);
    }

    getChild(index) {
        return this.children[index];
    }

    hasChildren() {
        return this.children.length > 0;
    }

    childrenCount() {
        return this.children.length;
    }

    traverse(indent) {
        this.logger.add(Array(indent++).join("------") + this.value);

        this.children.forEach((child) => child.traverse(indent));
    }
}

function showDescription() {
    document.getElementById('description').textContent = '';

    [`The Composite pattern allows the creation of objects with properties 
    that are primitive items or a collection of objects. Each item in the 
    collection can hold other collections themselves, creating deeply nested structures.`
    ,`A tree control is a perfect example of a Composite pattern. The nodes of the 
    tree either contain an individual object (leaf node) or a group of objects 
    (a subtree of nodes).`
    ,`All nodes in the Composite pattern share a common set of properties and 
    methods which supports individual objects as well as object collections. 
    This common interface greatly facilitates the design and construction of 
    recursive algorithms that iterate over each object in the Composite collection.`]
        .map(x => {
            const p = document.createElement('p');
            p.textContent = x;
            return p;
        })
        .forEach(x => document.getElementById('description').appendChild(x));
}