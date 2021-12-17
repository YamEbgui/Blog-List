module.exports = {
  env: {
    commonjs: true,
    es2021: true,
    node: true,
    jest: true,
  },
  extends: "eslint:recommended",
  parserOptions: {
    ecmaVersion: 12,
  },
  rules: {
    indent: ["error", 2, { FunctionDeclaration: { body: 1, parameters: 2 } }],
    quotes: ["error", "double"],
  },
};
