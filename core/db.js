import harperive from 'harperive'

const DB_CONFIG = {
    harperHost: process.env.INSTANCE_URL,
    username: process.env.INSTANCE_USERNAME,
    password: process.env.INSTANCE_PASSWORD,
    schema: process.env.INSTANCE_SCHEMA,
}

const Client = harperive.Client;
const client = new Client(DB_CONFIG);

function buildShort(origin, shortUrl) {
    return '//' + origin + '/api/go/' + shortUrl;
}

module.exports = {
    client,
    buildShort
}

