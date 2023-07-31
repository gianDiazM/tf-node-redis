import { strict as assert } from 'assert';
import testUtils, { GLOBAL } from '../test-utils';
import SYNDUMP from './SYNDUMP';
import { SCHEMA_FIELD_TYPE } from './CREATE';

describe('FT.SYNDUMP', () => {
  it('transformArguments', () => {
    assert.deepEqual(
      SYNDUMP.transformArguments('index'),
      ['FT.SYNDUMP', 'index']
    );
  });

  testUtils.testWithClient('client.ft.synDump', async client => {
    const [, reply] = await Promise.all([
      client.ft.create('index', {
        field: SCHEMA_FIELD_TYPE.TEXT
      }),
      client.ft.synDump('index')
    ]);

    assert.deepEqual(reply, []);
  }, GLOBAL.SERVERS.OPEN);
});
