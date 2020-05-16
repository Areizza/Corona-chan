var roles = require('./roles.js')

module.exports = {
    handleRisk: function(bot, message) {
        // TODO:
        return; 
        const member = message.member;

        if (roles.memberHasRole(member, roles.HEALTHY)) {
            console.log(member.user.tag + " is " + roles.HEALTHY)
            roles.setRole(member, roles.INFECTED);
            // verify
            return;
        } else if (roles.memberHasRole(member, roles.INFECTED)) {
            // Calculate probability
            // Set infected role
        }
        console.log(message.member.user.tag + " is not " + roles.HEALTHY)
    }
}



