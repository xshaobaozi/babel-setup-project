module.exports = function () {
  return {
    name: 'transform-replace-cls',
    visitor: {
      // Identifier(path) {
      //   console.log("Identifier", path);
      // },
      // StringLiteral(path) {
      //   console.log("StringLiteral", path);
      // },
      Program(path) {
        console.log('Program', path)
        path.traverse({
          TemplateLiteral(path) {
            console.log('TemplateLiteral', path)
          }
        })
      },
    },
  };
};
