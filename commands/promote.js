module.exports = {
	name: 'promote',
	description: '!xp promote [username1]',
	execute(message, args) {

    const {groupID, firebaseBASEURL, hicomRole, officerRole, rolesetInformation} = require('./settings/config.json');

    if (!message.member.roles.exists('name', `${hicomRole}`) && !message.member.roles.exists('name', `${officerRole}`)) {
      return message.channel.send(`Sorry ${message.author}, but only officers+ can use this command!`).then(message => message.delete(5000))
    }

    var groupIDB = await roblox.getGroup(groupID)
    var userID = await rbx.getIdFromUsername(`${args[1]}`)




  },
}
