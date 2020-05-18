var items = require('./items.js')

module.exports = class ItemGroup { //INVENTORY owned by any single user
    constructor() {
        // key = item name
        // value = quantity of the item
        this.inventory = {}

        //initialize all 0
        this.inventory[items.MASK.name] = 0;
        this.inventory[items.N95.name] = 0;
        this.inventory[items.SANITIZE.name] = 0;
        this.inventory[items.GLOVES.name] = 0;
        this.inventory[items.DISINFECT.name] = 0;
        this.inventory[items.ESSENTIAL.name] = 0;
        this.inventory[items.VITAMINS.name] = 0;
        this.inventory[items.REMEDY.name] = 0;
        this.inventory[items.ALCOHOL.name] = 0;
        this.inventory[items.TOILET.name] = 0;
        this.inventory[items.VENTILATOR.name] = 0;
    }
    
    addItem(itemName, quantity) {
        //add item to player's inventory (i.e. trade)
        this.inventory[itemName] += quantity
    }

    removeItem(itemName, quantity) {
        //remove item from player's inventory
        this.inventory[itemName] -= quantity
    }

    calculateInfectionRate() { //idk

    } // + other functions like this

    toString() {
        return items.MASK.name + ": " + this.inventory[items.MASK.name] + "\n" 
            + items.N95.name + ": " + this.inventory[items.N95.name] + "\n" 
            + items.SANITIZE.name + ": " + this.inventory[items.SANITIZE.name] + "\n" 
            + items.GLOVES.name + ": " + this.inventory[items.GLOVES.name] + "\n" 
            + items.DISINFECT.name + ": " + this.inventory[items.DISINFECT.name] + "\n" 
            + items.ESSENTIAL.name + ": " + this.inventory[items.ESSENTIAL.name] + "\n" 
            + items.VITAMINS.name + ": " + this.inventory[items.VITAMINS.name] + "\n" 
            + items.REMEDY.name + ": " + this.inventory[items.REMEDY.name] + "\n" 
            + items.ALCOHOL.name + ": " + this.inventory[items.ALCOHOL.name] + "\n" 
            + items.TOILET.name + ": " + this.inventory[items.TOILET.name] + "\n" 
            + items.VENTILATOR.name + ": " + this.inventory[items.VENTILATOR.name];
    }
}
