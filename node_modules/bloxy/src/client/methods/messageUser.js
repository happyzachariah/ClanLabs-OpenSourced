

exports.run = async function (identifier, subject, body) {

	let userId = this.misc.getUserId(identifier);
	if (typeof(userId) === "undefined") throw new Error("Did not provide a valid user or userId");

	let options = {
		json: {
			recipientid: userId.toString(),
			subject: subject,
			body: body,
			cacheBuster: Date.now()
		},
		method: "POST",
        
		captchaUrl: `https://www.roblox.com/users/${userId}/profile`,
		captchaType: "message"
	};


	let response = await this._setup.request.request("https://www.roblox.com/messages/send", options);
	if (response.statusCode !== 200) throw new Error(`Failed to send message to user. ${response.status}`);

	return {
		success: true,
		userId: userId
	};

};



exports.conf = {
	required: {
		params: 3,
		auth: true
	},

	name: "messageUser",
	description: "Sends a message to the user",
	params: ["userId (Number)", "subject (String)", "body (String)"]
};