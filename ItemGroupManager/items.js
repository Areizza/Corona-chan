module.exports = {
    MASK: "mask",
}

const itemModifiers = {
    [module.exports.MASK] : createModifier(0.1, 0.1, 0.1),
}

// fix arg names
function createModifier(a,b,c) {
    return {
        "infection_rate": a,
        "spread_rate": b,
        "death_rate": c,
    };
}
