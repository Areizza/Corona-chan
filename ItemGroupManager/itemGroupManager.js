var itemGroup = require('./itemGroup.js')
var roles = require('../roles.js')
var items = require('./items.js')

// Singleton class managing all items in the game
class ItemGroupManager {
    constructor() {
        // key = userID
        // value = ItemGroup
        this.itemGroups = {};
        this.playerTotal = roles.playerCount;
        this.itemList = new items();

        //generate some item groups (inventories) and put them into ItemGroups array
        for (let i = 0; i < this.playerTotal.length; i++) {
            let inventory = new itemGroup();
            //modify values in itemGroup to assign random quantities of items
            for (let item in inventory) {
                item = assignQuantity(item);
            }
            //add inventory to itemGroup
            this.addItemGroup(playerTotal[i],inventory);
        }
    }

    //random assign items with random quantity 
    assignQuantity(itemName) {
        //maximum quantities for each item retrieved from items.js?????
        let percent = this.playerTotal.length * this.itemList.find(item.name==itemName).maximum_quantity; //multiply by the maximum_quantity modifier

        quantity = Math.floor(Math.random() * Math.floor(percent)); 
        return quantity
    }

    addItemGroup(userID, itemGroup) {
        if (!userID in this.itemGroups) {
            this.itemGroups[userID] = itemGroup;
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
