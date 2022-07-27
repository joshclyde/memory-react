// eslint-disable-next-line import/no-commonjs
module.exports = {
  // Helpful Warnings
  "import/no-unresolved": `error`,
  "import/named": `error`,
  "import/default": `error`,
  "import/namespace": `error`,
  "import/no-restricted-paths": `off`, // TODO: configure this rule once the file structure is more defined
  "import/no-absolute-path": `error`,
  "import/no-dynamic-require": `error`,
  "import/no-internal-modules": `off`, // TODO: rule for the paths of imports
  "import/no-webpack-loader-syntax": `off`,
  "import/no-self-import": `error`,
  "import/no-cycle": `off`, // off since it might be expensive
  "import/no-useless-path-segments": `off`, // TODO: rule for the paths of imports
  "import/no-relative-parent-imports": `off`, // TODO: configure this rule once the file structure is more defined
  "import/export": `error`,
  "import/no-named-as-default": `error`,
  "import/no-named-as-default-member": `off`, // TODO: turn this on once I figure out how I want to do native DOM elements
  "import/no-deprecated": `off`,
  "import/no-extraneous-dependencies": `error`, // TODO: take a look at the configurations for this rule
  "import/no-mutable-exports": `error`,
  "import/no-unused-modules": [`off`, { missingExports: false, unusedExports: true }], // TODO: i like this rule, but it is annoying during development

  // Module Systems
  "import/unambiguous": `off`,
  "import/no-commonjs": `error`,
  "import/no-amd": `error`,
  "import/no-nodejs-modules": `error`,

  // style guide
  "import/first": `error`,
  "import/exports-last": `off`, // TODO: Do i want lint rules on exports?
  "import/no-duplicates": `error`,
  "import/no-namespace": `error`,
  "import/extensions": [`error`, `never`],
  "import/order": [
    `error`,
    {
      groups: [`builtin`, `external`, `internal`, `parent`, `sibling`, `index`],
      "newlines-between": `always`,
      alphabetize: { order: `asc`, caseInsensitive: true },
    },
  ],
  "import/newline-after-import": [`error`, { count: 1 }],
  "import/prefer-default-export": `off`,
  "import/max-dependencies": `off`,
  "import/no-unassigned-import": [`error`, { allow: [`**/*.css`] }],
  "import/no-named-default": `error`,
  "import/no-default-export": `error`,
  "import/no-named-export": `off`,
  "import/no-anonymous-default-export": `error`,
  "import/group-exports": `off`, // TODO: Do i want lint rules on exports?
  "dynamic-import-chunkname": `off`,
};
