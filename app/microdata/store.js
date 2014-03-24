function buildRecord(type, data, store) {

	var containerKey = 'model:' + type;

	var factory = store.container.lookupFactory(containerKey);

	var record = factory.create({
		id: data.id,
		$data: data
	});

	var id = data.id;

	identityMapForType(type, store)[id] = record;

	return record;
}

function identityMapForType(type, store) {
	var typeIdentityMap = store.get('identityMap');
	var idIdentityMap = typeIdentityMap[type] || {};
	typeIdentityMap[type] = idIdentityMap;
	return idIdentityMap;
}

var store = Ember.Object.extend({
	init: function() {
		this.set('identityMap', {});
	},
	push: function push(type, attrs) {

		var record = this.getById(type, attrs.id);

		if(record) {
			record.set('$data', attrs);
		} else {
			record = buildRecord(type, attrs, this);
		}

		return record;
	},

	getById: function getById(type, id) {
		var identityMap = identityMapForType(type, this);
		return identityMap[id] || null;
	}
});

export default store;
