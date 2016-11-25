import 'babel-polyfill';
import common from '../module/common';

module.exports = {
  checkLoaded() {
    var self = this;
    document.addEventListener('mdl-componentupgraded', function (e) {
      if (typeof e.target.MaterialLayout !== 'undefined') {
        (async () => {
          const result = await self.compleatedLoading();
          if (result) {
            self.moveAnchorTagPosition();
          }
        })();
      }
    });
  },
  compleatedLoading() {
    return new Promise((resolve, reject) => {
      var loader = document.getElementsByClassName('loader')[0];
      if (loader) {
        loader.classList.add('is-loaded');
        resolve(true);
      } else {
        resolve(false);
      }
    });
  },
  moveAnchorTagPosition() {
    var hash = this.removeFristSharp(window.location.hash);
    if (!hash) {
      return;
    }
    window.location.hash = '';
    window.location.hash = hash;
  },
  removeFristSharp(str) {
    var url = str.split('#');

    if (url.length !== 2) {
      return '';
    }

    return url[1];
  }
};
