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

module.exports = {
    insertOne,
    findOne,
    findAll,
}