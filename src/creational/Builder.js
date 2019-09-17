export function Builder(logger) {
    const itemBuilder = new ItemBuilder(logger);
    const item1 = itemBuilder.build().builderStep0().builderStep1().builderStep3().get();
    item1.log();
    logger.add('==============');
    const item2 = itemBuilder.build().builderStep1().builderStep0().builderStep2().get();
    item2.log();
}

class ItemBuilder {
    constructor(logger) {
        this.logger = logger;
        this.item = null;

        this.values = ['some value', 'another value', 'one more thing', 'example item'];

        logger.add('ItemBuilder: ItemBuilder was created');
    }

    build () {
        this.logger.add('ItemBuilder: Called a item build init method.');
        this.item = new Item(this.logger);
        return this;
    };

    get () {
        return this.item;
    }

    builderStep0 () {
        this.logger.add('ItemBuilder: Called builderStep0');
        this.item.addValue(this.values[0]);
        return this;
    }

    builderStep1 () {
        this.logger.add('ItemBuilder: Called builderStep1');
        this.item.addValue(this.values[1]);
        return this;
    }

    builderStep2 () {
        this.logger.add('ItemBuilder: Called builderStep2');
        this.item.addValue(this.values[2]);
        return this;
    }

    builderStep3 () {
        this.logger.add('ItemBuilder: Called builderStep3');
        this.item.addValue(this.values[3]);
        return this;
    }
}

class Item {
    constructor(logger) {
        this.values = [];
        this.logger = logger;

        logger.add('Item: Item was created by ItemFactory');
    }

    addValue(value) {
        this.logger.add('Item: Item was modified with value: ' + value);
        this.values.push(value);
        return this;
    }

    log() {
        this.logger.add('Item: item was build with values: ' + this.values.join(', '));
    }
}