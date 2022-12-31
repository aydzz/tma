
const DEFAULT_OPTIONS = {
    warnPrefix: "TMA: ",
    logPrefix: "TMA: ",
    errorPrefix: ""
}
export class Logger{
    constructor(enabled,usePrefix,options){
        this.enabled = enabled;
        this.usePrefix = usePrefix
        this.options = {
            ...DEFAULT_OPTIONS,
            ...options
        }
    } 

    log(text){
        if(this.usePrefix){
            console.log(this.options.logPrefix + text);
        }else{
            console.log(text);
        }
        
    }
    warn(text){
        if(this.usePrefix){
            console.warn(this.options.warnPrefix + text);
        }else{
            console.warn(text);
        }
    }
    error(text){
        if(this.usePrefix){
            console.error(this.options.errorPrefix + text);
        }else{
            console.error(text);
        }
    }
}

const logger = new Logger(true,true);

export default logger;