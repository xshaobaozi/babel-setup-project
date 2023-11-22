import replaceCls from './../../packages/postcss'

export default {
    plugins: [
        // demo2(),
        replaceCls({
            target: 'el-',
            result: 'demo-'
        })
    ]
}