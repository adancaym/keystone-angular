var keystone = require('keystone');


exports = module.exports = (req, res) => {
	var view = new keystone.View(req, res);
	var locals = res.locals;
	locals.section = 'store';
	// load products
	view.query('products', keystone.list('Product').model.find().populate('categories'));
	view.render('products');
};

