const cheerio = require("cheerio");

exports.run = async function () {
	let groupId = this.groupId;
    
	let options = {
		json: true
	};

	let response = await this.self._setup.request.request(`https://www.roblox.com/my/groupadmin.aspx?gid=${groupId}`, options);
	if (response.statusCode !== 200) throw new Error(`Failed to get group admin page. ${response.status}`);

	let $ = cheerio.load(response.body);
	let funds = parseInt($("#GroupTitle").find("span").text().trim());
	return funds;
};

exports.conf = {
	required: {
		params: 0,
		auth: true
	},

	name: "getFunds",
	description: "Gets the group's funds",
	params: ["userId (Number)"]
};