module.exports = {
	name: 'view',
	description: '!view [username1]',
	execute(message, args) {

			const {groupID, rolesetInformation, firebaseBASEURL} = require('./settings/config.json');

			var groupIDB = await roblox.getGroup(groupID)

      if (!args[1]){
        return message.channel.send(`Please provide me with a ROBLOX username!`).then(message => message.delete(5000))
      }
      var { body } = await snekfetch.get("http://api.roblox.com/users/get-by-username?username=" + args[1])
      if (body.errorMessage === "User not found"){
        return message.channel.send(`Please provide me with a **real** ROBLOX username!`).then(message => message.delete(5000))
      }
      var usernameE = `${body.Username}`
      var userID = await rbx.getIdFromUsername(`${args[1]}`)
      var rankLocked;
      var { body } = await snekfetch.get(`${firebaseBASEURL}/rankLock/${userID}.json`)
      if (body){
        rankLocked = "True"
      }else{
        rankLocked = "False"
      }
      var userIDDD = await rbx.getIdFromUsername(`${args[1]}`)
      var currentRank = await rbx.getRankNameInGroup(groupID, userIDDD) // RANK IN MAIN GROUP
      var { body } = await snekfetch.get(`${firebaseBASEURL}/${userID}.json`);
      if (!body){
        return message.channel.send(`${args[1]} doesn't have a registered profile with me **yet**; however, once an officer begins tto add XP to the specified user, a profile will be generated!\n\nAs of now, the user has 0 XP.`).then(message => message.delete(5000))
      }
      var currentRankID = await rbx.getRankInGroup(groupID, userIDDD)
			var rankName = await rbx.getRankNameInGroup(groupID, userIDDD)

			var requiredNumber; // of xp

			var flag = 0;
			var outPut = -1;


			while (Number(flag) === Number(0)){

			  for (a = 0; a < rolesetInformation.rolesetIDNUMBER.length; a++){ // 0 to 13 but length of 14 (ignore 14)
			    if (Number(rolesetInformation.rolesetIDNUMBER[a]) === Number(currentRankID)){
			      outPut = a;
			      a = 100000;
			    }
			  }

			  if (outPut === -1){
			    requiredXP = 0;
			  }

			  flag = 1;

			}
			console.log(outPut) // this is the rankID for use of in config.json shit

			if (outPut === -1){
			  requiredXP = 0;
			}else{
			  requiredNumber = rolesetInformation.requiredXP[Number(outPut)]
			}



      var userNameHeader = `[${usernameE}](https://www.roblox.com/users/${userIDDD}/profile)`
      var currentRankAndPoints = `**${currentRank} - Currently has ${Number(body.b)} XP**`
      var percentAge = Math.round(((Number(body.b))/Number(requiredNumber)) * 100)
      if (Number.isNaN(percentAge)){
        percentAge = 0
      }
      if (percentAge > 100){
        percentAge = 100
      }
      var percentBar;
      if (percentAge === 0){
        percentBar = ":white_square_button: :white_square_button: :white_square_button: :white_square_button: :white_square_button: :white_square_button: :white_square_button: :white_square_button: :white_square_button: :white_square_button:"
      }else if (0 <= percentAge && percentAge <= 10){
        percentBar = ":white_large_square: :white_square_button: :white_square_button: :white_square_button: :white_square_button: :white_square_button: :white_square_button: :white_square_button: :white_square_button: :white_square_button:"
      }else if (10 <= percentAge && percentAge <= 20){
        percentBar = ":white_large_square: :white_large_square: :white_square_button: :white_square_button: :white_square_button: :white_square_button: :white_square_button: :white_square_button: :white_square_button: :white_square_button:"
      }else if (20 <= percentAge && percentAge <= 30){
        percentBar = ":white_large_square: :white_large_square: :white_large_square: :white_square_button: :white_square_button: :white_square_button: :white_square_button: :white_square_button: :white_square_button: :white_square_button:"
      }else if (30 <= percentAge && percentAge <= 40){
        percentBar = ":white_large_square: :white_large_square: :white_large_square: :white_large_square: :white_square_button: :white_square_button: :white_square_button: :white_square_button: :white_square_button: :white_square_button:"
      }else if (40 <= percentAge && percentAge <= 50){
        percentBar = ":white_large_square: :white_large_square: :white_large_square: :white_large_square: :white_large_square: :white_square_button: :white_square_button: :white_square_button: :white_square_button: :white_square_button:"
      }else if (50 <= percentAge && percentAge <= 60){
        percentBar = ":white_large_square: :white_large_square: :white_large_square: :white_large_square: :white_large_square: :white_large_square: :white_square_button: :white_square_button: :white_square_button: :white_square_button:"
      }else if (60 <= percentAge && percentAge <= 70){
        percentBar = ":white_large_square: :white_large_square: :white_large_square: :white_large_square: :white_large_square: :white_large_square: :white_large_square: :white_square_button: :white_square_button: :white_square_button:"
      }else if (70 <= percentAge && percentAge <= 80){
        percentBar = ":white_large_square: :white_large_square: :white_large_square: :white_large_square: :white_large_square: :white_large_square: :white_large_square: :white_large_square: :white_square_button: :white_square_button:"
      }else if (80 <= percentAge && percentAge <= 90){
        percentBar = ":white_large_square: :white_large_square: :white_large_square: :white_large_square: :white_large_square: :white_large_square: :white_large_square: :white_large_square: :white_large_square: :white_square_button:"
      }else{
        percentBar = ":white_large_square: :white_large_square: :white_large_square: :white_large_square: :white_large_square: :white_large_square: :white_large_square: :white_large_square: :white_large_square: :white_large_square:"
      }
      var remainingErrorNumber = Number(requiredNumber-Number(body.b))
      if (remainingErrorNumber < 0){
        remainingErrorNumber = "DUE FOR A PROMOTION";
      }
      var { body } = await snekfetch.get(`https://www.roblox.com/headshot-thumbnail/json?userId=${userIDDD}&width=180&height=180`);
      var mugShot = `${body.Url}`
      var { body } = await snekfetch.get(`https://www.roblox.com/users/profile/profileheader-json?userId=${userIDDD}`);
      var remainingError = `**${remainingErrorNumber}** XP remaining for **${rankName} (${requiredNumber} XP)**`
      var response = new Discord.RichEmbed()
        //.setDescription(`${userNameHeader}\n${currentRankAndPoints}\n${percentBar} ${percentAge}%\n${remainingError}`)
        .setThumbnail(`${mugShot}`)

      if (rankLocked === "True"){
        response.setDescription(`${userNameHeader}\n${currentRankAndPoints}\n${percentBar} ${percentAge}%\n**Currently rank locked!**`)
      }else{
        response.setDescription(`${userNameHeader}\n${currentRankAndPoints}\n${percentBar} ${percentAge}%\n${remainingError}`)
      }


      return message.reply(response)

  }
}
