var roles = require('./roles.js')

const MAXMESSAGES = 50;
const TIMELIMIT = 15 * 60;

module.exports = {

    // Handle of the possibility of the message author being infected
    handleRisk: function(bot, message) {
        
        // Only healthy people can be infected
        if (roles.memberHasRole(message.member, roles.HEALTHY)) {
            const now = new Date().getTime();
                 
            message.channel.messages.fetch({ limit: MAXMESSAGES })
                .then(messages => {
                    messages = messages.filter(msg => (
                        ((now - msg.createdTimestamp) < TIMELIMIT) && roles.memberHasRole(msg.member, roles.INFECTED)
                    ))
                        
                    uniqueInfectedUsers = {}        // userID => User
                    messages.each(msg => {
                        if (!(msg.author.id in uniqueInfectedUsers)) {
                            uniqueInfectedUsers[msg.author.id] = msg.author;
                        }
                    });
                    
                    // TODO: use to calculate rate of infection
                    for (usr in uniqueInfectedUsers) {
                        console.log(`${usr.username} is infected`)
                    }

                    const infectionRate = calculateInfectionRate()
                    if (Math.random() < infectionRate) {
                        roles.setRole(member, roles.INFECTED);
                        message.reply("You have been infected!")
                    }
                })
                .catch(console.error);
        } else {
            console.log(`${message.author.username} is already infected`);
        }
        return;        
    }
}

// TODO
function calculateInfectionRate() {
    return 0.5;
}


