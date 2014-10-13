var path = require('path');
var gutil = require('gulp-util');
var through = require('through2');
var lexParser = require('lex-parser');

const PLUGIN_NAME = 'gulp-lex-parser';

function template(tmpl, file) {
    var p = file.history[0];
    var ext = path.extname(p);

    return gutil.template(tmpl, {
        file: file,
        path: {
            dirname: path.dirname(p),
            basename: path.basename(p, ext),
            extname: ext
        }
    });
}

module.exports = function (options) {
    options = options || {};

    return through.obj(function (file, encoding, callback) {

        if (file.isNull()) {
            // Do nothing
        }

        if (file.isStream()) {
            // Not yet supported
            this.emit('error', new gutil.PluginError(PLUGIN_NAME, 'Streams are not supported yet'));
        }

        if (file.isBuffer()) {

            file = file.clone();

            var outFile = template(options.outFile, file);
            file.path = outFile
                ? path.resolve(path.dirname(file.path), './', outFile)
                : gutil.replaceExtension(file.path, '.json');

            try {
                var grammar = file.contents.toString();
                var json = lexParser.parse(grammar);
                file.contents = new Buffer(JSON.stringify(json));
            } catch (err) {
                this.emit('error', new gutil.PluginError(PLUGIN_NAME, err));
            }
        }

        this.push(file);

        return callback();
    });
};
