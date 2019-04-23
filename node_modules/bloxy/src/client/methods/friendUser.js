

exports.run = async function (identifier) {

	let userId = this.misc.getUserId(identifier);

	if (typeof(userId) === "undefined") throw new Error("Did not provide a valid user or userId");

	let options = {
		method: "POST",
		json: true,
		captchaUrl: `https://www.roblox.com/users/${userId}/profile`
	};

	let response = await this._setup.request.request(`https://api.roblox.com/user/request-friendship?recipientUserId=${userId}`, options);
	if (response.statusCode !== 200) throw new Error(`Failed to friend user. ${response.status}`);

	return {
		success: true,
		userId: userId
	};

};


exports.conf = {
	required: {
		params: 1,
		auth: true
	},

	name: "friendUser",
	description: "Sends a friend request to the user",
	params: ["userId (Number)"]
};