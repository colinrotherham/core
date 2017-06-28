/**
 * Start app
 */

'use strict';

require('picturefill');

var app = new (require('./modules/app'))();
app.init();
