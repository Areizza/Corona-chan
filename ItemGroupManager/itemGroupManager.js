var itemGroup = require('./itemGroup.js')
var items = require('./items.js')

// Singleton class managing all items in the game
class ItemGroupManager {
    constructor() {
        // key = userID
        // value = ItemGroup
        this.itemGroups = {};
        this.itemList = []; 
    }

    initialize() {
        for (let item in items) {
            this.itemList.push({
                "name": items[item].name,
                "infection": items[item].infection_rate,
                "spread": items[item].spread_rate,
                "death": items[item].death_rate,
                "max": items[item].maximum_quantity
            })
        }

        //calculate the item maximums to integer values based on playerTotal
        //distribute each item (and update maximum -= 1) to a random player
        for (let item in this.itemList) {
            //initialize
            let name = this.itemList[item].name;
            let maximum = 0;
            let length = Object.keys(this.itemGroups).length;

            if (length > 0) {
                maximum = Math.floor(length * this.itemList[item].max);
            }

            for (let j = 0; j < maximum; j++) {
                // Pick random user
                var keys = Object.keys(this.itemGroups);
                let index = Math.floor(Math.random() * keys.length);
                this.itemGroups[keys[index]].inventory[name] += 1;
            }  
        }
        console.log(this.itemGroups);
    }

    addUser(userID) {
        if (!(userID in this.itemGroups)) {
            this.itemGroups[userID] = new itemGroup();
        } else {
            console.log(`WARNING: ${userID} is already a key in ItemGroupManager`)
        }
    }

    getItemsByID(userID) {
        if (userID in this.itemGroups) {
            return this.itemGroups[userID];
        } else {
            console.log(`WARNING: ${userID} is not a key in ItemGroupManager`)
        }
    }
    // TODO distant future. Ignore for now
    // send(id1, id2)
    // trade(id1, id2)

    // TODO
    calculateInfectionRate(userID) {
        // return this.itemGroups[userID].calculateInfectionRate
        return 0.5;
    }

    // TODO
    calculateRecoveryRate(userID) {
        // return this.itemGroups[userID].calculateRecoveryRate
        return 0.5;
    }
}

module.exports = {
    igm: new ItemGroupManager()
}
