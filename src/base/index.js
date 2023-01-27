/**
 * This script should be present in all pages
 * 
 * CREATED: 2022/12/28 - adzz
 */

import DataPage from "./DataPage/index.js";
import logger from "./Logger.js";
import projectRepo from "./db/caspio/dal/ProjectRepo.js";
import userRepo from "./db/caspio/dal/UserRepo.js";
import Project from "./db/models/Project.js";
import User from "./db/models/User.js";
import { v4 as uuid } from 'uuid';
import Modal from "../components/Modal/index.js";
import $ from "jquery";


const ACCOUNT_ID = "c1hbp155";
const APPKEY_PREFIX = "72d1b000";
const LOGOUT_LINK = `https://${ACCOUNT_ID}.caspio.com/folderlogout"`;
const CURRENT_PAGE = window.location.pathname;

const MAIN_TABLES_DP = "9edb03a3fb724456806c";

const APP_VERSION = "v1.2.9";

export class Application{ 
   constructor(){
        this.uuid = uuid(); //instance uuid ( use in component identification)
        this.accountID = ACCOUNT_ID;
        this.appkeyPrefix = APPKEY_PREFIX;
        this.logoutLink = LOGOUT_LINK;
        this.currentPage = CURRENT_PAGE;
        this.ready = false;

        this.mainDataRawAll = null;
        this.initFlags = {
            mainTablesLoaded: false,
            mainReposReady: false
        }
        this.appReady = false;
        this.settings = {
            home:{
                activityChartRange: {
                        selector: "select[data-settings='chart-range']",
                        value: document.querySelector("select[data-settings='chart-range']").value
                    }
            }
        }
        this.appModal = new Modal("body")

        //bindings
        this._initDispatcher = this._initDispatcher.bind(this);

        //execs
        {
            const instance = this;
            $("[data-src='app-version']").text(APP_VERSION);
            document.addEventListener("DataPageReady",function(e){
                if(e.detail.appKey ===  instance.appkeyPrefix + MAIN_TABLES_DP && !instance.appReady){
                    if(window.mainDataRawAll){
                        instance.mainDataRawAll = window.mainDataRawAll;
                        projectRepo.setRawData(mainDataRawAll)
                        userRepo.setRawData(mainDataRawAll)
                    }else{
                        throw new Error("Main Data was not loaded correctly.");
                    }

                    /**
                     * Setting main repos
                     */
                    const projectList = application.mainDataRawAll["data"].filter(record =>{
                        if(Project.fromRecord(record).id){
                            return true;
                        }
                        return false;
                    }).map(record =>{
                        return Project.fromRecord(record);
                    })
                
                    const userList = application.mainDataRawAll["data"].filter(record =>{
                        if(User.fromRecord(record).id){
                            return true;
                        }
                        return false;
                    }).map(record =>{
                        return User.fromRecord(record);
                    });
                
                    projectRepo.setData(projectList);
                    userRepo.setData(userList);
                    
                    instance.initFlags["mainTablesLoaded"] = true;
                    instance.initFlags["mainReposReady"] = true;
                    instance._initDispatcher();
                }
            });
        }
        
    }
    _initDispatcher(){
        logger.log("App Init Dispatcher Called!");
        if(!this.appReady){
            const isAllChecked = Object.values(this.initFlags).every((value) =>{
                return value;
                
            });
            if(isAllChecked){
                document.dispatchEvent(new CustomEvent("appready",{detail: {
                    initFlags: this.initFlags
                }}));
                this.appReady = true;
                
            }else{
                document.dispatchEvent(new CustomEvent("appstatechange",{detail: {
                    initFlags: this.initFlags
                }}))
            }
        }
    }
    on(event, callback){
        const instance = this;
        if(event === "appready"){
            document.addEventListener("appready",function(e){
                callback(instance,e);
            },{once: false})
            
        }else if(event === "appstatechange"){
            document.addEventListener("appready",function(e){
                callback(instance,e);
            },{once: true})
            
        }
    }
}

const application = new Application();

/**
 * Required executions
 */
const mainTablesDP = new DataPage(
    application.accountID,
    application.appkeyPrefix,
    MAIN_TABLES_DP,
    {
        deploy: true,
        containerSel: "#cb-main-tables",
    }
);

document.addEventListener("appready",function(e){
    logger.log("Application Ready");
})
document.addEventListener("appstatechange",function(e){
    logger.log("Application State Changed");
});

export  default application;