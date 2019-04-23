

exports.run = async function (userIdentifier, changeAmount) {

	let [validUser, userId] = this.self.misc.identifier.isUser(userIdentifier);

    
	if (!validUser || changeAmount == null) throw new Error("Must provide a user identifier and change amount");

	let rankName = await this.getRankName(userId);
	if (!rankName) throw new Error("Failed to get rank name in group");
	if (rankName.toLowerCase() === "guest") throw new Error("User is not in group");

	let groupRoles = await this.getRoles(true);
    
	for (let num = 0; num < groupRoles.length; num ++) {
		let role = groupRoles[num];
		let roleName = role.name;

		if (roleName === rankName) {
			let change = num + changeAmount;
			let foundRole = groupRoles[change];

			if (!foundRole || foundRole.id == null) throw new Error("Rank change is out of range");
			await this.setRank(userId, foundRole);
			return {
				old: role,
				new: foundRole,
				userId: userId
			};
		}
	}
};



exports.conf = {
	required: {
		params: 1,
		auth: true
	},

	name: "changeRank",
	description: "Changes a user's rank in a group",
	params: ["userIdentifier (messageId)", "roleIdentifier (roleId)"]
};