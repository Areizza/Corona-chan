var roles = require('./roles.js')
var game = require('./game')

const MAXMESSAGES = 50;
const TIMELIMIT = 15 * 60;
const INFECTIONPERIOD = 1 * 1000;   // milliseconds

module.exports = {

    // Handle of the possibility of the message author being infected
    // Only healthy people have a risk of being infected
    handleRisk: function(bot, newMsg) {
        game.checkGameStatus(bot, newMsg.member.guild);
        return;
        
        // TD
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
                    console.log("New message: ", newMsg)

                    // Infect the message author
                    if (Object.keys(uniqueInfectedUsers).length) {
                        if (Math.random() < calculateInfectionRate()) {
                            roles.setRole(newMsg.member, roles.INFECTED);
                            roles.removeRole(newMsg.member, roles.HEALTHY);
                            newMsg.reply("You have been infected!")
                            recoverOrDie(bot, newMsg.member);
                        }
                    }
                })
                .catch(console.error);
        }    
    }
}

// Moves an infected player to Recover or Die after the infection period has passed
function recoverOrDie(bot, member) {
    if (!member) {
        console.warn("WARNING: member is not defined")
        return
    }

    setTimeout(() => {
        if (roles.memberHasRole(member, roles.INFECTED)) {
            if (Math.random() < calculateRecoveryRate()) {
                // Warning: possible race condition here?
                roles.setRole(member, roles.RECOVERED);
                member.send("Congratulations! You have recovered!");
            } else {
                roles.setRole(member, roles.DEAD);
                member.send("Sorry, you have died!");
            }
            roles.removeRole(member, roles.INFECTED);
            game.checkGameStatus(bot, member.guild);
        }
    }, INFECTIONPERIOD);
}

// TODO
function calculateInfectionRate() {
    return 0.5;
}

// TODO
function calculateRecoveryRate() {
    return 0.5;
}
