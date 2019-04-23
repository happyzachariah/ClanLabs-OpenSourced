const EventEmitter = require("events");

class JoinRequestEvent extends EventEmitter {

	constructor (group, checkInterval) {
		super();

		this.group = group;
		this.self = group.self;
		this.checkInterval = checkInterval;
		this.lastRequest;

		this.init();
	}

	async init () {
		let self = this;

		async function check (firstTime) {
			let joinRequests = await self.group.getJoinRequests();
            
			if (firstTime) {
				self.emit("ready");
			} else {
				joinRequests = joinRequests.filter(x=>x.requestId > (self.lastRequest || 1));
			}
            
			self.lastRequest = (joinRequests.sort(function (a, b) { return b.requestId - a.requestId; }) || [])[0];
			return joinRequests;
		}
        
		await check(true);

		this.interval = setInterval( async () => {
			let joinRequests = await check();
            
			if (!joinRequests || joinRequests.length <= 0) return;
            
			if (self.listeners("requests").length > 0) self.emit("requests", joinRequests);
			if (self.listeners("request").length > 0) joinRequests.forEach(x=>self.emit("request", x));
            
		}, this.checkInterval);
	}

	stop () {
		clearInterval(this.interval);
		this.emit("done");
		return true;
	}
}

exports.run = function (checkInterval) {
	checkInterval = checkInterval || 5000;
    
	return new JoinRequestEvent(this, checkInterval);
};



exports.conf = {
	required: {
		params: 0,
		auth: true
	},

	name: "onJoinRequest",
	description: "EventEmitter that emits once a new member has requested to join and the server has pending approval enabled",
	params: ["checkInterval (Number)"]
};