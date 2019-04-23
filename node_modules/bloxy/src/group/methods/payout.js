

exports.run = async function (setup={}) {

	let { members, recurring, usePercentage } = setup;


	let url = "";
    
	if (recurring) {
		url = `https://www.roblox.com/groups/${setup.groupId}/recurring-payout`;
	} else if (!usePercentage && recurring !== true) {
		// amount
		url = `https://www.roblox.com/groups/${setup.groupId}/one-time-payout/false`;
	} else if (usePercentage) {
		url = `https://www.roblox.com/groups/${setup.groupId}/one-time-payout/true`;
	}

	let data = {};
	for (let n=0;n<members.length;n++) {
		let t = members[n];
		data[t.userId.toString()] = t.amount.toString();
	}
	let options = {
		form: {
			percentages: JSON.stringify(data)
		},
		method: "POST"
	};
    
	let response = await this.self._setup.request.request(url, options);
	if (response.statusCode !== 200) throw new Error(`Failed to payout. ${response.status}`);

	return true;
};

exports.conf = {
	required: {
		params: 1,
		auth: true
	},

	name: "payout",
	description: "Pays out R$ to people :D",
	params: [
		"setup (Object)",
		"setup.members (Array(UserId))",
		"setup.recurring (Boolean)",
		"setup.usePercentage (Boolean)"
	]
};