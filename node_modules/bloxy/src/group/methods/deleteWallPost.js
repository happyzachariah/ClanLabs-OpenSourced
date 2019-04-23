

exports.run = async function (postIdentifier) {
    
	let postId;
	let groupId = this.groupId;

	if (this.self.misc.isClass(postIdentifier, this.self._setup.classes.GroupWallPost)) {
		postId = postIdentifier.postId;
	} else if (parseInt(postIdentifier || "") != null) {
		postId = parseInt(postIdentifier);
	}

	if (postId == null) throw new Error("Must provide a post identifier");

	let options = {
		method: "DELETE"
	};

	let response = await this.self._setup.request.request(`https://groups.roblox.com/v1/groups/${groupId}/wall/posts/${postId}`, options);
	if (response.statusCode !== 200) throw new Error(`Failed to delete wall post. ${response.status}`);

	return true;
};




exports.conf = {
	required: {
		params: 1,
		auth: true
	},

	name: "deleteWallPost",
	description: "Deletes a wallpost on the group wall",
	params: ["postId (Number)"]
};