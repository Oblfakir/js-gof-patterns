export function Singleton(logger) {
    const instance1 = ItemSingleton.getInstance(logger);
    logger.add('Got instance from ItemSingleton');
    instance1.log('some value');
    logger.add('Got another instance from ItemSingleton');
    const instance2 = ItemSingleton.getInstance(logger);
    instance2.log('another value');
}

const ItemSingleton = (function () {
    let instance;

    function createInstance(logger) {
        logger.add('ItemSingleton: Created instance of singleton object');
        return {
            log(message) {
                logger.add('ItemSingleton: Called singeton method with value: ' + message);
            }
        }
    }

    return {
        getInstance(logger) {
            if (!instance) {
                instance = createInstance(logger);
            }
            return instance;
        }
    }
})();