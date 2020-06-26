const { execute } = require('./testutils');
const { version } = require('../package.json');

describe('vanilla template', () => {
  it('returns the version', () => {
    let errorOccurred = false;
    try {
      execute('-V');
    } catch (e) {
      errorOccurred = true;
      expect(e.message).toBe(version);
    }
    expect(errorOccurred).toBeTruthy();
  });
})