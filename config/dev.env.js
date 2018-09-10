'use strict'
const merge = require('webpack-merge')
const prodEnv = require('./prod.env')

module.exports = merge(prodEnv, {
  NODE_ENV: '"development"',
  API_BASEURL: '"http://204.44.80.243:5000"'
  // API_BASEURL: '"http://127.0.0.1:5000"'
})
