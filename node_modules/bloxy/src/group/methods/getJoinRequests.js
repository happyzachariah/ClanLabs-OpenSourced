const cheerio = require("cheerio");

exports.run = async function (setup={}) {
    
	let { username, page } = setup;
	let groupId = this.groupId;

	let options = {

	};

	let response = await this.self._setup.request.request(`https://www.roblox.com/groups/${groupId}/joinrequests-html?pageNum=${page || 1}${username!=null?`&username=${username}`:""}`, options);
	if (response.statusCode !== 200) throw new Error(`Failed to get join requests. ${response.status}`);

	let joinRequests = [];
	let $ = cheerio.load(response.body);
	let foundRequests = $("#JoinRequestsList").find("tr");

	if (foundRequests.length <= 1) return [];

	for (let num=0; num < foundRequests.length; num++) {
		let request = foundRequests.eq(num).find("td");
		if (request.eq(1).text().length>2) {
			joinRequests.push({
				username: request.eq(1).text(),
				userId: parseInt(request.eq(1).find("a").attr("href").toString("utf8").match(/users\/(.*?)\/profile/)[1]),
				date: new Date(request.eq(2).text()),
				requestId: parseInt(request.eq(3).find("span").attr("data-rbx-join-request")),
				groupId: parseInt(groupId)
			});
		}
	}
    
	return joinRequests.map(x=> new this.self._setup.classes.GroupJoinRequest(x, this.self));
};



exports.conf = {
	required: {
		params: 0,
		auth: true
	},

	name: "getJoinRequests",
	description: "Gets the group's join requests",
	params: ["setup (Object)", "setup.username (String)", "setup.page (Number)"]
};