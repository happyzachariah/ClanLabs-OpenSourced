

exports.run = async function (identifier) {

	let userId = this.misc.getUserId(identifier);
	if (typeof(userId) === "undefined") throw new Error("Did not provide a valid user or userId");

	let options = {
		json: {
			targetUserId: userId
		},
		method: "POST"
	};
    
	let response = await this._setup.request.request("https://www.roblox.com/api/user/unfollow", options);
	if (response.statusCode !== 200) throw new Error(`Failed to unfollow user. ${response.sattus}`);

	return {
		success: response.body.success === true,
		userId: userId
	};
};



exports.conf = {
	required: {
		params: 1,
		auth: true
	},

	name: "unfollowUser",
	description: "Unfollows a user on Roblox",
	params: ["userId (Number)"]
};