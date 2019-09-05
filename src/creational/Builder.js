export function Builder(logger) {
    const itemBuilder = new ItemBuilder(logger);
    const item1 = itemBuilder.build().builderStep0().builderStep1().builderStep3().get();
    item1.log();
    logger.add('==============');
    const item2 = itemBuilder.build().builderStep1().builderStep0().builderStep2().get();
    item2.log();
}

function ItemBuilder(logger) {
    const item = null;
    const values = ['some value', 'another value', 'one more thing', 'example item'];

    this.build = function () {
        logger.add('ItemBuilder: Called a item build init method.');
        this.item = new Item(logger);
        return this;
    };

    this.get = function() {
        return this.item;
    }

    this.builderStep0 = function () {
        logger.add('ItemBuilder: Called builderStep0');
        this.item.addValue(values[0]);
        return this;
    }

    this.builderStep1 = function () {
        logger.add('ItemBuilder: Called builderStep1');
        this.item.addValue(values[1]);
        return this;
    }

    this.builderStep2 = function () {
        logger.add('ItemBuilder: Called builderStep2');
        this.item.addValue(values[2]);
        return this;
    }

    this.builderStep3 = function () {
        logger.add('ItemBuilder: Called builderStep3');
        this.item.addValue(values[3]);
        return this;
    }

    logger.add('ItemBuilder: ItemBuilder was created');
}

function Item (logger) {
    this.values = [];

    this.addValue = function (value) {
        logger.add('Item: Item was modified with value: ' + value);
        this.values.push(value);
        return this;
    }

    this.log = function () {
        logger.add('Item: item was build with values: ' + this.values.join(', '));
    }

    logger.add('Item: Item was created by ItemFactory');
}