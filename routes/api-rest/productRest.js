let ProductRestController = require('./Rest');

var keystone = require('keystone');

ProductRestController.parentRestController.List = keystone.list('Product');


ProductRestController.parentRestController.get = (request, response) => {
	ProductRestController.parentRestController.List
		.model
		.findOne({
			slug: request.params.id,
		}).populate('categories')
		.exec((errors, item) => {
			if (errors) return response.json({ errors: errors });
			if (!item) return response.json({ error: 'Not found' });
			return response.json({
				item: item,
			});
		});
};

exports.controller = ProductRestController.parentRestController;
