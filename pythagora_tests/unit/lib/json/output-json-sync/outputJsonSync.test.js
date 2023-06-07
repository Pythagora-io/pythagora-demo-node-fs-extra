describe('outputJsonSync', () => {
  const outputJsonSync = require('../../../../../lib/json/output-json-sync.js')
  const { outputFileSync } = require('../../../../../lib/output-file');
  const { stringify } = require('jsonfile/utils');

  jest.mock('../../../../../lib/output-file');
  jest.mock('jsonfile/utils');

  afterEach(() => {
    jest.clearAllMocks();
  });

  test('Output a valid JSON object', () => {
    const file = 'testFile.json';
    const data = { key: 'value' };
    const options = { spaces: 2 };

    outputJsonSync(file, data, options);

    expect(stringify).toHaveBeenCalled();
    expect(outputFileSync).toHaveBeenCalled();
  });

});
