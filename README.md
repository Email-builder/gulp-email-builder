# gulp-email-builder

[![Join the chat at https://gitter.im/Email-builder/gulp-email-builder](https://badges.gitter.im/Join%20Chat.svg)](https://gitter.im/Email-builder/gulp-email-builder?utm_source=badge&utm_medium=badge&utm_campaign=pr-badge&utm_content=badge)
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

Install this gulp plugin next to your project's gulpfile  with: `npm install gulp-email-builder`

Then add this line to your project's `gulp.js` gulp:

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
      .pipe(emailBuilder(options).build())
      .pipe(gulp.dest('./example/dist/'));
  });
```

## Other available methods

Besides the main `emailBuilder(options).build()` function, the `email-builder-core` methods are exposed so users can use them on an individual basis.

- emailBuilder(options).inlineCss()
- emailBuilder(options).sendEmailTest()
- emailBuilder(options).sendLitmusTest()

**Example**
```javascript
...
.pipe(emailBuilder(options).sendEmailTest())
...
```

## Options
View [Email Builder options](https://github.com/Email-builder/email-builder-core#options) for all available options.

## Complete Example

```javascript
var EmailBuilder = require('gulp-email-builder');

var options = { encodeSpecialChars: true }
var builder = EmailBuilder(options);

gulp.task('emailBuilder', function() {
  return gulp.src(['./example/html/*.html'])
    .pipe(builder.build())
    .pipe(gulp.dest('./example/dist/'));
});

```


## Troubleshooting
If you're having issues with Litmus taking forever to load a test or the title of the test is showing up as "No Subject", it is most likely an issue with the Litmus API. You can check the [Litmus status](http://status.litmus.com) page to find out if they're having any issues. If that's not the case, submit an issue and we'll look into further.


### Contributors
Thanks to all [contributors](https://github.com/Email-builder/gulp-email-builder/graphs/contributors)
 for helping out.

## Further Reading
[Release History](https://github.com/Email-builder/gulp-email-builder/wiki/Release-History)  

## License
[MIT](https://github.com/Email-builder/gulp-email-builder/blob/master/LICENSE)
