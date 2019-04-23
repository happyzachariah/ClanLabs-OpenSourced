
exports.run = async function (roleIdentifier, pageCursor) {
    
	let groupId = this.groupId;
	let [validRole, roleId] = this.self.misc.identifier.isRole(roleIdentifier);

	if (!validRole) throw new Error("Must provide a role identifier");

	let options = {
		json: true
	};

	let response = await this.self._setup.request.request(`https://groups.roblox.com/v1/groups/${groupId}/roles/${roleId}/users?sortOrder=Desc&limit=100${pageCursor!=null?`&cursor=${pageCursor}`: ""}`, options);
	if (response.statusCode !== 200) throw new Error(`Failed to get users with role. ${response.status}`);
    
	return new this.self._setup.classes.MembersWithRoleResult(response.body, roleId, this);
};

exports.conf = {
	required: {
		params: 1,
		auth: true
	},

	name: "getUsersWithRole",
	description: "Gets users that have the specified role in the group",
	params: ["roleId (Number)", "pageCursor (String)"]
};