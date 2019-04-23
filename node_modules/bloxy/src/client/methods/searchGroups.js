

exports.run = async function (query) {
    
	let response = await this._setup.request.request(`https://www.roblox.com/search/groups/list-json?keyword=${query}&maxRows=10&startRow=10`, { json: true });
	if (response.statusCode !== 200) throw new Error(`Failed to search for groups. ${response.status}`);

	return {
		keyword: response.body.Keyword,
		startRow: response.body.StartRow,
		maxRows: response.body.MaxRows,
		totalResults: response.body.TotalResults,
		searchKeywordMinLength: response.body.SearchKeywordMinLength,
		results: response.body.GroupSearchResults.map(x=>new this._setup.classes.GroupSearchResult(x, this))
	};
};



exports.conf = {
	required: {
		params: 1
	},

	name: "searchGroups",
	description: "Searches on Roblox for a group matching your query",
	params: ["query (String)"]
};