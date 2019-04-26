const token = 'BOT_TOKEN'
const Discord = require('discord.js');
const aegisAutomation = new Discord.Client();
const prefix = "!"
const snekfetch = require('snekfetch');
const rbx = require('noblox.js');

// SHOUT SHIT START
const bloxy = require('bloxy');
const roblox = new bloxy({
  cookie: "RBLX_COOKIE"
})
roblox.login().then(function() { console.log("should've logged in by now")});
// SHOUT SHIT END

var firebase = require("firebase");
// config goes here
firebase.initializeApp(config)


// READY EVENT [START]
aegisAutomation.on('ready', () => {
  console.log('Turned on Discord bot');
  aegisAutomation.user.setActivity(`${aegisAutomation.users.size} soldiers`, { type: 'WATCHING' })
  aegisAutomation.user.setAvatar(`https://cdn.discordapp.com/attachments/475855258191659019/553752038303858738/aegis_logo.png`)
})
// READY EVENT [END]

aegisAutomation.on('guildMemberAdd', async (member) => {
  var { body } = await snekfetch.get(`https://verify.eryn.io/api/user/${member.id}`)
  if (!body){
    return undefined;
  }else{
    var rankID = await rbx.getRankInGroup(3243022, `${body.robloxUsername}`)
    if (rankID === 0){
      var embed = new Discord.RichEmbed()
        .setColor(0xf74e4e)
        .setTitle(`Verification Error | Emitter`)
        .setDescription(`Hey there [${body.robloxUsername}](https://www.roblox.com/users/${body.robloxId}/profile)!\n\nI could not go further through the verification process because you're not in the [group](https://www.roblox.com/groups/3243022/Aegis-Core#!/about).`)
        .addField(`Different Account?`, `Wish to verify under a different account?  [Click here and reverify yourself with RoVer, an API that I extract ROBLOX-Discord information from.\n\nOnce you've completed that, simply chat **\`!remove\`** then **\`!verify\`** once more.](https://verify.eryn.io/)`)
      return member.send(embed)
    }else{
      var embed = new Discord.RichEmbed()
        .setColor(0x00ffa5)
        .setTitle(`Verification Success | Emitter`)
        .setDescription(`Hey there [${body.robloxUsername}](https://www.roblox.com/users/${body.robloxId}/profile)!\n\nI've successfully linked your Discord account with ${body.robloxUsername} and I'm glad you've decided to join our communication hub.`)
        .addField(`Different Account?`, `Wish to verify under a different account?  [Click here and reverify yourself with RoVer, an API that I extract ROBLOX-Discord information from.\n\nOnce you've completed that, simply chat **\`!remove\`** then **\`!verify\`** once more.](https://verify.eryn.io/)`)
      if (1 <= rankID && rankID <= 185){
        await member.addRole(member.guild.roles.find(role => role.name === "Aegian"))
      }else if (195 <= rankID && rankID <= 220){
        await member.addRole(member.roles.find(role => role.name === "Officer"))
      }else if (250 <= rankID){
        await member.addRole(member.roles.find(role => role.name === "High Command"))
      }else{
        await member.addRole(member.guild.roles.find(role => role.name === "Aegian"))
      }
      await member.setNickname(`${body.robloxUsername}`)
      await member.addRole(member.guild.roles.find(role => role.name === "Verified"))
      return member.send(embed)
    }
  }
})

