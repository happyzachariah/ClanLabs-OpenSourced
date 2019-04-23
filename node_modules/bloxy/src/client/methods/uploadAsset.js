

exports.run = async function (setup) {

	if (!setup.name || !setup.assetTypeId || !setup.file) throw new Error("You must provide the name, assetTypeId and the file when uploading an asset!");
	let url = "https://www.roblox.com/build/upload";

	let verificationResponse = await this._setup.request.getVerification(url);

	let options = {
		method: "POST",
		formData: {
			name: setup.name,
			assetTypeId: setup.assetTypeId,
			groupId: setup.groupId || "",
			__RequestVerificationToken: verificationResponse.inputs.__RequestVerificationToken,
			verification: verificationResponse.match,

			file: {
				value: setup.file,
				options: {
					filename: "Image.png",
					contentType: "image/png"
				}
			}
		}
	};

	let response = await this._setup.request.request(url, options);
	if (response.statusCode !== 302) throw new Error(`Failed to upload asset. ${response.status}`);

	let location = response.headers.location;
	if (location.includes("error")) throw new Error(`Failed to upload asset. Plase click on this link to see the reason: https://www.roblox.com/${location}`);
    
	let errorMessage = location.match("message=(.*)");

	let match = location.match(/\d+$/);
	if (match) {
		let assetId = parseInt(match[0], 10);
		if (location.includes("/build/upload")) {
			return assetId;
		} else throw new Error(`Failed to upload asset, unknown redirect: ${location}. ${response.status}`);
	} else if (errorMessage) {
		throw new Error(`Failed to upload asset, error: ${decodeURI(errorMessage[1])}`);
	} else {
		throw new Error(`Match error. Original: ${location}`);
	}

};



exports.conf = {
	required: {
		params: 1,
		auth: true
	},

	name : "uploadAsset",
	description: "Uploads an asset to Roblox. Either it be t-shirt shirt etc.",
	params: ["setup (Object)", "setup.name (String)", "setup.assetTypeId (Number)", "setup.groupId (Number)", "setup.file (File)"]
};