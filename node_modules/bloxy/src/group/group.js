const GroupFunctions = require("./GroupFunctions");

class RobloxGroup extends GroupFunctions {

	constructor (data, self) {
		super();

		this.self = self;

		this.groupId = parseInt(data.Id || data.id || data.GroupId || data.groupId);
		this.name 	 = (data.Name || data.name).toString();
		this.description = (data.Description || data.description).toString();
		this.owner   = new self._setup.classes.PartialUser((data.owner || data.Owner), self);
		this.shout   = new self._setup.classes.GroupShout((data.shout || data.Shout), self);
		this.memberCount = parseInt(data.memberCount || data.MemberCount);
	}

}

module.exports = RobloxGroup;