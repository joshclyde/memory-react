// eslint-disable-next-line import/no-commonjs
const rules = require(`./eslint`);

// eslint-disable-next-line import/no-commonjs
module.exports = {
  parser: `@typescript-eslint/parser`,
  parserOptions: {
    ecmaVersion: 6,
    sourceType: `module`,
    ecmaFeatures: {
      jsx: true,
    },
  },
  plugins: [`@typescript-eslint`, `import`, `react-hooks`, `react`],
  settings: {
    "import/resolver": {
      typescript: {}, // this loads <rootdir>/tsconfig.json to eslint
    },
    "import/extensions": [`.js`, `.jsx`, `.ts`, `.tsx`],
    react: {
      pragma: `React`,
      fragment: `Fragment`,
      version: `detect`,
    },
  },
  extends: [`prettier`],
  rules,
};
