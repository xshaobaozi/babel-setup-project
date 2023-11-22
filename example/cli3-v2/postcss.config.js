const replaceCls = require('./../../packages/postcss')
module.exports =  {
    plugins: [
        // demo2(),
        replaceCls({
            target: 'el-',
            result: 'demo-'
        })
    ]
}