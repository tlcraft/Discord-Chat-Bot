discord = require('discord.js');
https = require('https');

// Connect to Discord as a user
var bot = new discord.Client();

// Grab our Bot Token from the environment variable
const token = process.env.DISCORD_BOT_TOKEN;

// Run once the bot connects successfully
bot.on('ready', () => {
  console.log('Logged in as ' + bot.user.username + '. ID: ' + bot.user.id + '.');
  console.log('I am ready!')
  
  // Lists the servers that this bot is active in
  exports.activeServers = bot.guilds.array();
  for (let value of exports.activeServers) {
    console.log(value.name);
  }
});

// Run each time a message is seen by the bot
bot.on('message', (message) => {
  if(isMessageForBot(message)) {
    //Removes the bot key and then breaks the rest of the message apart into chunks based on whitespace
    const commandArgs = message.content.substring(1).split(/\s+/);

    if(commandArgs[0] === 'hello') {
      //Sends a message in the same channel that !hello was typed.
      message.channel.send('Hello ' + message.author.username + '.  How are you today?');
    }
  }
});

function isMessageForBot(message) {
  return message.content.substring(0, 1) === '!';
}

// Log our bot in
bot.login(token);

// Keep app awake
setInterval(
  () => {
    https.get('https://travislcraft-discord-game-bot.herokuapp.com/');
  },
  300000
);