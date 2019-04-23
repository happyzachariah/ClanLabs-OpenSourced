

exports.run = async function (page, limit) {
	page = page || 0;
	limit = limit || 20;

	let response = await this._setup.request.request(`https://www.roblox.com/messages/api/get-messages?messageTab=0&pageNumber=${page}&limit=${limit}`, { json: true });
	if (response.statusCode !== 200) throw new Error(`Failed to get messages. ${response.status}`);

	return {
		currentPage: response.body.PageNumber,
		totalPages: response.body.TotalPages,
		messages: response.body.Collection.map(x=>new this._setup.classes.RobloxMessage(x, this))
	};
};



exports.conf = {
	required: {
		params: 0,
		auth: true
	},

	name: "getMessages",
	description: "Gets messages"
};