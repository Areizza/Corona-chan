module.exports = {
    MASK: "mask",
    N95: "N95",
    SANITIZE: "hand_sanitizer",
    GLOVES: "gloves",
    DISINFECT: "disinfecting_wipes",
    ESSENTIAL: "essential_oils",
    VITAMINS: "vitamins",
    REMEDY: "home_remedies",
    ALCOHOL: "alcohol",
    TOILET: "toilet_paper",
    VENTILATOR: "ventilator"
}

const itemModifiers = {
    //0 for neutral items that don't affect the rate, disregard 0 values when calculating overall average
    [module.exports.MASK] : createModifier(0.3, 0.2, 0, 0.5),
    [module.exports.N95] : createModifier(0.1, 0.05, 0, 0.4),
    [module.exports.SANITIZE] : createModifier(0.2, 0.2, 0, 0.6),
    [module.exports.GLOVES] : createModifier(0.3, 0.3, 0, 0.7),
    [module.exports.DISINFECT] : createModifier(0.2, 0.2, 0, 0.6),
    [module.exports.ESSENTIAL] : createModifier(0.7, 0, 0.7, 0.7),
    [module.exports.VITAMINS] : createModifier(0.6, 0, 0.6, 0.7),
    [module.exports.REMEDY] : createModifier(0.8, 0, 0.9, 0.6),

    [module.exports.ALCOHOL] : createModifier(0.5, 0, 0.5, 0.4),
    [module.exports.TOILET] : createModifier(0, 0, 0, 0.3),

    [module.exports.VENTILATOR] : createModifier(0, 0, 0.1, 0.2),
}

// fix arg names
function createModifier(a,b,c,d) {
    return {
        "infection_rate": a,
        "spread_rate": b,
        "death_rate": c,
        "maximum_quantity": d //maximum in game, not maximums per player
    };
}
