import logger from "../../../Logger.js";
import User from "../../models/User.js";

class UserRepo{
    constructor(){
       this.rawData = [];
       /**@type {Array<User>} */
       this.data = [];

       //bindings
       this.setData = this.setData.bind(this);
       this.setRawData = this.setRawData.bind(this);
       this.getBy = this.getBy.bind(this);
    }
    /**
     * 
     * @param {Array<Object>} data 
     */
    setRawData(data){
        this.rawData = data;
    }
    /**
     * 
     * @param {Array<User>} data 
     */
    setData(data){
        const temp = []
        if(data){
            this.data = data;
        }else{
            this.rawData.forEach((record)=>{
                temp.push(User.fromRecord(record));
            })
            
            this.data = temp.filter(
                /**@param {User} user */
                function(user){
                    if(user.id){
                        return true;
                    }
                    return false;
                }
            )
            
        }
        return this.data;
    }
    /**
     * 
     * @returns {Array<User>}
     */
    getAll(){
       return this.data;
    }
    /**
     * 
     * @param {Number} id 
     * @returns {User}
     */
    get(id){
        const one =  this.getAll().filter((user,i,arr) => {
            if(user.id === id){
                return true;
            }
            return false;
        });

        //handlers here...

        return one[0];
    }
    /**
     * 
     * @param {string} fieldName 
     * @param {*} value
     * @returns {User}
     */
    getBy(fieldName, value){
        const one =  this.getAll().filter((user,i,arr) => {
            if(user[fieldName.toLowerCase()] === value){ //this does not handler non string / num data
                return true;
            }
            return false;
        });

        //handlers here...
        return one[0];
    }
}

const userRepo = new UserRepo();

export default userRepo;