dbPassword = 'mongodb://TsundereKermit:2WgOLyH6gWEz5EwU@bubble-database-shard-00-00-mgypj.gcp.mongodb.net:27017,bubble-database-shard-00-01-mgypj.gcp.mongodb.net:27017,bubble-database-shard-00-02-mgypj.gcp.mongodb.net:27017/test?ssl=true&replicaSet=bubble-database-shard-0&authSource=admin&retryWrites=true&w=majority';

module.exports = {
    MongoURI: dbPassword
};