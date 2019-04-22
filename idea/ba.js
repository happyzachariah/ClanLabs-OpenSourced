const token = 'BOT_TOKEN'
const Discord = require('discord.js');
const baAutomation = new Discord.Client();
const prefix = "!"
const snekfetch = require('snekfetch');
const rbx = require('noblox.js');
let cooldown = new Set();
let cdSeconds = 5;
// SHOUT SHIT START
const bloxy = require('bloxy');
const roblox = new bloxy({
  cookie: "RBLX_COOKIE"
})
roblox.login().then(function() { console.log("should've logged in by now")});
// SHOUT SHIT END

var firebase = require("firebase");
var baseURL = "https://firebaseStuff/";
var admin = require("firebase-admin");
var serviceAccount = require("./firebasekey.json");
var config = {/*
  CONFIG GOES HERE
  */
};
firebase.initializeApp(config)

var cleverbot = require("cleverbot.io"),
bot = new cleverbot("no", "ya");
bot.setNick("baAutomation");

const sql = require("sqlite");
sql.open("./database.sqlite");
// idk why i used sqlite but stick with firebase or go to mongo lol


// READY EVENT [START]
baAutomation.on('ready', () => {
  console.log('Turned on Discord bot');
  baAutomation.user.setActivity(`${baAutomation.users.size} soldiers | !commands`, { type: 'WATCHING' })
  baAutomation.user.setAvatar('https://cdn.discordapp.com/attachments/502568121526124556/543655707480948776/discord.png')
  var embed = new Discord.RichEmbed()
    .setColor(`RANDOM`)
    .setDescription(`Restarted normal processes!`)
  baAutomation.channels.get(baAutomation.channels.get('538224559850258433').id).send(embed)
})
// READY EVENT [END]

// MESSAGE EVERY USER THAT JOINS [START]
baAutomation.on('guildMemberAdd', async (member) =>{
  if (member.guild === "116394307014885379"){
    if (member.user.bot) return undefined;
    if (member.id === '502614584134467625') return;
    var rblxUsernameFetcher = await sql.get(`SELECT * FROM rblxUsernameDB WHERE userID ="${member.id}"`);
    if (!rblxUsernameFetcher){
      var helloEmbed = new Discord.RichEmbed()
      .setTitle(`Information`)
      .setDescription(`Hey there, **${member}**\nWelcome to the |BA| British Army Discord. Happy to see you've joined us!\n\nPlease verify your Discord and connect it to your ROBLOX account by going to the #verification channel in the |BA| discord and running
  **!verify username**\n\nWhere the word username will be replaced by your ROBLOX username.\n\nClick our name below and join our group if you haven't already!
  [<:british_army_logo:537514889741205515> British Army](https://www.roblox.com/My/Groups.aspx?gid=2621202)\n\n[If you have any issues please watch our verification tutorial by clicking here](https://youtu.be/Ry1i5JPI6W4)\n\nFor assistance with any questions, comments or concerns please say **!help** in any of our chats and one of our helpful team members will assist you.`)
      return member.send({embed: helloEmbed});
    }else{
      var rankID = await rbx.getRankInGroup(2621202, `${rblxUsernameFetcher.rblxUsername}`)
      var { body } = await snekfetch.get(`http://api.roblox.com/users/get-by-username?username=${rblxUsernameFetcher.rblxUsername}`);

      if (rankID === 0){
        var embed = new Discord.RichEmbed()
          .setTitle(`Verification Information | Emitter`)
          .setDescription(`Remember me, ${body.Username}?\nIf not, I totally understand.  I just wanted to let you know that you've already verified your ROBLOX account with me!\n\nAnyways, according to the information I'm looking at, you're not in the [British Army](https://www.roblox.com/My/Groups.aspx?gid=2621202) group owned by Marcuses.`)
          .addField(`Different Account?`, `Perhaps you wanted to verify under a different ROBLOX account!  Simply chat **\`!remove\`** then **\`!verify rblxUsername\`** where **rblxUsername** is the new ROBLOX account you wish to verify under!`)
        return member.send(embed);
      }else{
        var okayLetsTry = await rbx.getIdFromUsername(`${rblxUsernameFetcher.rblxUsername}`)
        var firstCheck = await rbx.getRankInGroup(2621202, okayLetsTry)

        var SASRole = await rbx.getRankInGroup(2622548, okayLetsTry)
        var PARASRole = await rbx.getRankInGroup(2623485, okayLetsTry)
        var GHURKASRole = await rbx.getRankInGroup(3283689, okayLetsTry)
        var AACRole = await rbx.getRankInGroup(2950117, okayLetsTry)
        var RMPRole = await rbx.getRankInGroup(2630460, okayLetsTry)
        var TCPRole = await rbx.getRankInGroup(4598236, okayLetsTry);
        var SRRRole = await rbx.getRankInGroup(4596871, okayLetsTry);
        var BOPRole = await rbx.getRankInGroup(4117083, okayLetsTry);

        var { body } = await snekfetch.get(`http://api.roblox.com/users/get-by-username?username=${rblxUsernameFetcher.rblxUsername}`);
        var okayLetsTry = await rbx.getIdFromUsername(`${body.Username}`)
        var firstCheck = await rbx.getRankInGroup(2621202, okayLetsTry)
        var SASRole = await rbx.getRankInGroup(2622548, okayLetsTry)
        var PARASRole = await rbx.getRankInGroup(2623485, okayLetsTry)
        var GHURKASRole = await rbx.getRankInGroup(3283689, okayLetsTry)
        var AACRole = await rbx.getRankInGroup(2950117, okayLetsTry)
        var RMPRole = await rbx.getRankInGroup(2630460, okayLetsTry)
        var TCPRole = await rbx.getRankInGroup(4598236, okayLetsTry);
        var SRRRole = await rbx.getRankInGroup(4596871, okayLetsTry);
        var BOPRole = await rbx.getRankInGroup(4117083, okayLetsTry);


        if (TCPRole === 0){
          await member.removeRole(member.guild.roles.find(role => role.name === "TCP"))
        }
        if (SRRRole === 0){
          await member.removeRole(member.guild.roles.find(role => role.name === "SRR"))
        }
        if (BOPRole === 0){
          await member.removeRole(member.guild.roles.find(role => role.name === "BOP"))
        }
        if (SASRole === 0){
          await member.removeRole(member.guild.roles.find(role => role.name === "SAS"))
        }
        if (PARASRole === 0){
          await member.removeRole(member.guild.roles.find(role => role.name === "PARAS"))
        }
        if (GHURKASRole === 0){
          await member.removeRole(member.guild.roles.find(role => role.name === "GURKHAS"))
        }
        if (AACRole === 0){
          await member.removeRole(member.guild.roles.find(role => role.name === "AAC"))
        }
        if (RMPRole === 0){
          await member.removeRole(member.guild.roles.find(role => role.name === "RMP"))
        }
        if ((BOPRole > 0) && (!member.member.roles.exists('name', 'BOP'))){
          await member.addRole(member.guild.roles.find(role => role.name === "BOP"))
        }
        if ((SRRRole > 0) && (!member.member.roles.exists('name', 'SRR'))){
          await member.addRole(member.guild.roles.find(role => role.name === "SRR"))
        }
        if ((TCPRole >= 125) && (!member.member.roles.exists('name', 'TCP'))){
          await member.addRole(member.guild.roles.find(role => role.name === "TCP"))
        }
        if ((SASRole > 0) && (!member.member.roles.exists('name', 'SAS'))){
          await member.addRole(member.guild.roles.find(role => role.name === "SAS"))
        }
        if ((PARASRole > 0) && (!member.member.roles.exists('name', 'PARAS'))){
          await member.addRole(member.guild.roles.find(role => role.name === "PARAS"))
        }
        if ((GHURKASRole > 0) && (!member.member.roles.exists('name', 'GHURKAS'))){
          await member.addRole(member.guild.roles.find(role => role.name === "GURKHAS"))
        }
        if ((AACRole > 0) && (!member.member.roles.exists('name', 'AAC'))){
          await member.addRole(member.guild.roles.find(role => role.name === "AAC"))
        }
        if ((RMPRole > 0) && (!member.member.roles.exists('name', 'RMP'))){
          await member.addRole(member.guild.roles.find(role => role.name === "RMP"))
        }
        if (firstCheck > 0){
          await member.addRole(member.guild.roles.find(role => role.name === "VERIFIED"));
        }
        if (firstCheck === 0){
           await member.removeRole(member.guild.roles.find(role => role.name === "DEVELOPER"))
           await member.removeRole(member.guild.roles.find(role => role.name === "VERIFIED"))
           await member.removeRole(member.guild.roles.find(role => role.name === "LOW RANK"))
           await member.removeRole(member.guild.roles.find(role => role.name === "MIDDLE RANK"))
           await member.removeRole(member.guild.roles.find(role => role.name === "HIGH RANK"))
           await member.removeRole(member.guild.roles.find(role => role.name === "CHIEF RANK"))
        }
        if (236<=firstCheck && firstCheck <= 255){
           await member.removeRole(member.guild.roles.find(role => role.name === "DEVELOPER"))
           await member.removeRole(member.guild.roles.find(role => role.name === "LOW RANK"))
           await member.removeRole(member.guild.roles.find(role => role.name === "MIDDLE RANK"))
           await member.removeRole(member.guild.roles.find(role => role.name === "HIGH RANK"))
           await member.addRole(member.guild.roles.find(role => role.name === "CHIEF RANK"))
           await member.addRole(member.guild.roles.find(role => role.name === "VERIFIED"))
        }
        if (firstCheck === 235){
           await member.removeRole(member.guild.roles.find(role => role.name === "LOW RANK"))
           await member.removeRole(member.guild.roles.find(role => role.name === "MIDDLE RANK"))
           await member.removeRole(member.guild.roles.find(role => role.name === "CHIEF RANK"))
           await member.removeRole(member.guild.roles.find(role => role.name === "HIGH RANK"))
           await member.addRole(member.guild.roles.find(role => role.name === "DEVELOPER"))
           await member.addRole(member.guild.roles.find(role => role.name === "VERIFIED"))
        }
        if (160<=firstCheck && firstCheck <= 210){
           await member.removeRole(member.guild.roles.find(role => role.name === "DEVELOPER"))
           await member.removeRole(member.guild.roles.find(role => role.name === "LOW RANK"))
           await member.removeRole(member.guild.roles.find(role => role.name === "MIDDLE RANK"))
           await member.removeRole(member.guild.roles.find(role => role.name === "CHIEF RANK"))
           await member.addRole(member.guild.roles.find(role => role.name === "VERIFIED"))
           await member.addRole(member.guild.roles.find(role => role.name === "HIGH RANK"))
        }
        if (130<=firstCheck && firstCheck <= 145){
           await member.removeRole(member.guild.roles.find(role => role.name === "LOW RANK"))
           await member.removeRole(member.guild.roles.find(role => role.name === "DEVELOPER"))
           await member.removeRole(member.guild.roles.find(role => role.name === "HIGH RANK"))
           await member.removeRole(member.guild.roles.find(role => role.name === "CHIEF RANK"))
           await member.addRole(member.guild.roles.find(role => role.name === "VERIFIED"))
           await member.addRole(member.guild.roles.find(role => role.name === "MIDDLE RANK"))
        }
        if (firstCheck === 115){
           await member.removeRole(member.guild.roles.find(role => role.name === "DEVELOPER"))
           await member.removeRole(member.guild.roles.find(role => role.name === "LOW RANK"))
           await member.removeRole(member.guild.roles.find(role => role.name === "MIDDLE RANK"))
           await member.removeRole(member.guild.roles.find(role => role.name === "HIGH RANK"))
           await member.removeRole(member.guild.roles.find(role => role.name === "CHIEF RANK"))
           await member.addRole(member.guild.roles.find(role => role.name === "DIPLOMAT"))
           await member.addRole(member.guild.roles.find(role => role.name === "VERIFIED"))
        }
        if (1<=firstCheck && firstCheck <= 100){
          await member.removeRole(member.guild.roles.find(role => role.name === "DEVELOPER"))
          await member.removeRole(member.guild.roles.find(role => role.name === "MIDDLE RANK"))
          await member.removeRole(member.guild.roles.find(role => role.name === "HIGH RANK"))
          await member.removeRole(member.guild.roles.find(role => role.name === "CHIEF RANK"))
          await member.addRole(member.guild.roles.find(role => role.name === "LOW RANK"))
          await member.addRole(member.guild.roles.find(role => role.name === "VERIFIED"))
        }
        if (firstCheck === 1) {
          member.setNickname(`[REC] ${body.Username}`);
        }
        if (firstCheck === 10) {
          member.setNickname(`[PVT] ${body.Username}`);
        }
        if (firstCheck === 25) {
          member.setNickname(`[LCPL] ${body.Username}`);
        }
        if (firstCheck === 40) {
          member.setNickname(`[CPL] ${body.Username}`);
        }
        if (firstCheck === 55) {
          member.setNickname(`[SGT] ${body.Username}`);
        }
        if (firstCheck === 70) {
          member.setNickname(`[SSGT] ${body.Username}`);
        }
        if (firstCheck === 85) {
          member.setNickname(`[SGM] ${body.Username}`);
        }
        if (firstCheck === 100) {
          member.setNickname(`[WO] ${body.Username}`);
        }
        if (firstCheck === 115) {
          member.setNickname(`[ALLY] ${body.Username}`);
        }
        if (firstCheck === 130) {
          member.setNickname(`[LT] ${body.Username}`);
        }
        if (firstCheck === 145) {
          member.setNickname(`[CPT] ${body.Username}`);
        }
        if (firstCheck === 160) {
          member.setNickname(`[MAJ] ${body.Username}`);
        }
        if (firstCheck === 175) {
          member.setNickname(`[LTCOL] ${body.Username}`);
        }
        if (firstCheck === 190) {
          member.setNickname(`[COL] ${body.Username}`);
        }
        if (firstCheck === 205) {
          member.setNickname(`[BRIG] ${body.Username}`);
        }
        if (firstCheck === 220) {
          member.setNickname(`[LTGEN] ${body.Username}`);
        }
        if (firstCheck === 235) {
          member.setNickname(`[DEV] ${body.Username}`);
        }
        if (firstCheck === 250) {
          member.setNickname(`[CDEV] ${body.Username}`);
        }
        if (firstCheck === 255) {
          member.setNickname(`[GEN] ${body.Username}`);
        }

        var embed = new Discord.RichEmbed()
          .setTitle(`Verification Information | Emitter`)
          .setDescription(`Remember me, ${body.Username}?\nIf not, I totally understand.  I just wanted to let you know that you've already verified your ROBLOX account with me and I've successfully updated all of your roles!`)
          .addField(`Different Account?`, `Perhaps you wanted to verify under a different ROBLOX account!  Simply chat **\`!remove\`** then **\`!verify rblxUsername\`** where **rblxUsername** is the new ROBLOX account you wish to verify under!`)
        return member.send(embed);
      }
    }
  }
  if (member.guild === `553047195507621890`){
    if (member.user.bot) return undefined;
    if (member.id === '502614584134467625') return;
    var regimentalGroupID = await roblox.getGroup(4598236) // TCP GROUP

    var rblxUsernameFetcher = await sql.get(`SELECT * FROM rblxUsernameDB WHERE userID ="${member.id}"`);
    if (!rblxUsernameFetcher){
      var embed = new Discord.RichEmbed()
        .setColor(0xff6b6b)
        .setAuthor(`Verification Error`, "https://cdn.discordapp.com/attachments/502568121526124556/543673170176245797/baliontransparent.png")
        .setDescription(`Sorry ${member}, but for me to process you through correctly, you must verify yourself with me in the main British Army Discord server.\ndiscord.gg/f42JjaR`)
      await member.send(embed)
      member.kick()
      return undefined;
    }
    var { body } = await snekfetch.get(`http://api.roblox.com/users/get-by-username?username=${rblxUsernameFetcher.rblxUsername}`);
    var okayLetsTry = await rbx.getIdFromUsername(rblxUsernameFetcher.rblxUsername)
    var mainGroup = await rbx.getRankInGroup(2621202, okayLetsTry) // MAIN GROUP
    var regimentalGroup = await rbx.getRankInGroup(4598236, okayLetsTry) // TCP GROUP

    if (mainGroup === 0 && regimentalGroup > 0){
      regimentalGroupID.exile(okayLetsTry)
      var embed = new Discord.RichEmbed()
        .setColor(0xff6b6b)
        .setAuthor(`Verification Error`, "https://cdn.discordapp.com/attachments/502568121526124556/543673170176245797/baliontransparent.png")
        .setDescription(`${member} has been kicked from this server because the user has left BA, but was still in the regimental group.\n**The user was exiled from the regiment associated with this Discord server!**`)
      await member.send(embed)
      member.kick()
      return undefined;
    }

    if (mainGroup === 1) {
      member.setNickname(`[REC] ${body.Username}`);
    }
    if (mainGroup === 10) {
      member.setNickname(`[PVT] ${body.Username}`);
    }
    if (mainGroup === 25) {
      member.setNickname(`[LCPL] ${body.Username}`);
    }
    if (mainGroup === 40) {
      member.setNickname(`[CPL] ${body.Username}`);
    }
    if (mainGroup === 55) {
      member.setNickname(`[SGT] ${body.Username}`);
    }
    if (mainGroup === 70) {
      member.setNickname(`[SSGT] ${body.Username}`);
    }
    if (mainGroup === 85) {
      member.setNickname(`[SGM] ${body.Username}`);
    }
    if (mainGroup === 100) {
      member.setNickname(`[WO] ${body.Username}`)
    }
    if (mainGroup === 115) {
      member.setNickname(`[ALLY] ${body.Username}`)
    }
    if (mainGroup === 130) {
      member.setNickname(`[LT] ${body.Username}`)
    }
    if (mainGroup === 145) {
      member.setNickname(`[CPT] ${body.Username}`)
    }
    if (mainGroup === 160) {
      member.setNickname(`[MAJ] ${body.Username}`)
    }
    if (mainGroup === 175) {
      member.setNickname(`[LTCOL] ${body.Username}`)
    }
    if (mainGroup === 190) {
      member.setNickname(`[COL] ${body.Username}`)
    }
    if (mainGroup === 205) {
      member.setNickname(`[BRIG] ${body.Username}`)
    }
    if (mainGroup === 220) {
      member.setNickname(`[LTGEN] ${body.Username}`)
    }
    if (mainGroup === 235) {
      member.setNickname(`[DEV] ${body.Username}`)
    }
    if (mainGroup === 250) {
      member.setNickname(`[CDEV] ${body.Username}`)
    }
    if (mainGroup === 255) {
      member.setNickname(`[GEN] ${body.Username}`)
    }

    if (regimentalGroup >= 50){
      await member.setRoles()
      member.addRole(member.guild.roles.find(role => role.name === "Instructor School"))
    }
    if (regimentalGroup === 100){
      await member.setRoles()
      member.addRole(member.guild.roles.find(role => role.name === "Junior Directing Staff"))
    }
    if (regimentalGroup === 125){
      await member.setRoles()
      member.addRole(member.guild.roles.find(role => role.name === "Directing Staff"))
    }
    if (regimentalGroup === 150){
      await member.setRoles()
      member.addRole(member.guild.roles.find(role => role.name === "Senior Directing Staff"))
    }
    if (regimentalGroup === 175){
      await member.setRoles()
      member.addRole(member.guild.roles.find(role => role.name === "Head Directing Staff"))
    }
    if (regimentalGroup === 200){
      await member.setRoles()
      member.addRole(member.guild.roles.find(role => role.name === "Executive"))
    }
    if (regimentalGroup === 225){
      await member.setRoles()
      member.addRole(member.guild.roles.find(role => role.name === "Commander"))
    }
    if (regimentalGroup >= 250){
      await member.setRoles()
      member.addRole(member.guild.roles.find(role => role.name === "Chief"))
    }
  }
})
// MESSAGE EVERY USER THAT JOINS [START]

