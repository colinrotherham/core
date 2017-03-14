/**
 * Start app
 */

'use strict';

require('picturefill');
require('components-webfontloader');

var app = new (require('./modules/app'))();
app.init();
