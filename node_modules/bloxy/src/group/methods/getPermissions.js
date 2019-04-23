

exports.run = async function () {

	let groupId = this.groupId;
    
	let options = {
		json: true
	};

	let response = await this.self._setup.request.request(`https://groups.roblox.com/v1/groups/${groupId}/membership`, options);
	if (response.statusCode !== 200) throw new Error(`Failed to get user's permissions. ${response.status}`);
    
	return this.self._setup.classes.GroupPermissions(response.body, this.self);
};



exports.conf = {
	required: {
		params: 0,
		auth: true
	},

	name: "getPermissions",
	description: "Gets the authenticated user's permissions in the group",
	params: []
};