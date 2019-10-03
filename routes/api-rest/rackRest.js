var keystone = require('keystone');

exports.list = (request, response) => {
	keystone.list('Rack').model.find((errors, list) => {
		if (errors) return response.json({ errors: errors });
		return response.json({ list: list });
	});
};

exports.get = (request, response) => {
	keystone.list('Rack').model
		.findOne({
			slug: request.params.id,
		}).populate('shelves')
		.exec((errors, item) => {
			if (errors) return response.json({ errors: errors });
			if (!item) return response.json({ error: 'Not found' });
			return response.json({
				item: item,
			});
		});
};

/*
* Create a element
* */
exports.create = (requests, response) => {
	let newProduct = new keystone.list('Rack').model();
	let dataRequest = (requests.method === 'POST') ? requests.body : requests.query;

	newProduct.getUpdateHandler(requests).process(dataRequest, (errors) => {
		if (errors) return response.json({ errors: errors });
		return response.json({
			item: newProduct,
		});
	});
};

/*
* Update a element
* */
exports.update = (request, response) => {
	keystone.list('Rack').model.findOne({
		slug: request.params.id,
	})
		.exec((errors, item) => {
			if (errors) return response.json({ errors: errors });
			if (!item) return response.json({ error: 'Not found' });

			var dataUpdate = (request.method === 'PUT') ? request.body : request.query;

			item.getUpdateHandler(request).process(dataUpdate, (errors) => {
				if (errors) return response.json({ errors: errors });
				return response.json({
					item: item,
				});
			});
		});
};
/*
* Deletes a element from the database
* */
exports.delete = (request, response) => {
	// eslint-disable-next-line no-mixed-spaces-and-tabs
	keystone.list('Rack').model.findById(request.params.id).exec((errors, item) => {
		if (errors) return response.json({ errors: errors });
		if (!item) return response.json({ error: 'Not found' });
		item.remove(function (errors) {
			if (errors) return response.json({ errors: errors });
			return response.json({ success: true });
		});
	});
};
