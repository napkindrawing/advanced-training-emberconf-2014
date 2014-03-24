var store = Ember.Object.extend();

Ember.Application.initializer({
	name: 'microdata',

	initialize: function(container, app) {
		app.register('service:store', store);

		app.inject('controller','store','service:store');
	}

});

export default store;
