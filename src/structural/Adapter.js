export function Adapter(logger) {
    const oldInstance = new OldInterface(logger);
    const neccessaryInfo = { value: 'some new interface neccessary value'};
    const adapter = new InterfacesAdapter(neccessaryInfo, logger);

    oldInstance.request();
    adapter.request();
}

class OldInterface {
    constructor(logger) {
        this.logger = logger;

        logger.add('OldInterface: Created instance of OldInterface');
    }

    request() {
        this.logger.add('OldInterface: Results of old interface');
    }
}

class NewInterface {
    constructor(logger) {
        this.logger = logger;
        this.neccessaryValue = null;

        logger.add('NewInterface: Created instance of NewInterface');
    }
    

    provideNecessaryInfo(info) {
        this.neccessaryValue = info.value;
        this.logger.add('NewInterface: provided neccessary info: ' + info.value);
    }

    calculate() {
        this.logger.add('NewInterface: Results of new interface is: ' + this.neccessaryValue);
    }
}

class InterfacesAdapter {
    constructor(newInfo, logger) {
        this.logger = logger;
        this.newInstance = new NewInterface(logger);

        this.newInstance.provideNecessaryInfo(newInfo);

        logger.add('InterfacesAdapter: Instance of InterfacesAdapter created');
    }

    request() {
        return this.newInstance.calculate();
    }
}