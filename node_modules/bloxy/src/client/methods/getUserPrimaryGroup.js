

exports.run = async function (identifier) {

	let userId = this.misc.getUserId(identifier);
	if (typeof(userId) === "undefined") throw new Error("Did not provide a valid user or userId");

	let groups = await this.getUserGroups(userId);
	return (groups.find(x=>x.isPrimary===true));
};



exports.conf = {
	required: {
		params: 1
	},

	name: "getUserPrimaryGroup",
	description: "Gets a user's primary group (if any)",
	params: ["userId (Number)"]
};