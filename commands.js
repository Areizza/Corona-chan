var roles = require('./roles.js');
var game = require('./game.js')

const minPlayers = 1;

module.exports = {
    // Commands
    START: "start",
    END: "end",
    JOIN: "join",
    DEBUG: "debug",
    CLEAR: "clear",

    // Command handlers
    start: function(bot, message) {
        // Starts the game by infecting one random person
        players = roles.playerCount(message.guild, roles.HEALTHY);
        if (players.length < minPlayers) {
            message.reply("You need at least " + minPlayers + " to begin the game. There are currently " + players.length + " players.");
            return;
        }
        game.start(bot, message.guild, message.channel);
    },
    
    end: function(bot, message) {
        // Stops the game and output statistics
        if (!game.started) {
            message.reply("The game has not been started.");
            return;
        }
        message.reply("You have ended the game")
        game.end(bot, message.guild, message.channel);
    },

    join: function(bot, message) {
        // Take part in the game
        // If a game is already in place, you will be uninfected
        // If a game in not in place and a game starts, you could be patient zero
        if (roles.memberHasRole(message.member, roles.HEALTHY)||roles.memberHasRole(message.member, roles.INFECTED)||roles.memberHasRole(message.member, roles.DEAD)||roles.memberHasRole(message.member, roles.RECOVERED)) {
            message.reply("You are already part of the game.");
            return;
        }
        roles.setRole(message.member, roles.HEALTHY);
        message.reply("You have joined the game.")
    },

    debug: function(bot, message) {
        game.outputStatistics(bot, message.guild, message.channel);
    },

    clear: function(bot, message) {
        this.end(bot, message);
    }
}
