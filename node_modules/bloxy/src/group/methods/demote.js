

exports.run = async function (userIdentifier) {
	return this.changeRank(userIdentifier, -1);
};

exports.conf = {
	required: {
		params: 1,
		auth: true
	},

	name: "demote",
	description: "Demotes a user using the changeRank method",
	params: ["userId (Number)"]
};