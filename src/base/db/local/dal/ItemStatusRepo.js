import ITEM_STATUS from "../data/lookup/PM_LU_Item_Status.json"

/**
 * @type {Array<ItemStatus>}
 */
const DATA = ITEM_STATUS["data"];

/**
 * Will be adding Lookup Models in the Lookup DAO to not clutter Data Models
 */
class ItemStatus{
    /**
     * 
     * @param {Number} id 
     * @param {String} status 
     * @param {String} description 
     */
    constructor(id,status,description){
        this.id = stringToNumber(id);
        this.status = status;
        this.description = description;
    }
}

class ItemStatusRepo{
    constructor(){
        this.data = DATA;
    }    
    getAll(){
        return this.data.map((status,i,arr) => {
            new ItemStatus(status.id,status.status,status.description);
        });
    }
    get(id){
        const one = this.getAll().filter((itemStatus,i,arr) => {
            if(itemStatus.id === id){
                return true;
            }
            return false;
        })

        return one[0];
    }
}

const itemStatusRepo = new ItemStatusRepo();

export default itemStatusRepo;