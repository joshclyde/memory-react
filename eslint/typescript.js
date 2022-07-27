// eslint-disable-next-line import/no-commonjs
module.exports = {
  /*
      Typescript Rules
      https://github.com/typescript-eslint/typescript-eslint/tree/master/packages/eslint-plugin
    */
  "@typescript-eslint/adjacent-overload-signatures": `error`,
  "@typescript-eslint/array-type": [`error`, { default: `generic`, readonly: `generic` }],
  // "@typescript-eslint/await-thenable": `error`, // TODO: You have used a rule which requires parserServices to be generated
  "@typescript-eslint/ban-ts-comment": `error`,
  "@typescript-eslint/ban-tslint-comment": `error`, // probs don't need this but probs doesn't hurt to have
  "@typescript-eslint/ban-types": `off`, // TODO: take a look at this. see what it's best practices are and if i have any custom stuff
  "@typescript-eslint/class-literal-property-style": `off`, // i don't really use classes ever so i don't need this rule
  "@typescript-eslint/consistent-indexed-object-style": [`error`, `record`],
  "@typescript-eslint/consistent-type-assertions": [`off`, { assertionStyle: `never` }], // TODO: turn this on and fix all errors
  "@typescript-eslint/consistent-type-definitions": [`error`, `interface`],
  "@typescript-eslint/consistent-type-imports": [
    `off`,
    { prefer: `type-imports`, disallowTypeAnnotations: true },
  ], // this rule works, but when doing `import type` then the import no-unused-modules rule will fail
  "@typescript-eslint/explicit-function-return-type": `off`, // TODO: revisit this and read through the different options
  "@typescript-eslint/explicit-member-accessibility": `off`, // i don't really use classes ever so i don't need this rule
  "@typescript-eslint/explicit-module-boundary-types": `off`, // TODO: related to explicit-function-return-type
  "@typescript-eslint/member-delimiter-style": `off`, // prettier handles this
  "@typescript-eslint/member-ordering": `off`, // TODO: come back to this one
  "@typescript-eslint/method-signature-style": [`error`, `property`],
  "@typescript-eslint/naming-convention": `off`, // TODO: come back to this one
  "@typescript-eslint/no-base-to-string": `off`, // TODO: You have used a rule which requires parserServices to be generated
  "@typescript-eslint/no-confusing-non-null-assertion": `error`,
  "@typescript-eslint/no-dynamic-delete": `error`, // neutral on this
  "@typescript-eslint/no-empty-interface": `off`, // i kinda like having Props {} for components without props
  "@typescript-eslint/no-explicit-any": `off`, // TODO: turn this one on and fix errors
  "@typescript-eslint/no-extra-non-null-assertion": `error`,

  "@typescript-eslint/quotes": [`error`, `backtick`],
  // note you must disable the base rule as it can report incorrect errors
  // "require-await": `off`,
  // "@typescript-eslint/require-await": `error`,
};
