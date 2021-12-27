const { MongoClient } = require('mongodb');

let database;

async function connect() {
    const client = await MongoClient.connect('mongodb://localhost:27017');
    database = client.db('blog');
}

function getDb() {
    if (!database) {
        throw { message: "Database connection is not established!" };
    }

    return database;
}

module.exports = {
    connectToDatabase: connect,
    getDb: getDb
}