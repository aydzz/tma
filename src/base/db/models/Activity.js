import { stringToNumber } from "../../Functions.js"
import TABLE_NAMES from "../../enums/TableNames.js"

const TABLE_NAME = TABLE_NAMES.ACTIVITY

export default class Activity{
    /**
     * 
     * @param {String} id 
     * @param {String} rid 
     * @param {String} guid 
     * @param {String} projectRID 
     * @param {String} itemRID 
     * @param {String} categoryID 
     * @param {String} typeID 
     * @param {String} title 
     * @param {String} details 
     * @param {String} isNow 
     * @param {String} date 
     * @param {String} value 
     * @param {String} createdDate 
     * @param {String} lastUpdatedDate 
     * @param {String} createdByUserRID 
     * @param {String} lastUpdatedByUserRID 
     */
    constructor(
        id,
        rid,
        guid,
        projectRID,
        itemRID,
        categoryID,
        typeID,
        title,
        details,
        isNow,
        date,
        value,
        createdDate,
        lastUpdatedDate,
        createdByUserRID,
        lastUpdatedByUserRID,

        isFullyTracked,
        valuePS
    ){
        this.id = stringToNumber(id)
        this.rid = rid
        this.guid = guid
        this.projectRID = projectRID
        this.itemRID = itemRID
        this.categoryID = stringToNumber(categoryID)
        this.typeID = stringToNumber(typeID)
        this.title = title
        this.details = details
        this.isNow = isNow == "Yes" ? true : false
        this.date = date
        this.value = stringToNumber(value)
        this.createdDate = createdDate
        this.lastUpdatedDate = lastUpdatedDate
        this.createdByUserRID = createdByUserRID
        this.lastUpdatedByUserRID = lastUpdatedByUserRID

        this.isFullyTracked = isFullyTracked === "Yes" ? true : false;
        this.valuePS = stringToNumber(valuePS)
    }
    /**
     * Convers PM_Project record to usable Project Object
     * @param {Object} record 
     * @returns {Activity}
     */
    static fromRecord(record){
        return new Activity(
            record[TABLE_NAME + "_" + "ID"],
            record[TABLE_NAME + "_" + "RID"],
            record[TABLE_NAME + "_" + "GUID"],
            record[TABLE_NAME + "_" + "Project_RID"],
            record[TABLE_NAME + "_" + "Item_RID"],
            record[TABLE_NAME + "_" + "Category_ID"],
            record[TABLE_NAME + "_" + "Type_ID"],
            record[TABLE_NAME + "_" + "Title"],
            record[TABLE_NAME + "_" + "Details"],
            record[TABLE_NAME + "_" + "Is_Now"],
            record[TABLE_NAME + "_" + "Date"],
            record[TABLE_NAME + "_" + "Value"],
            record[TABLE_NAME + "_" + "Created_Date"],
            record[TABLE_NAME + "_" + "Last_Updated_Date"],
            record[TABLE_NAME + "_" + "Created_By_User_RID"],
            record[TABLE_NAME + "_" + "Last_Updated_By_User_RID"],
            record[TABLE_NAME + "_" + "Is_Fully_Tracked"],
            record[TABLE_NAME + "_" + "Value_PS"]
        )
    }
}

