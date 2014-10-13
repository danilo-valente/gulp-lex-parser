var should = require('should');
var lexParser = require('lex-parser');
var gulpLexParser = require('../');
var gutil = require('gulp-util');
var fs = require('fs');
var path = require('path');
require('mocha');

function virtualFile(filename, contents) {
    return new gutil.File({
        path: path.join(__dirname, 'fixtures', filename),
        base: path.join(__dirname, 'fixtures'),
        cwd: process.cwd(),
        contents: contents
    });
};

describe('gulp-lex-parser', function () {

    it('should output the same grammar as lex-parser', function (done) {

        var filepath = 'test/fixtures/calculator.jisonlex';
        var contents = fs.readFileSync(filepath);
        var json = lexParser.parse(contents.toString());
        var expected = JSON.stringify(json);

        gulpLexParser()
            .on('error', done)
            .on('data', function (data) {
                data.contents.toString().should.equal(expected);
                done();
            })
            .write(virtualFile('calculator.jisonlex', contents));
    });

});