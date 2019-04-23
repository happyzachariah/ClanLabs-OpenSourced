

exports.run = async function (messageIds) {

	let messages;

	if (this.misc.isClass(messageIds, this._setup.classes.RobloxMessage)) {
		messages = (messageIds.map(x=>x.messageId));
	} else if (messageIds !== null && Array.isArray(messageIds) && messageIds.every(m=>parseInt(m) !== undefined)) {
		messages = messageIds;
	}  else {
		throw new Error("Did not provide proper messages or messageIds");
	}
    
	let options = {
		json: {
			messageIds: messages
		},
		method: "POST"
	};

	let response = await this._setup.request.request("https://www.roblox.com/messages/api/mark-messages-read", options);
	if (response.statusCode !== 200) throw new Error(`Failed to mark messages as read. ${response.status}`);

	return {
		success: true
	};
};



exports.conf = {
	required: {
		params: 1,
		auth: true
	},

	name: "markMessagesRead",
	description: "Marks the messages as read",
	params: ["messages (Class-RobloxMessage | messageId)"]
};