var roles = require('./roles.js')

module.exports = {

    // Handle of the possibility of the message author being infected
    handleRisk: function(bot, message) {
        const member = message.member;

        if (roles.memberHasRole(member, roles.HEALTHY)) {
            console.log(member.user.tag + " is " + roles.HEALTHY)
            const infectionRate = calculateInfectionRate(1, {})
            if (Math.random() < infectionRate) {
                roles.setRole(member, roles.INFECTED);
            }
        }
    }
}

function calculateInfectionRate(numberInfected, items) {
    // TODO: Add items
    if (numberInfected == 0) {
        return 0
    }
    return 0.5 * Math.pow(1.1, numberInfected);
}


