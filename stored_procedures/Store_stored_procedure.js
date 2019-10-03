var keystone = require('keystone');
var Store = keystone.list('Store');

async function savaStoreFromRequest (request) {
	let newProduct = new Store.model(request.body);
	return await newProduct.save().then(result => {
		return result;
	}).catch(console.log);
}

async function updateStoreFromRequest (request) {
	return await Store.model.findOneAndUpdate({ slug: request.params.id }, request.body, { new: true })
	.exec()
	.then(item => {
		return item;
	}).catch(console.log);
}

async function deleteBySlugStoredProcedure (slug) {
	return await Store.model.findOneAndDelete({ slug: slug }).exec().then(removed => {
		console.log(removed);
		return removed;
	})
}
module.exports = {
	savaStoreFromRequest,
	updateStoreFromRequest,
	deleteBySlugStoredProcedure,
};
