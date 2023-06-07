describe('move', () => {
  const move = require('../../../../../lib/move/move.js');
  const fs = require('graceful-fs');
  const path = require('path');

  test('move to already existing destination', done => {
    move('source.txt', 'existing_dest.txt', (err) => {
      expect(err).not.toBeNull();
      done();
    });
  });

  test('move invalid source file', done => {
    move('invalid_source.txt', 'destination.txt', (err) => {
      expect(err).not.toBeNull();
      done();
    });
  });

});
