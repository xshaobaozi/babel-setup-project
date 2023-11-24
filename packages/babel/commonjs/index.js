const types = require('@babel/types')
const replaceStrFn = (str, prefix, replace) => {
    const reg = new RegExp(`((^|(\\s)+|\\.|=|\\-\\-))${prefix}`, 'g');
    return str.replace(reg, `$1${replace}`);
}
const vaildateReplaceStr = (str, prefix) => {
    const reg = new RegExp(`((^|(\\s)+|\\.|=|\\-\\-))${prefix}`, 'g');
    return reg.test(str)
}
// 判断父节点是否为class属性节点
const isClassStr = (str) => {
    return ['class', 'staticClass'].findIndex(cl => String(str).indexOf(cl) > -1) > -1
}

const isClassPathParentNode = (path) => {
    if (path.parent.type === 'JSXAttribute') {
        return isClassStr(path.parent.name.name) 
    }
    return isClassStr(path?.parent?.key?.name) || isClassStr(path?.parent?.key?.value)
}
const replaceVueNodes = function (options = {}) {
    return {
        name: 'replace-vue-nodes',
        visitor: {
            StringLiteral(path, state) {
                const { target, replaceStr } = options
                 // 判断是否符合el-的字符
                if (vaildateReplaceStr(path.node.value, target)) {
                    // 判定节点类型是否符合要求
                    const vaildateClassNode = isClassPathParentNode(path) || !!path.findParent(p => isClassPathParentNode(p))
                    if (vaildateClassNode) {
                        // 创建一个新的字符节点并进行替换
                        const newNode = types.StringLiteral(replaceStrFn(path.node.value, target, replaceStr));
                        path.replaceWith(newNode)
                    }
                }
            },
        }
    }
}

module.exports = replaceVueNodes