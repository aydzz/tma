const DEFAULT_OPTIONS = {
    warnPrefix: "TMA: ",
    logPrefix: "TMA: ",
    errorPrefix: ""
}
export class Logger{
    constructor(enabled,usePrefix,options){
        
        this.enabled = enabled === "Yes" ? true : false;
        this.usePrefix = usePrefix
        this.options = {
            ...DEFAULT_OPTIONS,
            ...options
        }

        console.log(this.options.errorPrefix + "Logging mode -" + this.enabled);
    } 

    log(text){
        if(this.enabled){
            if(this.usePrefix){
                console.log(this.options.logPrefix + text);
            }else{
                console.log(text);
            }
        }
    }
    warn(text){
        if(this.enabled){
            if(this.usePrefix){
                console.warn(this.options.warnPrefix + text);
            }else{
                console.warn(text);
            }
        }
    }
    error(text){
        if(this.enabled){
            if(this.usePrefix){
                console.error(this.options.errorPrefix + text);
            }else{
                console.error(text);
            }
        }
    }
}

const logger = new Logger(process.env.ALLOW_LOGGING,true);

export default logger;