import { strict as assert } from 'assert';
import CONFIG_REWRITE from './CONFIG_REWRITE';

describe('CONFIG REWRITE', () => {
  it('transformArguments', () => {
    assert.deepEqual(
      CONFIG_REWRITE.transformArguments(),
      ['CONFIG', 'REWRITE']
    );
  });
});
