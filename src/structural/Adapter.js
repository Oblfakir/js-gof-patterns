export function Adapter(logger) {
    const oldInstance = new OldInterface(logger);
    const neccessaryInfo = { value: 'some new interface neccessary value'};
    const adapter = new InterfacesAdapter(neccessaryInfo, logger);

    oldInstance.request();
    adapter.request();
}

function OldInterface(logger) {
    this.request = function () {
        logger.add('OldInterface: Results of old interface');
    }

    logger.add('OldInterface: Created instance of OldInterface');
}

function NewInterface(logger) {
    this.neccessaryValue = null;

    this.provideNecessaryInfo = function (info) {
        this.neccessaryValue = info.value;
        logger.add('NewInterface: provided neccessary info: ' + info.value);
    }

    this.calculate = function () {
        logger.add('NewInterface: Results of new interface is: ' + this.neccessaryValue);
    }

    logger.add('NewInterface: Created instance of NewInterface');
}

function InterfacesAdapter(newInfo, logger) {
    logger.add('InterfacesAdapter called');
    const newInstance = new NewInterface(logger);

    newInstance.provideNecessaryInfo(newInfo);

    return {
        request() {
            return newInstance.calculate();
        }
    }
}