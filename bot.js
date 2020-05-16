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

    let guild  = message.guild;
    guild.roles.fetch().then(forAll(role))

    if (message.content === '!join') {
        message.member.roles.add('711247579815477279');
    }

    if (message.content === '!quit') {
        message.member.roles.remove('711247579815477279');
    }

    if (message.content === '!start') {
        let players = guild.roles.get('415665311828803584').members.map(m => m.user.id);
        if (players.size > 6) {
            p_zero = guild.members.get(players[(Math.random() * players.size) + 1]);
            p_zero
        }
    }
    if (message.content === '!end') {

    }

});

bot.login(auth.token);
