module.exports = {
  parser: '@typescript-eslint/parser',
  plugins: ['unused-imports'],
  extends: ["@repo/eslint-config/next.js", 'eslint:recommended'],
  rules: {
    'unused-imports/no-unused-imports-ts': 2,
    "@typescript-eslint/no-explicit-any": "off",
    'camelcase': 'off',
    "@typescript-eslint/no-unsafe-assignment": "off",
    "@typescript-eslint/no-unsafe-call": "off",
    "@typescript-eslint/no-unsafe-return": "off",
    "@typescript-eslint/no-unsafe-member-access": "off",
    "@typescript-eslint/no-unsafe-argument": "off",
  },
};
