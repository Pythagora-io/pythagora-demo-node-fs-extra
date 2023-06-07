const outputJson = require('../../../../../lib/json/output-json.js');
const { stringify } = require('jsonfile/utils');

describe('outputJson', () => {
  test('should throw an error if outputFile throws an error', async () => {
    const file = 'test.json';
    const data = { key: 'value' };
    const options = { spaces: 2 };

    const outputFileSpy = jest.spyOn(require('../../../../../lib/output-file'), 'outputFile');
    const error = new Error('Error writing file');
    outputFileSpy.mockRejectedValue(error);

    try {
      await outputJson(file, data, options);
    } catch (err) {
      expect(err).toBe(error);
    }
  });
});

