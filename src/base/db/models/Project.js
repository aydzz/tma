import { stringToNumber } from "../../Functions.js";
import TABLE_NAMES from "../../enums/TableNames.js";
const TABLE_NAME = TABLE_NAMES.PROJECT;
export default class Project{
    /**
     * 
     * @param {String} id 
     * @param {String} rid 
     * @param {String} title 
     * @param {String} logo 
     * @param {String} description 
     * @param {String} colorHex 
     * @param {String} statusID 
     * @param {String} createdDate 
     * @param {String} lastUpdatedDate 
     * @param {String} createdBy
     * @param {String} lastUpdatedBy
     */
    constructor(id,rid,title,logo,description,colorHex,link,statusID,visibilityID,createdDate,lastUpdatedDate, createdBy, lastUpdatedBy){
        //do something here...
        this.id = stringToNumber(id) ;
        this.rid = rid;
        this.title = title;
        this.logo = logo;
        this.description = description;
        this.colorHex = colorHex;
        this.link = link;
        this.statusID = stringToNumber(statusID)
        this.visibilityID = stringToNumber(statusID)
        this.createdDate = createdDate;
        this.lastUpdatedDate = lastUpdatedDate;
        this.createdBy = createdBy;
        this.lastUpdatedBy = lastUpdatedBy;
    }
    

    /**
     * Convers PM_Project record to usable Project Object
     * @param {Object} record 
     * @returns {Project}
     */
    static fromRecord(record){
        return new Project(
            record[TABLE_NAME + "_" + "ID"],
            record[TABLE_NAME + "_" + "RID"],
            record[TABLE_NAME + "_" + "Title"],
            record[TABLE_NAME + "_" + "Logo"],
            record[TABLE_NAME + "_" + "Description"],
            record[TABLE_NAME + "_" + "Color_Hex"],
            record[TABLE_NAME + "_" + "Link"],
            record[TABLE_NAME + "_" + "Status_ID"],
            record[TABLE_NAME + "_" + "Visibility_ID"],
            record[TABLE_NAME + "_" + "Created_Date"],
            record[TABLE_NAME + "_" + "Last_Updated_Date"],
            record[TABLE_NAME + "_" + "Created_By"],
            record[TABLE_NAME + "_" + "Last_Updated_By"]
        )
    }
}