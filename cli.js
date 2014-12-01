#!/usr/bin/env node

'use strict';

var fs = require('fs');
var arr = require('arr');
var path = require('path');
var year = require('year');
var log = require('verbalize');
var lookup = require('look-up');
var write = require('write');
var argv = require('minimist')(process.argv.slice(2));
var update = require('./');

log.runner = 'update-year';

var current = +year();
var pattern = argv.pattern || argv.p || 'LICENSE{,-MIT}';
var dates = arr.filterType(argv._, 'number');

var from = argv.from || dates.length && dates[0] || current - 1;
var to = argv.to || dates.length && dates[1] || current;

var filename = lookup(pattern, {nocase: true, matchBase: true});
var res = update(fs.readFileSync(filename, 'utf8'), {from: from, to: to});

write.sync(filename, res);

console.log();

log.inform('updated', filename);

console.log();

log.success('  Done.');
