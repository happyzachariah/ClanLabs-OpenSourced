// packages [start]
const {groupID, prefix, token, rblxCookie } = require('./settings/config.json');
const Discord = require('discord.js');
const snekfetch = require('snekfetch');
const fs = require('fs');
const rbx = require('noblox.js');
const bloxy = require('bloxy');
const roblox = new bloxy({
  cookie: rblxCookie
})
roblox.login().then(function() { console.log("should've logged in by now")});
var firebase = require("firebase");
/*
  paste your config here duh
*/
firebase.initializeApp(config)
// packages [end]


const client = new Discord.Client();
client.commands = new Discord.Collection();


const commandFiles = fs.readdirSync('./commands').filter(file => file.endsWith('.js'));
for (const file of commandFiles) {
	const command = require(`./commands/${file}`);
  client.commands.set(command.name, command);
}


client.on('ready', () => {
  console.log('Turned on Discord bot');
  client.user.setActivity(`${client.users.size} users`, { type: 'WATCHING' })
})


client.on('message', message => {

  const args = message.content.split(/[ ]+/)
  const command = `!${args[0].shift().toLowerCase()}`

  if (!client.commands.has(command)) return;

  try{
    client.commands.get(command).execute(message, args);
  } catch(error){
    console.error(`Error - ${error}`)
  }

});



client.login(token);
