const {ifCrossDeviceEnabled} = require('../../../../../../lib/move/__tests__/cross-device-utils.js');
const fs = require('graceful-fs');
const path = require('path');

const mockFn = jest.fn();

const origEnv = process.env;

describe('ifCrossDeviceEnabled', () => {
  afterEach(() => {
    process.env = origEnv;
  });

  it('Should call the function when CROSS_DEVICE_PATH is set and writable', () => {
    process.env.CROSS_DEVICE_PATH = '/tmp';
    fs.writeFileSync.mockImplementation(() => null);

    ifCrossDeviceEnabled(mockFn);
    expect(mockFn).toHaveBeenCalled();
  });

  it('Should skip the function when CROSS_DEVICE_PATH is not set', () => {
    delete process.env.CROSS_DEVICE_PATH;
    const mockFnSkip = mockFn.skip = jest.fn();
    
    ifCrossDeviceEnabled(mockFn);
    expect(mockFnSkip).toHaveBeenCalled();
  });

  it('Should throw error when CROSS_DEVICE_PATH is set but not writable', () => {
    process.env.CROSS_DEVICE_PATH = '/non-existing';
    fs.writeFileSync.mockImplementation(() => { throw new Error("Can't write to device"); });
    expect(() => ifCrossDeviceEnabled(mockFn)).toThrow("Can't write to device");
  });
});
