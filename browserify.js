var Elixir = require('laravel-elixir');
var gulp = require('gulp');
var config = Elixir.config;
var browserify = require('browserify');
var watchify = require('watchify');
var gutil = require('gulp-util');
var buffer = require('vinyl-buffer');
var source = require('vinyl-source-stream');
var bundle;

/*
 |----------------------------------------------------------------
 | Browserify Task
 |----------------------------------------------------------------
 |
 | This task will manage your entire Browserify workflow, from
 | scratch! Also, it will channel all files through Babelify
 | so that you may use all the ES6 goodness you can stand.
 |
 */

loadConfig();

Elixir.extend('browserify', function(src, output, baseDir, options) {
    var paths = getPaths(src, baseDir, output);

    new Elixir.Task('browserify', function($, config) {
        var stream = config.js.browserify.watchify.enabled
            ? watchifyStream
            : browserifyStream;

        bundle = function(stream, paths) {
            return (
                stream
                .bundle()
                .on('error', function(e) {
                    new Elixir.Notification().error(
                        e, 'Browserify Failed!'
                    );

                    this.emit('end');
                })
                .pipe(source(paths.output.name))
                .pipe(buffer())
                .pipe($.if(config.sourcemaps, $.sourcemaps.init({ loadMaps: true })))
                .pipe($.if(config.production, $.uglify(config.js.uglify.options)))
                .pipe($.if(config.sourcemaps, $.sourcemaps.write('.')))
                .pipe(gulp.dest(paths.output.baseDir))
                .pipe(new Elixir.Notification('Browserify Compiled!'))
            );
        }.bind(this);

        return bundle(
            stream({
                paths: paths,
                options: options || config.js.browserify.options
            }),
            paths
        );
    }, paths)
    .watch(); // Register a watcher, but Watchify will do the workload.
});


/**
 * Prep the Gulp src and output paths.
 *
 * @param  {string|Array} src
 * @param  {string|null}  baseDir
 * @param  {string|null}  output
 * @return {GulpPaths}
 */
 function getPaths(src, baseDir, output) {
    return new Elixir.GulpPaths()
        .src(src, baseDir || config.get('assets.js.folder'))
        .output(output || config.get('public.js.outputFolder'), 'bundle.js');
}


/**
 * Get a standard Browserify stream.
 *
 * @param {object} data
 */
function browserifyStream(data) {
    var stream = browserify(data.paths.src.path, data.options);

    config.js.browserify.transformers.forEach(function(transformer) {
        stream.transform(
            require(transformer.name), transformer.options || {}
        );
    });

    config.js.browserify.plugins.forEach(function(plugin) {
        stream.plugin(
            require(plugin.name), plugin.options || {}
        );
    });

    config.js.browserify.externals.forEach(function(external) {
        stream.external(external);
    });

    return stream;
}


/**
 * Get a Browserify stream, wrapped in Watchify.
 *
 * @param {object} data
 */
function watchifyStream(data) {
    var browserify = watchify(
        browserifyStream(data),
        config.js.browserify.watchify.options
    );

    browserify.on('log', gutil.log);
    browserify.on('update', function () {
        bundle(browserify, data.paths);
    });

    return browserify;
}


/**
 * Load the default Browserify config.
 */
function loadConfig() {
    config.js.browserify = {
        // https://www.npmjs.com/package/browserify#usage
        options: {
            cache: {},
            packageCache: {}
        },

        plugins: [],

        externals: [],

        transformers: [
            {
                name: 'babelify',

                // https://www.npmjs.com/package/gulp-babel#babel-options
                options: {
                    presets: ['es2015', 'react']
                }
            },

            {
                name: 'partialify',

                // https://www.npmjs.com/package/partialify
                options: {}
            }
        ],

        watchify: {
            enabled: Elixir.isWatching(),

            // https://www.npmjs.com/package/watchify#usage
            options: {}
        }
    };
}
