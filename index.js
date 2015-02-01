/*!
 * update-year <https://github.com/jonschlinkert/update-year>
 *
 * Copyright (c) 2014 Jon Schlinkert, contributors.
 * Licensed under the MIT license.
 */

'use strict';

var unique = require('array-unique');
var year = require('year')();

module.exports = function updateYear(str) {
  if (typeof str !== 'string') {
    throw new TypeError('update-year expects a string as the first argument');
  }

  var arr = str.split(/[,\s]+/).filter(Boolean);
  var len = arr.length;
  var res = arr.slice();
  var ele = arr.slice(-1)[0];

  if (len === 1 && +ele === +year - 1) {
    return [arr[0], year].join('-');
  }

  if (ele.indexOf('-') !== -1) {
    var years = ele.split('-');
    var last = years.slice(-1);
    if (+last === +year) {
      return str;
    } else if (+last === +year - 1) {
      ele = [years[0], year].join('-');
      res.splice(-1, 1, ele);
    }
  }

  if (arr.length === 1 && res[0] == str) {
    res.push(year);
  } else if (res.join(', ') === str) {
    res.push(year);
  }

  return unique(res).join(', ');
}


module.exports.match = function matchYears(str) {
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
