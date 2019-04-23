

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
		form: {
			messageIds: messages
		},
		method: "POST"
	};

	let response = await this._setup.request.request("https://www.roblox.com/messages/api/unarchive-messages", options);
	if (response.statusCode !== 200) throw new Error(`Failed to move messages to inbox. ${response.status}`);

	return {
		success: true
	};
};



exports.conf = {
	required: {
		params: 1,
		auth: true
	},

	name: "moveMessagesToInbox",
	description: "Moves the messages to the inbox from the archive",
	params: ["messages (Class-RobloxMessage | messageId)"]
};