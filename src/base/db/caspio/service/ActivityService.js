import moment from "moment/moment.js";
import activityRepo, { ActivityRepo } from "../dal/ActivityRepo.js";

export class ActivityService{
    constructor(repo){
        /**
         * @type {ActivityRepo}
         */
        this.repo = repo;   
    }

    getTotalActiveHours(){
        return this.repo.getAll().reduce(function(sum,activity,i){
            return sum + activity.value;
        },0);
    }
    getLogToday(){
        return this.repo.getAll().filter(function(activity,i,arr){
            if(moment(new Date(activity.date)).isSame(moment(new Date()),'d')){
                return true;
            }else{
                return false;
            }
        }).reduce(function(sum,activity,i,arr){
            return sum + activity.value;
        },0)
    }
}

const activityService = new ActivityService(activityRepo);

export default activityService;