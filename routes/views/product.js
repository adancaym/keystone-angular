var keystone = require('keystone');

exports = module.exports = (req, res) => {
	var view = new keystone.View(req, res);
	var locals = res.locals;
	locals.section = 'store';
	locals.filters = {
		product: req.params.product,
	};

	locals.data = {
		products: [],
	};
	// load products
	view.on('init', (next) => {
		var q = keystone.list('Product').model.findOne({
			slug: locals.filters.product,
		}).populate('categories');
		q.exec((err, result) => {
			locals.data.products = result;
			next(err);
		});
	});
	view.render('product');
};

