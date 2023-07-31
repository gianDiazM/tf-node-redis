import { strict as assert } from 'assert';
import testUtils, { GLOBAL } from '../test-utils';
import CURSOR_DEL from './CURSOR_DEL';
import { SCHEMA_FIELD_TYPE } from './CREATE';

describe('FT.CURSOR DEL', () => {
  it('transformArguments', () => {
    assert.deepEqual(
      CURSOR_DEL.transformArguments('index', '0'),
      ['FT.CURSOR', 'DEL', 'index', '0']
    );
  });

  testUtils.testWithClient('client.ft.cursorDel', async client => {
    const [, , { cursor }] = await Promise.all([
      client.ft.create('idx', {
        field: {
          type: SCHEMA_FIELD_TYPE.TEXT
        }
      }),
      client.hSet('key', 'field', 'value'),
      client.ft.aggregateWithCursor('idx', '*', {
        COUNT: 1
      })
    ]);

    assert.equal(
      await client.ft.cursorDel('idx', cursor),
      'OK'
    );
  }, GLOBAL.SERVERS.OPEN);
});
