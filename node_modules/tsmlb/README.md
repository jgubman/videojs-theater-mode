# tsmlb

> ES6 template string tag for multi-line blocks of text.

This template string tag allows you to create nicely formatted text blocks which are indented to match your code.

For example, by default, this...

```js
function x(y) {
  return `
    This ${y} is 
         some
    very fancy
         formatted
    text!
  `;
}

x('right here');
```

...yields...

```

    This right here is 
         some
    very fancy
         formatted
    text!

```

...when you may have wanted...

```
This right here is 
     some
very fancy
     formatted
text!
```

...but you didn't want to write...

```js
function x(y) {
  return `This ${y} is 
     some
very fancy
     formatted
text!`;
}

x('right here');
```

This is what `tsmlb` provides: the desired result above while maintaining the more readable code in the first block!

```js
var tsmlb = require('tsmlb');

function x(y) {
  return tsmlb`
    This ${y} is 
         some
    very fancy
         formatted
    text!
  `;
}

x('right here');
```

### Tabs or Spaces

`tsmlb` supports multi-line strings indented with either spaces or tabs, but no accommodation is made for a mix of the two.

### Compatibility

Support for template strings exists in Node as of 4.0.0, but this module is not tied to that engine in `package.json` because Babel users should be able to use it on many other platforms (including the browser).

## Inspiration

If you didn't guess from the name, this module is inspired by Rod Vagg's [`tsml`](https://github.com/rvagg/tsml), which is similar except it takes a multi-line template string and returns a single line string. It's also very useful!

## License

`tsmlb` is Copyright (c) 2015 Pat O'Neill and licensed under the MIT license.
