// Imports
var Discord = require('discord.js');
var logger = require('winston');
var auth = require('./auth.json');
var commands = require('./commands');

// Configure logger settings
logger.remove(logger.transports.Console);
logger.add(new logger.transports.Console, {
    colorize: true
});
logger.level = 'debug';

// Initialize Discord Bot
var bot = new Discord.Client({});

bot.on('ready', () => {
    logger.info('Connected');
    logger.info('Logged in as: ');
    logger.info(bot.user.tag);
});

// Array of users who joined
var joinedUsers = [];

bot.on('message', (message) => {

    if (message.author.bot) {
        return
    }
    
    if (message.mentions.has(bot.user)) {
        // Split message on spaces and extract command
        const args = message.content.split(/\s+/);
        args.shift();       // remove mention
    
        if (!args.length) {
            logger.warn("No command passed to ${bot.username}")
            message.reply("Did you need something?")
            return
        }
        const command = args.shift().toLowerCase();
        //message.reply(`Command name: ${command}\nArguments: ${args}`);

        // args unused
        switch (command) {
            case commands.START:
                commands.start(bot, message);
                if (joinedUsers.length >= 6) {
                    message.reply("there are " + joinedUsers.length + " player(s). Game can now begin.");
                }
                else {
                    message.reply("there are " + joinedUsers.length + " player(s). insufficient players.");
                }
                break;
            case commands.END:
                commands.end(bot, message);
                message.reply("These were the players: " + joinedUsers);
                //clear array of players
                joinedUsers = [];
                break;
            case commands.JOIN:
                commands.join(bot, message);
                joinedUsers.push(message.member.user);
                message.reply("JOINED USERS: " + joinedUsers);
                break;
        }
    }
    // TODO:
    // Game logic
});

bot.login(auth.token);