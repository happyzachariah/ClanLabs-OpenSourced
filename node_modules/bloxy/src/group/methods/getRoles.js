

exports.run = async function (overrideCache) {

	let cache = this.self._setup.cache;
	
	let groupId = this.groupId;

	if (!overrideCache) {
		let rolesCache = await cache.getGroupCache(`${groupId}-r`);
		if (rolesCache != null) return rolesCache.map(x=> new this.self._setup.classes.GroupRole(x, this.self));
	}
    
	let options = {
		json: true
	};

	let response = await this.self._setup.request.request(`https://www.roblox.com/api/groups/${groupId}/RoleSets/`, options);
	if (response.statusCode !== 200) throw new Error(`Failed to get group roles. ${response.status}`);
	
	await cache.cacheGroup(`${groupId}-r`, response.body);
	return response.body.map(x=> new this.self._setup.classes.GroupRole(x, this.self));
};



exports.conf = {
	required: {
		params: 0
	},

	name: "getRoles",
	description: "Gets all the roles in the group",
	params: ["groupId (number)"]
};