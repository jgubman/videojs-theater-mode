import videojs from 'video.js';
import {version as VERSION} from '../package.json';

const Button = videojs.getComponent('Button');
const defaults = { className: 'theater-mode' };

// Cross-compatibility for Video.js 5 and 6.
const registerPlugin = videojs.registerPlugin || videojs.plugin;

/**
 * Button to add a class to passed in element that will toggle "theater mode" as defined
 * in app's CSS (larger player, dimmed background, etc...)
 */
class TheaterModeToggle extends Button {

  constructor(player, options) {
    super(player, options);
    this.controlText('Toggle theater mode');
  }

  buildCSSClass() {
    if (document.getElementById(this.options_.elementToToggle).classList.contains(this.options_.className)) {
      return `vjs-theater-mode-control-close ${super.buildCSSClass()}`;
    } else {
      return `vjs-theater-mode-control-open ${super.buildCSSClass()}`;
    }
  }

  handleClick() {
    let theaterModeIsOn = document.getElementById(this.options_.elementToToggle).classList.toggle(this.options_.className);
    this.player().trigger('theaterMode', { 'theaterModeIsOn': theaterModeIsOn });

    if (theaterModeIsOn) {
      this.el_.classList.remove('vjs-theater-mode-control-open');
      this.el_.classList.add('vjs-theater-mode-control-close');
    } else {
      this.el_.classList.remove('vjs-theater-mode-control-close');
      this.el_.classList.add('vjs-theater-mode-control-open');
    }
  }
}

videojs.registerComponent('TheaterModeToggle', TheaterModeToggle);

const onPlayerReady = (player, options) => {
  player.addClass('vjs-theater-mode');

  let toggle = player.controlBar.addChild('theaterModeToggle', options);
  player.controlBar.el().insertBefore(toggle.el(), player.controlBar.fullscreenToggle.el());
};

/**
 * @function theaterMode
 * @param    {Object} [options={}]
 *           elementToToggle, the name of the DOM element to add/remove the 'theater-mode' CSS class
 */
const theaterMode = function(options) {
  this.ready(() => {
    onPlayerReady(this, videojs.mergeOptions(defaults, options));
  });
};

// Register the plugin with video.js.
registerPlugin('theaterMode', theaterMode);

// Include the version number.
theaterMode.VERSION = VERSION;

export default theaterMode;
