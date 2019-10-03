var keystone = require('keystone');
var productQuery = require('./ProductsQuerys');

async function getStoreAndProductsBySlug (slug) {
	return await keystone.list('Store').model
		.findOne({ slug: slug })
		.exec().then(item => {
			return productQuery.getProductsByIdStore(item._id).then(products => {
				return { item: item, products: products };
			});
		});
}

module.exports = {
	getStoreAndProductsBySlug,
}
