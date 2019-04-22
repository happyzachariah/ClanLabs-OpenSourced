module.exports = {
	name: 'xp',
	description: '!xp [add/remove] [#] [username1, username2, etc]',
	execute(message, args) {

		const {groupID, firebaseBASEURL, hicomRole, officerRole, rolesetInformation} = require('./settings/config.json');

		var groupIDB = await roblox.getGroup(groupID)

    var maxNumber1 = Number(10); // HICOM
    var maxNumber2 = Number(5); // OFFICERS

    if (!args[1]) return message.channel.send(`Please follow the following format of:\n**\`!xp add 1 username1, username2, etc\`**\nor\n**\`!xp remove 1 username1, username2, etc\`**`).then(message => message.delete(5000));
    if (args[1] !== "add" && args[1] !== "remove") return message.channel.send(`Sorry, but I only accept **add** and **remove** as proper second arguments`).then(message => message.delete(5000));
    if (!args[2]) return message.channel.send(`Missing number of XP`).then(message => message.delete(5000));
    if (!args[3]) return message.channel.send(`Missing username(s)`).then(message => message.delete(5000));
    if (isNaN(Number(args[2]))) return message.channel.send(`That's not a number!`).then(message => message.delete(5000));
    if (Number(args[2]) < 0) return message.channel.send(`Please provide me with a positive number!`).then(message => message.delete(5000))
    if (Number(args[2]) % 1 != 0) return message.channel.send(`Please provide me with a whole number (no decimals)!`).then(message => message.delete(5000));
    if (!message.member.roles.exists('name', `${hicomRole}`) && (!message.member.roles.exists('name', `${officerRole}`))) return message.channel.send(`Sorry ${message.author}, but only officers+ can use this command!`).then(message => message.delete(5000));
    if (message.member.roles.exists('name', `${hicomRole}`) && (Number(args[2]) > maxNumber1)) return message.channel.send(`Sorry ${message.author}, but you are only allowed to give ${maxNumber1} XP max per user.`).then(message => message.delete(5000));
    if (message.member.roles.exists('name', `${officerRole}`) && (Number(args[2]) > maxNumber2)) return message.channel.send(`Sorry ${message.author}, but you are only allowed to give ${maxNumber2} XP max per user.`).then(message => message.delete(5000));

    if (args[1] === "add"){
      var userArray = message.content.slice(message.content.indexOf(message.content.split(" ")[3])).split(', ');
      for (i = 0; i < userArray.length; i++){
        var { body } = await snekfetch.get(`https://api.roblox.com/users/get-by-username?username=${userArray[i]}`)
        if (body.success === false){
          var errorEmbed = new Discord.RichEmbed()
            .setColor(0xff3c3c)
            .setDescription(`${userArray[i]} does not exist on ROBLOX!`)
          message.channel.send(errorEmbed)
        }else{
          var userID = await rbx.getIdFromUsername(`${userArray[i]}`)
          var { body } = await snekfetch.get(`${firebaseBASEURL}/xp4Users/${userID}.json`);
          var currentXP;

          if (!body){
            currentXP = 0;
          }else{
            currentXP = Number(body.b);
          }

          var pointsMaybe = Number(args[2]);


          if (!body){
            firebase.database().ref(`/xp4Users/${userID}`).set({
              b: pointsMaybe
            })
            var errorEmbed = new Discord.RichEmbed()
              .setColor(0x5aa9fe)
              .setDescription(`Inserted and updated ${userArray[i]}'s profile within my database!`)
            message.channel.send(errorEmbed)
          }
          else{
            var database = firebase.database();
            firebase.database().ref(`/xp4Users/${userID}`).update({
              b : Number(currentXP) + Number(args[2])
            })
            var errorEmbed = new Discord.RichEmbed()
              .setColor(0x46ff87)
              .setDescription(`Added ${args[2]} XP to ${userArray[i]}'s profile!`)
            message.channel.send(errorEmbed)

            var userIDDD = await rbx.getIdFromUsername(`${userArray[i]}`)
            var currentRankID = await rbx.getRankInGroup(groupID, userIDDD) // rank #

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

            var whateverRequired4NextRank = requiredNumber
            var { body } = await snekfetch.get(`${firebaseBASEURL}/rankLock/${userIDDD}.json`)
            var doesUserHaveProfile;
            if (body){
              doesUserHaveProfile = 1
            }else{
              doesUserHaveProfile = 0;
            }
              if (((Number(currentXP) + Number(args[2])) >= whateverRequired4NextRank) && (Number(doesUserHaveProfile) === Number(0)) && (currentRankID !== 0)){
                await groupIDB.promote(Number(userIDDD));
                var newRank = await rbx.getRankNameInGroup(groupID, Number(userIDDD));
                var rblxUsernameOk = await rbx.getUsernameFromId(Number(userID));
                console.log(`Promoted ${rblxUsernameOk} to ${newRank}`)
              }

              var whileLoopTest = 1
              while (whileLoopTest === 1){

                var userIDDD = await rbx.getIdFromUsername(`${userArray[i]}`)
                var currentRankID = await rbx.getRankInGroup(groupID, userIDDD)



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



                if (((Number(currentXP) + Number(args[2])) < requiredNumber) && (Number(doesUserHaveProfile) === Number(0)) && (currentRankID !== 0)){
                  await groupIDB.demote(Number(userIDDD));
                  var newRank = await rbx.getRankNameInGroup(groupID, Number(userIDDD));
                  var rblxUsernameOk = await rbx.getUsernameFromId(Number(userIDDD));
                  console.log(`Demoted ${rblxUsernameOk} to ${newRank}`)
                }else{
                  whileLoopTest = 0
                }
              }

              var whileLoopTest1 = 1
              while (whileLoopTest1 === 1){

                var userIDDD = await rbx.getIdFromUsername(`${userArray[i]}`)
                var currentRankID = await rbx.getRankInGroup(groupID, userIDDD)


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


                if (((Number(currentXP) + Number(args[2])) >= requiredNumber) && (Number(doesUserHaveProfile) === Number(0)) && (currentRankID !== 0)){
                  await groupIDB.promote(Number(userIDDD));
                  var newRank = await rbx.getRankNameInGroup(groupID, Number(userIDDD));
                  var rblxUsernameOk = await rbx.getUsernameFromId(Number(userIDDD));
                  console.log(`Promoted ${rblxUsernameOk} to ${newRank}`)
                }else{
                  whileLoopTest1 = 0
                }
              }
            }
        }
      }
      return undefined;
    }else{
      var userArray = message.content.slice(message.content.indexOf(message.content.split(" ")[3])).split(', ');
      console.log(userArray);
      for (i = 0; i < userArray.length; i++){
        var { body } = await snekfetch.get(`https://api.roblox.com/users/get-by-username?username=${userArray[i]}`)
        if (body.success === false){
          var errorEmbed = new Discord.RichEmbed()
            .setColor(0xff3c3c)
            .setDescription(`${userArray[i]} does not exist on ROBLOX!`)
          message.channel.send(errorEmbed).then(message => message.delete(5000))
        }else{
          var userID = await rbx.getIdFromUsername(`${userArray[i]}`)
          var { body } = await snekfetch.get(`${firebaseBASEURL}/xp4Users/${userID}.json`);
          var currentXP;
          var pointsMaybe = Number(args[2]);


          if (!body){
            currentXP = 0;
          }else{
            currentXP = Number(body.b);
          }

          var pointsMaybe = Number(args[2]);


          if (!body){ // work on this
            firebase.database().ref(`/xp4Users/${userID}`).set({
              b: Number(0)
            })
            var errorEmbed = new Discord.RichEmbed()
              .setColor(0x5aa9fe)
              .setDescription(`Inserted and updated ${userArray[i]}'s profile within my database!`)
            message.channel.send(errorEmbed)
          }else{
            var pointsRemoval = Number(currentXP) - Number(args[2])
            if (pointsRemoval < 0){
              pointsRemoval = 0;
            }

            var database = firebase.database();
            firebase.database().ref(`/xp4Users/${userID}`).update({
              b : Number(pointsRemoval)
            })

            var errorEmbed = new Discord.RichEmbed()
              .setColor(0xff3c3c)
              .setDescription(`Removed ${args[2]} XP from ${userArray[i]}'s profile!`)
            message.channel.send(errorEmbed)


          var whileLoopTest = 1
          while (whileLoopTest === 1){

            var userIDDD = await rbx.getIdFromUsername(`${userArray[i]}`)
            var currentRankID = await rbx.getRankInGroup(groupID, userIDDD)

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

            var { body } = await snekfetch.get(`${firebaseBASEURL}/rankLock/${userIDDD}.json`)
            var doesUserHaveProfile;
            if (body){
              doesUserHaveProfile = 1
            }else{
              doesUserHaveProfile = 0;
            }

            if ((pointsRemoval < requiredNumber) && (Number(doesUserHaveProfile) === Number(0)) && (currentRankID !== 0)){
              await groupIDB.demote(Number(userIDDD));
              var newRank = await rbx.getRankNameInGroup(groupID, Number(userIDDD));
              var rblxUsernameOk = await rbx.getUsernameFromId(Number(userIDDD));
              console.log(`Demoted ${rblxUsernameOk} to ${newRank}`)
            }else{
              whileLoopTest = 0
            }
          }

            var currentRankIDAGAIN = await rbx.getRankInGroup(groupID, userIDDD)
            if (currentRankIDAGAIN === 115){
              await rbx.demote(groupID, Number(userID))
              var newRank = await rbx.getRankNameInGroup(groupID, Number(userIDDD));
              var rblxUsernameOk = await rbx.getUsernameFromId(Number(userIDDD));
              console.log(`Demoted ${rblxUsernameOk} to ${newRank}`)
            }
          }
        }
      return undefined;
    }
  }
    return undefined;
  },
};
