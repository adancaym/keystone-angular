var keystone = require('keystone');
var TypeFields = keystone.Field.Types;


var Product = new keystone.List('Product', {
	map: { name: 'title' },
	singular: 'Product',
	plural: 'Products',
	autokey: { path: 'slug', from: 'title', unique: true },
});

Product.add({
	title: { type: String, required: true },
	price: { type: Number },
	qty: { type: Number },
	description: { type: TypeFields.Html, wysiwyg: true, height: 300 },
	image: { type: TypeFields.CloudinaryImage },
	publishedDate: { type: Date, default: Date.now() },
	categories: { type: TypeFields.Relationship, ref: 'ProductCategory', many: true },
});

Product.defaultColumns = 'title price qty';
Product.register();
