import { stringToNumber } from "../../Functions";
import ITEM_STATUS from "../data/lookup/PM_LU_Item_Status.json"

/**
 * @type {Array<ItemType>}
 */
const DATA = ITEM_STATUS["data"];

/**
 * Will be adding Lookup Models in the Lookup DAO to not clutter Data Models
 */
class ItemType{
    /**
     * 
     * @param {Number} id 
     * @param {Number} categoryID
     * @param {String} type 
     * @param {String} description 
     */
    constructor(id,categoryID, type,description){
        this.id = stringToNumber(id)
        this.categoryID = stringToNumber(categoryID);
        this.type = type;
        this.description = description;
    }
}

class ItemTypeRepo{
    constructor(){
        this.data = DATA;
    }    
    getAll(){
        return this.data.map((type,i,arr) => {
            new ItemType(type.id,type.categoryID,type.type,type.description);
        });
    }
    get(id){
        const one =  this.getAll().filter((itemType,i,arr) => {
            if(itemType.id === id){
                return true;
            }
            return false;
        });

        return one[0];
    }
}

const itemTypeRepo = new ItemTypeRepo();

export default itemTypeRepo;