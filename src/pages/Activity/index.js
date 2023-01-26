import application from "../../base/index.js";
import DataPage from "../../base/DataPage/index.js";
import activityRepo from "../../base/db/caspio/dal/ActivityRepo.js";
import activitiesTable from "../../components/Table/ActivitiesTable.js";
import { paginateList } from "../../base/Functions.js";
import FooterPaginator from "../../../src/components/Table/Paginator/FooterPaginator.js";
import { Application } from "../../../__src__/base/index.js";
import logger from "../../base/Logger.js";

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

const paginator = new FooterPaginator(
    "",0,5,1
)

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
        activityRepo.setData(window.activities);//@FIX: activityRepo.getAll() is empty even if the window.activities exists
        const activities = activityRepo.getAll()
        
        const paginatedList = paginateList(activityRepo.getAll(),5);
        
        paginator.totalCount = window.activities.length;

        //deploy Activities table
        activitiesTable("table[data-src='activities-list'] > tbody",paginatedList[0], {showActions: true})
        
        //set logs shown
        document.querySelector("[data-src='log-shown-count']").innerHTML = window.activities.length.toString();
        document.querySelector("[data-src='log-total-count']").innerHTML = window.activities.length.toString();


        if(!$("div[name='paginator-container']").find(".pagination").length){
            $("div[name='paginator-container']").append(paginator.build().mount().render().component);
        }
        const paginationEffect = function(p){
            $("table[data-src='activities-list'] > tbody").text("");//@Optimize: clear contents
            activitiesTable("table[data-src='activities-list'] > tbody",paginatedList[p.currentPage-1], {showActions: true})
        }
        paginator.addNextEffect(paginationEffect)
        paginator.addPrevEffect(paginationEffect)
          
    }
}

activitiesDataDP.on("DataPageReady",activitiesDataReadyHandler);
application.on("appready", applicationReadyHandler);
