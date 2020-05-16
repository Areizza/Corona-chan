var itemGroup = require('./itemGroup.js')

// Singleton class managing all items in the game
class ItemGroupManager {
    constructor() {
        // key = userID
        // value = ItemGroup
        this.itemGroups = {};
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
