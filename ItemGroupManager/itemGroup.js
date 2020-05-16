var items = require('./items.js')

class ItemGroup {
    constructor() {
        // key = item name
        // value = quantity of the item
        this.items = {}
        this.items[items.MASK] = 0;
        // etc.
    }
    
    addItem(itemName, quantity) {

    }

    removeItem(itemName, quantity) {

    }

    calculateInfectionRate() {

    } // + other functions like this
}
