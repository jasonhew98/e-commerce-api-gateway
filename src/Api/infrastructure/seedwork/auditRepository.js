const { insertOne } = require('./mongoHelper');

module.exports = ({ collections: { audit } }) => {
    const currentCollection = audit;

    return {
        async log(record, user) {
            try {
                const result = await insertOne(currentCollection, record, user);
                return { success: true, result: record };
            } catch (err) {
                return { success: false, err };
            }
        }
    }
}