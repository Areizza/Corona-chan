var roles = require('./roles')
var Discord = require('discord.js');

module.exports = {
    started: false,
    DEATHTRIGGER: 1.00,

    // Determines if the game has been won or lost
    checkGameStatus: function(bot, guild) {
        this.lose(bot,guild);

        if (this.started) {
            numHealthy = roles.playerCount(guild, roles.HEALTHY).length;
            numInfected = roles.playerCount(guild, roles.INFECTED).length;
            numRecovered = roles.playerCount(guild, roles.RECOVERED).length;
            numDead = roles.playerCount(guild, roles.DEAD).length;
            totalPlayers = numHealthy + numInfected + numRecovered + numDead;
    
            if (numDead > totalPlayers*this.DEATHTRIGGER) {
                this.lose(bot, guild); 
            } else if (roles.playerCount(guild, roles.INFECTED) == 0) {
                this.win(bot, guild);
            }
        }
    },

    start: function(bot, guild, channel) {
        pZero = guild.roles.cache.get(roles.getRoleID(guild, roles.HEALTHY)).members.random();
        roles.removeRole(pZero, roles.HEALTHY);
        roles.setRole(pZero, roles.INFECTED);
        channel.send("Patient 0 has been infected.");
        console.debug(`${pZero.displayName} selected as Patient 0`)
        this.started = true;
    },

    end: function(bot, guild, channel) {
        this.outputStatistics(bot, guild, channel)
        guild.roles.cache.get(roles.getRoleID(guild, roles.HEALTHY)).members.forEach(mem => roles.removeRole(mem, roles.HEALTHY));
        guild.roles.cache.get(roles.getRoleID(guild, roles.INFECTED)).members.forEach(mem => roles.removeRole(mem, roles.INFECTED));
        guild.roles.cache.get(roles.getRoleID(guild, roles.DEAD)).members.forEach(mem => roles.removeRole(mem, roles.DEAD));
        guild.roles.cache.get(roles.getRoleID(guild, roles.RECOVERED)).members.forEach(mem => roles.removeRole(mem, roles.RECOVERED));
        this.started = false;
    },

    win: function(bot, guild) {
        console.debug("Win triggered");
        outputToGeneral(bot, guild, "Congratulations! You have eradicated COVID-19!!");
        this.outputStatistics(bot, getGeneral(guild));
    },
    
    lose: function(bot, guild) {
        console.debug("Lose triggered");
        outputToGeneral(bot, guild, "Unfortunately, COVID-19 has ravaged the planet beyond repair, and you have lost the game :(")
        this.end(bot, guild, getGeneral(guild))
    },

    outputStatistics(bot, guild, channel) {
        healthyUsers = roles.playerNamesByRole(guild, roles.HEALTHY);
        infectedUsers = roles.playerNamesByRole(guild, roles.INFECTED);
        deadUsers = roles.playerNamesByRole(guild, roles.DEAD);
        recoveredUsers = roles.playerNamesByRole(guild, roles.RECOVERED);
        
        var statistics = new Discord.MessageEmbed()
            .setTitle('Users per role')
            .addFields(
                {name: 'Healthy', value: checkUsers(healthyUsers)},
                {name: 'Infected', value: checkUsers(infectedUsers)},
                {name: 'Dead', value: checkUsers(deadUsers)},
                {name: 'Recovered', value: checkUsers(recoveredUsers)}
            )
            .setColor('#0099ff');
        channel.send(statistics);
    }
}

function outputToGeneral(bot, guild, text) {
    bot.channels.fetch(getGeneral(guild).id)
        .then(channel => channel.send(text))
        .catch(console.error);
}

function getGeneral(guild) {
    return guild.channels.cache.find(c => (c.type === 'text' && c.name === 'general'))
}

function checkUsers(users) {
    if (!users.length) {
        return "N/A";
    }
    return users.toString();
}