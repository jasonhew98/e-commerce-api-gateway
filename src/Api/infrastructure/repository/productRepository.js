const { findAll } = require('../seedwork/mongoHelper');

module.exports = ({ collections: { product } }) => {
    const currentCollection = product;

    return {
        async getAll({ sortBy, sortOrder = -1, pageSize = 10, currentPage = 1 }) {
            try {
                let filter = {};

                const skip = (currentPage - 1) <= 0 ? 0 : (currentPage - 1) * pageSize;

                sortBy = sortBy ? sortBy : "_id";

                const sort = {};
                sort[sortBy] = sortOrder == -1 ? sortOrder : 1;

                const result = await findAll(currentCollection, filter, sort, skip, pageSize);

                return {success: true, result };
            } catch (err) {
                return { success: false, err };
            }
        }
    }
}