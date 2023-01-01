import VISIBILITY from "../data/lookup/PM_LU_Visibility.json"

/**
 * @type {Array<Visibility>}
 */
const DATA = VISIBILITY["data"];

/**
 * Will be adding Lookup Models in the Lookup DAO to not clutter Data Models
 */
class Visibility{
    /**
     * 
     * @param {Number} id 
     * @param {String} visibility 
     */
    constructor(id,visibility){
        this.id = stringToNumber(id);
        this.visibility = visibility;
    }
}

class VisibilityRepo{
    constructor(){
        this.data = DATA;
    }    
    getAll(){
        return this.data.map((visibility,i,arr) => {
            new Visibility(visibility.id,visibility.visibility);
        });
    }
    get(id){
        const one = this.getAll().filter((visibility,i,arr) => {
            if(visibility.id === id){
                return true;
            }
            return false;
        })

        return one[0];
    }
}

const visibilityRepo = new VisibilityRepo();

export default visibilityRepo;