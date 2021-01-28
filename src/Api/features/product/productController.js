const { createController } = require('awilix-express');
const assignProductDto = require('../../domain/model/product');

const productController = ({
    configurations,
    repository: { productRepository }
}) => {
    return {
        async getAll(req, res, next) {
            try{
                const { sortBy, sortOrder, pageSize, currentPage } = req.query;

                const { success, result , error } = await productRepository.getAll({
                    sortBy: sortBy,
                    sortOrder: (+sortOrder),
                    pageSize: (+pageSize),
                    currentPage: (+currentPage)
                })

                const resultDto = result.map(e => assignProductDto({}. e));

                if (success)
                    return res.status(200).send(resultDto);
                else
                    return res.status(500).send();
                
            } catch (err) {
                next(err)
            }
        }
    }
}

module.exports = createController(productController)
    .prefix("/api/product")
    .get("/", "getAll");