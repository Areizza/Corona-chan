var roles = require('./roles.js');
var game = require('./game.js');
var itemGroupManager = require('./ItemGroupManager/itemGroupManager');
var Discord = require('discord.js');
var config = require('./config')

module.exports = {
    // Commands
    START: "start",
    END: "end",
    JOIN: "join",
    DEBUG: "debug",
    CLEAR: "clear",
    ITEMS: "items",
    HELP: "help",

    // Command handlers
    start: function(bot, message) {
        // Starts the game by infecting one random person
        players = roles.playerCount(message.guild, roles.HEALTHY);
        if (players.length < config.MIN_PLAYERS) {
            message.reply("Boo hoo, Corona-chan is waiting for at least " + config.MIN_PLAYERS + " to start the game! There are currently only " + players.length + ".");
            return;
        }
        game.start(bot, message.guild, message.channel);
    },
    
    end: function(bot, message) {
        // Stops the game and output statistics
        if (!game.started) {
            message.reply("Corona-chan isn't ready for her grand debut yet, baka!");
            return;
        }
        message.reply("Aww... Corona-chan will always wait for you.")
        game.end(bot, message.guild, message.channel);
    },

    join: function(bot, message) {
        // Take part in the game
        // If a game is already in place, you will be uninfected
        // If a game in not in place and a game starts, you could be patient zero
        if (roles.memberHasRole(message.member, roles.HEALTHY)||roles.memberHasRole(message.member, roles.INFECTED)||roles.memberHasRole(message.member, roles.DEAD)||roles.memberHasRole(message.member, roles.RECOVERED)) {
            message.reply("Corona-chan already received your RSVP!");
            return;
        }
        itemGroupManager.igm.addUser(message.author.id);
        roles.setRole(message.member, roles.HEALTHY);
        message.reply("Thanks for joining Corona-chan's game! ♥")
    },

    debug: function(bot, message) {
        game.outputStatistics(bot, message.guild, message.channel);
    },

    clear: function(bot, message) {
        game.end(bot, message.guild, message.channel);
    },

    items: function(bot, message) {
        game.outputItems(bot, message.author, message.channel);
    },

    help: function(bot, message) {
        var helpEmbed = new Discord.MessageEmbed()
            .setTitle('Help Menu')
            .addFields(
                {name: 'join', value: "Participate in Corona-chan's game."},
                {name: 'start', value: `Begin the game. Requires ${config.MIN_PLAYERS} participants to begin.`},
                {name: 'end', value: "Force end Corona-chan's game."},
                {name: 'items', value: "Check the items you currently are in possesion of. Game must be in progress to use this command."},
                {name: 'help', value: "Show this menu"}
            )
            .setColor('#f5336e');
        message.channel.send(helpEmbed);
    }
}
