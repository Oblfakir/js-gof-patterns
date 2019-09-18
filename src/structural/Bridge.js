export function Bridge(logger) {
    const objectToControl = new ObjectToControl(logger);
    const objectBridge = new ObjectBridge(objectToControl, logger);
    objectBridge.callObjectMethod();

    showDescription();
}

class ObjectToControl {
    constructor(logger) {
        this.logger = logger;

        logger.add('ObjectToControl: Created instance of ObjectToControl');
    }

    someObjectMethod() {
        this.logger.add('ObjectToControl: Called some object method');
    }
}

class ObjectBridge {
    constructor(obj, logger) {
        this.obj = obj;
        this.logger = logger;

        logger.add('ObjectBridge: Created instance of ObjectBridge');
    }
    

    callObjectMethod() {
        this.logger.add('ObjectBridge: Called some object method');
        this.obj.someObjectMethod();
    }
}

function showDescription() {
    document.getElementById('description').textContent = '';

    [`The Bridge pattern allows two components, a client and a service, 
    to work together with each component having its own interface. Bridge 
    is a high-level architectural pattern and its main goal is to write better 
    code through two levels of abstraction. It facilitates very loose coupling 
    of objects. It is sometimes referred to as a double Adapter pattern.`
    ,`An example of the Bridge pattern is an application (the client) and a database 
    driver (the service). The application writes to a well-defined database API, for 
    example ODBC, but behind this API you will find that each driver's implementation 
    is totally different for each database vendor (SQL Server, MySQL, Oracle, etc.).`
    ,`The Bridge pattern is a great pattern for driver development but it is rarely 
    seen in JavaScript.`]
        .map(x => {
            const p = document.createElement('p');
            p.textContent = x;
            return p;
        })
        .forEach(x => document.getElementById('description').appendChild(x));
}