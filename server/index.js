/* eslint-disable no-console, no-shadow */
import express from 'express';
import graphQLHTTP from 'express-graphql';
import chalk from 'chalk';
import bodyParser from 'body-parser';
import config from './config/environment';
import schema from './appData/schema';
import mongoLabLink from './mongoLabLink';
import seeder from './seeder';

const mongoose = require('mongoose');

// Here are MongoDB related settings.
const options = {
  server: {
    socketOptions: { keepAlive: 300000, connectTimeoutMS: 30000 }
  },
  replset: {
    socketOptions: { keepAlive: 300000, connectTimeoutMS: 30000 }
  }
};
mongoose.Promise = global.Promise;
mongoose.connect(mongoLabLink, options);
const conn = mongoose.connection;
conn.on('error', console.error.bind(console, 'connection error:'));
conn.once('open', () => {
  console.log(chalk.blue('Connection with MongoLab established.'));
});

if (config.env === 'development') {
  // This will seed our database
  seeder();
  // Launching GraphQL starts here
  const graphql = express();
  graphql.use('/', graphQLHTTP({
    // this is how you connect to GraphiQL, so simple!
    graphiql: true,
    pretty: true,
    schema
  }));
  graphql.listen(config.graphql.port, () => console.log(chalk.green(`GraphQL is listening on port ${config.graphql.port}`)));
  graphql.use(bodyParser.json({ type: '*/*' }));
} else if (config.env === 'production') {
  const graphQLServer = express();
  graphQLServer.use('/graphql', graphQLHTTP({ schema }));
  graphQLServer.use(bodyParser.json({ type: '*/*' }));
  graphQLServer.listen(config.port, () => console.log(chalk.green(`GraphQL is listening on port ${config.port}`)));
}
