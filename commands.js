var roles = require('./roles.js')

module.exports = {
    // Commands
    START: "start",
    END: "end",
    JOIN: "join",

    // Command handlers
    start: function(bot, message) {
        // Starts the game by infecting one random person
        players = roles.playerCount(message.guild, roles.HEALTHY);
        if (players.length < 6) {
            message.reply("Not enough players to start the game.");
            return;
        }
        pZero = guild.members.get(players[(Math.random() * players.length)]);
        roles.removeRole(pZero, HEALTHY);
        roles.setRole(pZero, INFECTED);
        message.channel.send("Patient 0 has been infected.");
        console.log("commands.start()");
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
        console.log("commands.end()");
    },

    join: function(bot, message) {
        // Take part in the game
        // If a game is already in place, you will be uninfected
        // If a game in not in place and a game starts, you could be patient zero
        if (roles.memberHasRole(message.member, roles.HEALTHY)||roles.memberHasRole(message.member, roles.INFECTED)||roles.memberHasRole(message.member, roles.DEAD)||roles.memberHasRole(message.member, roles.RECOVERED)) {
            message.reply("You are already part of the game.")
            return;
        }
        roles.setRole(message.member, roles.HEALTHY);
        console.log("commands.join()");
    }
}
