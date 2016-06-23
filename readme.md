# Laravel Elixir Browserify Support

## Step 1: Install

```
npm install laravel-elixir-browserify-official --save-dev
```

## Step 2: Use It

```js
// Gulpfile.js

var elixir = require('laravel-elixir');

require('laravel-elixir-browserify-official');

elixir(function(mix) {
    mix.browserify('main.js'); // src, output, baseDir, browserify-options
});
```
