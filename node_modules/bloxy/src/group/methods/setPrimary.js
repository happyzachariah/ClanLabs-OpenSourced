

exports.run = async function () {

	let groupId = this.groupId;

	let options = {
		method: "POST",
		json: {
			groupId: groupId
		}
	};

	let response = await this.self._setup.request.request("https://groups.roblox.com/v1/user/groups/primary", options);
	if (response.statusCode !== 200) throw new Error(`Failed to set group as primary. ${response.status}`);

	return true;
};



exports.conf = {
	required: {
		params: 0,
		auth: true
	},

	name: "setPrimary",
	description: "Sets the primary group for the authenticated user",
	params: []
};