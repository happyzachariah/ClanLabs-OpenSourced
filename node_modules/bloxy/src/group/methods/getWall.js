
exports.run = async function (pageCursor) {

	let options = {
		json: true
	};
    
	let groupId = this.groupId;

	let response = await this.self._setup.request.request(`https://groups.roblox.com/v1/groups/${groupId}/wall/posts?sortOrder=Desc&limit=100${pageCursor!=null?`&cursor=${pageCursor}`: ""}`, options);
	if (response.statusCode !== 200) throw new Error(`Failed to get users with role. ${response.status}`);
    
	return new this.self._setup.classes.GroupWallResult(response.body, this);
};

exports.conf = {
	required: {
		params: 0,
		auth: true
	},

	name: "getWall",
	description: "Gets the group's wall",
	params: ["pageCursor (String)"]
};