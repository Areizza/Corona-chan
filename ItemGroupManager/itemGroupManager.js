var itemGroup = require('./itemGroup.js')
var roles = require('../roles.js')

// Singleton class managing all items in the game
class ItemGroupManager {
    constructor() {
        // key = userID
        // value = ItemGroup
        this.itemGroups = {};
    }
    
    assignQuantity(itemName) {
        //random assign items with random quantity
        //maximum quantities for each item retrieved from items.js

        let playerTotal = roles.playerCount.length;
        let percent = playerTotal * 0.2;

        if (itemName == "ventilator") {
            quantity = Math.floor(Math.random() * Math.floor(percent));
        }
        else {
            quantity = Math.floor(Math.random() * Math.floor(playerTotal));
        }
    
        return quantity
    }

    addItemGroup(userID, itemGroup) {
        if (!userID in this.itemGroups) {
            this.itemGroups[id] = itemGroup;
        } else {
            console.log(`WARNING: ${userID} is already a key in ItemGroupManager`)
        }
    }
    // TODO distant future. Ignore for now
    // send(id1, id2)
    // trade(id1, id2)

}

const itemGroupManager = new ItemGroupManager();
Object.freeze(itemGroupManager);
module.exports = itemGroupManager;
