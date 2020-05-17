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
            message.reply("Boo hoo, Corona-chan is waiting for at least " + minPlayers + " to start the game! There are currently only " + players.length + ".");
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
        roles.setRole(message.member, roles.HEALTHY);
        message.reply("Thanks for joining Corona-chan's game! ♥")
    },

    debug: function(bot, message) {
        game.outputStatistics(bot, message.guild, message.channel);
    },

    clear: function(bot, message) {
        this.end(bot, message);
    }
}
