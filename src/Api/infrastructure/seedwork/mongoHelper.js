function decorateNewEntity(entity, { userId, name }, currentTime = new Date().toISOString()) {
    return {
        ...entity,
        createdBy: userId || "Anonymous-User",
        createdByName: name || "Anonymous-User",
        createdUTCDateTime: new Date(currentTime),
        modifiedBy: userId || "Anonymous-User",
        modifiedByName: name || "Anonymous-User",
        modifiedUTCDateTime: new Date(currentTime)
    }
}

function decorateUpdateEntity(entity, { userId, name }, currentTime = new Date().toISOString()) {
    return {
        ...entity,
        modifiedBy: userId || "Anonymous-User",
        modifiedByName: name || "Anonymous-User",
        modifiedUTCDateTime: new Date(currentTime)
    }
}

function insertOne(repository, entity, user) {
    return repository.insertOne(decorateNewEntity(entity, user));
}

function findOne(repository, filter) {
    return repository.findOne(filter);
}

function findAll(repository, filter, sort, skip, pageSize) {
    return repository.find(filter)
        .skip(skip)
        .sort(sort)
        .limit(pageSize)
        .toArray();
}

function countDocuments(respository, filter) {
    return repository.countDocuments(filter);
}

function deleteOne(repository, filter) {
    return repository.deleteOne(filter);
}

function updateOne(repository, filter, updateData, use) {
    const updateEntity = decorateUpdateEntity(updateData, user);

    return repository.updateOne(
        filter,
        { $set: updateEntity }
    );
}

function updateMany(repository, filter, update, user) {
    const updateEntity = decorateUpdateEntity(update, user);

    return repository.updateMany(
        filter,
        { $set: updateEntity }
    );
}

function aggregate(repository, filter, sort, group) {
    return repository.aggregate([{$match: filter}, {$sort: sort}, {$group: group}]).toArray();
}

module.exports = {
    insertOne,
    findOne,
    findAll,
    deleteOne,
    updateOne,
    updateMany,
    countDocuments,
    aggregate
}