import { strict as assert } from 'assert';
import testUtils, { GLOBAL } from '../test-utils';
import GEOPOS from './GEOPOS';

describe('GEOPOS', () => {
  describe('transformArguments', () => {
    it('single member', () => {
      assert.deepEqual(
        GEOPOS.transformArguments('key', 'member'),
        ['GEOPOS', 'key', 'member']
      );
    });

    it('multiple members', () => {
      assert.deepEqual(
        GEOPOS.transformArguments('key', ['1', '2']),
        ['GEOPOS', 'key', '1', '2']
      );
    });
  });

  testUtils.testAll('geoPos null', async client => {
    assert.deepEqual(
      await client.geoPos('key', 'member'),
      [null]
    );
  }, {
    client: GLOBAL.SERVERS.OPEN,
    cluster: GLOBAL.CLUSTERS.OPEN
  });

  testUtils.testAll('geoPos with member', async client => {
    const coordinates = {
      longitude: '-122.06429868936538696',
      latitude: '37.37749628831998194'
    };

    await client.geoAdd('key', {
      member: 'member',
      ...coordinates
    });

    assert.deepEqual(
      await client.geoPos('key', 'member'),
      [coordinates]
    );
  }, {
    client: GLOBAL.SERVERS.OPEN,
    cluster: GLOBAL.CLUSTERS.OPEN
  });
});
