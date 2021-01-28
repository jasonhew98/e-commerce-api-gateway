const debug = require('debug');
const https = require('https');

async function main() {
    try{
        const { app, config } = await require("./startup.js")(require("./appsettings.js"));
        const port = config.port;
        https.createServer(app)
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