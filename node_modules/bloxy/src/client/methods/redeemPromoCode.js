

exports.run = async function (code) {

	let response = await this._setup.request.request(`https://www.roblox.com/redeempromocodes/redeem?code=${code}`, { method: "POST", json: true });
	if (response.statusCode !== 200) throw new Error(`Failed to redeem promo code. ${response.status}`);

	if (response.body.success !== true) throw new Error(response.body.errorMsg);
	return {
		success: true
	};
};



exports.conf = {
	required: {
		params: 1,
		auth: true
	},

	name: "redeemPromoCode",
	description: "Redeems a Roblox promo code to gain an item on the website",
	params: ["code (String)"]
};