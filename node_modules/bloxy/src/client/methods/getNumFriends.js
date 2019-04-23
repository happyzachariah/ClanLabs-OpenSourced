

exports.run = async function (identifier) {

	let userId = this.misc.getUserId(identifier);
	if (typeof(userId) === "undefined") throw new Error("Did not provide a valid user or userId");

	let response = await this._setup.request.request(`https://api.roblox.com/user/get-friendship-count?userId=${userId}`, { json: true });
	if (response.statusCode !== 200) throw new Error(`Failed to get numFriends. ${response.status}`);

	return parseInt(response.body.count);
};



exports.conf = {
	required: {
		params: 1
	},

	name: "getNumFriends",
	description: "Gets the amount of friends the user has",
	params: ["userId (Number)"]
};