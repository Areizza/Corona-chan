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
        this.itemList = []

        for (let item in items) {
            this.itemList.push({
                "name": item.name,
                "infection": item.infection_rate,
                "spread": item.spread_rate,
                "death": item.death_rate,
                "max": item.maximum_quantity
            })
        }

        //generate some item groups (inventories) and put them into ItemGroups array
        for (let i = 0; i < this.playerTotal.length; i++) {
            let inventory = new itemGroup();
            //modify values in itemGroup to assign random quantities of items
            for (let item in inventory) {
                item = this.assignQuantity(item);
            }
            //add inventory to itemGroup
            this.addItemGroup(this.playerTotal[i],inventory);
        }

        console.log(this.itemGroups)
    }

    //random assign items with random quantity 
    assignQuantity(itemName) {
        //maximum quantities for each item retrieved from items.js?????
        let foundItem = this.itemList.find(item => item.name==itemName);
        let quantity = 0;

        if(this.itemList.find(item => item.name==itemName)){
            let percent = this.playerTotal.length * foundItem.maximum_quantity; //multiply by the maximum_quantity modifier
            quantity = Math.floor(Math.random() * Math.floor(percent)); 
        }
        return quantity
    }

    addItemGroup(userID, itemGroup) {
        if (!userID in this.itemGroups && !undefined) {
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
