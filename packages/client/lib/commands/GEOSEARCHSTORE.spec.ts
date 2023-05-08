import { strict as assert } from 'assert';
import testUtils, { GLOBAL } from '../test-utils';
import GEOSEARCHSTORE from './GEOSEARCHSTORE';

describe('GEOSEARCHSTORE', () => {
  testUtils.isVersionGreaterThanHook([6, 2]);

  describe('transformArguments', () => {
    it('simple', () => {
      assert.deepEqual(
        GEOSEARCHSTORE.transformArguments('source', 'destination', 'member', {
          radius: 1,
          unit: 'm'
        }),
        ['GEOSEARCHSTORE', 'source', 'destination', 'FROMMEMBER', 'member', 'BYRADIUS', '1', 'm']
      );
    });

    it('with STOREDIST', () => {
      assert.deepEqual(
        GEOSEARCHSTORE.transformArguments('destination', 'source', 'member', {
          radius: 1,
          unit: 'm'
        }, {
          STOREDIST: true
        }),
        ['GEOSEARCHSTORE', 'destination', 'source', 'FROMMEMBER', 'member', 'BYRADIUS', '1', 'm', 'STOREDIST']
      );
    });
  });

  testUtils.testAll('geoSearchStore', async client => {
    assert.equal(
      await client.geoSearchStore('{tag}destination', '{tag}source', 'member', {
        radius: 1,
        unit: 'm'
      }),
      0
    );
  }, {
    client: GLOBAL.SERVERS.OPEN,
    cluster: GLOBAL.CLUSTERS.OPEN
  });
});
