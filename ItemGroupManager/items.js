module.exports = {
    //0 for neutral items that don't affect the rate, disregard 0 values when calculating overall average

    MASK: createItem("mask", 0.3, 0.2, 0, 0.5),
    N95: createItem("N95", 0.1, 0.05, 0, 0.4),
    SANITIZE: createItem("hand_sanitizer", 0.2, 0.2, 0, 0.6),
    GLOVES: createItem("gloves", 0.3, 0.3, 0, 0.7),
    DISINFECT: createItem("disinfecting_wipes", 0.2, 0.2, 0, 0.6),
    ESSENTIAL: createItem("essential_oils", 0.7, 0, 0.7, 0.7),
    VITAMINS: createItem("vitamins", 0.6, 0, 0.6, 0.7),
    REMEDY: createItem("home_remedies", 0.8, 0, 0.9, 0.6),
    ALCOHOL: createItem("alcohol", 0.5, 0, 0.5, 0.4),
    TOILET: createItem("toilet_paper", 0, 0, 0, 0.3),
    VENTILATOR: createItem("ventilator", 0, 0, 0.1, 0.2),
}

// fix arg names
function createItem(a,b,c,d,e) {
    return {
        "name": a,
        "infection_rate": b,
        "spread_rate": c,
        "death_rate": d,
        "maximum_quantity": e //maximum in game, not maximums per player
    };
}
