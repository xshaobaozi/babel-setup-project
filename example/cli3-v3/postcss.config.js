const replaceCls = require('./../../packages/postcss')
const params = require('./../config')
module.exports =  {
    plugins: [
        // demo2(),
        replaceCls(params.postcssConfig)
    ]
}