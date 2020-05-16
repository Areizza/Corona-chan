module.exports = {
    HEALTHY: "Healthy",
    INFECTED: "Infected",
    RECOVERED: "Recovered",
    DEAD: "Dead",

    memberHasRole: function (member, role) {
        if(member.roles.cache.find(r => r.name === role)) {
            return true;
        }
        return false;
    },
    
    setRole: function (member, role) {
        member.roles.add(module.exports.getRoleID(member.guild, role))
    },
    
    getRoleID: function (guild, role) {
        res = guild.roles.cache.find(r => r.name === role);
        return res.id;
    },
}
