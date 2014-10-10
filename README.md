# partials [![NPM version](https://badge.fury.io/js/partials.svg)](http://badge.fury.io/js/partials)


> Create an object of template partials from a glob of files to pass to any template engine.

## Install
#### Install with [npm](npmjs.org)

```bash
npm i partials --save
```
#### Install with [bower](https://github.com/bower/bower)

```bash
bower install partials --save
```

## Run tests

```bash
npm test
```

## Usage

```js
var partials = require('partials');

console.log(partials('*.hbs'));
//=> {a: '<h1>{{title}}</h1>', b: '<h1>{{title}}</h1>', c: '<h1>{{title}}</h1>' }
```

## Author

**Jon Schlinkert**
 
+ [github/jonschlinkert](https://github.com/jonschlinkert)
+ [twitter/jonschlinkert](http://twitter.com/jonschlinkert) 

## License
Copyright (c) 2014 Jon Schlinkert, contributors.  
Released under the MIT license

***

_This file was generated by [verb-cli](https://github.com/assemble/verb-cli) on October 10, 2014._