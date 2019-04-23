

exports.run = async function (username) {
	let response = await this._setup.request.request(`https://www.roblox.com/UserCheck/DoesUsernameExist?username=${username}`, { json: true });
	if (response.statusCode !== 200) throw new Error(`Failed to check if name was taken. ${response.status}`);

	return response.body.success === true;
};



exports.conf = {
	required: {
		params: 1
	},

	name: "isNameTaken",
	description: "Checks if a name is taken",
	params: ["username (String)"]
};