export function Adapter(logger) {
    const oldInstance = new OldInterface(logger);
    const neccessaryInfo = { value: 'some new interface neccessary value'};
    const adapter = new InterfacesAdapter(neccessaryInfo, logger);

    oldInstance.request();
    adapter.request();

    showDescription();
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

function showDescription() {
    document.getElementById('description').textContent = '';

    [`The Adapter pattern translates one interface (an object's properties and methods)
     to another. Adapters allows programming components to work together that otherwise
      wouldn't because of mismatched interfaces. The Adapter pattern is also referred 
      to as the Wrapper Pattern.`
    ,`One scenario where Adapters are commonly used is when new components need to 
    be integrated and work together with existing components in the application.`
    ,`Another scenario is refactoring in which parts of the program are rewritten 
    with an improved interface, but the old code still expects the original interface.`]
        .map(x => {
            const p = document.createElement('p');
            p.textContent = x;
            return p;
        })
        .forEach(x => document.getElementById('description').appendChild(x));
}