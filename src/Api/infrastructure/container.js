const { asClass, asValue, asFunction, createContainer } = require('awilix');
const { MongoClient } = require('mongodb');

module.exports = async (configurations) => {
    function getLogger() {
        if (configurations.logging.globalThreshold === "Off")
            return {
                log: () => { },
                info: () => { },
                error: () => { },
            };
        else
            return console;
    }
    
    const container = createContainer();
    const client = await MongoClient.connect(configurations.mongoDb.uri, { useNewUrlParser: true, useUnifiedTopology: true }),
        database = client.db(configurations.mongoDb.database);

    const collections = {
        database,
        audit: database.collection(configurations.mongoDb.auditCollectionName),
        product: database.collection(configurations.mongoDb.productCollectionName)
    };

    const logger = getLogger();
    const auditRepository = require('./seedwork/auditRepository')({ logger, config: configurations, collections });
    const productRepository = require('./repository/productRepository')({ logger, config: configurations, collections });

    container.register({
        configurations: asValue(configurations),
        logger: asValue(console),
        repository: asValue({
            auditRepository,
            productRepository
        })
    });

    return container;
}