//@ts-check
import application, { Application } from "./base/index.js";
import DataPage from "./base/DataPage/index.js";
import projectsTable from "./components/Home/ProjectsTable.js";
import Project from "./base/db/models/Project.js";
import { Chart } from "chart.js/auto";
import activityRepo from "./base/db/local/dal/ActivityRepo.js";
import projectRepo from "./base/db/local/dal/ProjectRepo.js";

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
const activitiesDataReadyHandler = function(dp, e){
    //@ts-ignore
    if(e.detail.appKey === dp.appKeyPrefix + dp.appKey){
        //@ts-ignore
        activityRepo.setData(window.activities);

        const projectRIDs = new Set(activityRepo.getAll().map((activity)=>{
            return activity.projectRID
        }));

        const dataPoints = [];
        projectRIDs.forEach((projectRID)=>{
            const values = activityRepo.getAll().reduce(function(sum,activity,i,arr){
                if(activity.projectRID === projectRID){
                    //@ts-ignore
                    return sum + activity.value;
                }
                return sum + 0;
                
            },0)
            dataPoints.push(values);    
        });

        const projects = Array.from(projectRIDs).map((rid)=>{
            return projectRepo.getBy("RID",rid)
        });
        
        if(projectRepo.getAll().length === 0){
            alert("No projects yet!");
            if(application.mainDataRawAll.length > 0){

                alert("But main data Raw is present!");
            }
        }
        const labels = projects.map((project)=>{
            
            return project.title;
        })
        const backgroundColors = projects.map((project)=>{
            return project.colorHex
        })

        const data = {
            labels: labels,
            datasets: [{
              label: 'Minutes',
              data: dataPoints,
              hoverOffset: 4,
              backgroundColor: null
            }],
            
          };
          const config = {
            type: 'pie',
            data: data,
          };
          const container = document.querySelector("#pieChart");

          //@ts-ignore
          const chart = new Chart(container,config);
    }
}

/**
 * Home Page ( Index ) app ready effects
 * @param {Application} application 
 */
const applicationReadyHandler = function(application){
    /**
     * Deploy Activities Data DP ( moved here to make sure we got the mainDataTables data)
     */
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
    activitiesDataDP.on("DataPageReady",activitiesDataReadyHandler);
    
    /**
     * Render Projects Table Card
     */
    const projectList = application.mainDataRawAll["data"].filter(record =>{
        if(Project.fromRecord(record).id){
            return true;
        }
        return false;
    }).map(record =>{
        return Project.fromRecord(record);
    })
    projectRepo.setData(projectList);
    projectsTable("table[data-src='project-list'] > tbody", projectList);

    /**
     * Render Counts in InfoCards
     */
    document.querySelector("[data-src='projects']").textContent = projectList.length;
    document.querySelector("[data-src='activity-previous-days']").textContent = document.querySelector(application.settings.home.activityChartRange.selector).value;
    
}

application.on("appready", applicationReadyHandler)
