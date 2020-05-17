// Imports
var Discord = require('discord.js');
var logger = require('winston');
var auth = require('./auth.json');
var commands = require('./commands');
var infection = require('./infection');
var itemGroupManager = require('./ItemGroupManager/itemGroupManager')

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
    igm = itemGroupManager.itemGroupManager
});

bot.on('message', (message) => {
    
    if (message.author.bot) {
        return
    }
    
    if (message.mentions.has(bot.user)) {
        // Split message on spaces and extract command
        const args = message.content.split(/\s+/);
        args.shift();       // remove mention
    
        if (!args.length) {
            logger.warn("${bot.username} doesn't understand!")
            return
        }
        const command = args.shift().toLowerCase();
        message.reply(`Command name: ${command}\nArguments: ${args}`);

        // args unused
        switch (command) {
            case commands.START:
                commands.start(bot, message)
                break;
            case commands.END:
                commands.end(bot, message);
                break;
            case commands.JOIN:
                commands.join(bot, message);
                break;
        }
    } else {
        infection.handleRisk(bot, message);
    }
});

bot.login(auth.token);