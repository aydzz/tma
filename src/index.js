//@ts-check

import application, { Application } from "./base/index.js";
import DataPage from "./base/DataPage/index.js";
import projectsTable from "./components/Home/ProjectsTable.js";
import Project from "./base/db/models/Project.js";
import TABLE_NAMES from "./base/enums/TableNames.js";

/**
 * DataPage Deployments
 */
const activityChartDP = new DataPage(
    application.accountID,
    application.appkeyPrefix,
    "449ee3e2bbf74d3d991f",
    {
        deploy: true,
        containerSel: "#cb-activity-chart",
        params: `` ,
        getParamsOnInit:``
    }
    
);
const activitiesDataDP = new DataPage(
    application.accountID,
    application.appkeyPrefix,
    "4b23f1b28daf413d9732",
    {
        deploy: true,
        containerSel: "#cb-activities",
        params: `` ,
        getParamsOnInit:``
    }
);

/**
 * Sets default daysBefore for Activity Chart DataPage
 * - Take note that this causes the DP to load twice the first time ( so this is a subject for optimization or workaround )
 * - For now will leave this as is.
 */
activityChartDP.on("DataPageReady",function(datapage,e){
    if(!activityChartDP.getDPObjectInstance().clientQueryString){
        //@ts-ignore
        activityChartDP.getDPObjectInstance().clientQueryString = `daysBefore=${document.querySelector(application.settings.home.activityChartRange.selector).value}`
        activityChartDP.refresh();
    }
});


document.querySelector(application.settings.home.activityChartRange.selector).addEventListener("change",function(e){
    //Change getParameter for Activity Chart DP when App Settings is changed.
    if(activityChartDP.getDPObjectInstance()){
        //@ts-ignore
        activityChartDP.getDPObjectInstance().clientQueryString = `daysBefore=${document.querySelector(application.settings.home.activityChartRange.selector).value}` 
            
        //@ts-ignore
        // activityChartDP.getScriptElement().setAttribute("src",  activityChartDP.src + `?daysBefore=${document.querySelector(application.settings.home.activityChartRange.selector).value}`)

        activityChartDP.refresh();

        document.querySelector("[data-src='activity-previous-days']").textContent = document.querySelector(application.settings.home.activityChartRange.selector).value;
    }
});


/**
 * For Rendering Logs Charts
 */
document.addEventListener("DataPageReady",function(e){
    if(e.detail.appKey === activitiesDataDP.appKeyPrefix + activitiesDataDP.appKey){
        console.log(window.activities);
    }
})

/**
 * Home Page ( Index ) app ready effects
 * @param {Application} application 
 */
const applicationReadyHandler = function(application){
    /**
     * Render Projects Table Card
     */
    const projectList = application.mainDataRawAll["data"].filter(record =>{
        console.log(Project.fromRecord(record).id);
        if(Project.fromRecord(record).id){
            return true;
        }
        return false;
    }).map(record =>{
        return Project.fromRecord(record);
    })
    projectsTable("table[data-src='project-list'] > tbody", projectList);

    /**
     * Render Counts in InfoCards
     */
    document.querySelector("[data-src='projects']").textContent = projectList.length;
    document.querySelector("[data-src='activity-previous-days']").textContent = document.querySelector(application.settings.home.activityChartRange.selector).value;
    
}

application.on("appready", applicationReadyHandler)
