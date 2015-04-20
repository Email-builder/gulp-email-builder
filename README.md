# grunt-email-builder
[![Build Status](https://travis-ci.org/Email-builder/gulp-email-builder.svg?branch=master)](https://travis-ci.org/Email-builder/gulp-email-builder)

Uses [Email Builder](https://github.com/Email-builder/email-builder-core) to inline css into HTML tags, send tests to Litmus, and send test emails to yourself.

Example:
```html
<!DOCTYPE html>
<html>
<head>
  <!-- styles will be inlined -->
  <link rel="stylesheet" type="text/css" href="../css/styles.css">

  <!-- styles will be embedded -->
  <link rel="stylesheet" type="text/css" href="../css/otherStyles.css" data-embed>

  <!-- link tag will be preserved and styles will not be inlined or embedded -->
  <link href='http://fonts.googleapis.com/css?family=Open+Sans' rel='stylesheet' type='text/css' data-embed-ignore>

  <!-- styles will be inlined -->
  <style>
    p { color: red; }
  </style>

  <!-- styles will be embedded -->
  <style data-embed>
    h1 { color: black; }
  </style>
</head>
<body>
  <h1>Heading</h1>
  <p>Body</p>
</body>
</html>
```

You can see an example setups below
- [example](https://github.com/Email-builder/email-builder-example)
- [rwdemail](https://github.com/iDVB/rwdemail) by [iDVB](https://github.com/iDVB)

## Getting Started

Install this grunt plugin next to your project's [grunt.js gruntfile][getting_started] with: `npm install grunt-email-builder`

Then add this line to your project's `grunt.js` gruntfile:

```javascript
var emailBuilder = require('gulp-email-builder');
```

[gulp]: http://gulpjs.com/
[getting_started]: https://github.com/gulpjs/gulp/blob/master/docs/getting-started.md



## Documentation

Place this in your gulp file.
```javascript
  gulp.task('emailBuilder', function() {
    return gulp.src(['./example/html/*.html'])
      .pipe(emailBuilder())
      .pipe(gulp.dest('./example/dist/'));
  });
```

## Options

View [Email Builder options](https://github.com/Email-builder/email-builder-core#options) for all available options.


## Troubleshooting

If you're having issues with Litmus taking forever to load a test or the title of the test is showing up as "No Subject", it is most likely an issue with the Litmus API. You can check the [Litmus status](http://status.litmus.com) page to find out if their having any issues. If that's not the case, submit an issue and we'll look into further.


### Contributors
Thanks to all [contributors](https://github.com/Email-builder/grunt-email-builder/graphs/contributors)
 for helping out.

## Further Reading

[Release History](https://github.com/Email-builder/grunt-email-builder/wiki/Release-History)  



## License
[MIT](https://github.com/Email-builder/grunt-email-builder/blob/master/LICENSE-MIT)
