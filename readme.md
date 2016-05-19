# Laravel Elixir CoffeeScript Support

## Step 1: Install

```
npm install laravel-elixir-coffeescript --save-dev
```

## Step 2: Use It

```js
// Gulpfile.js

var elixir = require('laravel-elixir');

require('laravel-elixir-browserify');

elixir(function(mix) {
    mix.browserify('main.js'); // src, output, baseDir, browserify-options
});
```
