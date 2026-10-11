# @e-cline/js_env

An `IS_DEV`/`IS_PROD` dev/prod flag resolved entirely through `package.json`'s
[`exports` field](https://nodejs.org/api/packages.html#conditional-exports), rather than a runtime
check.

```bash
npm install @e-cline/js_env
```

```json
"exports": {
  ".": {
    "types": "./dist/env.production.d.ts",
    "development": "./dist/env.development.js",
    "production": "./dist/env.production.js",
    "default": "./dist/env.production.js"
  }
}
```

Every consumer just writes an ordinary `import {IS_DEV} from '@e-cline/js_env'`. Which physical file
that resolves to is decided once, at bundle time, by whichever bundler condition
(`"development"`/`"production"`) is active -- Vite (and most other bundlers) already set one of
those automatically based on the build mode. Since the value each file exports is a literal
(`true`/`false`), a bundler's dead-code elimination can then fold away an `if (IS_DEV) {...}` branch
entirely in a production build, rather than checking a boolean at runtime.

When neither condition is active -- plain Node, unless it's started with `--conditions=development`
-- the `"default"` entry resolves to the production file.

The same two files also export `env`, typed `'dev' | 'prod'`, for code that wants a single value to
`switch` on rather than two booleans. Like the booleans, each file gives it a literal value (`'dev'`
/ `'prod'`), so a comparison against it folds away at bundle time too.

## Further reading

Export conditions in `package.json`:

- [Conditional exports](https://nodejs.org/api/packages.html#conditional-exports) -- Node's
  reference for the `exports` field and how conditions are matched, in order.
- [Community conditions definitions](https://nodejs.org/api/packages.html#community-conditions-definitions)
  -- where `"development"` and `"production"` are defined, alongside `"types"` and `"browser"`.
- [`--conditions`](https://nodejs.org/api/cli.html#-c-condition---conditionscondition) -- the Node
  flag for activating a custom condition at runtime.

How bundlers handle them:

- [Vite: `resolve.conditions`](https://vite.dev/config/shared-options#resolve-conditions) -- the
  default includes `development|production`, which Vite replaces with one or the other based on the
  build mode.
- [webpack: Package exports](https://webpack.js.org/guides/package-exports/#conditions) -- the
  conditions webpack sets, including `"development"`/`"production"` from `mode`.
- [esbuild: Conditions](https://esbuild.github.io/api/#conditions) -- how esbuild picks conditions,
  and the `--conditions` option for adding more.
- [Rollup: `exportConditions`](https://github.com/rollup/plugins/tree/master/packages/node-resolve#exportconditions)
  -- the `@rollup/plugin-node-resolve` option for the same thing.

## Development

This repository uses [Vite+](https://viteplus.dev) (`vp`) and pnpm.

```bash
vp install
vp run build      # type-check, then bundle src/ into dist/
vp run test
vp run check      # format and lint
```

## Releasing

Bump `version` in `package.json`, commit and push to `main`, then run the
[release workflow](.github/workflows/release.yml) from the repository's Actions tab. It publishes to
npm and pushes a `v<version>` tag.

## License

[MIT](LICENSE)
