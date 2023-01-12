import { stringToNumber } from "../../../Functions.js";
import PROJECT_STATUS from "../../data/lookup/PM_LU_Project_Status.json"

/**
 * @type {Array<ProjectStatus>}
 */
const DATA = PROJECT_STATUS["data"];

/**
 * Will be adding Lookup Models in the Lookup DAO to not clutter Data Models
 */
class ProjectStatus{
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

class ProjectStatusRepo{
    constructor(){
        this.data = DATA;
    }    
    getAll(){
        return this.data.map((status,i,arr) => {
            return new ProjectStatus(status["ID"],status["Status"],status["Description"]);
        });
    }
    /**
     * 
     * @param {Number} id 
     * @returns {ProjectStatus}
     */
    get(id){
        const one =  this.getAll().filter((projectStatus,i,arr) => {
            if(projectStatus.id === id){
                return true;
            }
            return false;
        })

        //handlers here...

        return one[0];
    }
}

const projectStatusRepo = new ProjectStatusRepo();

export default projectStatusRepo;