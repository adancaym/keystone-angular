let ProductRestController = require('./Rest');

var keystone = require('keystone');

ProductRestController.parentRestController.List = keystone.list('Product');

exports.controller = ProductRestController.parentRestController;
