const debug = require('debug');
const http = require('http');

async function main() {
    try{
        const { app, config } = await require("./startup.js")(require("./appsettings.js"));
        const port = config.port;
        http.createServer(app)
        .listen(port,
            () => {
                console.log(`Listening port: ${port}`);
                debug(`Listening port: ${port}`);
            });
    } catch (e) {
        console.error(e);
        debug("Error", e);
    }
}

main();