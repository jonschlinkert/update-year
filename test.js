/*!
 * update-year <https://github.com/jonschlinkert/update-year>
 *
 * Copyright (c) 2014-2015, Jon Schlinkert.
 * Licensed under the MIT License
 */

'use strict';

var should = require('should');
var update = require('./');

describe('update year', function() {
  it('should not update the year when already current:', function() {
    update('2015').should.equal('2015-2016');
    update('2014-2015').should.equal('2014-2016');
    update('2013, 2015').should.equal('2013, 2015-2016');
  });

  it('should add a dash between sequential years:', function() {
    update('2015').should.equal('2015-2016');
    update(2015).should.equal('2015-2016');
  });

  it('should add a dash when one year has passed', function() {
    update('2009, 2015').should.equal('2009, 2015-2016');
  });

  it('should add a comma when more than 1 year has passed', function() {
    update('1999-2001, 2009').should.equal('1999-2001, 2009, 2016');
    update('1999, 2001').should.equal('1999, 2001, 2016');
    update('2009, 2012').should.equal('2009, 2012, 2016');
    update('1999-2001').should.equal('1999-2001, 2016');
    update('2012').should.equal('2012, 2016');
    update('2013').should.equal('2013, 2016');
  });

  it('should add a dash when previous year is sequential', function() {
    update('2015').should.equal('2015-2016');
  });

  it('should update the last sequential year in a range to current year', function() {
    update('2010-2015').should.equal('2010-2016');
    update('2012-2015').should.equal('2012-2016');
    update('1999, 2001-2015').should.equal('1999, 2001-2016');
    update('1999, 2001, 2003-2005, 2009, 2011-2015').should.equal('1999, 2001, 2003-2005, 2009, 2011-2016');
  });

  it('misc', function() {
    update('2012').should.equal('2012, 2016');
    update('2013').should.equal('2013, 2016');
    update('2014').should.equal('2014, 2016');
    update('2015').should.equal('2015-2016');
    update('2013, 2015').should.equal('2013, 2015-2016');
    update('2014-2015').should.equal('2014-2016');
    update('1999, 2001, 2015').should.equal('1999, 2001, 2015-2016');
    update('1999-2001').should.equal('1999-2001, 2016');
    update('1999-2001, 2009').should.equal('1999-2001, 2009, 2016');
  });
});

describe('match years', function() {
  it('should match the years in a string:', function() {
    update.matchRange('a\nb c d 2012-2014 foo bar').should.eql(['2012-2014']);
    update.matchRange('foo 2012, 2014, 2015-2016 foo bar').should.eql(['2012, 2014, 2015-2016']);
    update.matchRange('foo 2012-2013, 2015-2016 foo bar').should.eql(['2012-2013, 2015-2016']);
    update.matchRange('foo\n2012, 2013, 2014, 2016\nfoo bar').should.eql(['2012, 2013, 2014, 2016']);
  });
});
