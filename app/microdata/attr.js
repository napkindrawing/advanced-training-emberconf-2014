export default function() {
    return function(key,value) {
		if(arguments.length == 1) {
			var changed = this.get('$changes')[key];

			return (typeof changed === 'undefined') ? this.$data[key] : changed;
		} else {
			this.get('$changes')[key] = value;
			return value;
		}
    }.property()
};
