var data = {
};

var store = Ember.Object.extend({
	push: function push(type, attrs) {

		data[type] = data[type] || {};

		if(data[type][attrs.id]) {
			data[type][attrs.id].set('$data', attrs);
		} else {

			var type_class = this.container.lookupFactory('model:' + type);
			var instance = type_class.create({ id: attrs.id, $data: attrs });

			data[type][attrs.id] = instance;
		}

		return data[type][attrs.id];
	},
	getById: function getById(type, id) {
		return data[type][id];
	}
});

export default store;
