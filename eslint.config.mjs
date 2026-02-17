import { defineConfig, globalIgnores } from "eslint/config";
import nextVitals from "eslint-config-next/core-web-vitals";
import nextTs from "eslint-config-next/typescript";
import unusedImports from "eslint-plugin-unused-imports";

const eslintConfig = defineConfig([
  ...nextVitals,
  ...nextTs,
  // Override default ignores of eslint-config-next.
  globalIgnores([
    // Default ignores of eslint-config-next:
    ".next/**",
    "out/**",
    "build/**",
    "next-env.d.ts",
    // Migration/seed scripts (CommonJS)
    "migrations/**",
    "scripts/**",
    // Seed files with intentional console.log
    "src/seed*.ts",
    "src/scripts/**",
  ]),
  // Production code: no console.log allowed
  {
    files: ["src/**/*.ts", "src/**/*.tsx"],
    ignores: ["src/seed*.ts", "src/scripts/**"],
    plugins: {
      "unused-imports": unusedImports,
    },
    rules: {
      "no-console": ["error", { allow: ["warn", "error"] }],
      // Use unused-imports plugin instead of @typescript-eslint/no-unused-vars
      "@typescript-eslint/no-unused-vars": "off",
      "unused-imports/no-unused-imports": "error",
      "unused-imports/no-unused-vars": ["warn", { 
        argsIgnorePattern: "^_",
        varsIgnorePattern: "^_",
      }],
    },
  },
  // Allow `as any` in landing page templates (href type workaround)
  {
    files: ["src/app/**/standorte/**/*.tsx"],
    rules: {
      "@typescript-eslint/no-explicit-any": "off",
    },
  },
]);

export default eslintConfig;
