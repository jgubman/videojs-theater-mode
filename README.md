# videojs-theater-mode

Adds a class the video.js container that can be used to put your video into &#34;theater mode&#34;

## Installation

```sh
npm install --save videojs-theater-mode
```

## Usage

To include videojs-theater-mode on your website or web application, use any of the following methods. After including the script, have the player listen for the 'theaterMode' trigger and respond to the theaterModeIsOn: true/false object any way you'd like.

### `<script>` Tag

This is the simplest case. Get the script in whatever way you prefer and include the plugin _after_ you include [video.js][videojs], so that the `videojs` global is available.

```html
<script src="//path/to/video.min.js"></script>
<script src="//path/to/videojs-theater-mode.min.js"></script>
<script>
  var player = videojs('my-video');

  player.theaterMode({ elementToToggle: 'page');

  player.on('theaterMode', function(elm, data) {
    if (data.theaterModeIsOn) {
      $('#page').turnOnTheaterMode(); // or whatever
    } else {
      $('#page').turnOffTheaterMode();
    }
  });
</script>
```

### Browserify/CommonJS

When using with Browserify, install videojs-theater-mode via npm and `require` the plugin as you would any other module.

```js
var videojs = require('video.js');

// The actual plugin function is exported by this module, but it is also
// attached to the `Player.prototype`; so, there is no need to assign it
// to a variable.
require('videojs-theater-mode');

var player = videojs('my-video');

player.theaterMode({ elementToToggle: 'page' });

player.on('theaterMode', function(elm, data) {
  if (data.theaterModeIsOn) {
    $('#page').turnOnTheaterMode(); // or whatever
  } else {
    $('#page').turnOffTheaterMode();
  }
});
```

### RequireJS/AMD

When using with RequireJS (or another AMD library), get the script in whatever way you prefer and `require` the plugin as you normally would:

```js
require(['video.js', 'videojs-theater-mode'], function(videojs) {
  var player = videojs('my-video');
  player.theaterMode({ elementToToggle: 'page' });

  player.on('theaterMode', function(elm, data) {
    if (data.theaterModeIsOn) {
      $('#page').turnOnTheaterMode(); // or whatever
    } else {
      $('#page').turnOffTheaterMode();
    }
  });

});
```

## License

MIT. Copyright (c) Jon &lt;jon@jgubman.com&gt;


[videojs]: http://videojs.com/
