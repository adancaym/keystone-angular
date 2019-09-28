var PostRestController = require('./Rest');

var keystone = require('keystone');

PostRestController.parentRestController.List = keystone.list('Post');

exports.controller = PostRestController.parentRestController;
