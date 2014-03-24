var model = Ember.Object.extend({
	init: function() {
		this.set('$dataChanges', {});
	},

	$mergeChanges: function() {
		var changes = this.get('$dataChanges');
		for(var changed in changes) {
			this.get('$data')[changed] = changes[changed];
		}
	}
});

export default model;
