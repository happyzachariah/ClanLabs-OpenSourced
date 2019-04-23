exports.run = function () {
	return console.warn("Still not added, expect it in v3");
};

exports.conf = {
	required: {
		params: 0
	},

	name: "onChange",
	description: "An event emitter that notifies when the group description or shout changes",
	params: ["checkInterval (Number)"]
};