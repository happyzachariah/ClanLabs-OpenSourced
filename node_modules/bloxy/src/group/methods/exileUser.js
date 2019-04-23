

exports.run = async function (userIdentifier) {
    
	let groupId = this.groupId;
	let [validUser, userId] = this.self.misc.identifier.isUser(userIdentifier);
    
	if (!validUser) throw new Error("Must provide a user identifier");

	let options = {
		method: "DELETE"
	};

	let response = await this.self._setup.request.request(`https://groups.roblox.com/v1/groups/${groupId}/users/${userId}`, options);
	if (response.statusCode !== 200) throw new Error(`Failed to exile user. ${response.status}`);

	return {
		success: true,
		userId: userId
	};
};

exports.conf = {
	required: {
		params: 1,
		auth: true
	},

	name: "exileUser",
	description: "Exiles a user from the group",
	params: ["userId (Number)"]
};