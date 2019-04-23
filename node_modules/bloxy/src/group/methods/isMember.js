
exports.run = async function (userIdentifier) {

	let [validUser, userId] = this.self.misc.identifier.isUser(userIdentifier);

	if (!validUser) throw new Error("Must provide a user identifier");

	let userGroups = await this.self.getUserGroups(userId);
	return userGroups.find(x=>x.group.groupId === this.groupId);
};

exports.conf = {
	required: {
		params: 1,
		auth: true
	},

	name: "isMember",
	description: "Checks if the user is in the group",
	params: ["userId (Number)"]
};