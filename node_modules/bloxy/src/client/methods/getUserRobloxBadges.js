

exports.run = async function (identifier) {

	let userId = this.misc.getUserId(identifier);
	if (typeof(userId) === "undefined") throw new Error("Did not provide a valid user or userId");

	let response = await this._setup.request.request(`https://www.roblox.com/badges/roblox?userId=${userId}&imgWidth=110&imgHeight=110&imgFormat=png`, { json: true });
	if (response.statusCode !== 200) throw new Error(`Failed to get user's roblox badges. ${response.status}`);

	return response.body.RobloxBadges.map(x=>new this._setup.classes.RobloxBadge(x, this));
};



exports.conf = {
	required: {
		params: 1,
	},

	name: "getUserRobloxBadges",
	description: "Gets a user's roblox badges",
	params: ["userId (Number)"]
};