

exports.run = async function (assetId) {
	let response = await this._setup.request.request(`https://api.roblox.com/marketplace/productinfo?assetId=${assetId}`, { json: true });
	if (response.statusCode !== 200) throw new Error(`Failed to get product info. ${response.status}`);

	return new this._setup.classes.ProductInfo(response.body, this);
};



exports.conf = {
	required: {
		params: 1
	},

	name: "getProductInfo",
	description: "Gets the information about a product/asset",
	params: ["assetId (Number)"]
};