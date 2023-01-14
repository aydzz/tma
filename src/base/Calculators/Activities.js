import Activity from "../db/models/Activity";

export default class Activities{
    constructor(){
        //do something here..
    }
    /**
     * 
     * @param {Array<Activity>} activities 
     */
    getTotalMins(activities){
        const sum = activities.reduce(function(sum,currentVal,i,arr){
           return sum + currentVal.value; 
        },0)
    }
}