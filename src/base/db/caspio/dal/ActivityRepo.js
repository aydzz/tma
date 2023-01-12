import moment from "moment";
import Activity from "../../models/Activity.js";

export class ActivityRepo{
    constructor(){
       this.rawData = [];
       /**@type {Array<Activity>} */
       this.data = [];
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
     * @param {Array<Object>} data 
     */
    setData(data){
        const temp = []
        data.forEach((record)=>{
            temp.push(Activity.fromRecord(record));
        })
        
        this.data = temp.filter(
            /**@param {Activity} activity */
            function(activity){
                if(activity.rid){
                    return true;
                }
                return false;
            }
        )
        return this.data;
    }
    getAll(){
       return this.data.sort(function(a, b){
            if(moment(a.date).isAfter(b.date)){
                return -1
            }else if(moment(a.date).isBefore(b.date)){
                return 1
            }else{
                return 0;
            }
       });
    }
    get(id){
        const one =  this.getAll().filter((activity,i,arr) => {
            if(activity.id === id){
                return true;
            }
            return false;
        });

        //handlers here...

        return one[0];
    }
}

const activityRepo = new ActivityRepo();

export default activityRepo;