class ItemService {
    constructor() {
        this.items = {
            itemNotFound : 'No item found'
        };
    }

    async getItem(itemId) {
        if (this.items[itemId]) {
            return this.items[itemId];
        } else {
            throw new Error(`404 : ${this.items.itemNotFound}`);
        }
    }

    async postItem(newItem) {
        if(this.verifyPostItemInput(newItem)) {
            this.items[newItem.itemId] = newItem.itemDescription;
        } else {
            throw new Error('400 : The post object must have properties itemId and itemDescription')
        }
    }

    verifyPostItemInput(newItem) {
        return typeof newItem.itemId !== 'undefined' && typeof newItem.itemDescription !== 'undefined';
    }
}

module.exports = new ItemService();