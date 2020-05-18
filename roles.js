var itemGroupManager = require('./ItemGroupManager/itemGroupManager')
const INFECTIONPERIOD = 10 * 1000; // milliseconds

module.exports = {
    HEALTHY: "Healthy",
    INFECTED: "Infected",
    RECOVERED: "Recovered",
    DEAD: "Dead",
    HCOLOR: "#00FF00",
    ICOLOR: "#FFFF00",
    DCOLOR: "#FF0000",
    RCOLOR: "#0000FF",

    memberHasRole: function (member, role) {
        if(member.roles.cache.find(r => r.name === role)) {
            return true;
        }
        return false;
    },

    playerCount: function (guild, role) {
        // TODO:
        players = guild.roles.cache.get(module.exports.getRoleID(guild, role)).members.map(mem => mem.user.id);
        return players;    
    },
    
    setRole: function (member, role) {
        member.roles.add(module.exports.getRoleID(member.guild, role));
    },
    
    removeRole: function (member, role) {
        member.roles.remove(module.exports.getRoleID(member.guild, role));
    },

    getRoleID: function (guild, role) {
        res = guild.roles.cache.find(r => r.name === role);
        return res.id;
    },

    playerNamesByRole: function (guild, role) {
        players = guild.roles.cache.get(module.exports.getRoleID(guild, role)).members.map(mem => mem.user.username);
        return players;
    },

    // Moves an infected player to Recover or Die after the infection period has passed
    recoverOrDie: function(member) {
        if (!member) {
            console.warn("WARNING: member is not defined")
            return
        }
        
        setTimeout(() => {
            if (this.memberHasRole(member, this.INFECTED)) {
                if (Math.random() < itemGroupManager.igm.calculateRecoveryRate(member.id)) {
                    // Warning: possible race condition here?
                    this.setRole(member, this.RECOVERED);
                    member.send("How could you reject Corona-chan?!");
                } else {
                    this.setRole(member, this.DEAD);
                    member.send("Now that you're dead, you can stay with Corona-chan forever and ever ❤️");
                }
                this.removeRole(member, this.INFECTED);
            }
        }, INFECTIONPERIOD);
    }
}
