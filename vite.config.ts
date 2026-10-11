import {defineConfig} from 'vite-plus';

// This is the default (see https://vitest.dev/config/#include).
// We also use it for `typecheck.include`.
const testFileMatch = ['**/*.{test,spec}.?(c|m)[jt]s?(x)'];

export default defineConfig({
  run: {
    tasks: {
      // Depends on `typecheck` so a type error fails the build.
      build: {
        command: 'vp pack',
        dependsOn: ['typecheck'],
      },
      'build:watch': {
        command: 'vp pack --watch',
        cache: false,
      },
      cleanbuild: {
        command: 'rm -rf ./dist',
        cache: false,
      },
      test: {
        command: 'vp test run',
      },
      'test:watch': {
        command: 'vp test watch',
        cache: false,
      },
      typecheck: {
        command: 'tsc --noEmit',
        cache: false,
      },
      'typecheck:watch': {
        command: 'tsc --watch',
        cache: false,
      },
    },
  },
  pack: {
    entry: ['src/**/*.ts', '!src/**/*.test.*'],
    format: ['es'],
    dts: {
      tsgo: true,
    },
    minify: false,
    unbundle: true,
    deps: {neverBundle: true},
    fixedExtension: false,
  },
  test: {
    include: [...testFileMatch],
    typecheck: {
      enabled: true,
      include: [...testFileMatch],
    },
  },
  // What the pre-commit hook (`.vite-hooks/pre-commit`, which runs
  // `vp staged`) does to staged files.
  staged: {
    '*.{js,jsx,mjs,ts,tsx,json,md,yaml,yml,css,html}': 'vp check --fix',
  },
  fmt: {
    printWidth: 80,
    tabWidth: 2,
    useTabs: false,
    embeddedLanguageFormatting: 'auto',
    singleQuote: true,
    semi: true,
    quoteProps: 'preserve',
    bracketSpacing: false,
    sortImports: true,
    trailingComma: 'all',
    proseWrap: 'always', // Wraps markdown
    overrides: [
      {
        files: ['**/*.md'],
        options: {
          printWidth: 100,
        },
      },
    ],
  },
  lint: {
    ignorePatterns: ['dist/**'],
    options: {
      typeAware: true,
      typeCheck: true,
    },
  },
});
