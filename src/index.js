//@ts-check

import application, { Application } from "./base/index.js";
import DataPage from "./base/DataPage/index.js";
import projectsTable from "./components/Home/ProjectsTable.js";
import Project from "./base/db/models/Project.js";
import TABLE_NAMES from "./base/enums/TableNames.js";

const activityChartDP = new DataPage(
    application.accountID,
    application.appkeyPrefix,
    "449ee3e2bbf74d3d991f",
    {
        deploy: true,
        containerSel: "#cb-activity-chart",
        params: ""
    }
    
);
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
}

application.on("appready", applicationReadyHandler)
