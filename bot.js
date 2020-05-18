// Imports
var Discord = require('discord.js');
var logger = require('winston');
var auth = require('./auth.json');
var commands = require('./commands');
var infection = require('./infection');
var roles = require('./roles');
var game = require('./game')

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
        return;
    }
    
    if (message.mentions.has(bot.user)) {
        // Split message on spaces and extract command
        const args = message.content.split(/\s+/);
        args.shift();       // remove mention
    
        if (!args.length) {
            logger.warn("No command passed to ${bot.username}")
            message.reply("Did you need something? (use 'help' for a list of commands)")
            return
        }
        const command = args.shift().toLowerCase();

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
            case commands.DEBUG:
                commands.debug(bot, message);
                break;
            case commands.CLEAR:
                commands.clear(bot, message);
                break;
            case commands.ITEMS:
                commands.items(bot, message);
                break;
            case commands.HELP:
                commands.help(bot, message);
                break;
            
            // DEBUG
            case "_win":
                game.win(bot, message.guild);
                break;
            case "_lose":
                game.lose(bot, message.guild);
                break;
        }
    } else if (game.started) {
        infection.handleRisk(bot, message);
    }
});

bot.on('guildCreate', (guild) => {
    let rolesData = [{name: roles.HEALTHY, color: roles.HCOLOR}, {name: roles.INFECTED, color: roles.ICOLOR}, {name: roles.DEAD, color: roles.DCOLOR}, {name: roles.RECOVERED, color: roles.RCOLOR}];
    rolesData.forEach(role => {
        let roleExists = guild.roles.cache.some(r => r.name === role.name);
        if (!roleExists) {
            guild.roles.create({data: {name: role.name, color: role.color}});
        }
    });
});

bot.login(auth.token);