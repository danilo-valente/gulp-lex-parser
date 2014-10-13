gulp-lex-parser
===============

Lex-parser plugin for gulp


Installation
------------

You can install gulp-lex-parser via `npm install`:

`npm install gulp-lex-parser`


Example
-------

```javascript
var gulp = require('gulp');
var lexParser = require('gulp-lex-parser');

gulp.task('lex', function () {
    return gulp.src('src/grammar.jisonlex')
        .pipe(lexParser())
        .pipe(gulp.dest('dist'));
});
```


Usage
-----

`lexParser([options])`

gulp-lex-parser currently supports the options below:
 * `String outFile`: Output file path (Default: `<input_file_name>.json`)

Template
--------

gulp-lex-parser supports templates (see [gutil.template](https://github.com/gulpjs/gulp-util#templatestring-data)).
Currently supported variables:

 * [`Object file`](https://github.com/wearefractal/vinyl#file)
 * `Object path`
   * [`String dirname`](http://nodejs.org/api/path.html#path_path_dirname_p)
   * [`String basename`](http://nodejs.org/api/path.html#path_path_basename_p_ext)
   * [`String extname`](http://nodejs.org/api/path.html#path_path_extname_p)

##### Example

```javascript
var gulp = require('gulp');
var lexParser = require('gulp-lex-parser');

gulp.task('lex', function () {
    return gulp.src('src/grammar.jisonlex')
        .pipe(lexParser({
            outFile: '<%= path.basename %>.json', // Will produce 'grammar.json
        }))
        .pipe(gulp.dest('dist'));
});
```
 
License
-------

See [LICENSE](https://github.com/danilo-valente/gulp-lex-parser/blob/master/LICENSE).