import videojs from 'video.js';
import {version as VERSION} from '../package.json';

const Button = videojs.getComponent('Button');

// Cross-compatibility for Video.js 5 and 6.
const registerPlugin = videojs.registerPlugin || videojs.plugin;
// const dom = videojs.dom || videojs;


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
    return `vjs-theater-mode-control ${super.buildCSSClass()}`;
  }
  handleClick() {
    let el = document.getElementById(this.options_.elementToToggle);
    el.classList.toggle('theater-mode');
  }
}

videojs.registerComponent('TheaterModeToggle', TheaterModeToggle);

const onPlayerReady = (player, options) => {
  player.addClass('vjs-theater-mode');

  let toggle = player.controlBar.addChild('theaterModeToggle', { elementToToggle: options.elementToToggle });
  player.controlBar.el().insertBefore(toggle.el(), player.controlBar.fullscreenToggle.el());
};

/**
 * @function theaterMode
 * @param    {Object} [options={}]
 *           elementToToggle, the name of the DOM element to add/remove the 'theater-mode' CSS class
 */
const theaterMode = function(options) {
  this.ready(() => {
    onPlayerReady(this, options);
  });
};

// Register the plugin with video.js.
registerPlugin('theaterMode', theaterMode);

// Include the version number.
theaterMode.VERSION = VERSION;

export default theaterMode;
