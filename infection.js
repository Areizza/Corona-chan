var roles = require('./roles.js')
var game = require('./game')

const MAXMESSAGES = 50;
const TIMELIMIT = 15 * 60;

module.exports = {

    // Handle of the possibility of the message author being infected
    // Only healthy people have a risk of being infected
    handleRisk: function(bot, newMsg) {
        game.checkGameStatus(bot, newMsg.member.guild);

        if (game.started && roles.memberHasRole(newMsg.member, roles.HEALTHY)) {
            const now = new Date().getTime();
                 
            newMsg.channel.messages.fetch({ limit: MAXMESSAGES })
                .then(msgs => {
                    // Keep msgs from infected users and within the time limit
                    msgs = msgs.filter(msg => (
                        ((now - msg.createdTimestamp) < TIMELIMIT) && roles.memberHasRole(msg.member, roles.INFECTED)
                    ))
                        
                    uniqueInfectedUsers = {};
                    msgs.each(msg => {
                        if (!(msg.author.id in uniqueInfectedUsers)) {
                            uniqueInfectedUsers[msg.author.id] = msg.author;
                        }
                    });
                    
                    console.debug("Unique infected users: ", uniqueInfectedUsers);
                    // TODO: use to calculate rate of infection
                    for (usr in uniqueInfectedUsers) {
                        console.log(`${usr.username} is infected and could spread it to ${newMsg.member.username}`)
                    }
                    console.log("New message: ", newMsg)

                    // Infect the message author
                    if (Objct.keys(uniqueInfectedUsers).length) {
                        if (Math.random() < calculateInfectionRate()) {
                            roles.setRole(newMsg.member, roles.INFECTED);
                            roles.removeRole(newMsg.member, roles.HEALTHY);
                            newMsg.reply("Corona-chan has visited you, and you have become infected!");
                            roles.recoverOrDie(newMsg.member);
                            game.checkGameStatus(bot, member.guild);
                        }
                    }
                })
                .catch(console.error);
        }    
    }
}
