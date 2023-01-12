import logger from "../../../Logger.js";
import Activity from "../../models/Activity.js";
import Project from "../../models/Project.js";

class ProjectRepo{
    constructor(){
       this.rawData = [];
       /**@type {Array<Project>} */
       this.data = [];

       //bindings
       this.setData = this.setData.bind(this);
       this.setRawData = this.setRawData.bind(this);
       this.getBy = this.getBy.bind(this);
    }
    /**
     * 
     * @param {Array<Object>} data 
     */
    setRawData(data){
        this.rawData = data;
    }
    /**
     * 
     * @param {Array<Project>} data 
     */
    setData(data){
        const temp = []
        if(data){
            this.data = data;
        }else{
            this.rawData.forEach((record)=>{
                temp.push(Project.fromRecord(record));
            })
            
            this.data = temp.filter(
                /**@param {Project} project */
                function(project){
                    if(project.id){
                        return true;
                    }
                    return false;
                }
            )
            
        }
        return this.data;
        
    }
    /**
     * 
     * @returns {Array<Project>}
     */
    getAll(){
       return this.data;
    }
    /**
     * 
     * @param {Number} id 
     * @returns {Project}
     */
    get(id){
        const one =  this.getAll().filter((project,i,arr) => {
            if(project.id === id){
                return true;
            }
            return false;
        });

        //handlers here...

        return one[0];
    }
    /**
     * 
     * @param {string} fieldName 
     * @param {*} value
     * @returns {Project}
     */
    getBy(fieldName, value){
        const one =  this.getAll().filter((project,i,arr) => {
            if(project[fieldName.toLowerCase()] === value){ //this does not handler non string / num data
                return true;
            }
            return false;
        });

        //handlers here...
        return one[0];
    }
}

const projectRepo = new ProjectRepo();

export default projectRepo;