aegisAutomation.on('message', async message => {


  // REQUIRED START RETURNS [START]
  if (message.author.aegisAutomation) return;
  if (message.channel.type === 'dm') return;
  // REQUIRED START RETURNS [END]


  // ROLES & DATA REQUIRED [START]
  const args = message.content.split(/[ ]+/) // TO SPLIT FROM THE STARTER ARGUMENT
  const verifiedRole = message.guild.roles.find(role => role.name === "Verified");
  const promoLOGS = aegisAutomation.channels.get('435191714601369601')
  const groupID = 3243022 // groupID
  const groupIDB = await roblox.getGroup(3243022)
  // ROLES & DATA REQUIRED [END]


  // VERIFICATION & UPDATE & REMOVE FROM DB [START]
  if (message.content.startsWith(prefix + "verify")){
    if (!message.guild.members.get(aegisAutomation.user.id).hasPermission("MANAGE_NICKNAMES")){
      var errorEmbed = new Discord.RichEmbed()
      .setColor(0xf74e4e)
      .setDescription(`I can't continue because someone forgot to give me the permission to manage nicknames!`)

      message.channel.send(errorEmbed).then(message => message.delete(30000));
      return undefined;
    }
    if (!message.guild.members.get(aegisAutomation.user.id).hasPermission("CHANGE_NICKNAME")){
      var errorEmbed = new Discord.RichEmbed()
      .setColor(0xf74e4e)
      .setDescription(`I can't continue because someone forgot to give me the permission to change nicknames!`)

      message.channel.send(errorEmbed).then(message => message.delete(30000));
      return undefined;
    }
    if (!verifiedRole){
      var errorEmbed = new Discord.RichEmbed()
      .setColor(0xf74e4e)
      .setDescription(`This guild is missing the **VERIFIED** role that was set for this guild!`)

      message.channel.send(errorEmbed).then(message => message.delete(30000));
      return undefined;
    }
    if (message.member.roles.exists('name', 'Verified')) {
      var errorEmbed = new Discord.RichEmbed()
      .setColor(0xf74e4e)
      .setDescription(`Sorry but you're already verified!`)
      return message.channel.send(errorEmbed).then(message => message.delete(30000));
    }

    var { body } = await snekfetch.get(`https://verify.eryn.io/api/user/${message.author.id}`)
    if (body.status === "error"){
      var embed = new Discord.RichEmbed()
        .setColor(0xf74e4e)
        .setTitle(`Verification Error | Emitter`)
        .setDescription(`Sorry ${message.author}, but I can't verify you under a ROBLOX account.\n\n**[Please click here and begin the process of verifying your ROBLOX account with your Discord account.](https://verify.eryn.io/)**`)
      return message.channel.send(embed).then(message => message.delete(15000))
    }
    if (body.status === "ok"){
      var rankID = await rbx.getRankInGroup(groupID, `${body.robloxUsername}`)
      if (rankID === 0){
        var embed = new Discord.RichEmbed()
          .setColor(0xf74e4e)
          .setTitle(`Verification Error | Emitter`)
          .setDescription(`Hey there [${body.robloxUsername}](https://www.roblox.com/users/${body.robloxId}/profile)!\n\nI could not go further through the verification process because you're not in the [group](https://www.roblox.com/groups/3243022/Aegis-Core#!/about).`)
          .addField(`Different Account?`, `Wish to verify under a different account?  [Click here and reverify yourself with RoVer, an API that I extract ROBLOX-Discord information from.\n\nOnce you've completed that, simply chat **\`!remove\`** then **\`!verify\`** once more.](https://verify.eryn.io/)`)
        return message.channel.send(embed).then(message => message.delete(30000));
      }else{
        var embed = new Discord.RichEmbed()
          .setColor(0x00ffa5)
          .setTitle(`Verification Success | Emitter`)
          .setDescription(`Hey there [${body.robloxUsername}](https://www.roblox.com/users/${body.robloxId}/profile)!\n\nI've successfully linked your Discord account with ${body.robloxUsername} and I'm glad you've decided to join our communication hub.`)
          .addField(`Different Account?`, `Wish to verify under a different account?  [Click here and reverify yourself with RoVer, an API that I extract ROBLOX-Discord information from.\n\nOnce you've completed that, simply chat **\`!remove\`** then **\`!verify\`** once more.](https://verify.eryn.io/)`)
        if (1 <= rankID && rankID <= 185){
          await message.member.addRole(message.guild.roles.find(role => role.name === "Aegian"))
        }else if (195 <= rankID && rankID <= 220){
          await message.member.addRole(message.guild.roles.find(role => role.name === "Officer"))
        }else if (250 <= rankID){
          await message.member.addRole(message.guild.roles.find(role => role.name === "High Command"))
        }else{
          await message.member.addRole(message.guild.roles.find(role => role.name === "Aegian"))
        }
        await message.member.setNickname(`${body.robloxUsername}`)
        await message.member.addRole(message.guild.roles.find(role => role.name === "Verified"))
        return message.channel.send(embed).then(message => message.delete(15000))
      }
    }
    var embed = new Discord.RichEmbed()
      .setColor(0xf74e4e)
      .setTitle(`Verification Error | Emitter`)
      .setDescription(`Ooops, you should never see this error.\n\n**Please take a screenshot of what you see and send it directly to <@114081086065213443>!**`)
    return message.channel.send(embed).then(message => message.delete(30000));
  }
  if (message.content.startsWith(prefix + "remove")){
    if (!message.member.roles.exists('name', 'Verified')) {
      var errorEmbed = new Discord.RichEmbed()
      .setColor(0xf74e4e)
      .setDescription(`You don't have the verified role!`)
      return message.channel.send(errorEmbed).then(message => message.delete(30000));
    }
    await message.member.removeRole(message.guild.roles.find(role => role.name === "Verified"))
    await message.member.removeRole(message.guild.roles.find(role => role.name === "Officer"))
    await message.member.removeRole(message.guild.roles.find(role => role.name === "High Command"))
    await message.member.removeRole(message.guild.roles.find(role => role.name === "Aegian"))
    var embed = new Discord.RichEmbed()
      .setTitle(`Removal Notification | Emitter`)
      .setDescription(`:wave: Successfully removed your tags :wave:`)
    return message.channel.send(embed).then(message => message.delete(15000));
  }
  // VERIFICATION & UPDATE & REMOVE FROM DB [END]

  // XP CMDS [START]
  if (message.content.startsWith(prefix + "xp")){
    if (!message.member.roles.exists('name', 'Verified')) {
      var errorEmbed = new Discord.RichEmbed()
      .setColor(0xf74e4e)
      .setDescription(`Sorry but you're not verified yet!`)
      return message.channel.send(errorEmbed).then(message => message.delete(30000));
    }

    if (!args[1]) return message.channel.send(`Missing argument`).then(message => message.delete(6000));
    if (args[1] !== "add" && args[1] !== "remove") return message.channel.send(`Sorry, but I only accept **add** and **remove** as proper second arguments`).then(message => message.delete(10000));
    if (!args[2]) return message.channel.send(`Missing number of XP`).then(message => message.delete(6000));
    if (!args[3]) return message.channel.send(`Missing username(s)`).then(message => message.delete(6000));
    if (isNaN(Number(args[2]))) return message.channel.send(`That's not a number!`).then(message => message.delete(6000));
    if (Number(args[2]) < 0) return message.channel.send(`Please provide me with a positive number!`).then(message)
    if (Number(args[2]) % 1 != 0) return message.channel.send(`Please provide me with a whole number (no decimals)!`).then(message => message.delete(6000));

    if (!message.member.roles.exists('name', 'Officer') && (!message.member.roles.exists('name', 'High Command')) && (message.author.id !== '196721770542137345' && message.author.id !== '114081086065213443')) return message.channel.send(`Sorry ${message.author}, but only users with the officer role can run this command!`).then(message => message.delete(6000));
    if ((message.author.id !== '196721770542137345' && message.author.id !== '114081086065213443') && (Number(args[2]) > 12)) return message.channel.send(`Sorry ${message.author}, but only developers+ can give endless amounts of XP to users`).then(message => message.delete(6000));
    if (message.member.roles.exists('name', 'High Command') && (Number(args[2]) > 12)) return message.channel.send(`Sorry ${message.author}, but you are only allowed to give 5 XP max per user.`).then(message => message.delete(6000));
    if (message.member.roles.exists('name', 'Officer') && (Number(args[2]) > 12)) return message.channel.send(`Sorry ${message.author}, but you are only allowed to give 3 XP max per user.`).then(message => message.delete(6000));

    if (args[1] === "add"){
      var userArray = message.content.slice(message.content.indexOf(message.content.split(" ")[3])).split(', ');
      console.log(userArray);
      for (i = 0; i < userArray.length; i++){

        var { body } = await snekfetch.get(`https://api.roblox.com/users/get-by-username?username=${userArray[i]}`)

        if (body.success === false){
          var errorEmbed = new Discord.RichEmbed()
            .setColor(0xff3c3c)
            .setDescription(`${userArray[i]} does not exist on ROBLOX!`)
          message.channel.send(errorEmbed)
        }else{
          var userID = await rbx.getIdFromUsername(`${userArray[i]}`)
          var { body } = await snekfetch.get(`https://aegisautomation-9da8a.firebaseio.com/${userID}.json`);
          var currentXP;

          if (!body){
            currentXP = 0;
          }else{
            currentXP = Number(body.b);
          }

          var pointsMaybe = Number(args[2]);


          if (!body){ // work on this
            firebase.database().ref(`${userID}`).set({
              b: pointsMaybe
            })
            var errorEmbed = new Discord.RichEmbed()
              .setColor(0x5aa9fe)
              .setDescription(`Inserted and updated ${userArray[i]}'s profile within my database!`)
            message.channel.send(errorEmbed)
            var promoLOGEmbed = new Discord.RichEmbed()
              .setColor(0x46ff87)
              .setTitle(`**${message.member.nickname}** - Add`)
              .setDescription(`**${message.member.nickname}** (${message.author.id})\nModified **${pointsMaybe}** XP for ${userArray[i]} (${userID})\n\n**Channel:**\n<#${message.channel.id}>`)
            aegisAutomation.channels.get(promoLOGS.id).send(promoLOGEmbed)
          }
          else{
            var database = firebase.database();
            firebase.database().ref(`${userID}`).update({
              b : Number(currentXP) + Number(args[2])
            })
            var errorEmbed = new Discord.RichEmbed()
              .setColor(0x46ff87)
              .setDescription(`Added ${args[2]} XP to ${userArray[i]}'s profile!`)
            message.channel.send(errorEmbed)

            var userIDDD = await rbx.getIdFromUsername(`${userArray[i]}`)
            var currentRankID = await rbx.getRankInGroup(groupID, userIDDD)

            var requiredNumber; // of xp
            if (currentRankID  === 0){ // current rolesetID
             rankName = "E | Cadet" // nextRankName
             requiredNumber = 0;
             }else if (currentRankID === 20){ // current rolesetID
               rankName = "E | Tier 1" // nextRankName
               requiredNumber = 1;
             }else if (currentRankID === 50){ // current rolesetID
               rankName = "E | Tier 2" // nextRankName
               requiredNumber = 10
             }else if (currentRankID === 60){ // current rolesetID
               rankName = "[A] Scout" // nextRankName
               requiredNumber = 25;
             }else if (currentRankID === 80){ // current rolesetID
               rankName = "[A] Trooper" // nextRankName
               requiredNumber = 45;
             }else if (currentRankID === 100){ // current rolesetID
               rankName = "[A] Predator" // nextRankName
               requiredNumber = 80;
             }else if (currentRankID === 120){ // current rolesetID
               rankName = "[A] Paladin" // nextRankName
               requiredNumber = 125;
             }else if (currentRankID === 150){ // current rolesetID
               rankName = "[A] Sentinel" // nextRankName
               requiredNumber = 190;
             }else if (currentRankID === 160){ // current rolesetID
               rankName = "[A] Vanguard" // nextRankName
               requiredNumber = 300;
             }else if (currentRankID === 180){ // current rolesetID
               rankName = "[OT] Champion" // nextRankName
               requiredNumber = 425;
             }else{
                rankName = "[ERROR] || CAN'T GO BEYOND"
               requiredNumber = 0;
              }
            var whateverRequired4NextRank = requiredNumber
            var { body } = await snekfetch.get(`https://aegisautomation-9da8a.firebaseio.com/rankLock/${userID}.json`)
            var doesUserHaveProfile;
            if (body){
              doesUserHaveProfile = 1
            }else{
              doesUserHaveProfile = 0;
            }
              if (((Number(currentXP) + Number(args[2])) >= whateverRequired4NextRank) && (Number(doesUserHaveProfile) === Number(0)) && (currentRankID < 185)){
                await groupIDB.promote(Number(userID));
                var newRank = await rbx.getRankNameInGroup(groupID, Number(userID));
                console.log(`Promoted user to ${newRank}`)
                var rblxUsernameOk = await rbx.getUsernameFromId(Number(userID));
                var promotionEmbed = new Discord.RichEmbed()
                .setColor(0x26a4ff)
                .setDescription(`Promoted **${rblxUsernameOk}** to ${newRank}`)
                aegisAutomation.channels.get(aegisAutomation.channels.get('435191714601369601').id).send(promotionEmbed)
                var { body } = await snekfetch.get(`https://www.roblox.com/headshot-thumbnail/json?userId=${Number(userID)}&width=180&height=180`);
                var mugShot = `${body.Url}`
                var surpriseEmbed = new Discord.RichEmbed()
                .setColor(`RANDOM`)
                .setAuthor(`${rblxUsernameOk}`, `${mugShot}`)
                .setDescription(`:confetti_ball: **Congratulations on your promotion to __${newRank}__!** :confetti_ball:`)
                aegisAutomation.channels.get(aegisAutomation.channels.get('500871853477462026').id).send(surpriseEmbed).then(message => message.delete(10000));
              }

              var whileLoopTest = 1
              while (whileLoopTest === 1){

                var userIDDD = await rbx.getIdFromUsername(`${userArray[i]}`)
                var currentRankID = await rbx.getRankInGroup(groupID, userIDDD)

                var requiredNumber; // of xp

                if (currentRankID === 50){
                  requiredNumber = 1;
                }else if (currentRankID === 60){
                  requiredNumber = 10;
                }else if (currentRankID === 80){
                  requiredNumber = 25;
                }else if (currentRankID === 100){
                  requiredNumber = 45;
                }else if (currentRankID === 120){
                  requiredNumber = 80;
                }else if (currentRankID === 150){
                  requiredNumber = 125;
                }else if (currentRankID === 160){
                  requiredNumber = 190;
                }else if (currentRankID === 180){
                  requiredNumber = 300
                }else if (currentRankID === 185){
                  requiredNumber = 425
                }else{
                  requiredNumber = 0;
                }
                if (((Number(currentXP) + Number(args[2])) < requiredNumber) && (Number(doesUserHaveProfile) === Number(0)) && (currentRankID < 185)){
                  await groupIDB.demote(Number(userIDDD));
                  var newRank = await rbx.getRankNameInGroup(groupID, Number(userIDDD));
                  console.log(`WHILE LOOP RUN1 | Demoted user to ${newRank}`)
                  var rblxUsernameOk = await rbx.getUsernameFromId(Number(userIDDD));
                  var promotionEmbed = new Discord.RichEmbed()
                  .setColor(0x26a4ff)
                  .setDescription(`Demoted **${rblxUsernameOk}** to ${newRank}`)
                  aegisAutomation.channels.get(aegisAutomation.channels.get('435191714601369601').id).send(promotionEmbed)
                }else{
                  whileLoopTest = 0
                }
              }

              var whileLoopTest1 = 1
              while (whileLoopTest1 === 1){

                var userIDDD = await rbx.getIdFromUsername(`${userArray[i]}`)
                var currentRankID = await rbx.getRankInGroup(groupID, userIDDD)

                var requiredNumber; // of xp
                if (currentRankID  === 0){ // current rolesetID
                 rankName = "E | Cadet" // nextRankName
                 requiredNumber = 0;
                 }else if (currentRankID === 20){ // current rolesetID
                   rankName = "E | Tier 1" // nextRankName
                   requiredNumber = 1;
                 }else if (currentRankID === 50){ // current rolesetID
                   rankName = "E | Tier 2" // nextRankName
                   requiredNumber = 10
                 }else if (currentRankID === 60){ // current rolesetID
                   rankName = "[A] Scout" // nextRankName
                   requiredNumber = 25;
                 }else if (currentRankID === 80){ // current rolesetID
                   rankName = "[A] Trooper" // nextRankName
                   requiredNumber = 45;
                 }else if (currentRankID === 100){ // current rolesetID
                   rankName = "[A] Predator" // nextRankName
                   requiredNumber = 80;
                 }else if (currentRankID === 120){ // current rolesetID
                   rankName = "[A] Paladin" // nextRankName
                   requiredNumber = 125;
                 }else if (currentRankID === 150){ // current rolesetID
                   rankName = "[A] Sentinel" // nextRankName
                   requiredNumber = 190;
                 }else if (currentRankID === 160){ // current rolesetID
                   rankName = "[A] Vanguard" // nextRankName
                   requiredNumber = 300;
                 }else if (currentRankID === 180){ // current rolesetID
                   rankName = "[OT] Champion" // nextRankName
                   requiredNumber = 425;
                 }else{
                    rankName = "[ERROR] || CAN'T GO BEYOND"
                   requiredNumber = 0;
                  }
                console.log(`WHILE LOOP RUN2 | YOU NEED A TOTAL OF ${requiredNumber}`)
                if (((Number(currentXP) + Number(args[2])) >= requiredNumber) && (Number(doesUserHaveProfile) === Number(0)) && (currentRankID < 185)){
                  await groupIDB.promote(Number(userIDDD));
                  var newRank = await rbx.getRankNameInGroup(groupID, Number(userIDDD));
                  console.log(`WHILE LOOP RUN2 | Promoted user to ${newRank}`)
                  var rblxUsernameOk = await rbx.getUsernameFromId(Number(userIDDD));
                  var promotionEmbed = new Discord.RichEmbed()
                  .setColor(0x26a4ff)
                  .setDescription(`Promoted **${rblxUsernameOk}** to ${newRank}`)
                  aegisAutomation.channels.get(aegisAutomation.channels.get('435191714601369601').id).send(promotionEmbed)
                }else{
                  whileLoopTest1 = 0
                }
              }
            }

            var promoLOGEmbed = new Discord.RichEmbed()
              .setColor(0x46ff87)
              .setTitle(`**${message.member.nickname}** - Add`)
              .setDescription(`**${message.member.nickname}** (${message.author.id})\nModified **${Number(args[2])}** XP for ${userArray[i]} (${userID})\n\n**Channel:**\n<#${message.channel.id}>`)
            aegisAutomation.channels.get(promoLOGS.id).send(promoLOGEmbed)
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
          var { body } = await snekfetch.get(`https://aegisautomation-9da8a.firebaseio.com/${userID}.json`);
          var currentXP;
          var pointsMaybe = Number(args[2]);


          if (!body){
            currentXP = 0;
          }else{
            currentXP = Number(body.b);
          }

          var pointsMaybe = Number(args[2]);


          if (!body){ // work on this
            firebase.database().ref(`${userID}`).set({
              b: Number(0)
            })
            var errorEmbed = new Discord.RichEmbed()
              .setColor(0x5aa9fe)
              .setDescription(`Inserted and updated ${userArray[i]}'s profile within my database!`)
            message.channel.send(errorEmbed)
            var promoLOGEmbed = new Discord.RichEmbed()
              .setColor(0xff3c3c)
              .setTitle(`**${message.member.nickname}** - Remove`)
              .setDescription(`**${message.member.nickname}** (${message.author.id})\nModified **${pointsMaybe}** XP for ${userArray[i]} (${userID})\n\n**Channel:**\n<#${message.channel.id}>`)
            aegisAutomation.channels.get(promoLOGS.id).send(promoLOGEmbed)
          }else{
            var pointsRemoval = Number(currentXP) - Number(args[2])
            if (pointsRemoval < 0){
              pointsRemoval = 0;
            }

            var database = firebase.database();
            firebase.database().ref(`${userID}`).update({
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

            if (currentRankID === 50){
              requiredNumber = 1;
            }else if (currentRankID === 60){
              requiredNumber = 10;
            }else if (currentRankID === 80){
              requiredNumber = 25;
            }else if (currentRankID === 100){
              requiredNumber = 45;
            }else if (currentRankID === 120){
              requiredNumber = 80;
            }else if (currentRankID === 150){
              requiredNumber = 125;
            }else if (currentRankID === 160){
              requiredNumber = 190;
            }else if (currentRankID === 180){
              requiredNumber = 300
            }else if (currentRankID === 185){
              requiredNumber = 425
            }else{
              requiredNumber = 0;
            }

            var { body } = await snekfetch.get(`https://aegisautomation-9da8a.firebaseio.com/rankLock/${userIDDD}.json`)
            var doesUserHaveProfile;
            if (body){
              doesUserHaveProfile = 1
            }else{
              doesUserHaveProfile = 0;
            }

            if ((pointsRemoval < requiredNumber) && (Number(doesUserHaveProfile) === Number(0)) && (currentRankID <= 185)){
              await groupIDB.demote(Number(userIDDD));
              var newRank = await rbx.getRankNameInGroup(groupID, Number(userIDDD));
              var rblxUsernameOk = await rbx.getUsernameFromId(Number(userIDDD));
              var promotionEmbed = new Discord.RichEmbed()
              .setColor(0x26a4ff)
              .setDescription(`Demoted **${rblxUsernameOk}** to ${newRank}`)
              aegisAutomation.channels.get(aegisAutomation.channels.get('435191714601369601').id).send(promotionEmbed)
            }else{
              whileLoopTest = 0
            }
          }

            var currentRankIDAGAIN = await rbx.getRankInGroup(groupID, userIDDD)
            if (currentRankIDAGAIN === 115){
              await groupIDB.demote(Number(userID))
              var newRank = await rbx.getRankNameInGroup(groupID, Number(userIDDD));
              var rblxUsernameOk = await rbx.getUsernameFromId(Number(userIDDD));
              var promotionEmbed = new Discord.RichEmbed()
              .setColor(0x26a4ff)
              .setDescription(`Demoted **${rblxUsernameOk}** to ${newRank}`)
              aegisAutomation.channels.get(aegisAutomation.channels.get('435191714601369601').id).send(promotionEmbed)
            }
            var promoLOGEmbed = new Discord.RichEmbed()
              .setColor(0xff3c3c)
              .setTitle(`**${message.member.nickname}** - Remove`)
              .setDescription(`**${message.member.nickname}** (${message.author.id})\nModified **${Number(args[2])}** XP for ${userArray[i]} (${userIDDD})\n\n**Channel:**\n<#${message.channel.id}>`)
            aegisAutomation.channels.get(promoLOGS.id).send(promoLOGEmbed)
          }
        }
      return undefined;
    }
  }
    return undefined;
  }
  if (message.content.startsWith(prefix + "view")){
    if (!args[1]){
      var srryEmbed = new Discord.RichEmbed()
      .setColor(0xf74e4e)
      .setDescription(`Please provide me with a ROBLOX username`)
      return message.reply(srryEmbed).then(message => message.delete(10000));
    }
    var { body } = await snekfetch.get("http://api.roblox.com/users/get-by-username?username=" + args[1])
    if (body.errorMessage === "User not found"){
      var errorEmbed = new Discord.RichEmbed()
      .setColor(0xf74e4e)
      .setDescription(`Could you please give me a **real** ROBLOX username? :rolling_eyes:`)
      message.reply(errorEmbed).then(message => message.delete(10000));
      return undefined;
    }
    var usernameE = `${body.Username}`
    var userID = await rbx.getIdFromUsername(`${args[1]}`)
    var rankLocked;
    var { body } = await snekfetch.get(`https://aegisautomation-9da8a.firebaseio.com/rankLock/${userID}.json`)
    if (body){
      rankLocked = "True"
    }else{
      rankLocked = "False"
    }
    var { body } = await snekfetch.get(`https://aegisautomation-9da8a.firebaseio.com/warnings/${userID}.json`);
    var a = 0;
    if (!body){
      a = 0;
    }
    if (body){
      for (i = 0; i < 10000; i++){
      var { body } = await snekfetch.get(`https://aegisautomation-9da8a.firebaseio.com/warnings/${userIDRBLLX}/${i}.json`);
      if (!body){
        a = i + 1
        if (a < 0){ // if 0 warnings
          a = 0;
        }
        break;
      }else{
        continue;
      }
      }
    }
    var userIDDD = await rbx.getIdFromUsername(`${args[1]}`)
    var currentRank = await rbx.getRankNameInGroup(groupID, userIDDD) // RANK IN MAIN GROUP
    var { body } = await snekfetch.get(`https://aegisautomation-9da8a.firebaseio.com/${userID}.json`);
    if (!body){
      var sorryEmbed = new Discord.RichEmbed()
        .setColor(0xf74e4e)
        .setTitle(`Missing Profile`)
        .setDescription(`${args[1]} doesn't have a registered profile with me **yet**; however, once a high rank begins to add XP to the specified user, a profile will be generated!\n\nAs of now, the user has 0 XP.`)
      return message.reply(sorryEmbed)
    }
    var currentRankID = await rbx.getRankInGroup(groupID, userIDDD)
    var requiredNumber;
    if (currentRankID  === 0){ // current rolesetID
     rankName = "E | Cadet" // nextRankName
     requiredNumber = 0;
     }else if (currentRankID === 20){ // current rolesetID
       rankName = "E | Tier 1" // nextRankName
       requiredNumber = 1;
     }else if (currentRankID === 50){ // current rolesetID
       rankName = "E | Tier 2" // nextRankName
       requiredNumber = 10
     }else if (currentRankID === 60){ // current rolesetID
       rankName = "[A] Scout" // nextRankName
       requiredNumber = 25;
     }else if (currentRankID === 80){ // current rolesetID
       rankName = "[A] Trooper" // nextRankName
       requiredNumber = 45;
     }else if (currentRankID === 100){ // current rolesetID
       rankName = "[A] Predator" // nextRankName
       requiredNumber = 80;
     }else if (currentRankID === 120){ // current rolesetID
       rankName = "[A] Paladin" // nextRankName
       requiredNumber = 125;
     }else if (currentRankID === 150){ // current rolesetID
       rankName = "[A] Sentinel" // nextRankName
       requiredNumber = 190;
     }else if (currentRankID === 160){ // current rolesetID
       rankName = "[A] Vanguard" // nextRankName
       requiredNumber = 300;
     }else if (currentRankID === 180){ // current rolesetID
       rankName = "[OT] Champion" // nextRankName
       requiredNumber = 425;
     }else{
        rankName = "[ERROR] || CAN'T GO BEYOND"
       requiredNumber = 0;
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

    if (a > 0){
      var { body } = await snekfetch.get(`https://aegisautomation-9da8a.firebaseio.com/warnings/${userIDDD}.json`);
      for (i = 0; i < 10000; i++){
          var { body } = await snekfetch.get(`https://aegisautomation-9da8a.firebaseio.com/warnings/${userIDDD}/${i}.json`);
          if (!body){
            a = i + 1
            if (a < 0){ // if 0 warnings
              a = 0;
            }
            break;
          }else{
            continue;
          }
        }
    }
    for (i = 0; i < a; i++){
      var { body } = await snekfetch.get(`https://aegisautomation-9da8a.firebaseio.com/warnings/${userIDDD}/${i}.json`);
      if (!body){
        break;
      }else{
        response.addField(`Warning #${Number(i) + 1}`, "```" + body.warning0 + "```warned by <@" + body.agent.toString() + ">", true)
        continue;
      }
    }

    if (a == 0){
      response.setColor(0x00ffa5)
    }else if (0 < a && a <= 5 ){
      response.setColor(0xffae42)
    }else{
      response.setColor(0xf74e4e)
    }
    message.reply(response)
    return undefined;

  }
  // XP CMDS [END]

  if (message.content.startsWith(prefix + "help")){
    var emebd = new Discord.RichEmbed()
      .setColor(0x5bff7a)
      .setTitle(`Global Commands`)
      .addField(`**\`!verify [rblxUusername]\`**`, `Verify your Discord account with your ROBLOX account.  Account information is polled from RoVer's API due to ease.`)
      .addField(`**\`!remove\`**`, `Removes your verified status.`)
      .addField(`**\`!view [rblxUsername]\`**`, `View the specified ROBLOX's profile stored in the Aegis Core database.`)
    await message.author.send(emebd);
    var newEmbed = new Discord.RichEmbed()
      .setColor(0xff6b6b)
      .setTitle(`Officer Commands`)
      .addField(`**\`!xp [add/remove] [#] [username1, username2]\`**`, `Add or remove ths desired XP for a large group of people.`)
    return await message.author.send(newEmbed);
  }

  // DEVELOPER COMMANDS [START]
  if (message.content.startsWith(prefix + "broadcast")){
    if (message.author.id !== `196721770542137345` && message.author.id !== `114081086065213443`) return;
    message.delete()
    let roleMembers = message.guild.members.map(m => m.id)
    console.log(roleMembers)
    var howManyNubs = 0;
    var embed = new Discord.RichEmbed()
      .setColor(0xff6b6b)
      .setDescription(`${message.content.slice(message.content.indexOf(message.content.split(" ")[2]))}`)
    for (a = 0; a < roleMembers.length; a++){
      await message.guild.members.get(roleMembers[a]).send(embed).catch(console.error)
      howManyNubs = howManyNubs + 1;
    }
    return message.channel.send(`Successfully sent ${howManyNubs} messages.`)
  }
  if (message.content.startsWith(prefix + "warn")){
    message.delete()
    if (!message.member.roles.exists('name', 'Officer') && !message.member.roles.exists('name', 'High Command')){
      var errorEmbed = new Discord.RichEmbed()
      .setColor(0xf74e4e)
      .setDescription(`You must have the **Officer** or **High Command** role to run that command!`)
      message.channel.send(errorEmbed).then(message => message.delete(30000));
      return undefined;
    }
    var { body } = await snekfetch.get("http://api.roblox.com/users/get-by-username?username=" + args[1])
    if (body.errorMessage === "User not found"){
      var errorEmbed = new Discord.RichEmbed()
      .setAuthor(`Error | Notice`, "https://cdn.discordapp.com/attachments/502568121526124556/543673170176245797/baliontransparent.png")
      .setColor(0xf74e4e)
      .setDescription(`Could you please give me a **real** ROBLOX username? :rolling_eyes:`)
      message.channel.send(errorEmbed).then(message => message.delete(30000));
      return undefined;
    }
    var userIDRBLLX = await rbx.getIdFromUsername(args[1])
    if (!args[2]){
      return message.channel.send(`You need to provide me with some information about this warning!`).then(message => message.delete(5000));
    }
    var { body } = await snekfetch.get(`https://aegisautomation-9da8a.firebaseio.com/warnings/${userIDRBLLX}.json`);
    //  var userIDLookin4 = Number(message.mentions.users.first().id).toString()
    if (!body){
      firebase.database().ref(`warnings/` + userIDRBLLX + `/0`).set({
        warning0: `${message.content.slice(message.content.indexOf(message.content.split(" ")[2]))}`,
        agent: message.author.id
      })
    }else{
      var a = 0; // what should we name new element as?
      var b = 0;
      while (b === 0){
        for (i = 0; i < 1000; i++){
          var { body } = await snekfetch.get(`https://aegisautomation-9da8a.firebaseio.com/warnings/${userIDRBLLX}/${i}.json`);
          if (!body){
            a = i;
            i = 99999999
            b = 1;
            console.log(a)
            break;
          }else{
            continue;
          }
        }
      }
      firebase.database().ref('warnings/' + userIDRBLLX + `/${a}`).update({
        warning0: `${message.content.slice(message.content.indexOf(message.content.split(" ")[2]))}`,
        agent: message.author.id
      })
    }
    return message.reply(`Warned the user!`).then(message => message.delete(5000));
  }
  if (message.content.startsWith(prefix + "rankLock")){
    message.delete()
    if (message.author.id !== `196721770542137345` && message.author.id !== `114081086065213443`) return;
    if (!args[1]) return message.channel.send(`Please provide me with a ROBLOX username!`).then(message => message.delete(4000));
    var { body } = await snekfetch.get("http://api.roblox.com/users/get-by-username?username=" + args[1])
    if (body.errorMessage === "User not found"){
      var errorEmbed = new Discord.RichEmbed()
      .setColor(0xf74e4e)
      .setDescription(`Could you please give me a **real** ROBLOX username? :rolling_eyes:`)
      message.reply(errorEmbed).then(message => message.delete(10000));
      return undefined;
    }

    var rblxUserID = await rbx.getIdFromUsername(`${args[1]}`);
    var rblxUserName = await rbx.getUsernameFromId(rblxUserID);
    var rblxUserRankInBAid = await rbx.getRankInGroup(groupID, rblxUserID);
    var rblxUserRankInBAname = await rbx.getRankNameInGroup(groupID, rblxUserID)

    if (rblxUserRankInBAid > 185){
      var errorEmbed = new Discord.RichEmbed()
        .setColor(0xf74e4e)
        .setDescription(`Sorry, but ${rblxUserName} is a high rank and can not be rank locked!`)
      return message.reply(errorEmbed).then(message => message.delete(10000));
    }
    if (rblxUserRankInBAid === 0){
      var errorEmbed = new Discord.RichEmbed()
      .setColor(0xf74e4e)
      .setDescription(`Sorry, but ${rblxUserName} isn't even in the group!`)
      return message.reply(errorEmbed).then(message => message.delete(10000));
    }
    var { body } = await snekfetch.get(`https://aegisautomation-9da8a.firebaseio.com/rankLock/${rblxUserID}.json`)
    if (body){
      var oofEmbed = new Discord.RichEmbed()
        .setColor(`RANDOM`)
        .setTitle(`Rank Lock | Emitter`)
        .setDescription(`${rblxUserName} (${body.userID}) is already rank locked to ${body.rankName} (${body.rankID})!`)
        .setFooter(`Rank locked by - ${body.author}`)
      return message.channel.send(oofEmbed).then(message => message.delete(15000));
    }else{
      firebase.database().ref(`rankLock/` + rblxUserID).set({
        rblxUsername: `${rblxUserName}`,
        userID: rblxUserID,
        rankID: rblxUserRankInBAid,
        rankName: rblxUserRankInBAname,
        author: message.author.id
      })
    }
    var oofEmbed = new Discord.RichEmbed()
      .setTitle(`Rank Lock | Emitter`)
      .setDescription(`${rblxUserName} is now rank locked to **${rblxUserRankInBAname}** (${rblxUserRankInBAid})`)
      .setFooter(`Rank locked by - ${message.author.id}`)
    return message.channel.send(oofEmbed).then(message => message.delete(25000));
  }
  if (message.content.startsWith(prefix + "restart")){
    if (message.author.id !== `196721770542137345` && message.author.id !== `114081086065213443`) return;
    var sucessEmbed = new Discord.RichEmbed()
      .setColor(0xff6b6b)
      .setDescription(`Restarted bot master, ${message.author}!`)
    message.channel.send(sucessEmbed).then(message => message.delete(10000))
    process.exit(0);
  }
  // DEVELOPER COMMANDS [END]

  if (message.member.roles.exists('name', 'Verified')){
    var { body } = await snekfetch.get(`https://verify.eryn.io/api/user/${message.author.id}`)
    var userName = body.robloxUsername
    var { body } = await snekfetch.get(`http://api.roblox.com/users/get-by-username?username=${userName}`);
    message.member.setNickname(`${body.Username}`)
  }


});

aegisAutomation.login(`${token}`);

aegisAutomation.on('error', console.error);
