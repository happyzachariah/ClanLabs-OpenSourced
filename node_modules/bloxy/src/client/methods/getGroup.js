

exports.run = async function (groupId, ignoreCache) {

	if (!ignoreCache) {
		let find = await this._setup.cache.getGroupCache(groupId.toString());
		if (find) return new this._setup.classes.RobloxGroup(find, this);
	}

	let response = await this._setup.request.request(`https://groups.roblox.com/v1/groups/${groupId}`, { json : true });
	if (response.statusCode !== 200) throw new Error(`Failed to get group. ${response.status}`);

	await this._setup.cache.cacheGroup(groupId.toString(), response.body);
	return new this._setup.classes.RobloxGroup(response.body, this);
};



exports.conf = {
	required: {
		params: 1,
	},

	name: "getGroup",
	description: "Gets a group",
	params: ["groupId (Number)", "ignoreCache (Boolean)"]
};