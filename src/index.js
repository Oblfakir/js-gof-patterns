import * as behavioral from './behavioral';
import * as creational from './creational';
import * as structural from './structural';
import { logger } from './logger';

const methods = {
    Creational: {
        AbstractFactory: creational.AbstractFactory,
        Builder: creational.Builder,
        FactoryMethod: creational.FactoryMethod,
        Prototype: creational.Prototype,
        Singleton: creational.Singleton
    },
    Structural: {
        Adapter: structural.Adapter,
        Bridge: structural.Bridge,
        Composite: structural.Composite,
        Decorator: structural.Decorator,
        Facade: structural.Facade,
        Flyweight: structural.Flyweight,
        Proxy: structural.Proxy
    },
    Behavioral: {
        ChainOfResponsibility: behavioral.ChainOfResponsibility,
        Command: behavioral.Command,
        Interpreter: behavioral.Interpreter,
        Iterator: behavioral.Iterator,
        Mediator: behavioral.Mediator,
        Memento: behavioral.Memento,
        Observer: behavioral.Observer,
        State: behavioral.State,
        Strategy: behavioral.Strategy,
        TemplateMethod: behavioral.TemplateMethod,
        Visitor: behavioral.Visitor
    }
};

const buttonsContainer = document.getElementById('buttons-container');

const spawnButtons = () => {
    Object.entries(methods).forEach(([key, value]) => {
        const container = document.createElement('div');
        const header = document.createElement('h3');
        const buttons = document.createElement('div');
        buttons.classList.add('buttons-wrapper');
        container.appendChild(header);
        header.textContent = key;
        container.classList.add('type');
        container.appendChild(buttons);
        buttonsContainer.appendChild(container);

        Object.entries(value).forEach(([pattern, method]) => {
            const button = document.createElement('button');
            button.textContent = pattern;
            button.addEventListener('click', () => {
                logger.clear();
                method(logger);
            });
            buttons.appendChild(button);
        });
    });
}

document.addEventListener("DOMContentLoaded", function() {
    spawnButtons();
});

