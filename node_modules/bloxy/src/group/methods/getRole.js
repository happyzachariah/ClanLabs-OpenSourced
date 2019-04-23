

exports.run = async function (setup={}) {
	let { rank, name, id } = setup;

	if (rank == null && name == null && id == null) throw new Error("Must provide either rank, name or id as identification when attempting to get a role");

	let groupRoles = await this.getRoles(true);

	let foundRole;

	if (rank) {
		if (rank > 255 || rank < 0) throw new Error("Please provide a valid rank number between 0 and 255");
		foundRole = groupRoles.find(x=>x.rank == rank);
		if (foundRole) return foundRole;
	}

	if (name) {
		foundRole = groupRoles.find(x=>x.name == name);
		if (foundRole) return foundRole;
	}

	if (id != null) {
		foundRole = groupRoles.find(x=>x.id == id);
		if (foundRole) return foundRole;
	}

	return foundRole;
};



exports.conf = {
	required: {
		params: 1
	},

	name: "getRole",
	description: "Gets a specific role in the group filtered out with either name, rank or id",
	params: ["setup (Object)"]
};