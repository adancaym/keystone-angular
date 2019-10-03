var keystone = require('keystone');
var Types = keystone.Field.Types;

/**
 * Address Model
 * ==========
 */

var Address = new keystone.List('Address', {
	map: { name: 'street' },
	autokey: { path: 'slug', from: 'street', unique: true },
});

Address.add({
	street: { type: String, required: true },
	outdoorNumber: { type: Number },
	indoorNumber: { type: Number },
	suburb: { type: String },
	state: { type: String },
	zipCode: { type: Number },
});

Address.relationship({ ref: 'Store', path: 'stores', refPath: 'address' });

Address.defaultColumns = 'street, outdoorNumber, suburb, state';
Address.register();
