
exports.run = async function () {

	let groupId = this.groupId;

	let options = {
		method: "POST",
		captchaUrl: `https://www.roblox.com/Groups/Group.aspx?gid=${groupId}`
	};
    
	let response = await this.self._setup.request.request(`https://groups.roblox.com/v1/groups/${groupId}/users`, options);
	if (response.statusCode !== 200) throw new Error(`Failed to join group. ${response.status}`);

	return true;
};

exports.conf = {
	required: {
		params: 0,
		auth: true
	},

	name: "join",
	description: "Attempts to join the group with the authenticated user",
	params: []
};