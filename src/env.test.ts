import {describe, expect, expectTypeOf, test} from 'vite-plus/test';

import {env as devEnv, IS_DEV, IS_PROD} from './env.development.js';
import {
  env as prodEnv,
  IS_DEV as PROD_IS_DEV,
  IS_PROD as PROD_IS_PROD,
} from './env.production.js';

describe('env.development', () => {
  test('constants', () => {
    expect(IS_DEV).toBe(true);
    expect(IS_PROD).toBe(false);
    expect(devEnv).toBe('dev');
    expectTypeOf(IS_DEV).toEqualTypeOf<boolean>();
    expectTypeOf(IS_PROD).toEqualTypeOf<boolean>();
    expectTypeOf(devEnv).toEqualTypeOf<'dev' | 'prod'>();
  });
});

describe('env.production', () => {
  test('constants', () => {
    expect(PROD_IS_DEV).toBe(false);
    expect(PROD_IS_PROD).toBe(true);
    expect(prodEnv).toBe('prod');
    expectTypeOf(prodEnv).toEqualTypeOf<'dev' | 'prod'>();
  });
});
