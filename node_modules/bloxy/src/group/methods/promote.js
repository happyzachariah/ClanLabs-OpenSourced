

exports.run = async function (userIdentifier) {
	return this.changeRank(userIdentifier, 1);
};

exports.conf = {
	required: {
		params: 1,
		auth: true
	},

	name: "promote",
	description: "Promotes a user using the changeRank method",
	params: ["userId (Number)"]
};