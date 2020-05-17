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

    debugPlayers: function (guild, role) {
        players = guild.roles.cache.get(module.exports.getRoleID(guild, role)).members.map(mem => mem.user.username);
        return players;
    }
}
