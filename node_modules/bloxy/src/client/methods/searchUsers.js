

exports.run = async function (query) {

	let response = await this._setup.request.request(`https://www.roblox.com/search/users/results?keyword=${query}&maxRows=12&startIndex=0`, { json: true });
	if (response.statusCode !== 200) throw new Error(`Failed to search for users. ${response.status}`);

	return {
		keyword: response.body.Keyword,
		startIndex: response.body.StartIndex,
		maxRows: response.body.MaxRows,
		totalResults: response.body.TotalResults,
		results: response.body.UserSearchResults.map(x=>new this._setup.classes.UserSearchResult(x, this))
	};
};



exports.conf = {
	required: {
		params: 1
	},

	name: "searchUsers",
	description: "Searches on Roblox for users",
	params: ["query (String)"]
};