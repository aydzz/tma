/**
 * This script should be present in all pages
 * 
 * CREATED: 2022/12/28 - adzz
 */

import DataPage from "./DataPage/index.js";
import logger from "./Logger.js";
import Project from "./db/models/Project.js";

const ACCOUNT_ID = "c1hbp155";
const APPKEY_PREFIX = "72d1b000";
const LOGOUT_LINK = `https://${ACCOUNT_ID}.caspio.com/folderlogout"`;
const CURRENT_PAGE = window.location.pathname;

const MAIN_TABLES_DP = "9edb03a3fb724456806c"

export class Application{
   constructor(){
        this.accountID = ACCOUNT_ID;
        this.appkeyPrefix = APPKEY_PREFIX;
        this.logoutLink = LOGOUT_LINK;
        this.currentPage = CURRENT_PAGE;
        this.ready = false;

        this.mainDataRawAll = null;
        this.initFlags = {
            mainTablesLoaded: false,
        }
        this.appReady = false;

        //bindings
        this._initDispatcher = this._initDispatcher.bind(this);

        //execs
        {
            const instance = this;
            document.addEventListener("DataPageReady",function(e){
                if(e.detail.appKey ===  instance.appkeyPrefix + MAIN_TABLES_DP && !instance.appReady){
                    if(window.mainDataRawAll){
                        instance.mainDataRawAll = window.mainDataRawAll;
                    }else{
                        throw new Error("Main Data was not loaded correctly.");
                    }
                    instance.initFlags["mainTablesLoaded"] = true;
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

mainTablesDP.on("ready",function(dp,e){
    console.log(dp.getDPObjectInstance());
})


export  default application;