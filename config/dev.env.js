'use strict'
const merge = require('webpack-merge')
const prodEnv = require('./prod.env')

module.exports = merge(prodEnv, {
    NODE_ENV: '"development"',
    CDN: '"http://lzrz.web1.zwcat.cn/up_file/"',
})
