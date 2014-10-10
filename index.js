/*!
 * partials <https://github.com/jonschlinkert/partials>
 *
 * Copyright (c) 2014 Jon Schlinkert, contributors.
 * Licensed under the MIT license.
 */

'use strict';

var fs = require('fs');
var partials = require('map-files');

module.exports = function (pattern, options) {
  var opts = extend({read: read}, options);
  return partials(pattern, opts);
};

function read(filepath) {
  return fs.readFileSync(filepath, 'utf8');
}

function extend(o, obj) {
  for (var key in obj) {
    if (obj.hasOwnProperty(key)) {
      o[key] = obj[key];
    }
  }
  return o;
}