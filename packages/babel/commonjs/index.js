const types = require('@babel/types')
const replaceStrFn = (str, prefix, replace) => {
    const reg = new RegExp(`((^|(\\s)+|\\.|=|\\-\\-))${prefix}`, 'g');
    return str.replace(reg, `$1${replace}`);
}
const vaildateReplaceStr = (str, prefix) => {
    const reg = new RegExp(`((^|(\\s)+|\\.|=|\\-\\-))${prefix}`, 'g');
    return reg.test(str)
}
const replaceVueNodes = function (options = {}) {
    return {
        name: 'replace-vue-nodes',
        visitor: {
            StringLiteral(path, state) {
                const { target, replaceStr } = options
                if (vaildateReplaceStr(path.node.value, target)) {
                    if (['class', 'staticClass'].includes(path.parent?.key?.name) || path.parent?.key?.value === 'class') {
                        const newNode = types.StringLiteral(replaceStrFn(path.node.value, target, replaceStr));
                        path.replaceWith(newNode)
                    }
                }
            },
        }
    }
}

module.exports = replaceVueNodes