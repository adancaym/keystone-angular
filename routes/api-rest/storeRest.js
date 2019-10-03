var keystone = require('keystone');
var storeQuerys = require('../../querys/StoreQuery');
var storeStoreProcedure = require('../../stored_procedures/Store_stored_procedure');
exports.list = async (request, response) => {
	let StoreModel = keystone.list('Store').model;
	StoreModel.find().populate('address').exec().then(stores => {
		return response.send({ list: stores });

	}).catch(errors => {
		console.log(errors);
	});
};

exports.get = (request, response) => {
	storeQuerys.getStoreAndProductsBySlug(request.params.id).then(result => {
		return response.send(result);
	});
};

/*
* Create a element
* */
exports.create = (requests, response) => {
	storeStoreProcedure.savaStoreFromRequest(requests).then(newStore => {
		return response.send({ item: newStore });
	});
};

/*
* Update a element
* */
exports.update = (request, response) => {
	storeStoreProcedure.updateStoreFromRequest(request).then(updated => {
		return response.send({ item: updated });
	});
};
/*
* Deletes a element from the database
* */
exports.delete = (request, response) => {
	// eslint-disable-next-line no-mixed-spaces-and-tabs
	storeStoreProcedure.deleteBySlugStoredProcedure(request.params.id).then(removed => {
		return response.send({ item: removed });
	})
};
