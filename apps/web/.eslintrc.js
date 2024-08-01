module.exports = {
  parser: "@typescript-eslint/parser",
  plugins: ["unused-imports"],
  extends: ["@repo/eslint-config/next.js", "eslint:recommended"],
  ignorePatterns: ["**/language-management/form.tsx", "**/vendor/*.js"],
  rules: {
    "@typescript-eslint/no-unsafe-return": "off", // /dashboard/[domain]/[data]/page.tsx, company/[data]/page.tsx, src/utils.ts içinde hatalar var
    "@typescript-eslint/no-explicit-any": "off",
    camelcase: "off",
    "@typescript-eslint/no-unsafe-assignment": "off",
    "@typescript-eslint/no-unsafe-call": "off",
    "@typescript-eslint/no-unsafe-member-access": "off",
    "@typescript-eslint/no-unsafe-argument": "off",
    // "@typescript-eslint/naming-convention": "off",
    "@typescript-eslint/prefer-promise-reject-errors": "off",
    "no-await-in-loop": "off",
    "import/no-cycle": "off",
  },
};
