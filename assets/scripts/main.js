import Router from './util/router';
import 'material-design-lite/material.js';

// Use this variable to set up the common and page specific functions. If you
// rename this variable, you will also need to rename the namespace below.
var Sage = {
  // All pages
  'common': {
    init: function() {
      // JavaScript to be fired on all pages
    },
    finalize: function() {
      // JavaScript to be fired on all pages, after page specific JS is fired
    }
  },
  // Home page
  'home': {
    init: function() {
      // JavaScript to be fired on the home page
    },
    finalize: function() {
      // JavaScript to be fired on the home page, after the init JS

      // clickable
      var entry = document.getElementsByTagName('article');
      for (var i = 0, len = entry.length; i < len; i++) {
        entry[i].addEventListener('click', function(e) {
          //this.classList.add("animation-jelly");
          e.preventDefault();
          var title = this.getElementsByTagName('a')[0];
          var permalink = title.getAttribute('href');
          location.href = permalink;
        });
      }

    }
  },
  // single
  'single': {
    init: function() {}
  },
  // page
  'page': {
    init: function() {}
  },
  // About us page, note the change from about-us to about_us.
  'about_us': {
    init: function() {
      // JavaScript to be fired on the about us page
    }
  }
};

// Load Events
document.addEventListener("DOMContentLoaded", new Router(Sage).loadEvents(), false);
