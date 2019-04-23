/* eslint-disable no-console */
const bloxy = require("../index");
let emitter = require("events");

let client = new bloxy({
	cookie: ""
});


client.on("ready", function () {
	client.getIdByUsername("CodeTheIdiot").then(userId=>{
		console.log(userId);
	});

	
	client.getGroup(3544434).then(async group=>{
		let onJoin = group.onJoinRequest();

		onJoin.on('ready', function () {
			console.log("on join ready");
		});

		onJoin.on('request', function (request) {
			console.log(request.username);
		});
	});
});

client.login();