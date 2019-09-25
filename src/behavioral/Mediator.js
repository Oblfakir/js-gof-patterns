import showPatternDescription from '../description';

export function Mediator(logger) {
    const reciever1 = new Reciever('participant one', logger);
    const reciever2 = new Reciever('some reciever', logger);
    const reciever3 = new Reciever('member', logger);

    const sender = new Sender(logger);

    sender.addReciever(reciever1);
    sender.addReciever(reciever2);
    sender.addReciever(reciever3);

    reciever1.send('some long long long message to reciever 2', reciever2.name);
    reciever2.send('short message to reciever 1', reciever2.name);
    reciever3.send('broadcast message');

    showDescription();
}

class Reciever {
    constructor(name, logger) {
        this.name = name;
        this.logger = logger;

        logger.add(`Reciever: Created instance of Reciever with name: ${name}`);
    }

    addSender(sender) {
        this.logger.add(`Reciever: registered sender for reciever ${this.name}`);
        this.sender = sender;
    }

    send(message, target) {
        if (this.sender) {
            this.logger.add(`Reciever: reciever ${this.name} sent message '${message}' to ${target ? target : 'all'}`);
            this.sender.sendMessage(message, this.name, target);
        }
    }

    recieve(message, from) {
        this.logger.add(`Reciever: reciever ${this.name} recieved a message '${message}' from ${from}`)
    }
}

class Sender {
    constructor(logger) {
        this.logger = logger;
        this.recievers = {};

        logger.add('Sender: Created instance of Sender');
    }

    addReciever(reciever) {
        this.recievers[reciever.name] = reciever;
        reciever.addSender(this);
        this.logger.add(`Sender: added reciever with name ${reciever.name}`);
    }

    sendMessage(message, from, to) {
        this.logger.add(`Sender: sent message '${message}' from ${from} to ${to ? to : 'all'}`);

        if (to) {
            if (this.recievers[to]) {
                this.recievers[to].recieve(message, from);
            }
        } else {
            Object.values(this.recievers)
                .filter(reciever => reciever.name !== from)
                .forEach(reciever => reciever.recieve(message, from));
        }
    }
}

function showDescription() {
    showPatternDescription('Mediator',
        [`The Mediator pattern provides central authority over a group of 
        objects by encapsulating how these objects interact. This model is
         useful for scenarios where there is a need to manage complex conditions 
         in which every object is aware of any state change in any other object in the group.`,
        `The Mediator patterns are useful in the development of complex forms.
         Take for example a page in which you enter options to make a flight reservation. 
         A simple Mediator rule would be: you must enter a valid departure date, a valid 
         return date, the return date must be after the departure date, a valid departure 
         airport, a valid arrival airport, a valid number of travelers, and only then the 
         Search button can be activated.`,
        `Another example of Mediator is that of a control tower on an airport coordinating 
        arrivals and departures of airplanes.`]
    )
}