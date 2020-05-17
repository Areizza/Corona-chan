var itemGroup = require('./itemGroup.js')
var roles = require('../roles.js')
var items = require('./items.js')

// Singleton class managing all items in the game
class ItemGroupManager {
    constructor() {
        // key = userID
        // value = ItemGroup
        this.itemGroups = [];
        this.playerTotal = roles.playerCount();
        this.itemList = []
        this.inventories = {};

        for (let item in items) {
            this.itemList.push({
                "name": items[item].name,
                "infection": items[item].infection_rate,
                "spread": items[item].spread_rate,
                "death": items[item].death_rate,
                "max": items[item].maximum_quantity
            })
        }

        //generate some item groups (inventories) and put them into ItemGroups array
        for (let i = 0; i < this.playerTotal.length; i++) {
            let inventory = new itemGroup();
            this.itemGroups.push(inventory);            
        }

        //console.log(this.itemGroups);
        //itemGroups now has a bunch of empty inventories

        //calculate the item maximums to integer values based on playerTotal
        //distribute each item (and update maximum -= 1) to a random player
        for (let item in this.itemList) {
            //initialize
            let name = this.itemList[item].name;
            let maximum = 0;

            if (this.playerTotal.length > 0) {
                maximum = Math.floor(this.playerTotal.length * this.itemList[item].max);
            }

            for (let j = 0; j < maximum; j++) {
                //get random index for itemGroups to add an item to
                let index = Math.floor(Math.random() * this.playerTotal.length);
                this.itemGroups[index].inventory[name] += 1;
            }  
        }

        //console.log("new item groups: " + JSON.stringify(this.itemGroups));
        //assign these itemGroups to people
        for (let i = 0; i < this.playerTotal.length; i++) {

            //this is supposed to get the player user name somehow?????
            
            //this.addItemGroup(this.playerTotal[i], this.itemGroups[i])
        }

        //console.log(this.inventories);

        //console.log(this.itemList)
    }

    addItemGroup(userID, itemGroup) {
        if (!(userID in this.inventories)) {
            this.inventories[userID] = itemGroup;
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
