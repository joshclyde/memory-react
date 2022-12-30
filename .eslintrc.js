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
  plugins: [`@typescript-eslint`, `import`, `react-hooks`, `react`, `unicorn`],
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
  extends: [`eslint:recommended`, `plugin:unicorn/recommended`, `prettier`],
  rules: {
    ...rules,
    "no-unused-vars": `off`, // typescript eslint has this rule
    "no-undef": `off`, // just let typescript handle this
    curly: `error`,
    "unicorn/filename-case": [
      `error`,
      {
        case: `camelCase`,
      },
    ],
    "unicorn/no-null": [`off`],
  },
  ignorePatterns: [
    `vite.config.ts`,
    `tailwind.config.js`,
    `postcss.config.js`,
    `src/vite-env.d.ts`,
  ],
  overrides: [
    {
      // React components
      files: [`src/components/**/*.tsx`, `src/components/**/*.jsx`],
      rules: {
        "unicorn/filename-case": [
          `error`,
          {
            case: `pascalCase`,
          },
        ],
        "unicorn/prevent-abbreviations": [
          `error`,
          {
            allowList: {
              props: true,
              Props: true,
            },
          },
        ],
      },
    },
    {
      // React components
      files: [`src/firebase/**/*.ts`],
      rules: {
        /*
          Turning off no-array-for-each because firestore snapshots have a forEach function
          that this rule will automatically correct.
        */
        "unicorn/no-array-for-each": [`off`],
      },
    },
  ],
};
