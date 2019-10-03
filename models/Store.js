var keystone = require('keystone');
var Types = keystone.Field.Types;

/**
 * Store Model
 * ==========
 */

var Store = new keystone.List('Store', {
	map: { name: 'name' },
	autokey: { path: 'slug', from: 'name', unique: true },
});

Store.add({
	name: { type: String, required: true },
	image: { type: Types.CloudinaryImage },
	address: { type: Types.Relationship, ref: 'Address', many: false },
});


Store.schema.virtual('address.full').get(function () {
	return this.address.street + this.address.suburb;
});


Store.defaultColumns = 'name';
Store.register();
