const EventEmitter = require("events");


class GroupChangeEvent extends EventEmitter {

	constructor (group, checkInterval) {
		super();
		this.group = group;
		this.self = group.self;
		this.checkInterval = checkInterval;
		this.cache = {};

		this.init();
	}

	async init () {
		let groupData = await this.self.getGroup(this.group.groupId, true);

		if (groupData && groupData.shout) this.cache.shout = groupData.shout;
		if (groupData && groupData.description) this.cache.description = groupData.description;

		this.emit("ready");


		this.interval = setInterval( async () => {
			let group = await this.self.getGroup(this.group.groupId, true);
			if (!group || (!group.shout && !group.description)) return;

			let shout = group.shout, cachedShout = this.cache.shout;
			let description = group.description, cachedDescription = this.cache.description;

			if (!cachedShout || (cachedShout.body !== shout.body)) {
				this.cache.shout = shout;
				this.emit("shout", {
					old: cachedShout,
					new: shout
				});
			}

			if (!cachedDescription || cachedDescription !== description) {
				this.cache.description = description;
				this.emit("description", {
					old: cachedDescription,
					new: description
				});
			}

		}, this.checkInterval);

	}

	stop () {
		clearInterval(this.interval);
		this.emit("done");
		return true;
	}
}

exports.run = function (checkInterval) {
	checkInterval = checkInterval || 10000;

	return new GroupChangeEvent(this, checkInterval);
};



exports.conf = {
	required: {
		params: 0
	},

	name: "onChange",
	description: "An event emitter that notifies when the group description or shout changes",
	params: ["checkInterval (Number)"]
};