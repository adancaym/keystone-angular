var RestController = {
	List: {},
	/*
	* Get List of the database
	* */
	list: (request, response) => {
		RestController.List.model.find((errors, list) => {
			if (errors) return response.json({ errors: errors });
			return response.json({ list: list });
		});
	},
	/*
	* Get elemtent by id
	* */
	get: (request, response) => {
		RestController.List
			.model
			.findOne({
				slug: request.params.id,
			})
			.exec((errors, item) => {
				if (errors) return response.json({ errors: errors });
				if (!item) return response.json({ error: 'Not found' });
				return response.json({
					item: item,
				});
			});
	},
	/*
	* Create a element
	* */
	create: (requests, response) => {
		let newProduct = new RestController.List.model();
		let dataRequest = (requests.method === 'POST') ? requests.body : requests.query;

		newProduct.getUpdateHandler(requests).process(dataRequest, (errors) => {
			if (errors) return response.json({ errors: errors });
			return response.json({
				item: newProduct,
			});
		});
	},

	/*
	* Update a element
	* */
	update: (request, response) => {
		RestController
			.List
			.model
			.findOne({
				slug: request.params.id,
			}).exec((errors, item) => {
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
	},
	/*
	* Deletes a element from the database
	* */
	delete: (request, response) => {
		RestController.List.model.findById(request.params.id).exec((errors, item) => {
			if (errors) return response.json({ errors: errors });
			if (!item) return response.json({ error: 'Not found' });

			item.remove(function (errors) {
				if (errors) return response.json({ errors: errors });
				return response.json({ success: true });
			});
		});
	},
};


exports.parentRestController = RestController;
