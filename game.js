var roles = require('./roles')
var igm = require('./ItemGroupManager/itemGroupManager')
var Discord = require('discord.js');

module.exports = {
    started: false,
    DEATHTRIGGER: 1.00,
    inventories: {},

    // Starts the game by setting a random player as Infected
    start: function(bot, guild, channel) {
        igm.initialize();
        players = guild.roles.cache.get(roles.getRoleID(guild, roles.HEALTHY)).members.map(mem => mem.user.id);
        //channel.send("AAAAAA: " + JSON.stringify(players));
        this.inventories = this.distributeInventories(players, igm.itemGroups);
        channel.send(JSON.stringify(this.inventories));
        pZero = guild.roles.cache.get(roles.getRoleID(guild, roles.HEALTHY)).members.random();
        roles.removeRole(pZero, roles.HEALTHY);
        roles.setRole(pZero, roles.INFECTED);
        channel.send("Corona-chan is ready to play ♥ Someone has received my special gift");
        console.debug(`${pZero.displayName} selected as Patient 0`)
        this.started = true;
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

    distributeInventories: function(players, itemGroups) {
        console.log(players)
        let inventories = {};

        for (let i = 0; i < players.length; i++) {
            if (!(players[i] in inventories)) {
                inventories[players[i]] = itemGroups[i];
            } else {
                console.log(`WARNING: ${players[i]} is already a key in ItemGroupManager`)
            }
        }
        console.log(inventories);
        return inventories;
    },

    // Determines if the game has been won or lost
    checkGameStatus: function(bot, guild) {
        if (this.started) {
            numHealthy = roles.playerCount(guild, roles.HEALTHY).length;
            numInfected = roles.playerCount(guild, roles.INFECTED).length;
            numRecovered = roles.playerCount(guild, roles.RECOVERED).length;
            numDead = roles.playerCount(guild, roles.DEAD).length;
            totalPlayers = numHealthy + numInfected + numRecovered + numDead;
    
            if (numDead >= totalPlayers*this.DEATHTRIGGER) {
                this.lose(bot, guild); 
            } else if (roles.playerCount(guild, roles.INFECTED) == 0) {
                this.win(bot, guild);
            }
        }
    },

    // Game is won
    win: function(bot, guild) {
        console.debug("Win triggered");
        outputToGeneral(bot, guild, "B-b-baka, Corona-chan will be back! :'c");
        this.end(bot, guild, getGeneral(guild))
    },
    
    // Game is lost
    lose: function(bot, guild) {
        console.debug("Lost triggered");
        outputToGeneral(bot, guild, "Corona-chan loves everyone equally, let's play together forever and ever ♥")
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