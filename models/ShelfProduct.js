var keystone = require('keystone');
var Types = keystone.Field.Types;

/**
 * Shelf Model
 * ==========
 */

var Shelf = new keystone.List('ShelfProduct');

Shelf.add({
	product: { type: Types.Relationship, ref: 'Product' },
	shelf: { type: Types.Relationship, ref: 'Shelf' },
	qty: { type: Number },
});

Shelf.defaultColumns = 'product shelf qty';
Shelf.register();
