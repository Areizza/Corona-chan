// Imports
var Discord = require('discord.js');
var logger = require('winston');
var auth = require('./auth.json');
var wiki = require('wikiquote');

// Configure logger settings
logger.remove(logger.transports.Console);
logger.add(new logger.transports.Console, {
    colorize: true
});
logger.level = 'debug';

// Initialize Discord Bot
var bot = new Discord.Client({
});

bot.on('ready', () => {
    logger.info('Connected');
    logger.info('Logged in as: ');
    logger.info(bot.user.tag);
});

bot.on('message', (message) => {
    if (message.author == bot.user) {
        return;
    }

    if (message.content === '!join') {
        message.member.roles.add('711247579815477279');
    }

    if (message.content === '!quit') {
        message.member.roles.remove('711247579815477279');
    }

});

bot.login(auth.token);
