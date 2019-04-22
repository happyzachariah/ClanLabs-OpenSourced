module.exports = {
	name: 'ranklock',
	description: '!ranklock [username1]',
	execute(message, args) {
		const {groupID, firebaseBASEURL, hicomRole, officerRole} = require('./settings/config.json');

		var groupIDB = await roblox.getGroup(groupID)
		
		if (!message.member.roles.exists('name', `${hicomRole}`) && !message.member.roles.exists('name', `${officerRole}`)) {
      return message.channel.send(`Sorry ${message.author}, but only officers+ can use this command!`).then(message => message.delete(5000))
    }


    if (!args[1]) return message.channel.send(`Please provide me with a ROBLOX username!`).then(message => message.delete(5000));
    var { body } = await snekfetch.get("http://api.roblox.com/users/get-by-username?username=" + args[1])
    if (body.errorMessage === "User not found"){
      return message.channel.send(`Could you please give me a **real** ROBLOX username? :rolling_eyes:`).then(message => message.delete(5000))
    }

    var rblxUserID = await rbx.getIdFromUsername(`${args[1]}`);
    var rblxUserName = await rbx.getUsernameFromId(rblxUserID);
    var rblxUserRankID = await rbx.getRankInGroup(groupID, rblxUserID);
    var rblxUserRankName = await rbx.getRankNameInGroup(groupID, rblxUserID)


    if (rblxUserRankID >= rankIDantiRANKLOCK){
      return message.channel.send(`Sorry, but ${rblxUserName} is a high rank and can not be rank locked!`).then(message => message.delete(5000));
    }
    if (rblxUserRankID === 0){
      return message.channel.send(`Sorry, but ${rblxUserName} isn't even in the group!`).then(message => message.delete(5000));
    }
    var { body } = await snekfetch.get(`${firebaseBASEURL}/rankLock/${rblxUserID}.json`)
    if (body){
      return message.channel.send(`${rblxUserName} (${body.userID}) is already rank locked to ${body.rankName} (${body.rankID})!`).then(message => message.delete(5000));
    }else{
      firebase.database().ref(`rankLock/` + rblxUserID).set({
        rblxUsername: `${rblxUserName}`,
        userID: rblxUserID,
        rankID: rblxUserRankID,
        rankName: rblxUserRankName,
        author: message.author.id
      })
    }
    return message.channel.send(`${rblxUserName} is now rank locked to ${rblxUserRankName} (${rblxUserRankID})`).then(message => message.delete(5000));

  },
};
