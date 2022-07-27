const typescriptRules = require(`./typescript`);
const importRules = require(`./import`);
const reactHooksRules = require(`./react-hooks`);
const reactRules = require(`./react`);

module.exports = {
  ...typescriptRules,
  ...importRules,
  ...reactHooksRules,
  ...reactRules,
};
