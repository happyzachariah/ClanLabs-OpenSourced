

exports.run = async function (identifier) {

	let userId = this.misc.getUserId(identifier);
	if (typeof(userId) === "undefined") throw new Error("Did not provide a valid user or userId");

	let response = await this._setup.request.request(`https://api.roblox.com/userblock/unblock?userId=${userId}`, { json: true, method: "POST" });
	if (response.statusCode !== 200) throw new Error(`Failed to unblock user. ${response.status}`);

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

	name: "unblockUser",
	description: "Unblocks a user from the authenticated user",
	params: ["userId (Number)"]
};