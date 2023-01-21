import application from "../../base/index.js";
import DataPage from "../../base/DataPage/index.js";
import activityRepo from "../../base/db/caspio/dal/ActivityRepo.js";
import activitiesTable from "../Home/components/ActivitiesTable.js";


const activitiesDataDP = new DataPage(
    application.accountID,
    application.appkeyPrefix,
    "4b23f1b28daf413d9732",
    {
        deploy: false,
        containerSel: "#cb-activities",
        params: `` ,
        getParamsOnInit:``
    }
);

/**
 * Home Page ( Index ) app ready effects
 * @param {Application} application 
 */
const applicationReadyHandler = function(application){
    activitiesDataDP.deploy();    
}

const activitiesDataReadyHandler = function(dp, e){
    //@ts-ignore
    if(e.detail.appKey === dp.appKeyPrefix + dp.appKey){
        //@ts-ignore
        activityRepo.setData(window.activities);
          //deploy Activities table
          activitiesTable("table[data-src='activities-list'] > tbody",activityRepo.getAll().slice(0,15), {showActions: true})
          
          //set logs shown
          document.querySelector("[data-src='log-shown-count']").innerHTML = activityRepo.getAll().slice(0,15).length.toString();
          document.querySelector("[data-src='log-total-count']").innerHTML = activityRepo.getAll().length.toString();
    }
}

activitiesDataDP.on("DataPageReady",activitiesDataReadyHandler);
application.on("appready", applicationReadyHandler);
