export default function() {
    return function(key,value) {
		if(arguments.length == 1) {
			var changed = this.get('$dataChanges')[key];

			return (typeof changed === 'undefined') ? this.$data[key] : changed;
		} else {
			this.get('$dataChanges')[key] = value;
			return value;
		}
    }.property()
};
