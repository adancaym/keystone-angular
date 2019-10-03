const keystone = require('keystone');


async function getProductsByArrayIdRacks (arrayIdRacks) {
	let shelvesIds = [];
	return await keystone.list('Shelf').model.find({ rack: { $in: arrayIdRacks } }).exec().then(async shelves => {
		shelves.forEach(shelf => {
			shelvesIds.push(shelf._id);
		});
		return getProductsByIdsArrayShelves(shelvesIds).then(products => {
			return products;
		});
	}).catch(console.log);
}

async function getProductsByIdsArray (arrayIds) {
	return await keystone.list('ShelfProduct')
		.model
		.find({ product: { $in: arrayIds } })
		.populate('product shelf')
		.exec()
		.then(async products => {
			return products;
		}).catch(console.log);
}


async function getProductsByIdsArrayShelves (arrayIds) {
	return await keystone.list('ShelfProduct')
		.model
		.find({ shelf: { $in: arrayIds } })
		.populate('product shelf')
		.exec()
		.then(async products => {
			return products;
		}).catch(console.log);
}
async function getProductsByIdStore (idStore) {

	return await keystone.list('Rack').model.find({ store: idStore }).exec().then(async racks => {
		let racksIds = [];
		racks.forEach(rack => {
			racksIds.push(rack._id);
		});
		return getProductsByArrayIdRacks(racksIds).then(products => {
			return products;
		});
	}).catch(console.log);
}

module.exports = {
	getProductsByArrayIdRacks,
	getProductsByIdsArray,
	getProductsByIdsArrayShelves,
	getProductsByIdStore,
};
