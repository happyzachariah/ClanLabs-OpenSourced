

exports.run = async function (userIdentifier, roleIdentifier, groupIdentifier) {
    
	let [validUser, userId] = this.self.misc.identifier.isUser(userIdentifier);
	let [validRole, roleId] = this.self.misc.identifier.isRole(roleIdentifier);
	let [validGroup, groupId] = this.self.misc.identifier.isGroup(groupIdentifier || this.groupId);
    
	if (!validUser || !validRole || !validGroup) throw new Error("Must provide a valid user, role and group");

	let url = `https://www.roblox.com/groups/api/change-member-rank?groupId=${groupId}&newRoleSetId=${roleId}&targetUserId=${userId}`;

	let options = {
		method: "POST"
	};

	let response = await this.self._setup.request.request(url, options);
	if (response.statusCode !== 200) throw new Error(`Failed to set rank. ${response.status}`);

	return true;
};


exports.conf = {
	required: {
		params: 2,
		auth: true
	},

	name: "setRank",
	description: "Sets the rank for a user in the group",
	params: ["userId (number)", "roleId (number)", "(groupId (number))"]
};