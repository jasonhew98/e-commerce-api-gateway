const product = function(target, source) {
    source = source || {};

    target.productId = source.productId || null;

    return target;
}

module.exports = product;