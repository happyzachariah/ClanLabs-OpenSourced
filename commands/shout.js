module.exports = {
	name: 'shout',
	description: '!shout [content]',
	execute(message, args) {

		const {groupID, firebaseBASEURL, hicomRole, officerRole} = require('./settings/config.json');

		var groupIDB = await roblox.getGroup(groupID)

    if (!message.member.roles.exists('name', `${hicomRole}`) && !message.member.roles.exists('name', `${officerRole}`)) {
      return message.channel.send(`Sorry ${message.author}, but only officers+ can use this command!`).then(message => message.delete(5000))
    }
    groupIDB.postShout(`${message.content.slice(message.content.indexOf(message.content.split(" ")[1]))}`)
    return message.channel.send(`**I've shouted the following content for ${message.author}:**\n` + "```" + message.content.slice(message.content.indexOf(message.content.split(" ")[1])) + "```").then(message => message.delete(5000));
  }
}
