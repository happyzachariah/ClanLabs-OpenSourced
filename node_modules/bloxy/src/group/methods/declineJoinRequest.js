

exports.run = async function (requestIdentifier) {

	let requestId;
	if (this.self.misc.isClass(requestIdentifier, this.self._setup.classes.GroupJoinRequest)) {
		// Is GroupJoinRequest
		requestId = requestIdentifier.requestId;

	} else if (parseInt((requestIdentifier || "")) != null) {
		// Is number
		requestId = parseInt(requestIdentifier);

	}

	if (requestId == null) throw new Error("Must provide a request identifier");

	let options = {
		json: true,
		form: {
			groupJoinRequestId: requestId,
			accept: false
		},
		method: "POST"
	};

	let response = await this.self._setup.request.request("https://www.roblox.com/group/handle-join-request", options);
	if (response.statusCode !== 200) throw new Error(`Failed to decline join request. ${response.status}`);
	if (response.body.success != true) throw new Error(`Failed to decline join request. ${response.status}`);

	return true;
};



exports.conf = {
	required: {
		params: 1,
		auth: true
	},

	name: "declineJoinRequest",
	description: "Declines a join request",
	params: ["joinRequest (id | class)"]
};