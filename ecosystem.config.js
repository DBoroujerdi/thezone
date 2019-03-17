'use strict';

module.exports = {
  apps : [{
    name      : 'stream-service',
    script    : 'server/index.js',
    env: {
      NODE_ENV: 'development'
    },
    env_production : {
      NODE_ENV: 'production'
    }
  }],

  deploy : {
    staging : {
      user : 'daniel',
      host : 'failblazing.com',
      ref  : 'origin/master',
      repo : 'git@github.com:DBoroujerdi/thezone.git',
      path : '/home/daniel/thezone',
      'post-deploy' : 'export PATH=$PATH:/home/daniel/.asdf/installs/nodejs/8.11.3/.npm/bin && npm install && pm2 reload ecosystem.config.js --env staging'
    }
  }
};
