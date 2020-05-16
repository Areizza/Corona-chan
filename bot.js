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
    /* Previous code:
    message.reply("Why thanks for taking the time to chat!");
    */

    // New Wiki Code
    if (message.author.id === '1750') {
        wiki.search('Climate')
            .then(pages => wiki.getRandomQuote(pages[Math.floor(Math.random() * pages.length)].title))
            .then(quote => message.reply(quote));
    }
});

bot.login(auth.token);
