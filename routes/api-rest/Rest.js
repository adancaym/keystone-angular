var keystone = require('keystone');

var Model = {
	table: '',
	model: {},
	list: {},
};

function model (table) {
	Model.list = keystone.list(Model.table);
	Model.model = Model.list.model;
	return !(!Model.list && !Model.model);
}

function list (request, response) {
	Model.model.find((errors, list) => {
		if (errors) return response.json({ errors: errors });
		return response.json({ list: list });
	});
}
function get (request, response) {
	Model.model
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
}
/*
* Create a element
* */
function create (requests, response) {
	let newProduct = new Model.list;
	let dataRequest = (requests.method === 'POST') ? requests.body : requests.query;

	newProduct.getUpdateHandler(requests).process(dataRequest, (errors) => {
		if (errors) return response.json({ errors: errors });
		return response.json({
			item: newProduct,
		});
	});
}
/*
* Update a element
* */
function update (request, response) {
	Model.model
	.findOne({
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
}
/*
* Deletes a element from the database
* */
function deleteItem (request, response) {
	Model.model.findById(request.params.id).exec((errors, item) => {
		if (errors) return response.json({ errors: errors });
		if (!item) return response.json({ error: 'Not found' });
		item.remove(function (errors) {
			if (errors) return response.json({ errors: errors });
			return response.json({ success: true });
		});
	});
}
module.exports = {
	list,
	get,
	create,
	update,
	deleteItem,
	model,
	Model,
};
