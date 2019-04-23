

exports.run = async function (userIdentifier, groupIdentifier) {

	let [validUser, userId] = this.self.misc.identifier.isUser(userIdentifier);
	let [validGroup, groupId] = this.self.misc.identifier.isGroup(groupIdentifier || this.groupId);

	if (!validUser || !validGroup) throw new Error("Must provide a user identifier and a group identifier");

	let response = await this.self._setup.request.request(`https://www.roblox.com/Game/LuaWebService/HandleSocialRequest.ashx?method=GetGroupRole&playerid=${userId}&groupId=${groupId}`);

	if (response.statusCode !== 200) throw new Error(`Failed to get user's rank name in group. ${response.status}`);

	return response.body;
};

exports.conf = {
	required: {
		params: 1
	},

	name: "getRankName",
	description: "Gets the user's name of the rank in the group",
	params: ["userId (number)", "groupId (number)"]
};