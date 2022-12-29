import application from "./base/index.js";
import DataPage from "./base/DataPage/index.js";
import projectsTable from "./components/Home/ProjectsTable.js";
import Project from "./base/db/models/Project.js";


// const mainTablesDP = new DataPage(
//     application.accountID,
//     application.appkeyPrefix,
//     "9edb03a3fb724456806c",
//     {
//         deploy: true,
//         containerSel: "#cb-main-tables",
//         params: ""
//     }
    
// );

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

const projectList = [
    new Project("1","DDA12G35","Project Title 1","","Sample Description","","12/25/2022 02:33:59","","",""),
    new Project("2","ASW31234","Project Title 2","","Sample Description","","12/25/2022 02:33:59","","",""),
    new Project("3","QWESF12A","Project Title 3","","Sample Description","","12/25/2022 02:33:59","","","")
]
projectsTable("table[data-src='project-list'] > tbody", projectList);