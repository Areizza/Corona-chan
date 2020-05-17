var roles = require('./roles')
var commands = require('./commands')

module.exports = {
    started: false,
    DEATHTRIGGER: 0.25,

    // Determines if the game has been won or lost
    checkGameStatus: function(bot, guild) {
        win(bot,guild);
        return;

        // TODO: check for game started
        if (commands.started) {
            numHealthy = roles.playerCount(guild, roles.HEALTHY).length;
            numInfected = roles.playerCount(guild, roles.INFECTED).length;
            numRecovered = roles.playerCount(guild, roles.RECOVERED).length;
            numDead = roles.playerCount(guild, roles.DEAD).length;
            totalPlayers = numHealthy + numInfected + numRecovered + numDead;
    
            if (numDead > totalPlayers*this.DEATHTRIGGER) {
                lose(bot, guild); 
            } else if (roles.playerCount(guild, roles.INFECTED) == 0) {
                win(bot, guild);
            }
        }
    },
}

function win(bot, guild) {
    const general = "general";
    console.log("Win");
    console.log(guild.channels);
    const generalChannel = guild.channels.cache.find(c => (c.type === 'text' && c.name === general))
    if (!generalChannel) {
        console.warn(`WARNING: There is no ${general} channel`)
        return;
    }
    bot.channels.fetch(generalChannel.id)
        .then(channel => channel.send("Hello to general!"))
}

function lose(bot, guild) {
    console.log("Lose");
}