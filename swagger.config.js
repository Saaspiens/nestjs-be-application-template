const pkg = require('./package.json');
const path = require('path');
module.exports = {
    openapi: '3.0.2',
    info: {
        title: pkg.name,
        version: pkg.version,
        description: pkg.description,
    },
    apis: [
        path.join(__dirname, './src/modules/**/**.swagger.yaml'),
        path.join(__dirname, './src/modules/slug.swagger.yaml'),
    ],
};
