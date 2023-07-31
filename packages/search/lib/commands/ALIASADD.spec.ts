import { strict as assert } from 'assert';
import testUtils, { GLOBAL } from '../test-utils';
import ALIASADD from './ALIASADD';
import { SCHEMA_FIELD_TYPE } from './CREATE';

describe('FT.ALIASADD', () => {
  it('transformArguments', () => {
    assert.deepEqual(
      ALIASADD.transformArguments('alias', 'index'),
      ['FT.ALIASADD', 'alias', 'index']
    );
  });

  testUtils.testWithClient('client.ft.aliasAdd', async client => {
    const [, reply] = await Promise.all([
      client.ft.create('index', {
        field: SCHEMA_FIELD_TYPE.TEXT
      }),
      client.ft.aliasAdd('alias', 'index')
    ]);

    assert.equal(reply, 'OK');
  }, GLOBAL.SERVERS.OPEN);
});
