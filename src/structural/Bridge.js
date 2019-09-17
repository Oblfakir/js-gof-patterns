export function Bridge(logger) {
    const objectToControl = new ObjectToControl(logger);
    const objectBridge = new ObjectBridge(objectToControl, logger);
    objectBridge.callObjectMethod();
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
