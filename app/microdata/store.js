function normalizeKey(key) {
	return key.toString();
}

function buildRecord(type, data, store) {

	var containerKey = 'model:' + type;

	var factory = store.container.lookupFactory(containerKey);

	var id = normalizeKey(data.id);

	data.id = id;

	var record = factory.create({
		id: id,
		$data: data
	});

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
		var id = normalizeKey(id);
		var identityMap = identityMapForType(type, this);
		return identityMap[id] || null;
	},

	find: function find(type, id) {
		var store = this;
		var promise = new Ember.RSVP.Promise(function (resolve, reject) {
			resolve( store.getById(type, id) );
		});

		return promise;
	}
	
});

export default store;
