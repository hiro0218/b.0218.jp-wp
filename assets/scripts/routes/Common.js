import load from '../module/load';
import fixedHeader from '../module/fixedHeader';

export default {
  init() {
    // JavaScript to be fired on all pages
  },
  finalize() {
    // JavaScript to be fired on all pages, after page specific JS is fired
    load.checkLoaded();

    // header fixed
    fixedHeader.init();

    // drawer
    var trigger = document.getElementsByClassName('drawer-checkbox')[0];
    if (trigger) {
      var body = document.body;
      var className = 'open-drawer';
      trigger.addEventListener('change', function (e) {
        if (trigger.checked) {
          body.classList.add(className);
        } else {
          body.classList.remove(className);
        }
      });
    }
  }
};
