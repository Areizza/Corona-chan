var items = require('./items.js')

class ItemGroup { //INVENTORY owned by any single user
    constructor() {
        // key = item name
        // value = quantity of the item
        this.items = {}

        //initialize all 0
        this.items[items.MASK] = 0;
        this.items[items.N95] = 0;
        this.items[items.SANITIZE] = 0;
        this.items[items.GLOVES] = 0;
        this.items[items.DISINFECT] = 0;
        this.items[items.ESSENTIAL] = 0;
        this.items[items.VITAMINS] = 0;
        this.items[items.REMEDY] = 0;
        this.items[items.ALCOHOL] = 0;
        this.items[items.TOILET] = 0;
        this.items[items.VENTILATOR] = 0;
        
        // for (let key in this.items[items]) {
        //     this.items[key] = assignQuantity(key);
        // }
    }
    
    addItem(itemName, quantity) {
        
    }

    removeItem(itemName, quantity) {

    }

    calculateInfectionRate() {

    } // + other functions like this
}
