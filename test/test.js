/*!
 * partials <https://github.com/jonschlinkert/partials>
 *
 * Copyright (c) 2014 Jon Schlinkert, contributors.
 * Licensed under the MIT License
 */

'use strict';

var fs = require('fs');
var path = require('path');
var should = require('should');
var assert = require('assert');
var matter = require('gray-matter');
var loader = require('..');


describe('partials', function () {
  it('should load partials from a glob pattern.', function () {
    var cache = loader('test/fixtures/*.txt');
    cache.should.have.property('a');
    cache.should.have.property('b');
    cache.should.have.property('c');
    cache.should.eql({a: 'AAA', b: 'BBB', c: 'CCC' });
  });

  it('should load partials from a glob pattern.', function () {
    var cache = loader('test/fixtures/*.hbs');
    cache.should.have.property('a');
    cache.should.have.property('b');
    cache.should.have.property('c');
    cache.should.eql({a: '<h1>{{title}}</h1>', b: '<h1>{{title}}</h1>', c: '<h1>{{title}}</h1>' });
  });

  it('should rename the key with a custom function.', function () {
    var cache = loader('test/fixtures/*.txt', {
      name: function(filepath) {
        return filepath;
      }
    })
    cache.should.have.property('test/fixtures/a.txt');
    cache.should.have.property('test/fixtures/b.txt');
    cache.should.have.property('test/fixtures/c.txt');
  });

  it('should read partials with a custom function.', function () {
    var cache = loader('test/fixtures/*.txt', {
      read: function(filepath) {
        return matter.read(filepath);
      }
    });
    cache.should.have.property('a', { data: {}, content: 'AAA', orig: 'AAA', path: 'test/fixtures/a.txt' });
    cache.should.have.property('b', { data: {}, content: 'BBB', orig: 'BBB', path: 'test/fixtures/b.txt' });
    cache.should.have.property('c', { data: {}, content: 'CCC', orig: 'CCC', path: 'test/fixtures/c.txt' });
  });

  it('should require partials with a custom function.', function () {
    var helpers = loader('test/fixtures/*.js', {
      read: function (filepath) {
        return {
          path: filepath,
          helper: require(path.resolve(filepath))
        }
      }
    });
    helpers.should.have.property('a');
    helpers.should.have.property('b');
    helpers.should.have.property('c');
    helpers['a'].path.should.equal('test/fixtures/a.js');
    helpers['a'].helper.should.be.an.object;
    helpers['a'].helper.should.be.a.function;
  });

  it('should use multiple custom functions.', function () {
    var cache = loader('test/fixtures/*.txt', {
      read: function(filepath) {
        return matter.read(filepath);
      },
      name: function(filepath) {
        return filepath;
      }
    });
    cache.should.have.property('test/fixtures/a.txt', { data: {}, content: 'AAA', orig: 'AAA', path: 'test/fixtures/a.txt' });
    cache.should.have.property('test/fixtures/b.txt', { data: {}, content: 'BBB', orig: 'BBB', path: 'test/fixtures/b.txt' });
    cache.should.have.property('test/fixtures/c.txt', { data: {}, content: 'CCC', orig: 'CCC', path: 'test/fixtures/c.txt' });
  });

  it('readme example #2.', function () {
    var helpers = loader('test/fixtures/*.js', {
      read: function (fp) {
        return require(path.resolve(fp));
      }
    });
    // console.log(helpers);
  });
});