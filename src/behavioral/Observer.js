import showPatternDescription from '../description';

export function Observer(logger) {
    const handler1 = function (event) {
        logger.add(`Handler 1: Called with event name: ${event}`)
    };

    const handler2 = function (event) {
        logger.add(`Handler 2: Called with event name: ${event}`)
    };

    const eventEmitter = new EventEmitter(logger);

    const subscription = eventEmitter.subscribe(handler1);
    eventEmitter.subscribe(handler2);

    eventEmitter.fire('some event');
    eventEmitter.fire('another event');

    subscription.unsubscribe(logger);

    eventEmitter.fire('event');

    eventEmitter.unsubscribe(handler2);

    eventEmitter.fire('no subscribers event');

    showDescription();
}

class EventEmitter {
    constructor(logger) {
        this.logger = logger;
        this.subscribers = [];

        logger.add('EventEmitter: Created instance of EventEmitter');
    }

    subscribe(fn) {
        const logger = this.logger;
        this.logger.add('EventEmitter: subscribed event handler');
        this.subscribers.push(fn);

        const unsubscribe = () => {
            logger.add('EventEmitter: unsubscribed event handler via subscription object');
            this.subscribers = this.subscribers.filter(x => x !== fn);
        };

        return { unsubscribe };
    }

    unsubscribe(fn) {
        this.logger.add('EventEmitter: unsubscribed event handler via emitter method');
        this.subscribers = this.subscribers.filter(x => x !== fn);
    }

    fire(event) {
        this.logger.add(`EventEmitter: Fired event with name:  ${event}`);
        this.subscribers.forEach((subscriber) => {
            subscriber(event);
        });
    }
}

function showDescription() {
    showPatternDescription('Observer',
        [`The Observer pattern offers a subscription model in which objects
         subscribe to an event and get notified when the event occurs. This pattern 
         is the cornerstone of event driven programming, including JavaScript. The 
         Observer pattern facilitates good object-oriented design and promotes loose coupling.`,
        `When building web apps you end up writing many event handlers. Event handlers 
        are functions that will be notified when a certain event fires. 
        These notifications optionally receive an event argument with details about 
        the event (for example the x and y position of the mouse at a click event).`,
        `The event and event-handler paradigm in JavaScript is the manifestation of 
        the Observer design pattern. Another name for the Observer pattern is Pub/Sub,
         short for Publication/Subscription.`]
    )
}