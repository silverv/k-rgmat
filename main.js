const Hapi = require('hapi');
const Inert = require('inert');
 
const server = new Hapi.Server({
    port: 3000,
    routes: {
        files: {
            relativeTo: __dirname
        }
    }
});
 
const provision = async () => {
 
    await server.register(Inert);
 
    server.route({
        method: 'GET',
        path: '/{param*}',
        handler: {
            directory: {
                path: '.',
                redirectToSlash: true,
                index: true,
            }
        }
    });
 
    await server.start();
 
    console.log('Server running at:', server.info.uri);
};
 
provision();