module.exports = {
    //0 for neutral items that don't affect the rate, disregard 0 values when calculating overall average

    MASK: createModifier("mask", 0.3, 0.2, 0, 0.5),
    N95: createModifier("N95", 0.1, 0.05, 0, 0.4),
    SANITIZE: createModifier("hand_sanitizer", 0.2, 0.2, 0, 0.6),
    GLOVES: createModifier("gloves", 0.3, 0.3, 0, 0.7),
    DISINFECT: createModifier("disinfecting_wipes", 0.2, 0.2, 0, 0.6),
    ESSENTIAL: createModifier("essential_oils", 0.7, 0, 0.7, 0.7),
    VITAMINS: createModifier("vitamins", 0.6, 0, 0.6, 0.7),
    REMEDY: createModifier("home_remedies", 0.8, 0, 0.9, 0.6),
    ALCOHOL: createModifier("alcohol", 0.5, 0, 0.5, 0.4),
    TOILET: createModifier("toilet_paper", 0, 0, 0, 0.3),
    VENTILATOR: createModifier("ventilator", 0, 0, 0.1, 0.2),
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
function createModifier(a,b,c,d,e) {
    return {
        "name": a,
        "infection_rate": b,
        "spread_rate": c,
        "death_rate": d,
        "maximum_quantity": e //maximum in game, not maximums per player
    };
}