baAutomation.on('message', async message => {


  // REQUIRED START RETURNS [START]
  if (message.author.baAutomation) return;
  if (message.channel.type === 'dm') return;
  if (message.guild.id !== '116394307014885379' && message.guild.id !== `553047195507621890`){
    var embed = new Discord.RichEmbed()
      .setDescription(`**Sorry ${message.guild.owner}, but this guild is no longer supported by the services provided by <@114081086065213443>!**`)
    return message.channel.send(embed);
  }
  // REQUIRED START RETURNS [END]


  // ROLES & DATA REQUIRED [START]
  const args = message.content.split(/[ ]+/) // TO SPLIT FROM THE STARTER ARGUMENT
  const verifiedRole = message.guild.roles.find(role => role.name === "VERIFIED");
  const supportTeamRole = message.guild.roles.find(role => role.name === "CHIEF RANK");
  const patrolTeamRole = message.guild.roles.find(role => role.name === "PATROL");
  const groupID = 2621202 // groupID
  const groupIDB = await roblox.getGroup(2621202) // MAIN GROUP
  const verificationCode = ['apple', 'rain', 'dog', 'cat', 'food','yum','pizza','raindrop','snow','birthday','cake','burger','soda','ice','no','yes','orange','pear','plum'];
  const promoLOGS = baAutomation.channels.get('521498266710573074')
  // ROLES & DATA REQUIRED [END]

  // USERNAME TRACKER DATABASE [START]
  sql.get(`SELECT * FROM rblxUsernameDB WHERE userID = "${message.author.id}"`).then(row => {
      }).catch(() => {
        sql.run("CREATE TABLE IF NOT EXISTS rblxUsernameDB (userID TEXT, rblxUsername TEXT)").then(() => {
          sql.run("INSERT INTO rblxUsernameDB (userID, rblxUsername) VALUES (?, ?)", [message.author.id, 'ROBLOX']);
        });
      });
  // USERNAME TRACKER DATABASE [END]

  // VERIFICATION & UPDATE & REMOVE FROM DB [START]
  if (message.content.toLowerCase().startsWith(prefix + "verify")){
    if (message.channel.id !== '116394307014885379') return undefined;
    message.delete();
    if (!message.guild.members.get(baAutomation.user.id).hasPermission("MANAGE_NICKNAMES")){
      var errorEmbed = new Discord.RichEmbed()
      .setColor(0xf74e4e)
      .setDescription(`I can't continue because someone forgot to give me the permission to manage nicknames!`)

      message.channel.send(errorEmbed).then(message => message.delete(30000));
      return undefined;
    }
    if (!message.guild.members.get(baAutomation.user.id).hasPermission("CHANGE_NICKNAME")){
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
    if (message.member.roles.exists('name', 'VERIFIED')) {
      var errorEmbed = new Discord.RichEmbed()
      .setColor(0xf74e4e)
      .setDescription(`Sorry but you're already verified!`)
      message.channel.send(errorEmbed).then(message => message.delete(30000));
      return undefined;
    }
    var rblxUsernameFetcher = await sql.get(`SELECT * FROM rblxUsernameDB WHERE userID ="${message.author.id}"`);
    if (rblxUsernameFetcher){
      const goodMessage = new Discord.RichEmbed()
        .setColor(0x3eff97)
        .setAuthor(`Database | Emitter`, "https://cdn.discordapp.com/attachments/502568121526124556/543673170176245797/baliontransparent.png")
        .setDescription(`Successfully found you via the database!\nPlease chat anything below and I'll do the rest from there ;)\n\nIf you wish to verify as someone else, first run **!remove** then **!verify [username]**`)
      return message.reply(goodMessage).then(message => message.delete(10000));
    }
    if (!args[1]){
      var errorEmbed = new Discord.RichEmbed()
      .setColor(0xf74e4e)
      .setDescription(`Who do you expect me to verify you as?\n**Example**\n${prefix}verify ROBLOX`)

      message.channel.send(errorEmbed).then(message => message.delete(30000));
      return undefined;
    }

    var { body } = await snekfetch.get("http://api.roblox.com/users/get-by-username?username=" + args[1])
    if (body.errorMessage === "User not found"){
      var errorEmbed = new Discord.RichEmbed()
      .setColor(0xf74e4e)
      .setDescription(`Could you please give me a **real** ROBLOX username? :rolling_eyes:`)

      message.channel.send(errorEmbed).then(message => message.delete(30000));
      return undefined;
    }

    var rblxUsernameCURRENT = await sql.get(`SELECT * FROM rblxUsernameDB WHERE rblxUsername="${body.Username}"`)
    if (rblxUsernameCURRENT){
      message.channel.send(`${message.author}, sorry that ROBLOX username is already linked with another Discord account (<@${rblxUsernameCURRENT.userID}>)!`).then(message => message.delete(10000));
      return undefined;
    }

    var numberVerification1 = verificationCode[Math.floor(Math.random() * verificationCode.length)];
    var numberVerification2 = verificationCode[Math.floor(Math.random() * verificationCode.length)];
    var numberVerification3 = verificationCode[Math.floor(Math.random() * verificationCode.length)];
    var numberVerification4 = verificationCode[Math.floor(Math.random() * verificationCode.length)];
    const statusCode = [`RBLX-${numberVerification1} ${numberVerification2} ${numberVerification3} ${numberVerification4}`]
    const token = statusCode[Math.floor(Math.random() * statusCode.length)];
    console.log('works here1')
    const goodMessage = new Discord.RichEmbed()
    .setColor(0x3eff97)
    .setTitle(`Verification`)
    .setDescription(`Profile: https://web.roblox.com/users/${body.Id}/profile\n\nReplace your current status with: **${token}**\n\n\n` + "**Chat `done` in __here__ to me when you've changed your status successfully!**")

    const uhOhEmbed = new Discord.RichEmbed()
      .setColor(0xf74e4e)
      .setTitle(`Error Notice`)
      .setDescription(`${message.author}, I could not direct message you!\n\n**Please go online (on Discord) and allow direct messages from me!!**`)

    const location = await message.author.send(goodMessage).then(msg => msg.channel).catch(() => {
      return message.reply(uhOhEmbed).then(message => message.delete(30000));
    })
    const timeCollectionThing = { max: 1, time: 300000, errors: ['time'] };
    const collected = await location.awaitMessages(response => message.author === response.author && response.content === 'done', timeCollectionThing).catch(() => null);
    if (!collected) {
      var errorEmbed = new Discord.RichEmbed()
      .setColor(0xf74e4e)
      .setDescription(`I've waited patiently for five minutes and you didn't finish the process.`)

      return message.author.send(errorEmbed)
    }
    const blurb1 = await rbx.getStatus(await rbx.getIdFromUsername(args[1]));
    const blurb2 = await rbx.getBlurb(await rbx.getIdFromUsername(args[1]));
    var nicknames = await rbx.getIdFromUsername(args[1]); // elitesilentsword > numbers
    var nicknames2 = await rbx.getUsernameFromId(nicknames)// numbers > string (username)
    var okayLetsTry = await rbx.getIdFromUsername(args[1])
    var firstCheck = await rbx.getRankInGroup(2621202, okayLetsTry)

    // REGIMENTS [START]
    var SASRole = await rbx.getRankInGroup(2622548, okayLetsTry)
    var PARASRole = await rbx.getRankInGroup(2623485, okayLetsTry)
    var GHURKASRole = await rbx.getRankInGroup(3283689, okayLetsTry)
    var AACRole = await rbx.getRankInGroup(2950117, okayLetsTry)
    var RMPRole = await rbx.getRankInGroup(2630460, okayLetsTry)
    var TCPRole = await rbx.getRankInGroup(4598236, okayLetsTry);
    var SRRRole = await rbx.getRankInGroup(4596871, okayLetsTry);
    var BOPRole = await rbx.getRankInGroup(4117083, okayLetsTry);
    // REGIMENTS [END]

    // ALLIED ROLES [START]
    var ROKARole = await rbx.getRankInGroup(3828960, okayLetsTry);
    var UAFRole = await rbx.getRankInGroup(80738, okayLetsTry);
    var SAFRole = await rbx.getRankInGroup(3377358, okayLetsTry);
    // ALLIED ROLES [END]


    if (blurb1 === token || blurb2 === token) {
      console.log(firstCheck)
      if (firstCheck > 0) {
        await message.member.addRole(message.guild.roles.find(role => role.name === "VERIFIED"))
        await message.member.addRole(message.guild.roles.find(role => role.name === "LOW RANK"))
        message.author.send(`:confetti_ball: ${message.author}, welcome to the family! :confetti_ball: `).then(message => message.delete(5000));
        sql.run(`INSERT INTO rblxUsernameDB (userID, rblxUsername) VALUES (?, ?)`, [message.author.id, nicknames2]);
        if (1<=firstCheck && firstCheck <= 100){
         await message.member.addRole(message.guild.roles.find(role => role.name === "LOW RANK"))
         await message.member.removeRole(message.guild.roles.find(role => role.name === "MIDDLE RANK"))
         await message.member.removeRole(message.guild.roles.find(role => role.name === "HIGH RANK"))
         await message.member.removeRole(message.guild.roles.find(role => role.name === "CHIEF RANK"))
        }
        if (firstCheck == 115){
          await message.member.addRole(message.guild.roles.find(role => role.name === "DIPLOMAT"))
          await message.member.removeRole(message.guild.roles.find(role => role.name === "LOW RANK"))
          await message.member.removeRole(message.guild.roles.find(role => role.name === "MIDDLE RANK"))
          await message.member.removeRole(message.guild.roles.find(role => role.name === "HIGH RANK"))
          await message.member.removeRole(message.guild.roles.find(role => role.name === "CHIEF RANK"))
        }
        if (130<=firstCheck && firstCheck <= 160){

          await message.member.removeRole(message.guild.roles.find(role => role.name === "LOW RANK"))
          await message.member.removeRole(message.guild.roles.find(role => role.name === "HIGH RANK"))
          await message.member.removeRole(message.guild.roles.find(role => role.name === "CHIEF RANK"))
          await message.member.addRole(message.guild.roles.find(role => role.name === "MIDDLE RANK"))
        }
        if (175<=firstCheck && firstCheck <= 210){

          await message.member.removeRole(message.guild.roles.find(role => role.name === "LOW RANK"))
          await message.member.removeRole(message.guild.roles.find(role => role.name === "MIDDLE RANK"))
          await message.member.removeRole(message.guild.roles.find(role => role.name === "CHIEF RANK"))
          await message.member.addRole(message.guild.roles.find(role => role.name === "HIGH RANK"))
        }
        if ((firstCheck === 235) && (!message.member.roles.exists('name', 'DEVELOPER'))){
          await message.member.removeRole(message.guild.roles.find(role => role.name === "LOW RANK"))
          await message.member.removeRole(message.guild.roles.find(role => role.name === "MIDDLE RANK"))
          await message.member.removeRole(message.guild.roles.find(role => role.name === "CHIEF RANK"))
          await message.member.removeRole(message.guild.roles.find(role => role.name === "HIGH RANK"))
          await message.member.addRole(message.guild.roles.find(role => role.name === "DEVELOPER"))
          await message.member.addRole(message.guild.roles.find(role => role.name === "VERIFIED"))
        }
        if ((firstCheck === 220 || firstCheck === 250 || firstCheck === 255)){
          await message.member.addRole(message.guild.roles.find(role => role.name === "CHIEF RANK"))
          await message.member.removeRole(message.guild.roles.find(role => role.name === "DEVELOPER"))
          await message.member.removeRole(message.guild.roles.find(role => role.name === "LOW RANK"))
          await message.member.removeRole(message.guild.roles.find(role => role.name === "MIDDLE RANK"))
          await message.member.removeRole(message.guild.roles.find(role => role.name === "HIGH RANK"))
        }
        if (SRRRole > 0){
          await message.member.addRole(message.guild.roles.find(role => role.name === "SRR"))
        }
        if (BOPRole > 0){
          await message.member.addRole(message.guild.roles.find(role => role.name === "BOP"))
        }
        if (TCPRole > 0){
          await message.member.addRole(message.guild.roles.find(role => role.name === "TCP"))
        }
        if (SASRole > 0){
          await message.member.addRole(message.guild.roles.find(role => role.name === "SAS"))
        }
        if (PARASRole > 0){
          await message.member.addRole(message.guild.roles.find(role => role.name === "PARAS"))
        }
        if (GHURKASRole > 0){
          await message.member.addRole(message.guild.roles.find(role => role.name === "GURKHAS"))
        }
        if (AACRole > 0){
          await message.member.addRole(message.guild.roles.find(role => role.name === "AAC"))
        }
        if (RMPRole > 0){
          await message.member.addRole(message.guild.roles.find(role => role.name === "RMP"))
        }
        if (firstCheck === 1){
          message.member.setNickname(`[REC] ${nicknames2}`);
        }
        if (firstCheck === 10){
          message.member.setNickname(`[PVT] ${nicknames2}`);
        }
        if (firstCheck === 25){
          message.member.setNickname(`[LCPL] ${nicknames2}`);
        }
        if (firstCheck === 40){
          message.member.setNickname(`[CPL] ${nicknames2}`);
        }
        if (firstCheck === 55){
          message.member.setNickname(`[SGT] ${nicknames2}`);
        }
        if (firstCheck === 70){
          message.member.setNickname(`[SSGT] ${nicknames2}`);
        }
        if (firstCheck === 85){
          message.member.setNickname(`[SGM] ${nicknames2}`);
        }
        if (firstCheck === 100){
           message.member.setNickname(`[WO] ${nicknames2}`)
         }
        if (firstCheck === 115){
           message.member.setNickname(`[ALLY] ${nicknames2}`)
         }
        if (firstCheck === 130){
           message.member.setNickname(`[LT] ${nicknames2}`)
         }
        if (firstCheck === 145){
           message.member.setNickname(`[CPT] ${nicknames2}`)
         }
        if (firstCheck === 160){
           message.member.setNickname(`[MAJ] ${nicknames2}`)
         }
        if (firstCheck === 175){
           message.member.setNickname(`[LTCOL] ${nicknames2}`)
         }
        if (firstCheck === 190){
           message.member.setNickname(`[COL] ${nicknames2}`)
         }
        if (firstCheck === 205){
           message.member.setNickname(`[BRIG] ${nicknames2}`)
         }
        if (firstCheck === 220){
           message.member.setNickname(`[LTGEN] ${nicknames2}`)
         }
        if (firstCheck === 235){
           message.member.setNickname(`[DEV] ${nicknames2}`)
         }
        if (firstCheck === 250){
           message.member.setNickname(`[CDEV] ${nicknames2}`)
         }
        if (firstCheck === 255){
           message.member.setNickname(`[GEN] ${nicknames2}`)
         }
        return undefined;
      }
      if (ROKARole > 2){
        await message.member.addRole(message.guild.roles.find(role => role.name === "VERIFIED"))
        message.member.setNickname(`[ROKA] ${nicknames2}`)
        return undefined;
      }
      if (UAFRole > 3){
        await message.member.addRole(message.guild.roles.find(role => role.name === "VERIFIED"))
        message.member.setNickname(`[UAF] ${nicknames2}`)
        return undefined;
      }
      if (SAFRole > 10){
        await message.member.addRole(message.guild.roles.find(role => role.name === "VERIFIED"))
        message.member.setNickname(`[SAF] ${nicknames2}`)
        return undefined;
      }
      return message.channel.send(`${message.author}, you're not in the group!\n**Join the group and reverify yourself!**`).then(message => message.delete(10000));
    }
    else{
      var errorEmbed = new Discord.RichEmbed()
      .setColor(0xf74e4e)
      .setDescription(`I couldn't find the code on your ROBLOX status!`)

      return message.author.send(errorEmbed);
    }
  }
  if (message.content.toLowerCase().startsWith(prefix + "remove")){
    if ((message.channel.id === '116394307014885379')){
      message.delete();
    }
    var rblxUsernameFetcher = await sql.get(`SELECT * FROM rblxUsernameDB WHERE userID ="${message.author.id}"`);
    if (!rblxUsernameFetcher){
      message.member.setRoles()
      return message.channel.send(`${message.author}, removed!`).then(message => message.delete(10000));
    }
    sql.run(`DELETE FROM rblxUsernameDB WHERE userID=${message.author.id}`)
    message.channel.send(`${message.author}, removed you from the database!`).then(message => message.delete(10000));
    return message.member.setRoles();
  }
  if (message.content.toLowerCase().startsWith(prefix + "update")){
    message.delete()
    if (message.mentions.users.size === 0){
      var rblxUsernameFetcher = await sql.get(`SELECT * FROM rblxUsernameDB WHERE userID ="${message.author.id}"`);
      if (!rblxUsernameFetcher){
        message.channel.send(`${message.author}, you're **not** in the database silly!\nPlease verify yourself first!`).then(message => message.delete(10000));
        return undefined;
      }

      var okayLetsTry = await rbx.getIdFromUsername(`${rblxUsernameFetcher.rblxUsername}`)
      var firstCheck = await rbx.getRankInGroup(2621202, okayLetsTry)

      var SASRole = await rbx.getRankInGroup(2622548, okayLetsTry)
      var PARASRole = await rbx.getRankInGroup(2623485, okayLetsTry)
      var GHURKASRole = await rbx.getRankInGroup(3283689, okayLetsTry)
      var AACRole = await rbx.getRankInGroup(2950117, okayLetsTry)
      var RMPRole = await rbx.getRankInGroup(2630460, okayLetsTry)
      var TCPRole = await rbx.getRankInGroup(4598236, okayLetsTry);
      var SRRRole = await rbx.getRankInGroup(4596871, okayLetsTry);
      var BOPRole = await rbx.getRankInGroup(4117083, okayLetsTry);

      var rblxUsernameFetcher = await sql.get(`SELECT * FROM rblxUsernameDB WHERE userID ="${message.author.id}"`);
      var { body } = await snekfetch.get(`http://api.roblox.com/users/get-by-username?username=${rblxUsernameFetcher.rblxUsername}`);
      var okayLetsTry = await rbx.getIdFromUsername(`${body.Username}`)
      var firstCheck = await rbx.getRankInGroup(2621202, okayLetsTry)
      var SASRole = await rbx.getRankInGroup(2622548, okayLetsTry)
      var PARASRole = await rbx.getRankInGroup(2623485, okayLetsTry)
      var GHURKASRole = await rbx.getRankInGroup(3283689, okayLetsTry)
      var AACRole = await rbx.getRankInGroup(2950117, okayLetsTry)
      var RMPRole = await rbx.getRankInGroup(2630460, okayLetsTry)
      var TCPRole = await rbx.getRankInGroup(4598236, okayLetsTry);
      var SRRRole = await rbx.getRankInGroup(4596871, okayLetsTry);
      var BOPRole = await rbx.getRankInGroup(4117083, okayLetsTry);


      if (TCPRole === 0){
        await message.member.removeRole(message.guild.roles.find(role => role.name === "TCP"))
      }
      if (SRRRole === 0){
        await message.member.removeRole(message.guild.roles.find(role => role.name === "SRR"))
      }
      if (BOPRole === 0){
        await message.member.removeRole(message.guild.roles.find(role => role.name === "BOP"))
      }
      if (SASRole === 0){
        await message.member.removeRole(message.guild.roles.find(role => role.name === "SAS"))
      }
      if (PARASRole === 0){
        await message.member.removeRole(message.guild.roles.find(role => role.name === "PARAS"))
      }
      if (GHURKASRole === 0){
        await message.member.removeRole(message.guild.roles.find(role => role.name === "GURKHAS"))
      }
      if (AACRole === 0){
        await message.member.removeRole(message.guild.roles.find(role => role.name === "AAC"))
      }
      if (RMPRole === 0){
        await message.member.removeRole(message.guild.roles.find(role => role.name === "RMP"))
      }
      if ((BOPRole > 0) && (!message.member.roles.exists('name', 'BOP'))){
        await message.member.addRole(message.guild.roles.find(role => role.name === "BOP"))
      }
      if ((SRRRole > 0) && (!message.member.roles.exists('name', 'SRR'))){
        await message.member.addRole(message.guild.roles.find(role => role.name === "SRR"))
      }
      if ((TCPRole >= 125) && (!message.member.roles.exists('name', 'TCP'))){
        await message.member.addRole(message.guild.roles.find(role => role.name === "TCP"))
      }
      if ((SASRole > 0) && (!message.member.roles.exists('name', 'SAS'))){
        await message.member.addRole(message.guild.roles.find(role => role.name === "SAS"))
      }
      if ((PARASRole > 0) && (!message.member.roles.exists('name', 'PARAS'))){
        await message.member.addRole(message.guild.roles.find(role => role.name === "PARAS"))
      }
      if ((GHURKASRole > 0) && (!message.member.roles.exists('name', 'GHURKAS'))){
        await message.member.addRole(message.guild.roles.find(role => role.name === "GURKHAS"))
      }
      if ((AACRole > 0) && (!message.member.roles.exists('name', 'AAC'))){
        await message.member.addRole(message.guild.roles.find(role => role.name === "AAC"))
      }
      if ((RMPRole > 0) && (!message.member.roles.exists('name', 'RMP'))){
        await message.member.addRole(message.guild.roles.find(role => role.name === "RMP"))
      }
      if (firstCheck > 0){
        await message.member.addRole(message.guild.roles.find(role => role.name === "VERIFIED"));
      }
      if (firstCheck === 0){
         await message.member.removeRole(message.guild.roles.find(role => role.name === "DEVELOPER"))
         await message.member.removeRole(message.guild.roles.find(role => role.name === "VERIFIED"))
         await message.member.removeRole(message.guild.roles.find(role => role.name === "LOW RANK"))
         await message.member.removeRole(message.guild.roles.find(role => role.name === "MIDDLE RANK"))
         await message.member.removeRole(message.guild.roles.find(role => role.name === "HIGH RANK"))
         await message.member.removeRole(message.guild.roles.find(role => role.name === "CHIEF RANK"))
      }
      if (236<=firstCheck && firstCheck <= 255){
         await message.member.removeRole(message.guild.roles.find(role => role.name === "DEVELOPER"))
         await message.member.removeRole(message.guild.roles.find(role => role.name === "LOW RANK"))
         await message.member.removeRole(message.guild.roles.find(role => role.name === "MIDDLE RANK"))
         await message.member.removeRole(message.guild.roles.find(role => role.name === "HIGH RANK"))
         await message.member.addRole(message.guild.roles.find(role => role.name === "CHIEF RANK"))
         await message.member.addRole(message.guild.roles.find(role => role.name === "VERIFIED"))
      }
      if (firstCheck === 235){
         await message.member.removeRole(message.guild.roles.find(role => role.name === "LOW RANK"))
         await message.member.removeRole(message.guild.roles.find(role => role.name === "MIDDLE RANK"))
         await message.member.removeRole(message.guild.roles.find(role => role.name === "CHIEF RANK"))
         await message.member.removeRole(message.guild.roles.find(role => role.name === "HIGH RANK"))
         await message.member.addRole(message.guild.roles.find(role => role.name === "DEVELOPER"))
         await message.member.addRole(message.guild.roles.find(role => role.name === "VERIFIED"))
      }
      if (160<=firstCheck && firstCheck <= 210){
         await message.member.removeRole(message.guild.roles.find(role => role.name === "DEVELOPER"))
         await message.member.removeRole(message.guild.roles.find(role => role.name === "LOW RANK"))
         await message.member.removeRole(message.guild.roles.find(role => role.name === "MIDDLE RANK"))
         await message.member.removeRole(message.guild.roles.find(role => role.name === "CHIEF RANK"))
         await message.member.addRole(message.guild.roles.find(role => role.name === "VERIFIED"))
         await message.member.addRole(message.guild.roles.find(role => role.name === "HIGH RANK"))
      }
      if (130<=firstCheck && firstCheck <= 145){
         await message.member.removeRole(message.guild.roles.find(role => role.name === "LOW RANK"))
         await message.member.removeRole(message.guild.roles.find(role => role.name === "DEVELOPER"))
         await message.member.removeRole(message.guild.roles.find(role => role.name === "HIGH RANK"))
         await message.member.removeRole(message.guild.roles.find(role => role.name === "CHIEF RANK"))
         await message.member.addRole(message.guild.roles.find(role => role.name === "VERIFIED"))
         await message.member.addRole(message.guild.roles.find(role => role.name === "MIDDLE RANK"))
      }
      if (firstCheck === 115){
         await message.member.removeRole(message.guild.roles.find(role => role.name === "DEVELOPER"))
         await message.member.removeRole(message.guild.roles.find(role => role.name === "LOW RANK"))
         await message.member.removeRole(message.guild.roles.find(role => role.name === "MIDDLE RANK"))
         await message.member.removeRole(message.guild.roles.find(role => role.name === "HIGH RANK"))
         await message.member.removeRole(message.guild.roles.find(role => role.name === "CHIEF RANK"))
         await message.member.addRole(message.guild.roles.find(role => role.name === "DIPLOMAT"))
         await message.member.addRole(message.guild.roles.find(role => role.name === "VERIFIED"))
      }
      if (1<=firstCheck && firstCheck <= 100){
        await message.member.removeRole(message.guild.roles.find(role => role.name === "DEVELOPER"))
        await message.member.removeRole(message.guild.roles.find(role => role.name === "MIDDLE RANK"))
        await message.member.removeRole(message.guild.roles.find(role => role.name === "HIGH RANK"))
        await message.member.removeRole(message.guild.roles.find(role => role.name === "CHIEF RANK"))
        await message.member.addRole(message.guild.roles.find(role => role.name === "LOW RANK"))
        await message.member.addRole(message.guild.roles.find(role => role.name === "VERIFIED"))
      }


      // ALLIED ROLES [START]
      var ROKARole = await rbx.getRankInGroup(3828960, okayLetsTry);
      // ALLIED ROLES [END]

      if (firstCheck === 0 && ROKARole > 2){
        await message.member.removeRole(message.guild.roles.find(role => role.name === "DEVELOPER"))
        await message.member.removeRole(message.guild.roles.find(role => role.name === "LOW RANK"))
        await message.member.removeRole(message.guild.roles.find(role => role.name === "MIDDLE RANK"))
        await message.member.removeRole(message.guild.roles.find(role => role.name === "HIGH RANK"))
        await message.member.removeRole(message.guild.roles.find(role => role.name === "CHIEF RANK"))
        await message.member.removeRole(message.guild.roles.find(role => role.name === "DIPLOMAT"))
        await message.member.removeRole(message.guild.roles.find(role => role.name === "VERIFIED"))
        await message.member.addRole(message.guild.roles.find(role => role.name === "VERIFIED"))
        message.member.setNickname(`[ROKA] ${body.Username}`)
      }



      if (firstCheck === 1) {
        message.member.setNickname(`[REC] ${body.Username}`);
      }
      if (firstCheck === 10) {
        message.member.setNickname(`[PVT] ${body.Username}`);
      }
      if (firstCheck === 25) {
        message.member.setNickname(`[LCPL] ${body.Username}`);
      }
      if (firstCheck === 40) {
        message.member.setNickname(`[CPL] ${body.Username}`);
      }
      if (firstCheck === 55) {
        message.member.setNickname(`[SGT] ${body.Username}`);
      }
      if (firstCheck === 70) {
        message.member.setNickname(`[SSGT] ${body.Username}`);
      }
      if (firstCheck === 85) {
        message.member.setNickname(`[SGM] ${body.Username}`);
      }
      if (firstCheck === 100) {
        message.member.setNickname(`[WO] ${body.Username}`);
      }
      if (firstCheck === 115) {
        message.member.setNickname(`[ALLY] ${body.Username}`);
      }
      if (firstCheck === 130) {
        message.member.setNickname(`[LT] ${body.Username}`);
      }
      if (firstCheck === 145) {
        message.member.setNickname(`[CPT] ${body.Username}`);
      }
      if (firstCheck === 160) {
        message.member.setNickname(`[MAJ] ${body.Username}`);
      }
      if (firstCheck === 175) {
        message.member.setNickname(`[LTCOL] ${body.Username}`);
      }
      if (firstCheck === 190) {
        message.member.setNickname(`[COL] ${body.Username}`);
      }
      if (firstCheck === 205) {
        message.member.setNickname(`[BRIG] ${body.Username}`);
      }
      if (firstCheck === 220) {
        message.member.setNickname(`[LTGEN] ${body.Username}`);
      }
      if (firstCheck === 235) {
        message.member.setNickname(`[DEV] ${body.Username}`);
      }
      if (firstCheck === 250) {
        message.member.setNickname(`[CDEV] ${body.Username}`);
      }
      if (firstCheck === 255) {
        message.member.setNickname(`[GEN] ${body.Username}`);
      }

      var rblxUserID = await rbx.getIdFromUsername(`${body.Username}`)
      var currentRankID = await rbx.getRankInGroup(groupID, rblxUserID)
      var { body } = await snekfetch.get(`${baseURL}${rblxUserID}.json`);
      var sucessEmbed = new Discord.RichEmbed()
        .setColor(0x4d89ff)
        .setTitle(`Updated successfully!`)
        .setDescription(`Your roles have successfully been updated!!`)
      return message.reply(sucessEmbed).then(message => message.delete(10000));
    }else if (message.mentions.users.size === 1){
      if (!message.member.roles.exists('name', 'CHIEF RANK')) return undefined;
      var rblxUsernameFetcher = await sql.get(`SELECT * FROM rblxUsernameDB WHERE userID ="${message.mentions.users.first().id}"`);
      if (!rblxUsernameFetcher){

        message.channel.send(`${message.author}, the pinged user isn't in my database!`).then(message => message.delete(10000));
        return undefined;
      }

      var rblxUsernameFetcher = await sql.get(`SELECT * FROM rblxUsernameDB WHERE userID ="${message.mentions.users.first().id}"`);
      var { body } = await snekfetch.get(`http://api.roblox.com/users/get-by-username?username=${rblxUsernameFetcher.rblxUsername}`);
      var okayLetsTry = await rbx.getIdFromUsername(rblxUsernameFetcher.rblxUsername)
      var firstCheck = await rbx.getRankInGroup(2621202, okayLetsTry)
      var SASRole = await rbx.getRankInGroup(2622548, okayLetsTry)
      var PARASRole = await rbx.getRankInGroup(2623485, okayLetsTry)
      var GHURKASRole = await rbx.getRankInGroup(3283689, okayLetsTry)
      var AACRole = await rbx.getRankInGroup(2950117, okayLetsTry)
      var RMPRole = await rbx.getRankInGroup(2630460, okayLetsTry)
      var TCPRole = await rbx.getRankInGroup(4598236, okayLetsTry);
      var SRRRole = await rbx.getRankInGroup(4596871, okayLetsTry);
      var BOPRole = await rbx.getRankInGroup(4117083, okayLetsTry);

      if (TCPRole < 125){
        await message.guild.member(message.mentions.users.first()).removeRole(message.guild.roles.find(role => role.name === "TCP"))
      }
      if (SRRRole === 0){
        await message.guild.member(message.mentions.users.first()).removeRole(message.guild.roles.find(role => role.name === "SRR"))
      }
      if (BOPRole === 0){
        await message.guild.member(message.mentions.users.first()).removeRole(message.guild.roles.find(role => role.name === "BOP"))
      }
      if (SASRole === 0){
        await message.guild.member(message.mentions.users.first()).removeRole(message.guild.roles.find(role => role.name === "SAS"))
      }
      if (PARASRole === 0){
        await message.guild.member(message.mentions.users.first()).removeRole(message.guild.roles.find(role => role.name === "PARAS"))
      }
      if (GHURKASRole === 0){
        await message.guild.member(message.mentions.users.first()).removeRole(message.guild.roles.find(role => role.name === "GURKHAS"))
      }
      if (AACRole === 0){
        await message.guild.member(message.mentions.users.first()).removeRole(message.guild.roles.find(role => role.name === "AAC"))
      }
      if (RMPRole === 0){
        await message.guild.member(message.mentions.users.first()).removeRole(message.guild.roles.find(role => role.name === "RMP"))
      }
      if ((SASRole > 0) && (!message.guild.member(message.mentions.users.first()).roles.exists('name', 'SAS'))){
        await message.guild.member(message.mentions.users.first()).addRole(message.guild.roles.find(role => role.name === "SAS"))
      }
      if ((PARASRole > 0) && (!message.guild.member(message.mentions.users.first()).roles.exists('name', 'PARAS'))){
        await message.guild.member(message.mentions.users.first()).addRole(message.guild.roles.find(role => role.name === "PARAS"))
      }
      if ((GHURKASRole > 0) && (!message.guild.member(message.mentions.users.first()).roles.exists('name', 'GHURKAS'))){
        await message.guild.member(message.mentions.users.first()).addRole(message.guild.roles.find(role => role.name === "GURKHAS"))
      }
      if ((AACRole > 0) && (!message.guild.member(message.mentions.users.first()).roles.exists('name', 'AAC'))){
        await message.guild.member(message.mentions.users.first()).addRole(message.guild.roles.find(role => role.name === "AAC"))
      }
      if ((RMPRole > 0) && (!message.guild.member(message.mentions.users.first()).roles.exists('name', 'RMP'))){
        await message.guild.member(message.mentions.users.first()).addRole(message.guild.roles.find(role => role.name === "RMP"))
      }


      if (firstCheck === 0){
        await message.guild.member(message.mentions.users.first()).removeRole(message.guild.roles.find(role => role.name === "DEVELOPER"))
        await message.guild.member(message.mentions.users.first()).removeRole(message.guild.roles.find(role => role.name === "DIPLOMAT"))
        await message.guild.member(message.mentions.users.first()).removeRole(message.guild.roles.find(role => role.name === "VERIFIED"))
        await message.guild.member(message.mentions.users.first()).removeRole(message.guild.roles.find(role => role.name === "LOW RANK"))
        await message.guild.member(message.mentions.users.first()).removeRole(message.guild.roles.find(role => role.name === "MIDDLE RANK"))
        await message.guild.member(message.mentions.users.first()).removeRole(message.guild.roles.find(role => role.name === "HIGH RANK"))
        await message.guild.member(message.mentions.users.first()).removeRole(message.guild.roles.find(role => role.name === "CHIEF RANK"))
      }
      if (firstCheck === 220 || firstCheck === 250 || firstCheck === 255){
        await message.guild.member(message.mentions.users.first()).removeRole(message.guild.roles.find(role => role.name === "DEVELOPER"))
        await message.guild.member(message.mentions.users.first()).removeRole(message.guild.roles.find(role => role.name === "DIPLOMAT"))
        await message.guild.member(message.mentions.users.first()).removeRole(message.guild.roles.find(role => role.name === "LOW RANK"))
        await message.guild.member(message.mentions.users.first()).removeRole(message.guild.roles.find(role => role.name === "MIDDLE RANK"))
        await message.guild.member(message.mentions.users.first()).removeRole(message.guild.roles.find(role => role.name === "CHIEF RANK"))
        await message.guild.member(message.mentions.users.first()).removeRole(message.guild.roles.find(role => role.name === "HIGH RANK"))
        await message.guild.member(message.mentions.users.first()).addRole(message.guild.roles.find(role => role.name === "CHIEF RANK"))
        await message.guild.member(message.mentions.users.first()).addRole(message.guild.roles.find(role => role.name === "VERIFIED"))
      }
      if (firstCheck === 235) {
        await message.guild.member(message.mentions.users.first()).removeRole(message.guild.roles.find(role => role.name === "LOW RANK"))
        await message.guild.member(message.mentions.users.first()).removeRole(message.guild.roles.find(role => role.name === "MIDDLE RANK"))
        await message.guild.member(message.mentions.users.first()).removeRole(message.guild.roles.find(role => role.name === "CHIEF RANK"))
        await message.guild.member(message.mentions.users.first()).removeRole(message.guild.roles.find(role => role.name === "HIGH RANK"))
        await message.guild.member(message.mentions.users.first()).addRole(message.guild.roles.find(role => role.name === "DEVELOPER"))
        await message.guild.member(message.mentions.users.first()).addRole(message.guild.roles.find(role => role.name === "VERIFIED"))
      }
      if (160<=firstCheck && firstCheck <= 205){
        await message.guild.member(message.mentions.users.first()).removeRole(message.guild.roles.find(role => role.name === "DEVELOPER"))
        await message.guild.member(message.mentions.users.first()).removeRole(message.guild.roles.find(role => role.name === "LOW RANK"))
        await message.guild.member(message.mentions.users.first()).removeRole(message.guild.roles.find(role => role.name === "MIDDLE RANK"))
        await message.guild.member(message.mentions.users.first()).removeRole(message.guild.roles.find(role => role.name === "DIPLOMAT"))
        await message.guild.member(message.mentions.users.first()).removeRole(message.guild.roles.find(role => role.name === "CHIEF RANK"))
        await message.guild.member(message.mentions.users.first()).addRole(message.guild.roles.find(role => role.name === "VERIFIED"))
        await message.guild.member(message.mentions.users.first()).addRole(message.guild.roles.find(role => role.name === "HIGH RANK"))
      }
      if (130<=firstCheck && firstCheck <= 145){
        await message.guild.member(message.mentions.users.first()).addRole(message.guild.roles.find(role => role.name === "VERIFIED"))
        await message.guild.member(message.mentions.users.first()).addRole(message.guild.roles.find(role => role.name === "MIDDLE RANK"))
        await message.guild.member(message.mentions.users.first()).removeRole(message.guild.roles.find(role => role.name === "DEVELOPER"))
        await message.guild.member(message.mentions.users.first()).removeRole(message.guild.roles.find(role => role.name === "DIPLOMAT"))
        await message.guild.member(message.mentions.users.first()).removeRole(message.guild.roles.find(role => role.name === "LOW RANK"))
        await message.guild.member(message.mentions.users.first()).removeRole(message.guild.roles.find(role => role.name === "HIGH RANK"))
        await message.guild.member(message.mentions.users.first()).removeRole(message.guild.roles.find(role => role.name === "CHIEF RANK"))
      }
      if (firstCheck === 115){
        await message.guild.member(message.mentions.users.first()).addRole(message.guild.roles.find(role => role.name === "VERIFIED"))
        await message.guild.member(message.mentions.users.first()).addRole(message.guild.roles.find(role => role.name === "DIPLOMAT"))
        await message.guild.member(message.mentions.users.first()).removeRole(message.guild.roles.find(role => role.name === "LOW RANK"))
        await message.guild.member(message.mentions.users.first()).removeRole(message.guild.roles.find(role => role.name === "DEVELOPER"))
        await message.guild.member(message.mentions.users.first()).removeRole(message.guild.roles.find(role => role.name === "MIDDLE RANK"))
        await message.guild.member(message.mentions.users.first()).removeRole(message.guild.roles.find(role => role.name === "HIGH RANK"))
        await message.guild.member(message.mentions.users.first()).removeRole(message.guild.roles.find(role => role.name === "CHIEF RANK"))
      }
      if (1<=firstCheck && firstCheck <= 100){
       await message.guild.member(message.mentions.users.first()).addRole(message.guild.roles.find(role => role.name === "LOW RANK"))
       await message.guild.member(message.mentions.users.first()).addRole(message.guild.roles.find(role => role.name === "VERIFIED"))
       await message.guild.member(message.mentions.users.first()).removeRole(message.guild.roles.find(role => role.name === "MIDDLE RANK"))
       await message.guild.member(message.mentions.users.first()).removeRole(message.guild.roles.find(role => role.name === "HIGH RANK"))
       await message.guild.member(message.mentions.users.first()).removeRole(message.guild.roles.find(role => role.name === "DEVELOPER"))
       await message.guild.member(message.mentions.users.first()).removeRole(message.guild.roles.find(role => role.name === "DIPLOMAT"))
       await message.guild.member(message.mentions.users.first()).removeRole(message.guild.roles.find(role => role.name === "CHIEF RANK"))
      }


      // ALLIED ROLES [START]
      var ROKARole = await rbx.getRankInGroup(3828960, okayLetsTry);
      // ALLIED ROLES [END]

      if (firstCheck === 0 && ROKARole > 2){
        await message.guild.member(message.mentions.users.first()).removeRole(message.guild.roles.find(role => role.name === "DEVELOPER"))
        await message.guild.member(message.mentions.users.first()).removeRole(message.guild.roles.find(role => role.name === "LOW RANK"))
        await message.guild.member(message.mentions.users.first()).removeRole(message.guild.roles.find(role => role.name === "MIDDLE RANK"))
        await message.guild.member(message.mentions.users.first()).removeRole(message.guild.roles.find(role => role.name === "HIGH RANK"))
        await message.guild.member(message.mentions.users.first()).removeRole(message.guild.roles.find(role => role.name === "CHIEF RANK"))
        await message.guild.member(message.mentions.users.first()).removeRole(message.guild.roles.find(role => role.name === "DIPLOMAT"))
        await message.guild.member(message.mentions.users.first()).removeRole(message.guild.roles.find(role => role.name === "VERIFIED"))
        await message.guild.member(message.mentions.users.first()).addRole(message.guild.roles.find(role => role.name === "VERIFIED"))
        message.member.setNickname(`[ROKA] ${body.Username}`)
      }




      if (firstCheck === 1) {
        message.guild.member(message.mentions.users.first()).setNickname(`[REC] ${body.Username}`);
      }
      if (firstCheck === 10) {
        message.guild.member(message.mentions.users.first()).setNickname(`[PVT] ${body.Username}`);
      }
      if (firstCheck === 25) {
        message.guild.member(message.mentions.users.first()).setNickname(`[LCPL] ${body.Username}`);
      }
      if (firstCheck === 40) {
        message.guild.member(message.mentions.users.first()).setNickname(`[CPL] ${body.Username}`);
      }
      if (firstCheck === 55) {
        message.guild.member(message.mentions.users.first()).setNickname(`[SGT] ${body.Username}`);
      }
      if (firstCheck === 70) {
        message.guild.member(message.mentions.users.first()).setNickname(`[SSGT] ${body.Username}`);
      }
      if (firstCheck === 85) {
        message.guild.member(message.mentions.users.first()).setNickname(`[SGM] ${body.Username}`);
      }
      if (firstCheck === 100) {
        message.guild.member(message.mentions.users.first()).setNickname(`[WO] ${body.Username}`);
      }
      if (firstCheck === 115) {
        message.guild.member(message.mentions.users.first()).setNickname(`[ALLY] ${body.Username}`);
      }
      if (firstCheck === 130) {
        message.guild.member(message.mentions.users.first()).setNickname(`[LT] ${body.Username}`);
      }
      if (firstCheck === 145) {
        message.guild.member(message.mentions.users.first()).setNickname(`[CPT] ${body.Username}`);
      }
      if (firstCheck === 160) {
        message.guild.member(message.mentions.users.first()).setNickname(`[MAJ] ${body.Username}`);
      }
      if (firstCheck === 175) {
        message.guild.member(message.mentions.users.first()).setNickname(`[LTCOL] ${body.Username}`);
      }
      if (firstCheck === 190) {
        message.guild.member(message.mentions.users.first()).setNickname(`[COL] ${body.Username}`);
      }
      if (firstCheck === 205) {
        message.guild.member(message.mentions.users.first()).setNickname(`[BRIG] ${body.Username}`);
      }
      if (firstCheck === 220) {
        message.guild.member(message.mentions.users.first()).setNickname(`[LTGEN] ${body.Username}`);
      }
      if (firstCheck === 235) {
        message.guild.member(message.mentions.users.first()).setNickname(`[DEV] ${body.Username}`);
      }
      if (firstCheck === 250) {
        message.guild.member(message.mentions.users.first()).setNickname(`[CDEV] ${body.Username}`);
      }
      if (firstCheck === 255) {
        message.guild.member(message.mentions.users.first()).setNickname(`[GEN] ${body.Username}`);
      }
      if (!message.guild.member(message.mentions.users.first()).roles.exists('name', 'VERIFIED')){
        await message.guild.member(message.mentions.users.first()).removeRole(message.guild.roles.find(role => role.name === "LOW RANK"))
        await message.guild.member(message.mentions.users.first()).removeRole(message.guild.roles.find(role => role.name === "MIDDLE RANK"))
        await message.guild.member(message.mentions.users.first()).removeRole(message.guild.roles.find(role => role.name === "HIGH RANK"))
        await message.guild.member(message.mentions.users.first()).removeRole(message.guild.roles.find(role => role.name === "CHIEF RANK"))
        await message.guild.member(message.mentions.users.first()).removeRole(message.guild.roles.find(role => role.name === "SAS"))
        await message.guild.member(message.mentions.users.first()).removeRole(message.guild.roles.find(role => role.name === "PARAS"))
        await message.guild.member(message.mentions.users.first()).removeRole(message.guild.roles.find(role => role.name === "GURKHAS"))
        await message.guild.member(message.mentions.users.first()).removeRole(message.guild.roles.find(role => role.name === "AAC"))
        await message.guild.member(message.mentions.users.first()).removeRole(message.guild.roles.find(role => role.name === "RMP"))

      }
      var sucessEmbed = new Discord.RichEmbed()
        .setColor(0x4d89ff)
        .setTitle(`Updated successfully!`)
        .setDescription(`The mentioned user's roles have been updated!!`)
      message.reply(sucessEmbed).then(message => message.delete(10000));
      return undefined;
    }else{
      console.log('this should never happen lol')
    }
  }
  // VERIFICATION & UPDATE & REMOVE FROM DB [END]

  if (message.channel.id === '390331599821996033'){
    if (message.webhookID){
      message.react(`309962014539776002`)
      var userID = await rbx.getIdFromUsername(message.embeds[0].description);
      let role = await groupIDB.getRole({
        name: "[PVT] Private"
      })
      await groupIDB.setRank(Number(userID), role)
      return undefined;
    }
    return undefined;
  }

  // VERIFICATION CHANNEL [START]
  if (message.channel.id === '116394307014885379' && message.author.id !== '116393001328050180' && message.author.id !== '114081086065213443' && message.author.id !== '502614584134467625'){
    return message.delete()
  }
  // VERIFICATION CHANNEL [END]

  // MISCELLANEOUS COMMANDS [START]
  if (message.content.toLowerCase().startsWith(`<@502614584134467625>`)){
    console.log('ok')
    message.channel.startTyping()
    bot.create(function (err, session) {
      console.log('okok')
      bot.ask(`${message.content}`, function (err, response) {
        var embed = new Discord.RichEmbed()
          .setDescription(`${response}`);
        message.channel.send(embed)
      });
    });
    message.channel.stopTyping()
    return undefined;
  }
  if (message.content.toLowerCase().startsWith(prefix + "commands")){
    if (message.guild.id !== `116394307014885379`) return;
    var helpMenuEmbed = new Discord.RichEmbed()
      .setColor(0xff6363)
      .setAuthor(`General | Commands`, "https://cdn.discordapp.com/attachments/502568121526124556/543673170176245797/baliontransparent.png")
      .setDescription(`Hey there ${message.author}, the following commands below are what you can use.`)
      .addField("!verify [username]", "Runs through the process of verifying your Discord account with the specified ROBLOX username ([username]).")
      .addField("!remove", "Removes user from the database and removes all roles associated with the user.")
      .addField("!help", "Opens up a new ticket!")
      .addField("!commands", "Displays this help message!")
      .addField("!view [username]", "Views the profile stored for the given username.")
    message.author.send(helpMenuEmbed)
    if (message.member.roles.exists('name', 'HIGH RANK')){
      var memberGroupEmbed = new Discord.RichEmbed()
      .setColor(0x5bff7a)
      .setAuthor(`High Rank | Commands`, "https://cdn.discordapp.com/attachments/502568121526124556/543673170176245797/baliontransparent.png")
      .setDescription(`Hey there ${message.author}, since you're a high rank+, you can chat the following commands below too.`)
      .addField("!shout [content]", "Go into any events channel and run this command to send a message into the events channel where the command is ran along with the group/regiment associated with the channel ID")
      .addField("!xp [add] [remove] [#] [usernames]", "Adds or removes (depending on what's specified) the number of XP ([#]) to each user ([usernames]) specified.\n\n**Adding example:**\n`!xp add 2 EliteSilentSword, Marcuses, Avallex`\n\n**Removing example:**\n`!xp remove 2 EliteSilentSword`")
      message.author.send(memberGroupEmbed)
    }
    if (message.member.roles.exists('name', 'PATROL')){
      var memberGroupEmbed = new Discord.RichEmbed()
      .setColor(`RANDOM`)
      .setAuthor(`Patrol | Commands`, "https://cdn.discordapp.com/attachments/502568121526124556/543673170176245797/baliontransparent.png")
      .setDescription(`Hey there ${message.author}, since you're a patrol member, you can chat the following commands below too.`)
      .addField("!warn [username] [content]", "Warns the specified ROBLOX user ([username]).\n\n**You can view the warnings the user has via the !view command.**")
      message.author.send(memberGroupEmbed)
    }
    if (message.member.roles.exists('name', 'CHIEF RANK')){
      var memberGroupEmbed = new Discord.RichEmbed()
      .setColor(0xdf93ec)
      .setAuthor(`Chief Rank | Commands`, "https://cdn.discordapp.com/attachments/502568121526124556/543673170176245797/baliontransparent.png")
      .setDescription(`Hey there ${message.author}, since you're a chief rank+, you can chat the following commands below too.`)
      .addField("!close", "Closes a ticket text-channel opened up by a user.")
      message.author.send(memberGroupEmbed)
    }
    if (message.author.id === '114081086065213443' || message.author.id === '116393001328050180'){
      var developerMenuEmbed = new Discord.RichEmbed()
        .setColor(0x3d85ff)
        .setAuthor(`Developer | Commands`, "https://cdn.discordapp.com/attachments/502568121526124556/543673170176245797/baliontransparent.png")
        .setDescription(`Since you're a registered developer, the following commands below are what you can use too.`)
        .addField("!say [channelName] [content]", "Bot will chat in the specified text-channel ([channelName]) with the declared content ([content]).")
        .addField("!rankLock [username]", "Rank locks the given username ([username]) at their current rank.  Prevents them from ranking up (or from falling down the ranks).")
        .addField("!broadcast [@role] [content]", "Bot will broadcast the specified content ([content]) to the mentioned role ([@role]).")
        .addField("!getUser [@mention]", "Bot return information about the mentioned user ([@mention]).")
        .addField("!restart", "Restarts the bot.\nThis will require patience to allow the bot to login back into Discord (and any other accounts associated with this bot).")
      message.author.send(developerMenuEmbed)
    }
    return undefined;
  }
  if (message.content.toLowerCase().startsWith(prefix + "help")){
    if (message.guild.id !== `116394307014885379`) return;
    message.delete()
    if (message.guild.channels.exists("name", `ticket-${message.author.id}`)){
      return message.author.send(`${message.author.send(`${message.author}, you already have opened a ticket!`)}`);
    }
    var okEmbed = new Discord.RichEmbed()
      .setColor(0xff6363)
      .setAuthor(`Ticket | Emitter`, "https://cdn.discordapp.com/attachments/502568121526124556/543673170176245797/baliontransparent.png")
      .setDescription(`<@${message.author.id}> someone will be with you shortly.\nIn the meantime, can you please begin explaining your report?\n**REMEMBER THAT FALSELY CREATING TICKETS IS PUNISHABLE**`)
    message.channel.send(`${message.author}, created ticket!`).then(message => message.delete(10000));
    message.guild.createChannel(`ticket-${message.author.id}`, 'text',[
      {id: message.guild.id, denied: ['SEND_MESSAGES', 'VIEW_CHANNEL', 'READ_MESSAGE_HISTORY']},
      {id: supportTeamRole.id, deny: ['MANAGE_MESSAGES'], allow: ['SEND_MESSAGES', 'VIEW_CHANNEL', 'READ_MESSAGE_HISTORY']},
      {id: patrolTeamRole.id, deny: ['MANAGE_MESSAGES'], allow: ['SEND_MESSAGES', 'VIEW_CHANNEL', 'READ_MESSAGE_HISTORY']},
      {id: message.author.id, deny: ['MANAGE_MESSAGES'], allow: ['SEND_MESSAGES', 'ATTACH_FILES', 'VIEW_CHANNEL', 'READ_MESSAGE_HISTORY']}
    ]).then(c => {
      c.setParent('416410771271057408');
      c.send(okEmbed);
      c.send(`**Wake up ${supportTeamRole} & ${patrolTeamRole}!**`)
    })
    return undefined;
    }
  if (message.content.toLowerCase().startsWith(prefix + "robux")){
    if (message.channel.id !== '521829758435196931'){
      return message.channel.send(`**Sorry ${message.author}, but you need to run that command in <#521829758435196931>!**`).then(message => message.delete(3000))
    }
    message.delete()
    if (message.mentions.users.size === 0) {
      var rblxUsernameFetcher = await sql.get(`SELECT * FROM rblxUsernameDB WHERE userID ="${message.author.id}"`);
      if (!rblxUsernameFetcher) return undefined;
      var rblxUserID = await rbx.getIdFromUsername(`${rblxUsernameFetcher.rblxUsername}`)
      var { body } = await snekfetch.get(`https://www.roblox.com/headshot-thumbnail/json?userId=${rblxUserID}&width=180&height=180`);
      var mugShot = `${body.Url}`
      var { body } = await snekfetch.get(`${baseURL}robux/${rblxUserID}.json`);
      var embed = new Discord.RichEmbed()
        .setColor(0x5bff7a)
        .setAuthor(`${rblxUsernameFetcher.rblxUsername}`, `${mugShot}`)
        .setDescription(`**${rblxUsernameFetcher.rblxUsername}'s robux statistics are shown below.**`)
        .addField(`Total R$`, `${body.total}`, true)
        .addField(`Bank R$`, `${body.bank}`, true)
        .addField(`Hand R$`, `${body.hand}`, true)
      return message.channel.send(embed).then(message => message.delete(20000))
    }else{
      var rblxUsernameFetcher = await sql.get(`SELECT * FROM rblxUsernameDB WHERE userID ="${message.mentions.users.first().id}"`);
      if (!rblxUsernameFetcher) return message.channel.send(`Sorry ${message.author}, but the mentioned user isn't verified yet so he/she has 0 robux in their bank account.`).then(message => message.delete(10000));
      var rblxUserID = await rbx.getIdFromUsername(`${rblxUsernameFetcher.rblxUsername}`)
      var { body } = await snekfetch.get(`https://www.roblox.com/headshot-thumbnail/json?userId=${rblxUserID}&width=180&height=180`);
      var mugShot = `${body.Url}`
      var { body } = await snekfetch.get(`${baseURL}robux/${rblxUserID}.json`);
      if (!body){
        return message.channel.send(`Sorry ${message.author}, but the mentioned user doesn't have any robux!`).then(message => message.delete(10000));
      }
      var embed = new Discord.RichEmbed()
        .setColor(0x5bff7a)
        .setAuthor(`${rblxUsernameFetcher.rblxUsername}`, `${mugShot}`)
        .setDescription(`**${rblxUsernameFetcher.rblxUsername}'s robux statistics are shown below.**`)
        .addField(`Total R$`, `${body.total}`, true)
        .addField(`Bank R$`, `${body.bank}`, true)
        .addField(`Hand R$`, `${body.hand}`, true)
      return message.channel.send(embed).then(message => message.delete(20000))
    }
  }
  if (message.content.toLowerCase().startsWith(prefix + "deposit") || message.content.toLowerCase().startsWith(prefix + "dep")){
    if (message.channel.id !== '521829758435196931'){
      return message.channel.send(`**Sorry ${message.author}, but you need to run that command in <#521829758435196931>!**`).then(message => message.delete(3000))
    }  message.delete()
    var rblxUsernameFetcher = await sql.get(`SELECT * FROM rblxUsernameDB WHERE userID ="${message.author.id}"`);
    if (!rblxUsernameFetcher) return undefined;
    if (isNaN(Number(args[1]))){
      var rblxUserID = await rbx.getIdFromUsername(`${rblxUsernameFetcher.rblxUsername}`)
      var { body } = await snekfetch.get(`https://www.roblox.com/headshot-thumbnail/json?userId=${rblxUserID}&width=180&height=180`);
      var mugShot = `${body.Url}`
      var { body } = await snekfetch.get(`${baseURL}robux/${rblxUserID}.json`);
      if (!body){
        return message.channel.send(`Sorry ${message.author}, but you don't have any robux to deposit!`).then(message => message.delete(10000));
      }
      var usedToHave = Number(body.hand);
      await message.channel.send(`Depositing ${body.hand} into the bank...`).then(message => message.delete(3000));
      var totalSum = Number(body.total);
      var handSum = Number(body.hand);
      var bankSum = (Number(body.bank) + Number(body.hand));
      firebase.database().ref('robux/' + rblxUserID).update({
        total: (handSum + bankSum),
        hand: Number(0),
        bank: (bankSum)
      })
      await message.channel.send(`Successfully deposited ${usedToHave} robux into your bank account.`).then(message => message.delete(10000));
      return undefined;
    }else{
      if (Number(args[1]) < 0){
        return message.channel.send(`Sorry ${message.author}, but you need to provide me with a number greater than 0.`)
      }
      if (Number(args[1]) % 1 != 0){
        return message.channel.send(`Sorry ${message.author}, but you need to provide me with a whole number.`)
      }
      var rblxUserID = await rbx.getIdFromUsername(`${rblxUsernameFetcher.rblxUsername}`)
      var { body } = await snekfetch.get(`https://www.roblox.com/headshot-thumbnail/json?userId=${rblxUserID}&width=180&height=180`);
      var mugShot = `${body.Url}`
      var { body } = await snekfetch.get(`${baseURL}robux/${rblxUserID}.json`);
      if (!body){
        return message.channel.send(`Sorry ${message.author}, but you don't have any robux to deposit!`).then(message => message.delete(10000));
      }
      if (Number(args[1]) > Number(body.hand)){
        return message.channel.send(`Sorry ${message.author}, but you need to provide me with a number that's less than or equal to the current robux you currently have in your hand (${body.hand})`).then(message => message.delete(10000));
      }
      var handSum = (Number(body.hand) - Number(args[1]));
      var bankSum = (Number(body.bank) + Number(args[1]));
      var totalSum = Number(handSum + bankSum);
      await message.channel.send(`Depositing ${Number(args[1])} into your bank account...`).then(message => message.delete(3000))
      firebase.database().ref('robux/' + rblxUserID).update({
        total: (totalSum),
        hand: (handSum),
        bank: (bankSum)
      })
      return message.channel.send(`Successfully deposited ${Number(args[1])} robux into your bank account.`).then(message => message.delete(10000));
    }
    return message.channel.send(`You should NEVER see this robux-chat level error.`).then(message => message.delete(1000));
  }
  if (message.content.toLowerCase().startsWith(prefix + "rob")){
    if (message.channel.id !== '521829758435196931'){
      var embed = new Discord.RichEmbed()
        .setDescription(`**Sorry ${message.author}, but you need to run that command in <#521829758435196931>!**`)
      return message.reply(embed).then(message => message.delete(5000));
    }
    if (cooldown.has(message.author.id)){
      var embed = new Discord.RichEmbed()
        .setDescription(`Sorry ${message.author}, but you have to wait 5 seconds to run the rob command again.`)
      return message.reply(embed).then(message => message.delete(5000));
    }
    cooldown.add(message.author.id)
    message.delete()
    if (message.mentions.users.size === 0){
      var embed = new Discord.RichEmbed()
        .setDescription(`Sorry ${message.author}, but you need to mention a user to rob first!`)
      return message.reply(embed).then(message => message.delete(10000));
    }else{
      if (message.mentions.users.first().id === message.author.id){
        var embed = new Discord.RichEmbed()
          .setDescription(`Sorry ${message.author}, but you can't rob yourself!`)
        return message.reply(embed).then(message => message.delete(10000));
      }
      var rblxUsernameFetcher = await sql.get(`SELECT * FROM rblxUsernameDB WHERE userID ="${message.mentions.users.first().id}"`);
      if (!rblxUsernameFetcher){
        var embed = new Discord.RichEmbed()
          .setDescription(`Sorry ${message.author}, but the mentioned user isn't verified yet so he/she has 0 robux total in their account.`)
        return message.reply(embed).then(message => message.delete(10000));
      }
      var rblxUserID = await rbx.getIdFromUsername(`${rblxUsernameFetcher.rblxUsername}`)
      var { body } = await snekfetch.get(`${baseURL}robux/${rblxUserID}.json`);
      if (!body){
        var embed = new Discord.RichEmbed()
          .setDescription(`Sorry ${message.author}, but ${message.mentions.users.first()} hasn't built up their robux statistics yet!`)
        return message.reply(embed).then(message => message.delete(10000));
      }else if (Number(body.hand) === 0){
        var embed = new Discord.RichEmbed()
          .setDescription(`Sorry ${message.author}, but you can't rob ${message.mentions.users.first()} out of 0 robux!`)
        return message.reply(embed).then(message => message.delete(10000));
      }else if (Number(body.hand) < 150){
        var embed = new Discord.RichEmbed()
          .setDescription(`Sorry ${message.author}, but ${message.mentions.users.first()} needs at lesat 20 R$ on their hand before you can rob them!`)
        return message.reply(embed).then(message => message.delete(10000));
      }else{

        var random = Math.floor(Math.random() * 150) + 1

        // ROBBED VICTOM
        var whatsThereTotal = Number(body.total);
        var whatsThereHand = Number(body.hand);
        var whatsThereBank = Number(body.bank);

        var nowThereHand = Number(body.hand) - Number(random);
        var nowThereBank = Number(body.bank);
        var nowThereTotal = nowThereBank + nowThereHand;

        firebase.database().ref('robux/' + rblxUserID).update({
          total: (nowThereTotal),
          hand: (nowThereHand),
          bank: (nowThereBank)
        })
        // ROBBED VICTOM


        // WINNER
        var rblxUsernameFetcher = await sql.get(`SELECT * FROM rblxUsernameDB WHERE userID ="${message.author.id}"`);
        var rblxUserID = await rbx.getIdFromUsername(`${rblxUsernameFetcher.rblxUsername}`)
        var { body } = await snekfetch.get(`${baseURL}robux/${rblxUserID}.json`);



        var whatsThereTotal = Number(body.total);
        var whatsThereHand = Number(body.hand);
        var whatsThereBank = Number(body.bank);

        var nowThereHand = Number(body.hand) + Number(random);
        var nowThereBank = Number(body.bank);
        var nowThereTotal = nowThereBank + nowThereHand;


        firebase.database().ref('robux/' + rblxUserID).update({
          total: (nowThereTotal),
          hand: (nowThereHand),
          bank: (nowThereBank)
        })

        // WINNER

















        return message.channel.send(`Wowzers ${message.author}, you've robbed ${random} robux from ${message.mentions.users.first()}'s hand!!`).then(message => message.delete(15000))
      }
    }
  }
  if (message.content.toLowerCase().startsWith(prefix + "store")){
    if (message.channel.id !== '521829758435196931'){
      return message.channel.send(`**Sorry ${message.author}, but you need to run that command in <#521829758435196931>!**`).then(message => message.delete(3000))
    }message.delete()
    var embed = new Discord.RichEmbed()
      .setColor(0xff6b6b)
      .addField(`Dominus Empyreus`, `**Price:** - R$300,000,000\n**[Link](https://www.roblox.com/catalog/21070012/Dominus-Empyreus)**`, true)
      .addField(`Domino Crown`, `**Price:** - R$175,000,000\n**[Link](https://web.roblox.com/catalog/1031429/Domino-Crown)**`, true)
      .addField(`Blackvalk`, `**Price:** - R$100,000,000\n**[Link](https://www.roblox.com/catalog/124730194/Blackvalk)**`, true)
      .addField(`Clockwork Shades`, `**Price:** - R$750,000\n**[Link](https://www.roblox.com/catalog/11748356/Clockworks-Shades)**`, true)
      .addField(`Sword Cane`, `**Price:** - R$600,000\n**[Link](https://www.roblox.com/catalog/25740034/Sword-Cane)**`, true)
      .addField(`Ultra Commando`, `**Price:** - R$550,000\n**[Link](https://web.roblox.com/catalog/1778004652/Ultra-Commando)**`, true)
      .addField(`Sparkle Time Fedora`, `**Price:** - R$450,000\n**[Link](https://www.roblox.com/catalog/1285307/Sparkle-Time-Fedora)**`, true)
      .addField(`Midnight Rider Shades`, `**Price:** - $300,000\n**[Link](https://www.https://www.roblox.com/catalog/260370277/Midnight-Rider-Shades)**`, true)
      .addField(`Desert Commander`, `**Price:** - R$150,000\n**[Link](https://www.roblox.com/catalog/18244269/Desert-Commander)**`, true)
    return message.reply(embed).then(message => message.delete(15000))
  }

  // MISCELLANEOUS COMMANDS [END]

  // PATROL OR CHIEF RANK COMMANDS  [START]
  if (message.content.toLowerCase().startsWith(prefix + "close")){
    if (message.guild.id !== `116394307014885379`) return;
    if (!message.member.roles.exists('name', 'CHIEF RANK')){
      var errorEmbed = new Discord.RichEmbed()
      .setAuthor(`Error | Notice`, "https://cdn.discordapp.com/attachments/502568121526124556/543673170176245797/baliontransparent.png")
      .setColor(0xf74e4e)
      .setDescription(`You must have the **CHIEF RANK** role to run that command!`)
      message.channel.send(errorEmbed).then(message => message.delete(30000));
      return undefined;
    }
    if (!message.channel.name.includes("ticket-")){
      return message.channel.send(`Sorry ${message.author}, but I can't close this text channel since it isn't declared to be a ticket channel (duh)!`).then(message=>message.delete(10000));
    }
    message.channel.delete()
  }
  if (message.content.toLowerCase().startsWith(prefix + "warn")){
    if (message.guild.id !== `116394307014885379`) return;
    message.delete()
    var rblxUsernameFetcher = await sql.get(`SELECT * FROM rblxUsernameDB WHERE userID ="${message.author.id}"`);
    if (!rblxUsernameFetcher){
      return message.channel.send(`Sorry ${message.author}, but you first need to verify your ROBLOX account with me so I can document everything properly.`).then(message => message.delete(10000));
    }
    if (!message.member.roles.exists('name', 'CHIEF RANK') && !message.member.roles.exists('name', 'PATROL')){
      var errorEmbed = new Discord.RichEmbed()
      .setColor(0xf74e4e)
      .setDescription(`You must have the **CHIEF RANK** or **PATROL** role to run that command!`)
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
    var { body } = await snekfetch.get(`${baseURL}warnings/${userIDRBLLX}.json`);
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
          var { body } = await snekfetch.get(`${baseURL}warnings/${userIDRBLLX}/${i}.json`);
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
    roblox.messageUser(userIDRBLLX, `British Army | Warning`, `Salutations user,\n\nYou have recently been warned by a patrol member, ${rblxUsernameFetcher.rblxUsername}, for the following reason:\n\n${message.content.slice(message.content.indexOf(message.content.split(" ")[2]))}\n\nIf you have any questions or would like to appeal this warning, please speak to AuroraAspect!\n\nThank you,\nBritishAutomation`).catch(collected => {message.channel.send(`Failed to message the warned user due to the user having permission settings set to peak.`)});
    return message.reply(`Warned the user!`).then(message => message.delete(5000));
  }
  // PATROL OR CHIEF RANK COMMANDS  [END]

  // XP CMDS [START]
  if (message.content.toLowerCase().startsWith(prefix + "xp")){
    if (message.guild.id !== `116394307014885379`) return;
    if (message.channel.id !== '521829758435196931' &&  (!message.member.roles.exists('name', 'CHIEF RANK') && (message.author.id !== '116393001328050180' && message.author.id !== '114081086065213443'))) return message.channel.send(`Sorry ${message.author}, but only Chief Ranks+ can run that command here!`).then(message => message.delete(5000));
    var rblxUsernameFetcher = await sql.get(`SELECT * FROM rblxUsernameDB WHERE userID ="${message.author.id}"`);
    if (!rblxUsernameFetcher){
      return message.channel.send(`Sorry ${message.author}, but you first need to verify your ROBLOX account with me so I can document everything properly.`).then(message => message.delete(10000));
    }
    var okayLetsTry = await rbx.getIdFromUsername(rblxUsernameFetcher.rblxUsername)
    var TCPRole = await rbx.getRankInGroup(4598236, okayLetsTry);
    if (!args[1]) return message.channel.send(`Missing argument`).then(message => message.delete(6000));
    if (args[1] !== "add" && args[1] !== "remove") return message.channel.send(`Sorry, but I only accept **add** and **remove** as proper second arguments`).then(message => message.delete(10000));
    if (!args[2]) return message.channel.send(`Missing number of XP`).then(message => message.delete(6000));
    if (!args[3]) return message.channel.send(`Missing username(s)`).then(message => message.delete(6000));
    if (isNaN(Number(args[2]))) return message.channel.send(`That's not a number!`).then(message => message.delete(6000));
    if (Number(args[2]) < 0) return message.channel.send(`Please provide me with a positive number!`).then(message)
    if (Number(args[2]) % 1 != 0) return message.channel.send(`Please provide me with a whole number (no decimals)!`).then(message => message.delete(6000));
    if (!message.member.roles.exists('name', 'CHIEF RANK') && (!message.member.roles.exists('name', 'HIGH RANK')) && (!message.member.roles.exists('name', 'TCP')) && (message.author.id !== '116393001328050180' && message.author.id !== '114081086065213443')) return message.channel.send(`Sorry ${message.author}, but only high ranks+ (and TCP SD+) can use this command!`).then(message => message.delete(6000));
    if ((message.author.id !== '116393001328050180' && message.author.id !== '114081086065213443') && (Number(args[2]) > 5)) return message.channel.send(`Sorry ${message.author}, but only developers+ can give endless amounts of XP to users`).then(message => message.delete(6000));
    if (message.member.roles.exists('name', 'CHIEF RANK') && (Number(args[2]) > 5)) return message.channel.send(`Sorry ${message.author}, but you are only allowed to give 5 XP max per user.`).then(message => message.delete(6000));
    if (message.member.roles.exists('name', 'HIGH RANK') && (Number(args[2]) > 3)) return message.channel.send(`Sorry ${message.author}, but you are only allowed to give 3 XP max per user.`).then(message => message.delete(6000));
    if ((message.member.roles.exists('name', 'TCP') && TCPRole < 150)) return message.channel.send(`Sorry ${message.author}, but your current rank in TCP doesn't allow you to add or remove XP to or from users.`).then(message => message.delete(10000));
    if ((message.member.roles.exists('name', 'TCP') && (Number(args[2]) > 3))) return message.channel.send(`Sorry ${message.author}, but you are only allowed to give 3 XP max per user.`).then(message => message.delete(6000));
    if (args[1] === "add"){
      var userArray = message.content.slice(message.content.indexOf(message.content.split(" ")[3])).split(', ');
      var hrIDWHOISADDING = await rbx.getIdFromUsername(`${rblxUsernameFetcher.rblxUsername}`)
      console.log(userArray);
      for (i = 0; i < userArray.length; i++){

        var { body } = await snekfetch.get(`https://api.roblox.com/users/get-by-username?username=${userArray[i]}`)
        console.log(body.Id)
        console.log(hrIDWHOISADDING)
        if (body.success === false){
          var errorEmbed = new Discord.RichEmbed()
            .setColor(0xff3c3c)
            .setDescription(`${userArray[i]} does not exist on ROBLOX!`)
          message.channel.send(errorEmbed)
        }else if (Number(body.Id) === Number(hrIDWHOISADDING)){
          var errorEmbed = new Discord.RichEmbed()
            .setColor(0xff3c3c)
            .setDescription(`Are you serious?\n\n**This event has been logged and sent to the hr_chat to expose your stupidity.**\n\nIt is forbidden to award yourself XP.`)
          await message.channel.send(errorEmbed)
          var errorEmbed = new Discord.RichEmbed()
            .setColor(0xff3c3c)
            .setDescription(`**${rblxUsernameFetcher.rblxUsername}** (${hrIDWHOISADDING}) has been caught trying to award ${Number(args[2])} XP to themselves.`)
          baAutomation.channels.get(baAutomation.channels.get('538229374101618688').id).send(errorEmbed)
          baAutomation.users.get("114081086065213443").send(errorEmbed)
        }else{
          var userID = await rbx.getIdFromUsername(`${userArray[i]}`)
          var { body } = await snekfetch.get(`${baseURL}${userID}.json`);
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
              .setTitle(`**${rblxUsernameFetcher.rblxUsername}** - Add`)
              .setDescription(`**${rblxUsernameFetcher.rblxUsername}** (${message.author.id})\nModified **${pointsMaybe}** XP for ${userArray[i]} (${userID})\n\n**Channel:**\n<#${message.channel.id}>`)
            baAutomation.channels.get(promoLOGS.id).send(promoLOGEmbed)
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
             rankName = "[REC] Recruit" // nextRankName
             requiredNumber = 0;
             }else if (currentRankID === 1){ // current rolesetID
               rankName = "[PVT] Private" // nextRankName
               requiredNumber = 0;
             }else if (currentRankID === 10){ // current rolesetID
               rankName = "[LCPL] Lance Corporal" // nextRankName
               requiredNumber = 9
             }else if (currentRankID === 25){ // current rolesetID
               rankName = "[CPL] Corporal" // nextRankName
               requiredNumber = 21;
             }else if (currentRankID === 40){ // current rolesetID
               rankName = "[SGT] Sergeant" // nextRankName
               requiredNumber = 36;
             }else if (currentRankID === 55){ // current rolesetID
               rankName = "[SSGT] Staff Sergeant" // nextRankName
               requiredNumber = 54;
             }else if (currentRankID === 70){ // current rolesetID
               rankName = "[SGM] Sergeant Major" // nextRankName
               requiredNumber = 75;
             }else if (currentRankID === 85){ // current rolesetID
               rankName = "[WO] Warrant Officer" // nextRankName
               requiredNumber = 99;
             }else if (currentRankID === 100){ // current rolesetID
               rankName = "[LT] Lieutenant" // nextRankName
               requiredNumber = 0;
             }else if (currentRankID === 130){ // current rolesetID
               rankName = "[CPT] Captain" // nextRankName
               requiredNumber = 0;
             }else if (currentRankID === 145){ // current rolesetID
               rankName = "[MAJ] Major" // nextRankName
               requiredNumber = 0;
             }else if (currentRankID === 160){ // current rolesetID
               rankName = "[LTCOL] Lieutenant Colonel" // nextRankName
               requiredNumber = 0;
             }else if (currentRankID === 175){ // current rolesetID
               rankName = "[COL] Colonel" // nextRankName
               requiredNumber = 0
             }else if (currentRankID === 190){ // current rolesetID
               rankName = "[BRIG] Brigadier" // nextRankName
               requiredNumber = 0
             }else if (currentRankID === 205){ // current rolesetID
               rankName = "[LTGEN] Lieutenant General" // nextRankName
               requiredNumber = 0
             }else if (currentRankID === 220){ // current rolesetID
               rankName = "[DEV] DEVELOPER" // nextRankName
               requiredNumber = 0
             }else if (currentRankID === 235){ // current rolesetID
               rankName = "[CDEV] Chief DEVELOPER" // nextRankName
               requiredNumber = 0
             }else if (currentRankID === 250){ // current rolesetID
               rankName = "[GEN] General" // nextRankName
               requiredNumber = 0
             }else{
                rankName = "[ERROR] || CAN'T GO BEYOND"
               requiredNumber = 0;
              }
            var whateverRequired4NextRank = requiredNumber
            var { body } = await snekfetch.get(`${baseURL}rankLock/${userIDDD}.json`)
            var doesUserHaveProfile;
            if (body){
              doesUserHaveProfile = 1
            }else{
              doesUserHaveProfile = 0;
            }
              if (((Number(currentXP) + Number(args[2])) >= whateverRequired4NextRank) && (Number(doesUserHaveProfile) === Number(0)) && (currentRankID !== 0 && currentRankID !== 1 && currentRankID < 100)){
                await groupIDB.promote(Number(userIDDD));
                var newRank = await rbx.getRankNameInGroup(groupID, Number(userIDDD));
                console.log(`Promoted user to ${newRank}`)
                var rblxUsernameOk = await rbx.getUsernameFromId(Number(userID));
                var promotionEmbed = new Discord.RichEmbed()
                .setColor(0x26a4ff)
                .setDescription(`Promoted **${rblxUsernameOk}** to ${newRank}`)
                baAutomation.channels.get(baAutomation.channels.get('521498266710573074').id).send(promotionEmbed)
                var { body } = await snekfetch.get(`https://www.roblox.com/headshot-thumbnail/json?userId=${Number(userIDDD)}&width=180&height=180`);
                var mugShot = `${body.Url}`
                var surpriseEmbed = new Discord.RichEmbed()
                .setColor(`RANDOM`)
                .setAuthor(`Congratulations, ${rblxUsernameOk}, on your promotion to ${newRank}!`, `${mugShot}`)
                .setImage(`https://i.imgflip.com/10l5rc.jpg`)
                baAutomation.channels.get(baAutomation.channels.get('538224559850258433').id).send(surpriseEmbed).then(message => message.delete(20000));
                //await rbx.message(Number(userID), "British Army | Notification", `Hey there!\n\nI just wanted to congratulate you on your promotion to ${newRank}.  It seems to me that you're doing an amazing job here within the British Army commmunity.\n\n**Any replies to this message will not be read!**\n\nThanks,\nBritishAutomation`)
              }

              var whileLoopTest = 1
              while (whileLoopTest === 1){

                var userIDDD = await rbx.getIdFromUsername(`${userArray[i]}`)
                var currentRankID = await rbx.getRankInGroup(groupID, userIDDD)

                var requiredNumber; // of xp

                if (currentRankID === 25){
                  requiredNumber = 9;
                }else if (currentRankID === 40){
                  requiredNumber = 21;
                }else if (currentRankID === 55){
                  requiredNumber = 36;
                }else if (currentRankID === 70){
                  requiredNumber = 54;
                }else if (currentRankID === 85){
                  requiredNumber = 75;
                }else if (currentRankID === 100){
                  requiredNumber = 99;
                }else{
                  requiredNumber = 0;
                }
                if (((Number(currentXP) + Number(args[2])) < requiredNumber) && (Number(doesUserHaveProfile) === Number(0)) && (currentRankID !== 0 && currentRankID !== 1 && currentRankID <= 100)){
                  await groupIDB.demote(Number(userIDDD));
                  var newRank = await rbx.getRankNameInGroup(groupID, Number(userIDDD));
                  console.log(`WHILE LOOP RUN1 | Demoted user to ${newRank}`)
                  //await rbx.message(Number(userID), "British Army | Notification", `Hey there!\n\nI just wanted to notify you of your demotion from ${ranknameoklolol} to ${newRank}.  It seems to me you that you fell below the required amount of XP to maintain the rank of ${ranknameoklolol}.\n\n**Any replies to this message will not be read!**\n\nThanks,\nBritishAutomation`)
                  var rblxUsernameOk = await rbx.getUsernameFromId(Number(userIDDD));
                  var promotionEmbed = new Discord.RichEmbed()
                  .setColor(0x26a4ff)
                  .setDescription(`Demoted **${rblxUsernameOk}** to ${newRank}`)
                  baAutomation.channels.get(baAutomation.channels.get('521498266710573074').id).send(promotionEmbed)
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
                 rankName = "[REC] Recruit" // nextRankName
                 requiredNumber = 0;
                 }else if (currentRankID === 1){ // current rolesetID
                   rankName = "[PVT] Private" // nextRankName
                   requiredNumber = 0;
                 }else if (currentRankID === 10){ // current rolesetID
                   rankName = "[LCPL] Lance Corporal" // nextRankName
                   requiredNumber = 9
                 }else if (currentRankID === 25){ // current rolesetID
                   rankName = "[CPL] Corporal" // nextRankName
                   requiredNumber = 21;
                 }else if (currentRankID === 40){ // current rolesetID
                   rankName = "[SGT] Sergeant" // nextRankName
                   requiredNumber = 36;
                 }else if (currentRankID === 55){ // current rolesetID
                   rankName = "[SSGT] Staff Sergeant" // nextRankName
                   requiredNumber = 54;
                 }else if (currentRankID === 70){ // current rolesetID
                   rankName = "[SGM] Sergeant Major" // nextRankName
                   requiredNumber = 75;
                 }else if (currentRankID === 85){ // current rolesetID
                   rankName = "[WO] Warrant Officer" // nextRankName
                   requiredNumber = 99;
                 }else if (currentRankID === 100){ // current rolesetID
                   rankName = "[LT] Lieutenant" // nextRankName
                   requiredNumber = 0;
                 }else if (currentRankID === 130){ // current rolesetID
                   rankName = "[CPT] Captain" // nextRankName
                   requiredNumber = 0;
                 }else if (currentRankID === 145){ // current rolesetID
                   rankName = "[MAJ] Major" // nextRankName
                   requiredNumber = 0;
                 }else if (currentRankID === 160){ // current rolesetID
                   rankName = "[LTCOL] Lieutenant Colonel" // nextRankName
                   requiredNumber = 0;
                 }else if (currentRankID === 175){ // current rolesetID
                   rankName = "[COL] Colonel" // nextRankName
                   requiredNumber = 0
                 }else if (currentRankID === 190){ // current rolesetID
                   rankName = "[BRIG] Brigadier" // nextRankName
                   requiredNumber = 0
                 }else if (currentRankID === 205){ // current rolesetID
                   rankName = "[LTGEN] Lieutenant General" // nextRankName
                   requiredNumber = 0
                 }else if (currentRankID === 220){ // current rolesetID
                   rankName = "[DEV] DEVELOPER" // nextRankName
                   requiredNumber = 0
                 }else if (currentRankID === 235){ // current rolesetID
                   rankName = "[CDEV] Chief DEVELOPER" // nextRankName
                   requiredNumber = 0
                 }else if (currentRankID === 250){ // current rolesetID
                   rankName = "[GEN] General" // nextRankName
                   requiredNumber = 0
                 }else{
                    rankName = "[ERROR] || CAN'T GO BEYOND"
                   requiredNumber = 0;
                  }
                console.log(`WHILE LOOP RUN2 | YOU NEED A TOTAL OF ${requiredNumber}`)
                if (((Number(currentXP) + Number(args[2])) >= requiredNumber) && (Number(doesUserHaveProfile) === Number(0)) && (currentRankID !== 0 && currentRankID !== 1 && currentRankID < 100)){
                  await groupIDB.promote(Number(userIDDD));
                  var newRank = await rbx.getRankNameInGroup(groupID, Number(userIDDD));
                  console.log(`WHILE LOOP RUN2 | Promoted user to ${newRank}`)
                  var rblxUsernameOk = await rbx.getUsernameFromId(Number(userIDDD));
                  var promotionEmbed = new Discord.RichEmbed()
                  .setColor(0x26a4ff)
                  .setDescription(`Promoted **${rblxUsernameOk}** to ${newRank}`)
                  baAutomation.channels.get(baAutomation.channels.get('521498266710573074').id).send(promotionEmbed)
                }else{
                  whileLoopTest1 = 0
                }
              }
            }

            var promoLOGEmbed = new Discord.RichEmbed()
              .setColor(0x46ff87)
              .setTitle(`**${rblxUsernameFetcher.rblxUsername}** - Add`)
              .setDescription(`**${rblxUsernameFetcher.rblxUsername}** (${message.author.id})\nModified **${Number(args[2])}** XP for ${userArray[i]} (${userID})\n\n**Channel:**\n<#${message.channel.id}>`)
            baAutomation.channels.get(promoLOGS.id).send(promoLOGEmbed)
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
          var { body } = await snekfetch.get(`${baseURL}${userID}.json`);
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
              .setTitle(`**${rblxUsernameFetcher.rblxUsername}** - Remove`)
              .setDescription(`**${rblxUsernameFetcher.rblxUsername}** (${message.author.id})\nModified **${pointsMaybe}** XP for ${userArray[i]} (${userID})\n\n**Channel:**\n<#${message.channel.id}>`)
            baAutomation.channels.get(promoLOGS.id).send(promoLOGEmbed)
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

            if (currentRankID === 25){
              requiredNumber = 9;
            }else if (currentRankID === 40){
              requiredNumber = 21;
            }else if (currentRankID === 55){
              requiredNumber = 36;
            }else if (currentRankID === 70){
              requiredNumber = 54;
            }else if (currentRankID === 85){
              requiredNumber = 75;
            }else if (currentRankID === 100){
              requiredNumber = 99;
            }else{
              requiredNumber = 0;
            }

            var { body } = await snekfetch.get(`${baseURL}rankLock/${userIDDD}.json`)
            var doesUserHaveProfile;
            if (body){
              doesUserHaveProfile = 1
            }else{
              doesUserHaveProfile = 0;
            }

            if ((pointsRemoval < requiredNumber) && (Number(doesUserHaveProfile) === Number(0)) && (currentRankID !== 0 && currentRankID !== 1 && currentRankID !== 10 && currentRankID <= 100)){
              await groupIDB.demote(Number(userIDDD));
              var newRank = await rbx.getRankNameInGroup(groupID, Number(userIDDD));
              var rblxUsernameOk = await rbx.getUsernameFromId(Number(userIDDD));
              var promotionEmbed = new Discord.RichEmbed()
              .setColor(0x26a4ff)
              .setDescription(`Demoted **${rblxUsernameOk}** to ${newRank}`)
              baAutomation.channels.get(baAutomation.channels.get('521498266710573074').id).send(promotionEmbed)
            }else{
              whileLoopTest = 0
            }
          }

            var currentRankIDAGAIN = await rbx.getRankInGroup(groupID, userIDDD)
            if (currentRankIDAGAIN === 115){
              await rbx.demote(groupID, Number(userID))
              var newRank = await rbx.getRankNameInGroup(groupID, Number(userIDDD));
              var rblxUsernameOk = await rbx.getUsernameFromId(Number(userIDDD));
              var promotionEmbed = new Discord.RichEmbed()
              .setColor(0x26a4ff)
              .setDescription(`Demoted **${rblxUsernameOk}** to ${newRank}`)
              baAutomation.channels.get(baAutomation.channels.get('521498266710573074').id).send(promotionEmbed)
            }
            var promoLOGEmbed = new Discord.RichEmbed()
              .setColor(0xff3c3c)
              .setTitle(`**${rblxUsernameFetcher.rblxUsername}** - Remove`)
              .setDescription(`**${rblxUsernameFetcher.rblxUsername}** (${message.author.id})\nModified **${Number(args[2])}** XP for ${userArray[i]} (${userID})\n\n**Channel:**\n<#${message.channel.id}>`)
            baAutomation.channels.get(promoLOGS.id).send(promoLOGEmbed)
          }
        }
      return undefined;
    }
  }
    return undefined;
  }
  if (message.content.toLowerCase().startsWith(prefix + "view")){
    if (message.channel.id !== '521829758435196931' && (!message.member.roles.exists('name', 'CHIEF RANK') && (message.author.id !== '116393001328050180' && message.author.id !== '114081086065213443' && message.author.id !== '188662664241610753'))) return message.channel.send(`Sorry ${message.author}, but only chief ranks+ can run the view command here!`).then(message => message.delete(6000));
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
    var { body } = await snekfetch.get(`${baseURL}rankLock/${userID}.json`)
    if (body){
      rankLocked = "True"
    }else{
      rankLocked = "False"
    }
    var { body } = await snekfetch.get(`${baseURL}warnings/${userID}.json`);
    var a = 0;
    if (!body){
      a = 0;
    }
    if (body){
      for (i = 0; i < 10000; i++){
      var { body } = await snekfetch.get(`${baseURL}warnings/${userIDRBLLX}/${i}.json`);
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
    var { body } = await snekfetch.get(`${baseURL}${userID}.json`);
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
     rankName = "[REC] Recruit" // nextRankName
     requiredNumber = 0;
     }else if (currentRankID === 1){ // current rolesetID
       rankName = "[PVT] Private" // nextRankName
       requiredNumber = 0;
     }else if (currentRankID === 10){ // current rolesetID
       rankName = "[LCPL] Lance Corporal" // nextRankName
       requiredNumber = 9
     }else if (currentRankID === 25){ // current rolesetID
       rankName = "[CPL] Corporal" // nextRankName
       requiredNumber = 21;
     }else if (currentRankID === 40){ // current rolesetID
       rankName = "[SGT] Sergeant" // nextRankName
       requiredNumber = 36;
     }else if (currentRankID === 55){ // current rolesetID
       rankName = "[SSGT] Staff Sergeant" // nextRankName
       requiredNumber = 54;
     }else if (currentRankID === 70){ // current rolesetID
       rankName = "[SGM] Sergeant Major" // nextRankName
       requiredNumber = 75;
     }else if (currentRankID === 85){ // current rolesetID
       rankName = "[WO] Warrant Officer" // nextRankName
       requiredNumber = 99;
     }else if (currentRankID === 100){ // current rolesetID
       rankName = "[LT] Lieutenant" // nextRankName
       requiredNumber = 0;
     }else if (currentRankID === 130){ // current rolesetID
       rankName = "[CPT] Captain" // nextRankName
       requiredNumber = 0;
     }else if (currentRankID === 145){ // current rolesetID
       rankName = "[MAJ] Major" // nextRankName
       requiredNumber = 0;
     }else if (currentRankID === 160){ // current rolesetID
       rankName = "[LTCOL] Lieutenant Colonel" // nextRankName
       requiredNumber = 0;
     }else if (currentRankID === 175){ // current rolesetID
       rankName = "[COL] Colonel" // nextRankName
       requiredNumber = 0
     }else if (currentRankID === 190){ // current rolesetID
       rankName = "[BRIG] Brigadier" // nextRankName
       requiredNumber = 0
     }else if (currentRankID === 205){ // current rolesetID
       rankName = "[LTGEN] Lieutenant General" // nextRankName
       requiredNumber = 0
     }else if (currentRankID === 220){ // current rolesetID
       rankName = "[DEV] DEVELOPER" // nextRankName
       requiredNumber = 0
     }else if (currentRankID === 235){ // current rolesetID
       rankName = "[CDEV] Chief DEVELOPER" // nextRankName
       requiredNumber = 0
     }else if (currentRankID === 250){ // current rolesetID
       rankName = "[GEN] General" // nextRankName
       requiredNumber = 0
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
      var { body } = await snekfetch.get(`${baseURL}warnings/${userIDDD}.json`);
      for (i = 0; i < 10000; i++){
          var { body } = await snekfetch.get(`${baseURL}warnings/${userIDDD}/${i}.json`);
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
      var { body } = await snekfetch.get(`${baseURL}warnings/${userIDDD}/${i}.json`);
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

  // HIGH RANK SHOUT [START]
  if (message.content.toLowerCase().startsWith(prefix + "shout")){
    if (message.guild.id !== `116394307014885379`) return;
    var rblxUsernameFetcher = await sql.get(`SELECT * FROM rblxUsernameDB WHERE userID ="${message.author.id}"`);
    if (!rblxUsernameFetcher){
      return message.channel.send(`Sorry ${message.author}, but you first need to verify your ROBLOX account with me so I can document everything properly.`).then(message => message.delete(10000));
    }
    var okayLetsTry = await rbx.getIdFromUsername(rblxUsernameFetcher.rblxUsername)
    var TCPRole = await rbx.getRankInGroup(4598236, okayLetsTry);
    if (!message.member.roles.exists('name', 'CHIEF RANK') && !message.member.roles.exists('name', 'HIGH RANK') && (!message.member.roles.exists('name', 'TCP') &&  TCPRole < 125)) {

      var errorEmbed = new Discord.RichEmbed()
      .setColor(0xf74e4e)
      .setDescription(`Sorry, but you need either the **HIGH RANK** role or the **CHIEF RANK** role or the **TCP** role (and be ranked 50+ in the TCP group) to run that command!`)
      message.channel.send(errorEmbed).then(message => message.delete(30000));
      return undefined;
    }
    var rblxUserID = await rbx.getIdFromUsername(`${rblxUsernameFetcher.rblxUsername}`);
    var { body } = await snekfetch.get(`https://www.roblox.com/headshot-thumbnail/json?userId=${rblxUserID}&width=180&height=180`);
    message.delete()
    var errorEmbed = new Discord.RichEmbed()
      .setColor(0x5aa9fe)
      .setAuthor(`ShoutV2 | Emitter`, "https://cdn.discordapp.com/attachments/502568121526124556/543673170176245797/baliontransparent.png")
      .setDescription(`Sorry ${message.author}, but I couldn't direct message you.\nIn order to shout from here on out, you will need to open up your direct messages to all users.`)

    var goodEmbed = new Discord.RichEmbed()
      .setAuthor(`ShoutV2 | Emitter`, "https://cdn.discordapp.com/attachments/502568121526124556/543673170176245797/baliontransparent.png")
      .setDescription(`Please chat one of the following options to indicate the purpose of this shout...\n**\`training\`** or **\`tryout\`**`)

    const location = await message.author.send(goodEmbed).then(msg => msg.channel).catch(() => {
      return message.reply(errorEmbed).then(message => message.delete(6000));
    })
    const timeCollectionThing = { max: 1, time: 180000, errors: ['time'] };
    const collected = await location.awaitMessages(response => message.author === response.author, timeCollectionThing).catch(() => null);
    var responseArray1 = collected.map(m => m.content)
    if (!collected){
      var embed = new Discord.RichEmbed()
      .setColor(0xf74e4e)
      .setAuthor(`ShoutV2 | Emitter`, "https://cdn.discordapp.com/attachments/502568121526124556/543673170176245797/baliontransparent.png")
      .setDescription(`Cancelled prompt [1]`)
      return message.author.send(embed)
    }else if (responseArray1[0].toLowerCase() !== "training" && responseArray1[0].toLowerCase() !== "tryout"){
      var embed = new Discord.RichEmbed()
      .setColor(0xf74e4e)
      .setAuthor(`ShoutV2 | Emitter`, "https://cdn.discordapp.com/attachments/502568121526124556/543673170176245797/baliontransparent.png")
      .setDescription(`Did not receive a valid response.`)
      return message.author.send(embed)
    }else{
      var embed = new Discord.RichEmbed()
        .setAuthor(`ShoutV2 | Emitter`, "https://cdn.discordapp.com/attachments/502568121526124556/543673170176245797/baliontransparent.png")
        .setDescription(`Set channel to **${responseArray1[0].toLowerCase()}**\n\nNow I'll need the main part of the shout, the content.\n\nPlease provide it below:`)
      const location1 = await message.author.send(embed).then(msg => msg.channel).catch(() => {
        return message.reply(errorEmbed).then(message => message.delete(6000));
      })
      const collected1 = await location.awaitMessages(response => message.author === response.author, timeCollectionThing).catch(() => null);
      var responseArray = collected1.map(m => m.content)
      if (!collected1){
        var embed = new Discord.RichEmbed()
        .setColor(0xf74e4e)
        .setAuthor(`ShoutV2 | Emitter`, "https://cdn.discordapp.com/attachments/502568121526124556/543673170176245797/baliontransparent.png")
        .setDescription(`Cancelled prompt [1]`)
        return message.author.send(embed)
      }else{
        if (responseArray1[0].toLowerCase() === "training"){
          var whichONE = baAutomation.channels.get('550662739329155092');
        }else{
          var whichONE = baAutomation.channels.get('550662858153787402')
        }
        var actualMessageWithAuthor = `${responseArray[0]} - By ${rblxUsernameFetcher.rblxUsername}`
        if (actualMessageWithAuthor.length > 183){
          message.delete()
          return message.author.send(`:warning: YOU HAVE EXCEEDED THE CHARACTER LIMIT BY **${actualMessageWithAuthor.length-183}** characters. REDUCE YOUR SHOUT AND TRY AGAIN :warning:\n\nYour shout -\n**${responseArray[0]}**`)
        }
        groupIDB.postShout(`${actualMessageWithAuthor} | Follow us on twitter and join our Comms! https://twitter.com/f42JjaR`)
        var idNumber;
        var shoutEMBED = new Discord.RichEmbed()
          .setColor(0x46ff87)
          .setAuthor(`${rblxUsernameFetcher.rblxUsername}`, `${body.Url}`)
          .setDescription(`${responseArray[0]}`)
          .setTimestamp()
        const atHere = await baAutomation.channels.get(whichONE.id).send(`@here`)
        const shoutEMebdToEdit = await baAutomation.channels.get(whichONE.id).send(shoutEMBED)

        var embed = new Discord.RichEmbed()
          .setColor(0x46ff87)
          .setAuthor(`ShoutV2 | Emitter`, "https://cdn.discordapp.com/attachments/502568121526124556/543673170176245797/baliontransparent.png")
          .setDescription(`**CONFIRMATION**\n\nShouted to **${responseArray1[0].toLowerCase()}** with the content of` + "```" + responseArray[0] + "```")
        const messageToAwaitReactionsOn = await message.author.send(embed)
        messageToAwaitReactionsOn.react('309962014539776002')
        message.author.send(`When your event has concluded or is locked, please react above...\n\n**PLEASE NOTE:** Your shout will be cleared after ten minutes if no reaction has been made.`)
        console.log(0)

        const filter = (reaction, user) => {
          console.log(reaction.emoji.id)
        	return ['309962014539776002'].includes(reaction.emoji.id) && user.id === message.author.id
        };

        messageToAwaitReactionsOn.awaitReactions(filter, { max: 1, time: 1200000, errors: ['time'] })
        	.then(collected => {

        		const reaction = collected.first();

        		if (reaction.emoji.id === '309962014539776002') {
              var embed = new Discord.RichEmbed()
                .setColor(0xff6b6b)
                .setDescription(`${rblxUsernameFetcher.rblxUsername}'s event has been locked.  Continue with normal operations.`)
                .setTimestamp()
              atHere.delete()
              shoutEMebdToEdit.edit(embed).then(message => message.delete(300000));
              groupIDB.postShout(`Follow us on twitter and join our Comms! https://twitter.com/f42JjaR`)
              var embed = new Discord.RichEmbed()
                .setColor(0x5aa9fe)
                .setDescription(`Cleared your shout!`)
              message.author.send(embed)
        		}
        	})
        	.catch(collected => {
            var embed = new Discord.RichEmbed()
              .setColor(0xff6b6b)
              .setDescription(`${rblxUsernameFetcher.rblxUsername}'s event has been automatically locked.  Continue with normal operations.`)
              .setTimestamp()
            atHere.delete()
            shoutEMebdToEdit.edit(embed).then(message => message.delete(300000));
            groupIDB.postShout(`Follow us on twitter and join our Comms! https://twitter.com/f42JjaR`)
            var embed = new Discord.RichEmbed()
              .setColor(0x5aa9fe)
              .setDescription(`Automatically clearing your shout!`)
            message.author.send(embed)
        	});


      }
    }
    return undefined;
  }
  // HIGH RANK SHOUT [END]

  // DEVELOPER COMMANDS [START]
  if (message.content.startsWith(prefix + "ticket")){
    if (message.author.id !== `114081086065213443`) return;
    var embed = new Discord.RichEmbed()
      .setColor(0xff2d49)
      .setDescription(`React below to create a ticket!`)
    return message.channel.send(embed).then(message => message.react(`552968492014501901`))
  }
  if (message.content.toLowerCase().startsWith(prefix + "ban")){
    if (message.author.id !== `114081086065213443`) return;
    message.delete()
    if (message.mentions.users.size === 0) {
      return message.reply("you need to mention someone to ban!").then(message => message.delete(4000));
    }
    await message.channel.send(`https://tenor.com/wyrk.gif`).then(message => message.delete(10000));
    await message.channel.send(`https://tenor.com/Xy0o.gif`).then(message => message.delete(10000));
    message.guild.member(message.mentions.users.first()).ban();
    var embed = new Discord.RichEmbed()
      .setColor(0xff6b6b)
      .setDescription(`**Successfully annihilated the triggered three year old (${message.guild.member(message.mentions.users.first())}).**`)
    return message.channel.send(embed);
  }
  if (message.content.toLowerCase().startsWith(prefix + "kick")){
    if (message.author.id !== `114081086065213443`) return;
    message.delete()
    if (message.mentions.users.size === 0) {
      return message.reply("you need to mention someone to kick!").then(message => message.delete(4000));
    }
    message.guild.member(message.mentions.users.first()).kick();
    await message.channel.send(`https://tenor.com/TtaI.gif`).then(message => message.delete(10000));
    var embed = new Discord.RichEmbed()
      .setColor(0xff6b6b)
      .setDescription(`**Successfully annihilated the triggered three year old (${message.guild.member(message.mentions.users.first())}).**`)
    return message.channel.send(embed);
  }
  if (message.content.toLowerCase().startsWith(prefix + "ranklock")){
    message.delete()
    if (message.author.id !== `116393001328050180` && message.author.id !== `114081086065213443`) return;
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

    if (rblxUserRankInBAid >= 160){
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
    var { body } = await snekfetch.get(`${baseURL}rankLock/${rblxUserID}.json`)
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
      .setDescription(`${rblxUserName} is now rank locked to ${rblxUserRankInBAname} (${rblxUserRankInBAid})`)
      .setFooter(`Rank locked by - ${message.author.id}`)
    return message.channel.send(oofEmbed).then(message => message.delete(25000));
  }
  if (message.content.toLowerCase().startsWith(prefix + "dbremove")){
    if (message.author.id !== `116393001328050180` && message.author.id !== `114081086065213443` && message.author.id !== `259661878920216576`) return;
    if (!args[1]) return message.channel.send(`Please provide me with a ROBLOX username!`).then(message => message.delete(4000));
    var rblxUsernameFetcher = await sql.get(`SELECT * FROM rblxUsernameDB WHERE rblxUsername ="${args[1]}"`);
    if (!rblxUsernameFetcher) return message.channel.send(`${args[1]} isn't associated with any Discord accounts stored in my database.`)
    message.channel.send(`${args[1]} is associated with <@${rblxUsernameFetcher.userID}>`).then(message => message.delete(4000));
    sql.run(`DELETE FROM rblxUsernameDB WHERE userID=${rblxUsernameFetcher.userID}`)
    return message.channel.send(`Deleted ${args[1]}'s Discord-ROBLOX verified profile.`).then(message => message.delete(5000));
  }
  if (message.content.toLowerCase().startsWith(prefix + "restart")){
    if (message.author.id !== `116393001328050180` && message.author.id !== `114081086065213443`) return;
    message.delete()
    var sucessEmbed = new Discord.RichEmbed()
      .setColor(0xff6b6b)
      .setDescription(`Restarting bot master, ${message.author}!`)
    await message.channel.send(sucessEmbed).then(message => message.delete(5000))
    process.exit(0);
  }
  if (message.content.toLowerCase().startsWith(prefix + "broadcast")){
    if ((message.author.id !== '116393001328050180' && message.author.id !== '114081086065213443')) return message.channel.send(`Sorry ${message.author}, but only developers+ can use this command!`).then(message => message.delete(6000));
    var rblxUsernameFetcher = await sql.get(`SELECT * FROM rblxUsernameDB WHERE userID ="${message.author.id}"`);
    if (!rblxUsernameFetcher){
      return message.channel.send(`Sorry ${message.author}, but you first need to verify your ROBLOX account with me so I can document everything properly.`).then(message => message.delete(10000));
    }
    message.delete()
    var rblxUserID = await rbx.getIdFromUsername(`${rblxUsernameFetcher.rblxUsername}`);
    var { body } = await snekfetch.get(`https://www.roblox.com/headshot-thumbnail/json?userId=${rblxUserID}&width=180&height=180`);
    let roleMembers = message.guild.members.map(m => m.id)
    var howManyNubs = 0;
    var embed = new Discord.RichEmbed()
      .setColor(0xff8c8c)
      .setDescription(`${message.content.slice(message.content.indexOf(message.content.split(" ")[1]))}`)
      .setFooter(`Sent by: ${message.author}}`)
    for (a = 0; a < roleMembers.length; a++){
      await message.guild.members.get(roleMembers[a]).send(embed).catch(console.error)
      howManyNubs = howManyNubs + 1;
    }
    return message.channel.send(`Successfully sent ${howManyNubs} messages.`)
  }
  if (message.content.toLowerCase().startsWith(prefix + "say")){
    if (message.author.id !== `116393001328050180` && message.author.id !== `114081086065213443`) return;
    message.delete()
    if (!args[1]){
      return message.channel.send(`${message.author}, what channel do you expect me to send the message into?!`).then(message => message.delete(5000))
    }
    if (!message.guild.channels.find(args[1])){
      return message.channel.send(`${message.author}, that's not a valid text channel...\n\n${prefix}say chatroom stuff stuff stuff stuff?`).then(message => message.delete(5000))
    }
    baAutomation.channels.get(message.guild.channels.find(role => role.name === args[1]).id).send(message.content.slice(message.content.indexOf(message.content.split(" ")[1])))
    return undefined;
  }
  if (message.content.toLowerCase().startsWith(prefix + "getuser")){
    if (message.author.id !== `116393001328050180` && message.author.id !== `114081086065213443`) return;
    if (message.mentions.users.size === 0){
      return message.channel.send(`${message.author}, you need to mention the user first!`).then(message => message.delete(10000));
    }
    var rblxUsernameFetcher = await sql.get(`SELECT * FROM rblxUsernameDB WHERE userID ="${message.mentions.users.first().id}"`);
    if (rblxUsernameFetcher){
      var userID = await rbx.getIdFromUsername(`${rblxUsernameFetcher.rblxUsername}`);
      var currentRank = await rbx.getRankNameInGroup(groupID, userID);
      return message.channel.send(`${message.mentions.users.first()} is linked to ${rblxUsernameFetcher.rblxUsername} who is currently ranked at ${currentRank}!`)
    }else{
      var { body } = await snekfetch.get(`https://verify.eryn.io/api/user/${message.mentions.users.first().id}`)
      if (body.status === "error"){
        return message.channel.send(`${message.author}, I've ran into an error!`)
      }
      var currentRank = await rbx.getRankNameInGroup(groupID, body.robloxId)
      return message.channel.send(`${message.mentions.users.first()} is linked to ${body.robloxUsername} who is currently ranked at ${currentRank}!\n\n**__USED ROVER'S API TO OBTAIN USERNAME B/C USER IS NOT REGISTERED WITH ME__**`)
    }
  }
  if (message.content.toLowerCase().startsWith(prefix + "role")){
    if (message.author.id !== `116393001328050180` && message.author.id !== `114081086065213443`) return;
    message.guild.member(message.mentions.users.first()).addRole(message.guild.roles.find(role => role.name === "ENFORCERS"))
    return undefined;
  }

  // DEVELOPER COMMANDS [END]


  if (message.guild.id === '116394307014885379'){
    if (message.author.id === '502614584134467625') return;
    if (message.author.bot) return undefined;
    var rblxUsernameFetcher = await sql.get(`SELECT * FROM rblxUsernameDB WHERE userID ="${message.author.id}"`);
    if (!rblxUsernameFetcher){
      message.member.setRoles()
      var embed = new Discord.RichEmbed()
        .setColor(0xff6b6b)
        .setAuthor(`Verification Error`, "https://cdn.discordapp.com/attachments/502568121526124556/543673170176245797/baliontransparent.png")
        .setDescription(`Sorry ${message.author}, but for me to process you through correctly, you must verify yourself with me in the main British Army Discord server.\ndiscord.gg/f42JjaR`)
      await message.author.send(embed)
      return undefined;
    }
    var { body } = await snekfetch.get(`http://api.roblox.com/users/get-by-username?username=${rblxUsernameFetcher.rblxUsername}`);
    var rblxUsernameFetcher = await sql.get(`SELECT * FROM rblxUsernameDB WHERE userID ="${message.author.id}"`);
    if (!rblxUsernameFetcher){
      console.log(`user isn't registered with me yet!`)
    }
    var okayLetsTry = await rbx.getIdFromUsername(rblxUsernameFetcher.rblxUsername)
    var firstCheck = await rbx.getRankInGroup(2621202, okayLetsTry)
    var SASRole = await rbx.getRankInGroup(2622548, okayLetsTry)
    var PARASRole = await rbx.getRankInGroup(2623485, okayLetsTry)
    var GHURKASRole = await rbx.getRankInGroup(3283689, okayLetsTry)
    var AACRole = await rbx.getRankInGroup(2950117, okayLetsTry)
    var RMPRole = await rbx.getRankInGroup(2630460, okayLetsTry)
    var TCPRole = await rbx.getRankInGroup(4598236, okayLetsTry);
    var SRRRole = await rbx.getRankInGroup(4596871, okayLetsTry);
    var BOPRole = await rbx.getRankInGroup(4117083, okayLetsTry);
    if (SASRole === 0){
      message.member.removeRole(message.guild.roles.find(role => role.name === "SAS"))
    }
    if (PARASRole === 0){
      message.member.removeRole(message.guild.roles.find(role => role.name === "PARAS"))
    }
    if (GHURKASRole === 0){
      message.member.removeRole(message.guild.roles.find(role => role.name === "GURKHAS"))
    }
    if (AACRole === 0){
      message.member.removeRole(message.guild.roles.find(role => role.name === "AAC"))
    }
    if (RMPRole === 0){
      message.member.removeRole(message.guild.roles.find(role => role.name === "RMP"))
    }
    if (TCPRole < 50){
      message.member.removeRole(message.guild.roles.find(role => role.name === "TCP"))
    }
    if (SRRRole === 0){
      message.member.removeRole(message.guild.roles.find(role => role.name === "SRR"))
    }
    if (BOPRole === 0){
      message.member.removeRole(message.guild.roles.find(role => role.name === "BOP"))
    }
    if ((SASRole > 0) && (!message.member.roles.exists('name', 'SAS'))){
      message.member.addRole(message.guild.roles.find(role => role.name === "SAS"))
    }
    if ((PARASRole > 0) && (!message.member.roles.exists('name', 'PARAS'))){
      message.member.addRole(message.guild.roles.find(role => role.name === "PARAS"))
    }
    if ((GHURKASRole > 0) && (!message.member.roles.exists('name', 'GHURKAS'))){
      message.member.addRole(message.guild.roles.find(role => role.name === "GURKHAS"))
    }
    if ((AACRole > 0) && (!message.member.roles.exists('name', 'AAC'))){
      message.member.addRole(message.guild.roles.find(role => role.name === "AAC"))
    }
    if ((RMPRole > 0) && (!message.member.roles.exists('name', 'RMP'))){
      message.member.addRole(message.guild.roles.find(role => role.name === "RMP"))
    }
    if ((TCPRole >= 50) && (!message.member.roles.exists('name', 'TCP'))){
      message.member.addRole(message.guild.roles.find(role => role.name === "TCP"))
    }
    if ((SRRRole > 0) && (!message.member.roles.exists('name', 'SRR'))){
      message.member.addRole(message.guild.roles.find(role => role.name === "SRR"))
    }
    if ((BOPRole > 0) && (!message.member.roles.exists('name', 'BOP'))){
      message.member.addRole(message.guild.roles.find(role => role.name === "BOP"))
    }

    // ALLIED ROLES [START]
    var ROKARole = await rbx.getRankInGroup(3828960, okayLetsTry);
    var UAFRole = await rbx.getRankInGroup(80738, okayLetsTry);
    var SAFRole = await rbx.getRankInGroup(3377358, okayLetsTry);
    // ALLIED ROLES [END]

    if (firstCheck === 0 && ROKARole === 0 && UAFRole === 0 && SAFRole === 0){
      message.member.removeRole(message.guild.roles.find(role => role.name === "DIPLOMAT"))
      message.member.removeRole(message.guild.roles.find(role => role.name === "DEVELOPER"))
      message.member.removeRole(message.guild.roles.find(role => role.name === "VERIFIED"))
      message.member.removeRole(message.guild.roles.find(role => role.name === "LOW RANK"))
      message.member.removeRole(message.guild.roles.find(role => role.name === "MIDDLE RANK"))
      message.member.removeRole(message.guild.roles.find(role => role.name === "HIGH RANK"))
      message.member.removeRole(message.guild.roles.find(role => role.name === "CHIEF RANK"))
    }
    if (firstCheck === 0 && UAFRole === 0 && SAFRole === 0 && ROKARole > 2){
      await message.member.addRole(message.guild.roles.find(role => role.name === "VERIFIED"))
      message.member.setNickname(`[ROKA] ${body.Username}`)
      return undefined;
    }
    if (firstCheck === 0 && ROKARole === 0 && SAFRole === 0 && UAFRole > 3){
      await message.member.addRole(message.guild.roles.find(role => role.name === "VERIFIED"))
      message.member.setNickname(`[UAF] ${body.Username}`)
      return undefined;
    }
    if (firstCheck === 0 && ROKARole === 0 & UAFRole === 0 && SAFRole > 10){
      await message.member.addRole(message.guild.roles.find(role => role.name === "VERIFIED"))
      message.member.setNickname(`[SAF] ${body.Username}`)
      return undefined;
    }



    if ((firstCheck === 220 || firstCheck === 250 || firstCheck === 255) && (!message.member.roles.exists('name', 'CHIEF RANK'))){
      message.member.addRole(message.guild.roles.find(role => role.name === "CHIEF RANK"))
      message.member.addRole(message.guild.roles.find(role => role.name === "VERIFIED"))
      message.member.removeRole(message.guild.roles.find(role => role.name === "DIPLOMAT"))
      message.member.removeRole(message.guild.roles.find(role => role.name === "DEVELOPER"))
      message.member.removeRole(message.guild.roles.find(role => role.name === "LOW RANK"))
      message.member.removeRole(message.guild.roles.find(role => role.name === "MIDDLE RANK"))
      message.member.removeRole(message.guild.roles.find(role => role.name === "HIGH RANK"))
    }
    if ((firstCheck === 235) && (!message.member.roles.exists('name', 'DEVELOPER'))){
      message.member.addRole(message.guild.roles.find(role => role.name === "DEVELOPER"))
      message.member.addRole(message.guild.roles.find(role => role.name === "VERIFIED"))
      message.member.removeRole(message.guild.roles.find(role => role.name === "DIPLOMAT"))
      message.member.removeRole(message.guild.roles.find(role => role.name === "LOW RANK"))
      message.member.removeRole(message.guild.roles.find(role => role.name === "MIDDLE RANK"))
      message.member.removeRole(message.guild.roles.find(role => role.name === "CHIEF RANK"))
      message.member.removeRole(message.guild.roles.find(role => role.name === "HIGH RANK"))
    }
    if ((160<=firstCheck && firstCheck <= 205) && (!message.member.roles.exists('name', 'HIGH RANK'))){
      message.member.addRole(message.guild.roles.find(role => role.name === "VERIFIED"))
      message.member.addRole(message.guild.roles.find(role => role.name === "HIGH RANK"))
      message.member.removeRole(message.guild.roles.find(role => role.name === "DEVELOPER"))
      message.member.removeRole(message.guild.roles.find(role => role.name === "LOW RANK"))
      message.member.removeRole(message.guild.roles.find(role => role.name === "MIDDLE RANK"))
      message.member.removeRole(message.guild.roles.find(role => role.name === "CHIEF RANK"))
    }
    if ((130<=firstCheck && firstCheck <= 145) && (!message.member.roles.exists('name', 'MIDDLE RANK'))){
      message.member.addRole(message.guild.roles.find(role => role.name === "VERIFIED"))
      message.member.addRole(message.guild.roles.find(role => role.name === "MIDDLE RANK"))
      message.member.removeRole(message.guild.roles.find(role => role.name === "DEVELOPER"))
      message.member.removeRole(message.guild.roles.find(role => role.name === "DIPLOMAT"))
      message.member.removeRole(message.guild.roles.find(role => role.name === "LOW RANK"))
      message.member.removeRole(message.guild.roles.find(role => role.name === "HIGH RANK"))
      message.member.removeRole(message.guild.roles.find(role => role.name === "CHIEF RANK"))
    }
    if ((115 === firstCheck) && (!message.member.roles.exists('name', 'DIPLOMAT'))){
      message.member.addRole(message.guild.roles.find(role => role.name === "DIPLOMAT"))
      message.member.addRole(message.guild.roles.find(role => role.name === "VERIFIED"))
      message.member.removeRole(message.guild.roles.find(role => role.name === "LOW RANK"))
      message.member.removeRole(message.guild.roles.find(role => role.name === "DEVELOPER"))
      message.member.removeRole(message.guild.roles.find(role => role.name === "MIDDLE RANK"))
      message.member.removeRole(message.guild.roles.find(role => role.name === "HIGH RANK"))
      message.member.removeRole(message.guild.roles.find(role => role.name === "CHIEF RANK"))
    }
    if ((1<=firstCheck && firstCheck <= 100) && (!message.member.roles.exists('name', 'LOW RANK'))){
      message.member.addRole(message.guild.roles.find(role => role.name === "LOW RANK"))
      message.member.addRole(message.guild.roles.find(role => role.name === "VERIFIED"))
      message.member.removeRole(message.guild.roles.find(role => role.name === "DIPLOMAT"))
      message.member.removeRole(message.guild.roles.find(role => role.name === "MIDDLE RANK"))
      message.member.removeRole(message.guild.roles.find(role => role.name === "DEVELOPER"))
      message.member.removeRole(message.guild.roles.find(role => role.name === "HIGH RANK"))
      message.member.removeRole(message.guild.roles.find(role => role.name === "CHIEF RANK"))
    }
    if (firstCheck === 1) {
      message.member.setNickname(`[REC] ${body.Username}`);
    }
    if (firstCheck === 10) {
      message.member.setNickname(`[PVT] ${body.Username}`);
    }
    if (firstCheck === 25) {
      message.member.setNickname(`[LCPL] ${body.Username}`);
    }
    if (firstCheck === 40) {
      message.member.setNickname(`[CPL] ${body.Username}`);
    }
    if (firstCheck === 55) {
      message.member.setNickname(`[SGT] ${body.Username}`);
    }
    if (firstCheck === 70) {
      message.member.setNickname(`[SSGT] ${body.Username}`);
    }
    if (firstCheck === 85) {
      message.member.setNickname(`[SGM] ${body.Username}`);
    }
    if (firstCheck === 100) {
      message.member.setNickname(`[WO] ${body.Username}`)
    }
    if (firstCheck === 115) {
      message.member.setNickname(`[ALLY] ${body.Username}`)
    }
    if (firstCheck === 130) {
      message.member.setNickname(`[LT] ${body.Username}`)
    }
    if (firstCheck === 145) {
      message.member.setNickname(`[CPT] ${body.Username}`)
    }
    if (firstCheck === 160) {
      message.member.setNickname(`[MAJ] ${body.Username}`)
    }
    if (firstCheck === 175) {
      message.member.setNickname(`[LTCOL] ${body.Username}`)
    }
    if (firstCheck === 190) {
      message.member.setNickname(`[COL] ${body.Username}`)
    }
    if (firstCheck === 205) {
      message.member.setNickname(`[BRIG] ${body.Username}`)
    }
    if (firstCheck === 220) {
      message.member.setNickname(`[LTGEN] ${body.Username}`)
    }
    if (firstCheck === 235) {
      message.member.setNickname(`[DEV] ${body.Username}`)
    }
    if (firstCheck === 250) {
      message.member.setNickname(`[CDEV] ${body.Username}`)
    }
    if (firstCheck === 255) {
      message.member.setNickname(`[GEN] ${body.Username}`)
    }
  }
  if (message.guild.id === `553047195507621890`){
      if (message.author.id === '502614584134467625') return;
      if (message.author.bot) return undefined;
      var regimentalGroupID = await roblox.getGroup(4598236) // TCP GROUP

      var rblxUsernameFetcher = await sql.get(`SELECT * FROM rblxUsernameDB WHERE userID ="${message.author.id}"`);
      if (!rblxUsernameFetcher){
        var embed = new Discord.RichEmbed()
          .setColor(0xff6b6b)
          .setAuthor(`Verification Error`, "https://cdn.discordapp.com/attachments/502568121526124556/543673170176245797/baliontransparent.png")
          .setDescription(`Sorry ${message.author}, but for me to process you through correctly, you must verify yourself with me in the main British Army Discord server.\ndiscord.gg/f42JjaR`)
        await message.channel.send(embed).then(message => message.delete(30000));
        message.member.kick()
        return undefined;
      }
      var { body } = await snekfetch.get(`http://api.roblox.com/users/get-by-username?username=${rblxUsernameFetcher.rblxUsername}`);
      var okayLetsTry = await rbx.getIdFromUsername(rblxUsernameFetcher.rblxUsername)
      var mainGroup = await rbx.getRankInGroup(2621202, okayLetsTry) // MAIN GROUP
      var regimentalGroup = await rbx.getRankInGroup(4598236, okayLetsTry) // TCP GROUP

      if (mainGroup === 0 && regimentalGroup > 0){
        regimentalGroupID.exile(okayLetsTry)
        var embed = new Discord.RichEmbed()
          .setColor(0xff6b6b)
          .setAuthor(`Verification Error`, "https://cdn.discordapp.com/attachments/502568121526124556/543673170176245797/baliontransparent.png")
          .setDescription(`${message.author} has been kicked from this server because the user has left BA, but was still in the regimental group.\n**The user was exiled from the regiment associated with this Discord server!**`)
        await message.channel.send(embed)
        message.member.kick()
        return undefined;
      }

      if (mainGroup === 1) {
        message.member.setNickname(`[REC] ${body.Username}`);
      }
      if (mainGroup === 10) {
        message.member.setNickname(`[PVT] ${body.Username}`);
      }
      if (mainGroup === 25) {
        message.member.setNickname(`[LCPL] ${body.Username}`);
      }
      if (mainGroup === 40) {
        message.member.setNickname(`[CPL] ${body.Username}`);
      }
      if (mainGroup === 55) {
        message.member.setNickname(`[SGT] ${body.Username}`);
      }
      if (mainGroup === 70) {
        message.member.setNickname(`[SSGT] ${body.Username}`);
      }
      if (mainGroup === 85) {
        message.member.setNickname(`[SGM] ${body.Username}`);
      }
      if (mainGroup === 100) {
        message.member.setNickname(`[WO] ${body.Username}`)
      }
      if (mainGroup === 115) {
        message.member.setNickname(`[ALLY] ${body.Username}`)
      }
      if (mainGroup === 130) {
        message.member.setNickname(`[LT] ${body.Username}`)
      }
      if (mainGroup === 145) {
        message.member.setNickname(`[CPT] ${body.Username}`)
      }
      if (mainGroup === 160) {
        message.member.setNickname(`[MAJ] ${body.Username}`)
      }
      if (mainGroup === 175) {
        message.member.setNickname(`[LTCOL] ${body.Username}`)
      }
      if (mainGroup === 190) {
        message.member.setNickname(`[COL] ${body.Username}`)
      }
      if (mainGroup === 205) {
        message.member.setNickname(`[BRIG] ${body.Username}`)
      }
      if (mainGroup === 220) {
        message.member.setNickname(`[LTGEN] ${body.Username}`)
      }
      if (mainGroup === 235) {
        message.member.setNickname(`[DEV] ${body.Username}`)
      }
      if (mainGroup === 250) {
        message.member.setNickname(`[CDEV] ${body.Username}`)
      }
      if (mainGroup === 255) {
        message.member.setNickname(`[GEN] ${body.Username}`)
      }

      if (regimentalGroup === 50){
        await message.member.setRoles()
        message.member.addRole(message.guild.roles.find(role => role.name === "Instructor School"))
      }
      if (regimentalGroup === 75){
        await message.member.setRoles()
        message.member.addRole(message.guild.roles.find(role => role.name === "Instructor School"))
      }
      if (regimentalGroup === 100){
        await message.member.setRoles()
        message.member.addRole(message.guild.roles.find(role => role.name === "Junior Directing Staff"))
      }
      if (regimentalGroup === 125){
        await message.member.setRoles()
        message.member.addRole(message.guild.roles.find(role => role.name === "Directing Staff"))
      }
      if (regimentalGroup === 150){
        await message.member.setRoles()
        message.member.addRole(message.guild.roles.find(role => role.name === "Senior Directing Staff"))
      }
      if (regimentalGroup === 175){
        await message.member.setRoles()
        message.member.addRole(message.guild.roles.find(role => role.name === "Head Directing Staff"))
      }
      if (regimentalGroup === 200){
        await message.member.setRoles()
        message.member.addRole(message.guild.roles.find(role => role.name === "Executive"))
      }
      if (regimentalGroup === 225){
        await message.member.setRoles()
        message.member.addRole(message.guild.roles.find(role => role.name === "Commander"))
      }
      if (regimentalGroup >= 250){
        await message.member.setRoles()
        message.member.addRole(message.guild.roles.find(role => role.name === "Chief"))
      }
    }

  var rblxUsernameFetcher = await sql.get(`SELECT * FROM rblxUsernameDB WHERE userID ="${message.author.id}"`);
  if (!rblxUsernameFetcher){
    return undefined;
  }
  var rblxUserID = await rbx.getIdFromUsername(`${rblxUsernameFetcher.rblxUsername}`)
  var { body } = await snekfetch.get(`${baseURL}robux/${rblxUserID}.json`);
  if (!body){
    firebase.database().ref(`robux/` + rblxUserID).set({
      total: Number(0),
      hand: Number(0),
      bank: Number(0)
    })
  return undefined;
  }else{
    var totalSum = Number(body.total);
    var handSum = (Number(body.hand) + Number(1));
    var bankSum = Number(body.bank);
    firebase.database().ref('robux/' + rblxUserID).update({
      total: (handSum + bankSum),
      hand: (handSum),
      bank: (bankSum)
    })
  }


  setTimeout(() => {
    cooldown.delete(message.author.id)
  }, cdSeconds * 1000)

});

baAutomation.login(`${token}`);

baAutomation.on('error', console.error);
