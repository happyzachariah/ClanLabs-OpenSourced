

exports.run = async function (target) {

	let targetId = this.misc.getUserId(target);

	if (typeof(targetId) === "undefined") throw new Error("Did not provide a valid user or userId");

	let options = {
		method: "POST",
		json: {
			targetUserId: targetId
		},
		captchaUrl: `https://www.roblox.com/users/${targetId}/profile`
	};

	let response = await this._setup.request.request("https://www.roblox.com/user/follow", options);
	if (response.statusCode !== 200) throw new Error(`Failed to follow user. ${response.status}`);

	return {
		success: true,
		targetId: targetId
	};
};

exports.conf = {
	required: {
		params: 1,
		auth: true
	},

	name: "followUser",
	description: "Follows a user",
	params: ["targetId (Number)"]
};