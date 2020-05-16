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

bot.on('message', (message) => {
    
    if (message.author.bot) {
        return
    }
    
    if (message.mentions.has(bot.user)) {
        // Split message on spaces and extract command
        const args = message.content.split(/\s+/);
        args.shift();       // remove mention
    
        const command = args.shift().toLowerCase();
        message.reply(`Command name: ${command}\nArguments: ${args}`);

        // args unused
        console.log(command);
        console.log(commands.START);
        switch (command) {
            case commands.START:
                commands.start()
                break;
            case commands.END:
                commands.end();
                break;
            case commands.JOIN:
                commands.join();
                break;
        }
    }
    // TODO:
    // Game logic
});

bot.login(auth.token);