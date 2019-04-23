

exports.run = async function () {
	let response = await this._setup.request.request("https://develop.roblox.com/v1/user/groups/canmanage", { json: true });
	if (response.statusCode !== 200) throw new Error(`Failed to get groups the authenticated user can manage. ${response.status}`);

	return (response.body.data.map(x=>new this._setup.classes.PartialGroup(x, this)));
};


exports.conf = {
	required: {
		params: 0,
		auth: true
	},

	name: "getGroupsIManage",
	description: "Gets the groups the authenticated user can manage",
	params: []
};