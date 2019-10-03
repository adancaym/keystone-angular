var keystone = require('keystone');
var Types = keystone.Field.Types;

/**
 * Shelf Model
 * ==========
 */

var Shelf = new keystone.List('Shelf', {
	map: { name: 'name' },
	autokey: { path: 'slug', from: 'name', unique: true },
});

Shelf.add({
	name: { type: String, required: true },
	rack: { type: Types.Relationship, ref: 'Rack' },
});

Shelf.defaultColumns = 'name';
Shelf.register();
