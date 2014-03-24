var model = Ember.Object.extend({
	init: function() {
		this.set('$changes', {});
	},

	$mergeChanges: function() {
		var changes = this.get('$changes');
		for(var changed in changes) {
			this.get('$data')[changed] = changes[changed];
		}
		this.set('$changes', {});
	},

	save: function save() {
		console.log("model.save");
		this.get('$store').save(this.get('$type'), this);
	}
});

export default model;
