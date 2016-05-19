# Laravel Elixir CoffeeScript Support

## Step 1: Install

```
npm install laravel-elixir-coffeescript --save-dev
```

## Step 2: Require and Use It

```
// Gulpfile.js

var elixir = require('laravel-elixir');

require('laravel-elixir-coffeescript');

elixir(function(mix) {
    // Examples:

    mix.coffee('app.coffee');

    mix.coffee('app.coffee', 'public/output');

    mix.coffee('app.coffee', 'public/output/file.js');

    // https://github.com/wearefractal/gulp-coffee#options
    mix.coffee('app.coffee', 'public/output/file.js', options);
});
```

## Step 3: None. You're Done.

- @jeffrey_way