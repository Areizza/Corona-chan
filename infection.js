var roles = require('./roles.js')

const MAXMESSAGES = 50;
const TIMELIMIT = 15 * 60;

module.exports = {

    // Handle of the possibility of the message author being infected
    handleRisk: function(bot, newMsg) {
        
        // Only healthy people can be infected
        if (roles.memberHasRole(newMsg.member, roles.HEALTHY)) {
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

                    if (Object.keys(uniqueInfectedUsers).length) {
                        const infectionRate = calculateInfectionRate()
                        if (Math.random() < infectionRate) {
                            roles.setRole(newMsg.member, roles.INFECTED);
                            roles.removeRole(newMsg.member, roles.HEALTHY);
                            newMsg.reply("You have been infected!")
                        }
                    }
                })
                .catch(console.error);
        }    
    }
}

// TODO
function calculateInfectionRate() {
    return 0.5;
}


