/*!
 * update-year <https://github.com/jonschlinkert/update-year>
 *
 * Copyright (c) 2014 Jon Schlinkert, contributors.
 * Licensed under the MIT license.
 */

'use strict';

var year = +require('year')();

module.exports = function updateYear(str) {
  str = String(str);
  var segs = str.split(', ');
  var len = segs.length;

  if (len === 1 && !/-/.test(str)) {
    return createRange(str, year);
  }

  if (+segs[len - 1] === year) {
    return str;
  }

  var last = segs.pop();
  var prefix = createPrefix(segs, last);

  var years = last.split('-');
  len = years.length;

  if (len === 1) {
    return prefix + createRange(+last, year);
  }

  if (+years[len - 1] === year - 1) {
    return prefix + years[0] + '-' + year;
  }
  return prefix + last + ', ' + year;
};

function createPrefix(segs, last) {
  if (segs.length === 0) {
    return '';
  }
  if (segs.length === 1 && last) {
    return segs[0] + ', ';
  }
  return segs.join(', ') + ', ';
}

function createRange(num, year) {
  num = +num;
  if (num === year) {
    return year;
  }
  if (num === (year - 1)) {
    return num + '-' + year;
  }
  if (num < year) {
    return num + ', ' + year;
  }
}

module.exports.matchRange = function matchRange(str) {
  var re = /((?:19|20)[0-9]{2}(?:[\d-]|\sto\s)*)/g;
  var lines = str.split(/[\r\n]+/);
  var len = lines.length, i = -1;
  var res = [];

  while (len--) {
    var line = lines[++i];
    var match = line.match(re);
    if (match) {
      res.push(match.join(', '));
    }
  }
  return res;
};
