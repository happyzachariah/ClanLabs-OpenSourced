

exports.run = async function (userIdentifier) {
    
	let groupId = this.groupId;

	let [validUser, userId] = this.self.misc.identifier.isUser(userIdentifier);

	if (!validUser) throw new Error("Must provide a user identifier");

	let options = {
		method: "DELETE"
	};

	let response = await this.self._setup.request.request(`https://groups.roblox.com/v1/groups/${groupId}/wall/users/${userId}/posts`, options);
	if (response.statusCode !== 200) throw new Error(`Failed to delete wall posts by user. ${response.status}`);

	return true;
};




exports.conf = {
	required: {
		params: 1,
		auth: true
	},

	name: "deleteWallPostsByUser",
	description: "Deletes all user's wall posts on the group",
	params: ["userId (Number)"]
};