var keystone = require('keystone');
var Types = keystone.Field.Types;

/**
 * Rack Model
 * ==========
 */

var Rack = new keystone.List('Rack', {
	map: { name: 'name' },
	autokey: { path: 'slug', from: 'name', unique: true },
});

Rack.add({
	name: { type: String, required: true },
	store: { type: Types.Relationship, ref: 'Store' },
});
	
Rack.defaultColumns = 'name';
Rack.register();
