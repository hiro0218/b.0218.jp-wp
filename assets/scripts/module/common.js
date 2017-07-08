import Zooming from 'zooming';

module.exports = {
  // clickableElement(entry) {
  //   for (var i = 0, length = entry.length; i < length; i += 1) {
  //     entry[i].addEventListener('click', function (event) {
  //       event.preventDefault();
  //       var a = this.getElementsByTagName('a')[0];
  //       if (a) {
  //         location.href = a.getAttribute('href');
  //       }
  //     });
  //   }
  // },
  addExternalLink(entry) {
    var self = this;
    var icon = document.createElement('i');
    icon.appendChild(document.createTextNode('open_in_new'));
    icon.classList.add('material-icons', 'external-link');

    [].forEach.call(entry.getElementsByTagName('a'), function (element) {
      self.setExternalLinkIcon(element, icon);
    });
  },
  setExternalLinkIcon(element, icon) {
    if (typeof element.origin === 'undefined') {
      return;
    }

    var href = element.getAttribute('href');
    // exclude javascript and anchor
    if ((href.substring(0, 10).toLowerCase() === 'javascript') || (href.substring(0, 1) === '#')) {
      return;
    }

    // check hostname
    if (element.hostname === location.hostname) {
      return;
    }

    // set target and rel
    element.setAttribute('target', '_blank');
    element.setAttribute('rel', 'nofollow');

    // set icon when childNode is text
    if (element.hasChildNodes()) {
      if (element.childNodes[0].nodeType === 3) {
        element.appendChild(icon.cloneNode(true));
      }
    }
  },
  zoomImage(element) {
    var zoom = new Zooming();
    var entryImg = element.getElementsByTagName('img');
    var length = entryImg.length;

    // entry has no img
    if (length === 0) {
      return;
    }

    for (var i = 0; i < length; i += 1) {
      // parentNode is <a> Tag
      if (entryImg[i].getAttribute('data-zoom-disabled') === 'true' || entryImg[i].parentNode.nodeName.toUpperCase() === 'A') {
        continue;
      }
      // set cursor zoom-in
      entryImg[i].style.cursor = 'zoom-in';
      zoom.listen(entryImg[i]);
    }
  },
  /**
   * delay()(function(){console.log("hello1");}, 5000);
   */
  delay() {
    var timer = 0;
    return function (callback, delay) {
      clearTimeout(timer);
      timer = setTimeout(callback, delay);
    };
  },
  getStyleSheetValue(element, property) {
    if (!element || !property) {
      return null;
    }

    var style = window.getComputedStyle(element);
    var value = style.getPropertyValue(property);

    return value;
  }
};
