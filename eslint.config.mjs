import { defineConfig, globalIgnores } from "eslint/config";
import nextVitals from "eslint-config-next/core-web-vitals";
import nextTs from "eslint-config-next/typescript";

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
    "src/app/admin/**",
    "src/app/api/admin/**",
    "src/app/api/auth/**",
    "src/app/api/upload/**",
    "src/app/api/scripts/**",
    "src/app/api/layout/**",
    "src/app/api/home-sections/**",
    "src/app/api/pages/**",
    "src/components/admin/**",
    "src/components/blocks/**",
    "src/components/layout/SearchModal.tsx",
    "src/components/sections/**",
    "src/components/DynamicFavicon.tsx",
    "src/components/DynamicScripts.tsx",
    "src/components/TrackingScripts.tsx",
    "src/contexts/ThemeContext.tsx",
    "src/data/products.ts",
    "src/lib/prisma.ts",
  ]),
]);

export default eslintConfig;
