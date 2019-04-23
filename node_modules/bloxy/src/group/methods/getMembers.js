const cheerio = require("cheerio");

exports.run = async function (page) {
    
	let groupId = this.groupId;
	page = page || 1;

	let options = {
		
	};

	let response = await this.self._setup.request.request(`https://www.roblox.com/groups/${groupId}/groupmembers-html?pageNum=${page||1}`, options);
	if (response.statusCode !== 200) throw new Error(`Failed to get users. ${response.status}`);
    
	let users = handle(response.body);
	if (users && Array.isArray(users)) return users.map(x=> new this.self._setup.classes.PartialUser(x, this.self));
	throw new Error("Failed to get users");
};



function handle(body) {
	let $ = cheerio.load(body);

	let bb = $(".member-name-container");
	let res = [];

	for (var x=0;x<bb.length;x++) {
		let thisBB = bb.eq(x);
		let thisUser = {
			username: thisBB.text().trim(),
			userId: Number(thisBB.find("a").attr("href").match(/\d+/g)[0])
		};
		res.push(thisUser);
	}
	return res;
}

exports.conf = {
	required: {
		params: 0,
		auth: true
	},

	name: "getMembers",
	description: "Gets members that are in a group",
	params: ["page (Number)"]
};