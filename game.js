var roles = require('./roles')
var itemGroupManager = require('./ItemGroupManager/itemGroupManager')
var Discord = require('discord.js');
var config = require('./config')

module.exports = {
    started: false,

    // Starts the game by setting a random player as Infected
    start: function(bot, guild, channel) {
        itemGroupManager.igm.initialize();
        pZero = guild.roles.cache.get(roles.getRoleID(guild, roles.HEALTHY)).members.random();
        roles.removeRole(pZero, roles.HEALTHY);
        roles.setRole(pZero, roles.INFECTED);
        channel.send("```Corona-chan is ready to play ♥ Someone has received my special gift```");
        console.debug(`${pZero.displayName} selected as Patient 0`)
        this.started = true;
        
        // check game status runs before recover/die's timer finishes
        roles.recoverOrDie(pZero);
        this.checkGameStatus(bot, guild);
    },

    // Ends the game, outputting statistics and clearing roles
    end: function(bot, guild, channel) {
        this.outputStatistics(bot, guild, channel)
        guild.roles.cache.get(roles.getRoleID(guild, roles.HEALTHY)).members.forEach(mem => roles.removeRole(mem, roles.HEALTHY));
        guild.roles.cache.get(roles.getRoleID(guild, roles.INFECTED)).members.forEach(mem => roles.removeRole(mem, roles.INFECTED));
        guild.roles.cache.get(roles.getRoleID(guild, roles.DEAD)).members.forEach(mem => roles.removeRole(mem, roles.DEAD));
        guild.roles.cache.get(roles.getRoleID(guild, roles.RECOVERED)).members.forEach(mem => roles.removeRole(mem, roles.RECOVERED));
        this.started = false;
    },

    // Determines if the game has been won or lost
    checkGameStatus: function(bot, guild) {
        if (this.started) {
            numHealthy = roles.playerCount(guild, roles.HEALTHY).length;
            numInfected = roles.playerCount(guild, roles.INFECTED).length;
            numRecovered = roles.playerCount(guild, roles.RECOVERED).length;
            numDead = roles.playerCount(guild, roles.DEAD).length;
            totalPlayers = numHealthy + numInfected + numRecovered + numDead;

            console.log("numHealthy " + numHealthy);
            console.log("numInfected " + numInfected);
            console.log("numRecovered " + numRecovered);
            console.log("numDead " + numDead);
    
            if (numDead >= totalPlayers*config.DEATHTRIGGER) {
                this.lose(bot, guild); 
            }
            // else if (roles.playerCount(guild, roles.INFECTED) == 0) {
            //     this.win(bot, guild);
            // }
        }
    },

    // Game is won
    win: function(bot, guild) {
        console.debug("Win triggered");
        outputToGeneral(bot, guild, "```B-b-baka, Corona-chan will be back! :'c```");
        this.end(bot, guild, getGeneral(guild))
    },
    
    // Game is lost
    lose: function(bot, guild) {
        console.debug("Lost triggered");
        outputToGeneral(bot, guild, "```Corona-chan loves everyone equally, let's play together forever and ever ♥```")
        this.end(bot, guild, getGeneral(guild))
    },

    // Output list of players in each role in a given channel
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
            .setColor('#f5336e');
        channel.send(statistics);
    },

    outputItems(bot, member, channel) {
        if (this.started) {
            items = itemGroupManager.igm.getItemsByID(member.id);
            if (!items) {
                console.debug("Warning: no items")
                return
            }
            var itemEmbed = new Discord.MessageEmbed()
                .setTitle(member.username)
                .setDescription(items.toString())
                .setColor('#f5336e');
            channel.send(itemEmbed);
        }
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
