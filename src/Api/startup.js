const bodyParser = require('body-parser');
const helmet = require('helmet');
const { loadControllers, scopePerRequest, inject } = require('awilix-express');
const express = require('express');
require('express-async-errors');

function middleware(path) {
    return inject(require(path));
}

module.exports = async (config) => {
    var app = express();
    
    app.get("/health", (req, res) => res.send("ok"));

    app.use(helmet());
    app.use(function(req, res, next) {
        res.header("Access-Control-Allow-Origin", "*");
        res.header("Access-Control-Allow-Methods", "*");
        res.header("Access-Control-Allow-Headers", "*");
        next();
    });

    app.use(bodyParser.json({ limit: '20mb' }));
    app.use(bodyParser.urlencoded({ limit: '20mb', extended: false }));

    // const container = await require('./infrastructure/container')(config);

    // app.use(scopePerRequest(container));
    app.use(loadControllers('./features/*/*Controller.js'));
    
    // app.use(require("./infrastructure/middlewares/loggingMiddleware"));
    // app.use(require("./infrastructure/middlewares/currentUserInjectorMiddleware"));
    // app.use(require("./infrastructure/middlewares/accessTokenAuthMiddleware"));
    // app.use(require("./infrastructure/middlewares/authorizationBasicTokenMiddleware"));
    // app.use(require("./infrastructure/middlewares/errorHandlerMiddleware"));

    app.get("/", (req, res) => res.sendFile("index.html", { root: __dirname }));

    return { app, config };
}