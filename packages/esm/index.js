export default function () {
  return {
    visitor: {
      Identifier(path) {
        console.log("Identifier", path);
      },
      StringLiteral(path) {
        console.log("StringLiteral", path);
      },
    },
  };
}
