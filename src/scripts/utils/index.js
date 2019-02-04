import lozad from 'lozad';

export const wait = (TIMER = 200) => {
  return new Promise(resolve => {
    setTimeout(() => {
      resolve(true);
    }, TIMER);
  });
};

export const htmlentities = {
  encode(str) {
    var buf = [];

    for (let i = str.length - 1; i >= 0; i--) {
      buf.unshift(['&#', str[i].charCodeAt(), ';'].join(''));
    }

    return buf.join('');
  },
  decode(str) {
    return str.replace(/&#(\d+);/g, function(match, dec) {
      return String.fromCharCode(dec);
    });
  },
};

export const escapeBrackets = text => {
  return text.replace(/</g, '&lt;').replace(/>/g, '&gt;');
};

export const dateToISOString = date => {
  if (typeof date === 'string') {
    date = new Date(date);
  }

  return date.toISOString();
};

export const formatBaseLink = url => {
  if (!url) {
    return '';
  }

  // remove scheme
  url = url.replace(/^(https?):\/\//, '');
  // remove host
  return url.replace(location.host, '');
};

export const formatDate = date => {
  if (typeof date === 'string') {
    date = new Date(date);
  }

  return date
    .toISOString()
    .split('T')[0]
    .replace(/-/g, '/');
};

export const loadImages = (images) => {
  if (images) {
    for (let i = 0; i < images.length; i++) {
      images[i].removeAttribute('data-loaded');
    }

    const observer = lozad(images);
    observer.observe();
  }
};
