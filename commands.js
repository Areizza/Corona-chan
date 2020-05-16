var roles = require('./roles.js')
const minPlayers = 6

module.exports = {
    // Commands
    START: "start",
    END: "end",
    JOIN: "join",

    // Command handlers
    start: function(bot, message) {
        // Starts the game by infecting one random person
        players = roles.playerCount(message.guild, roles.HEALTHY);
        if (players.length < minPlayers) {
            message.reply("You need at least " + minPlayers + " to begin the game. There are currently " + players.length + " players.");
            return;
        }
        pZero = guild.members.fetch(players[(Math.random() * players.length)]);
        roles.removeRole(pZero, HEALTHY);
        roles.setRole(pZero, INFECTED);
        message.channel.send("Patient 0 has been infected.");
    },
    
    end: function(bot, message) {
        // Stops the game and output statistics
        healthyCount = roles.playerCount(message.guild, roles.HEALTHY).length;
        infectedCount = roles.playerCount(message.guild, roles.INFECTED).length;
        deadCount = roles.playerCount(message.guild, roles.DEAD).length;
        recoveredCount = roles.playerCount(message.guild, roles.RECOVERED).length;
        let embed = new bot.RichEmbed({
            "title": 'Final Counts',
            "description": "Healthy: " + healthyCount + "\n" + "Infected: " + infectedCount + "\n" + "Dead: " + deadCount + "\n" + "Recovered: " + recoveredCount,
            "color": 0xFFFF
        });
        message.channel.send({embed});
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
        message.reply("You have joined the game")
    }
}
