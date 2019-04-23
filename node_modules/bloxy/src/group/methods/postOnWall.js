

exports.run = async function (message) {


	let groupId = this.groupId;

	let options = {
		method: "POST",
		json: {
			body: message
		}
	};

	let response = await this.self._setup.request.request(`https://groups.roblox.com/v2/groups/${groupId}/wall/posts`, options);
	if (response.statusCode !== 200) throw new Error(`Failed to post on group wall. ${response.status}`);
    
	return new this.self._setup.classes.GroupWallPost(response.body, this);
};



exports.conf = {
	required: {
		params: 1,
		auth: true
	},

	name: "postOnWall",
	description: "Posts a message on the group wall",
	params: ["content (String)"]
};