/* eslint-disable global-require */
import _ from 'lodash';

const config = {
  env: process.env.NODE_ENV || 'development',
  graphql: {
    port: 8000
  }
};

export default _.extend(config, require(`./${config.env}`).default);
