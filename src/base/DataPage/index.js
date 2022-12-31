const DEFAULT_OPTIONS = {
    deploy: false,
    containerSel: null,
    params: null
}
export default class DataPage{
    constructor(accountID, appKeyPrefix, appKey, options=DEFAULT_OPTIONS){
        //Member attr
        this.accountID = accountID;
        this.appKeyPrefix = appKeyPrefix;
        this.appKey = appKey;
        this.cbDomain = 'https://' + this.accountID + '.caspio.com';
        this.cbDataPagePrefix = this.cbDomain + '/dp/' + this.appKeyPrefix;
        this.options = {
            ...DEFAULT_OPTIONS,
            ...options
        }
        //Method Binds
        this.deploy = this.deploy.bind(this);
        this.refresh = this.refresh.bind(this);
        this.wait = this.wait.bind(this);
        this.getDPManagerInstance_1 = this.getDPManagerInstance.bind(this);
  
        if(this.options.deploy){
            console.log("deploying Datapage")
            this.deploy(this.options.containerSel, this.options.params);
        }
    }
    static getDPManagerInstance(appKey){
        for (var key in window.dataPageManagerObj.dataPages) {
            if (key.search(appKey) != -1) {
                    return window.dataPageManagerObj.dataPages[key]
            }
        }
        return;
    }
    getDPManagerInstance(){
        const instance = this;
        for (var key in window.dataPageManagerObj.dataPages) {
            if (key.search(instance.appKeyPrefix + this.appKey) != -1) {
                    return window.dataPageManagerObj.dataPages[key]
            }
        }
        return;
    }
    getDPObjectInstance(){
        return this.getDPManagerInstance()["dataPageObj"];
    }

    deploy(containerSel,paramString){
        let params = paramString || '';
        let dataPageScript = document.createElement("script");
        let container = document.querySelector(containerSel);//should be specific selector
        dataPageScript.src = this.cbDataPagePrefix + this.appKey + '/emb' + params;
        
        container.innerHTML = '';
        container.appendChild(dataPageScript);
        
        return dataPageScript;
    }
    refresh(){
        for (let key in window.dataPageManagerObj.dataPages) {
            if (key.search(this.cbDataPagePrefix + this.appKey) != -1) {
                window.dataPageManagerObj.dataPages[key].refresh();
                return true;
            }
        }
        return false;
    }
    wait(callback){
        const instance = this;
        document.addEventListener("DataPageReady",function(e){
            if(e.detail.appKey === instance.appKeyPrefix + instance.appKey){
                callback(instance, e);
            }
        },{
            once: true
        });
    }
    on(event, callback){
        const instance = this;
        if(event === "ready"){
            document.addEventListener("DataPageReady", function(e){
                callback(instance,e);
            })
        }
    }
}