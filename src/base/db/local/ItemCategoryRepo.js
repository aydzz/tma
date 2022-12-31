import ITEM_CATEGORY from "../data/lookup/PM_LU_Item_Category.json"

/**
 * @type {Array<ItemCategory>}
 */
const DATA = ITEM_CATEGORY["data"];

/**
 * Will be adding Lookup Models in the Lookup DAO to not clutter Data Models
 */
class ItemCategory{
    /**
     * 
     * @param {Number} id 
     * @param {String} category 
     * @param {String} description 
     */
    constructor(id,category,description){
        this.id = stringToNumber(id);
        this.category = category;
        this.description = description;
    }
}

class ItemCategoryRepo{
    constructor(){
        this.data = DATA;
    }
    getAll(){
        return this.data.map((status,i,arr) => {
            new ItemStatus(status.id,status.status,status.description);
        });
    }
    get(id){
        return this.getAll().filter((itemCategory,i,arr) => {
            if(itemCategory.id === id){
                return true;
            }
            return false;
        })
    }
}

const itemCategoryRepo = new ItemCategoryRepo();

export default itemCategoryRepo;