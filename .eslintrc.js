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
  env: {
    browser: true,
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
  extends: [`prettier`, `eslint:recommended`],
  rules: {
    ...rules,
    "no-unused-vars": `off`, // typescript eslint has this rule
    "no-undef": `off`, // just let typescript handle this
  },
  ignorePatterns: [`vite.config.ts`, `tailwind.config.js`, `postcss.config.js`],
};
