const env = process.env;

function getLocalConfig() {
    try {
        return require("./appsettings.local.json");
    } catch (e) {
        return null;
    }
}

const config = {
    port: env.PORT,
    mongoDb: {
        uri: env.MONGODB_URL || "",
        database: env.DATABASE || "",
        auditCollectionName: env.AUDIT_COLLECTION_NAME || "Audit",
    }
}

function isObject(item) {
    return (item && typeof item === 'object' && !Array.isArray(item));
}

function configurator(target, ...sources) {
    if (!sources.length) return target;
    const source = sources.shift();

    if (isObject(target) && isObject(source)) {
        for (const key in source) {
            if (isObject(source[key])) {
                if (!target[key]) Object.assign(target, { [key]: {} });
                configurator(target[key], source[key]);
            }
            else {
                Object.assign(target, { [key]: source[key] });
            }
        }
    }

    return configurator(target, ...sources);
}

const finalConfig = configurator(config, getLocalConfig());

module.exports = finalConfig;