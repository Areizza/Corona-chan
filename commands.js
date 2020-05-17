var roles = require('./roles.js');
var Discord = require('discord.js');
const minPlayers = 1;
var started = false;

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
        pZero = message.guild.roles.cache.get(roles.getRoleID(message.guild, roles.HEALTHY)).members.random();
        roles.removeRole(pZero, roles.HEALTHY);
        roles.setRole(pZero, roles.INFECTED);
        message.channel.send("Patient 0 has been infected.");
        started = true;
    },
    
    end: function(bot, message) {
        // Stops the game and output statistics
        if (!started) {
            message.reply("The game has not been started.");
            return;
        }

        healthyCount = roles.playerCount(message.guild, roles.HEALTHY).length;
        infectedCount = roles.playerCount(message.guild, roles.INFECTED).length;
        deadCount = roles.playerCount(message.guild, roles.DEAD).length;
        recoveredCount = roles.playerCount(message.guild, roles.RECOVERED).length;

        const embed = new Discord.MessageEmbed()
            .setTitle('Final Counts')
            .setDescription("Healthy: " + healthyCount + "\n" + "Infected: " + infectedCount + "\n" + "Dead: " + deadCount + "\n" + "Recovered: " + recoveredCount)
            .setColor('#0099ff');
        message.channel.send(embed);
        
        message.guild.roles.cache.get(roles.getRoleID(message.guild, roles.HEALTHY)).members.forEach(mem => roles.removeRole(mem, roles.HEALTHY));
        message.guild.roles.cache.get(roles.getRoleID(message.guild, roles.INFECTED)).members.forEach(mem => roles.removeRole(mem, roles.INFECTED));
        message.guild.roles.cache.get(roles.getRoleID(message.guild, roles.DEAD)).members.forEach(mem => roles.removeRole(mem, roles.DEAD));
        message.guild.roles.cache.get(roles.getRoleID(message.guild, roles.RECOVERED)).members.forEach(mem => roles.removeRole(mem, roles.RECOVERED));
        started = false;
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
    }
}
