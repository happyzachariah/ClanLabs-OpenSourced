

exports.run = async function (newShout) {

	let groupId = this.groupId;
	
	let options = {
		method: "PATCH",
		json: {
			message: newShout
		}
	};

	let response = await this.self._setup.request.request(`https://groups.roblox.com/v1/groups/${groupId}/status`, options);
	if (response.statusCode !== 200) throw new Error(`Failed to post shout on group. ${response.status}`);

	return new this.self._setup.classes.GroupShout(response.body, this);
};



exports.conf = {
	required: {
		params: 1,
		auth: true
	},

	name: "postShout",
	description: "Posts a shout on the group",
	params: ["newShout (String)"]
};