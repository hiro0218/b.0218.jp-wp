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
