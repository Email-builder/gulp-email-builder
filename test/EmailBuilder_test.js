/*
  ======== A Handy Little Nodeunit Reference ========
  https://github.com/caolan/nodeunit

  Test methods:
    test.expect(numAssertions)
    test.done()
  Test assertions:
    test.ok(value, [message])
    test.equal(actual, expected, [message])
    test.notEqual(actual, expected, [message])
    test.deepEqual(actual, expected, [message])
    test.notDeepEqual(actual, expected, [message])
    test.strictEqual(actual, expected, [message])
    test.notStrictEqual(actual, expected, [message])
    test.throws(block, [error], [message])
    test.doesNotThrow(block, [error], [message])
    test.ifError(value)
*/

var fs = require('fs');

exports.emailBuilder = {
  setUp: function(done) {
    // setup here
    done();
  },
  compile: function(test) {

    // TESTS
    // ----------
    test.expect(6);
    var actual;
    var expected;

    actual    = fs.readFileSync('example/dest/conditional_styles.html', 'utf8');
    expected  = fs.readFileSync('test/expected/conditional_styles.html', 'utf8');
    test.equal(expected, actual, 'should embed conditional styles');

    actual    = fs.readFileSync('example/dest/embedded_styles_ignored.html', 'utf8');
    expected  = fs.readFileSync('test/expected/embedded_styles_ignored.html', 'utf8');
    test.equal(expected, actual, 'should embed style tags with data-embed attribute');

    actual    = fs.readFileSync('example/dest/embedded_styles_inlined.html', 'utf8');
    expected  = fs.readFileSync('test/expected/embedded_styles_inlined.html', 'utf8');
    test.equal(expected, actual, 'should inline embedded styles');

    actual    = fs.readFileSync('example/dest/external_styles_embedded.html', 'utf8');
    expected  = fs.readFileSync('test/expected/external_styles_embedded.html', 'utf8');
    test.equal(expected, actual, 'should embed link tags with data-embed attribute');

    actual    = fs.readFileSync('example/dest/external_styles_ignored.html', 'utf8');
    expected  = fs.readFileSync('test/expected/external_styles_ignored.html', 'utf8');
    test.equal(expected, actual, 'should preserve link tags with data-embed-ignore attribute');

    actual    = fs.readFileSync('example/dest/external_styles_inlined.html', 'utf8');
    expected  = fs.readFileSync('test/expected/external_styles_inlined.html', 'utf8');
    test.equal(expected, actual, 'should inline external styles');

    test.done();
  }
};
