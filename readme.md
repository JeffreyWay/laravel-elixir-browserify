# Laravel Elixir Browserify Support

## Step 1: Install

First ensure, that you're Laravel Elixir version is up to date. It should be at least version 6 or newer.

```
npm install laravel-elixir-browserify-official --save-dev
```

## Step 2: Use It

```js
// Gulpfile.js

var elixir = require('laravel-elixir');

elixir(function(mix) {
    mix.browserify('main.js'); // mix.browserify(srcPath, outputPath, srcBaseDir, browserifyOptions)
});
```

That's it! [Refer to the Laravel Elixir documentation for more details](https://laravel.com/docs/elixir#browserify).
