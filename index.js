/*!
 * update-year <https://github.com/jonschlinkert/update-year>
 *
 * Copyright (c) 2014 Jon Schlinkert, contributors.
 * Licensed under the MIT license.
 */

'use strict';

var extend = require('extend-shallow');
var year = require('year');

/**
 * Expose `updateYear`
 */

module.exports = updateYear;

/**
 * Update the year in the given `string`. If no dates are explicitly passed,
 * the year will automatically be updated from the previous year to the
 * current year.
 *
 * You can also pass the old year, `from`, and or the new year, `to` on the the options.
 *
 * **Example**
 *
 * ```js
 * year('Copyright (c) 2012 Jon Schlinkert', {from: 2012})
 * //=> 'Copyright (c) 2014 Jon Schlinkert'
 * ```
 *
 * @param {String} `string`
 * @param {Object} `options`
 *   @option {String} [options] `from` The old year
 *   @option {String} [options] `to` The new year
 * @return {String}
 * @api public
 */

function updateYear(str, options) {
  if (typeof str !== 'string') {
    throw new TypeError('update-year expects a string as the first argument');
  }

  var current = +year();
  var opts = extend({to: current, from: current - 1}, options);
  var match;

  while(match = new RegExp(opts.from).exec(str)) {
    str = str.replace(match[0], opts.to);
  }

  return str;
}