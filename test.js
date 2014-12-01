/*!
 * update-year <https://github.com/jonschlinkert/update-year>
 *
 * Copyright (c) 2014 Jon Schlinkert, contributors.
 * Licensed under the MIT License
 */

'use strict';

var assert = require('assert');
var should = require('should');
var year = require('./');

describe('year', function () {
  it('should update the year:', function () {
    year('this is 2013, right?').should.equal('this is 2014, right?');
  });

  it('should update the year to the given year:', function () {
    year('this is 2013, right?', {to: 2015}).should.equal('this is 2015, right?');
  });

  it('should update the given year to the current year:', function () {
    year('Copyright (c) 2010-2012 Jon Schlinkert', {from: 2012}).should.equal('Copyright (c) 2010-2014 Jon Schlinkert');
  });
});

