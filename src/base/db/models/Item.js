import { stringToNumber } from "../../Functions";


export class Item{
    /**
     * 
     * @param {String} id 
     * @param {String} rid 
     * @param {String} pid 
     * @param {String} fxItemPID 
     * @param {String} itemTypeID 
     * @param {String} projectRID 
     * @param {String} epicRID 
     * @param {String} featureRID 
     * @param {String} iterationRID 
     * @param {String} title 
     * @param {String} description 
     * @param {String} requirement 
     * @param {String} requirementValue 
     * @param {String} points 
     * @param {String} estimatedDeadline 
     * @param {String} dateClosed 
     * @param {String} statusID 
     * @param {String} assignedToUserRID 
     * @param {String} lastUpdatedDate 
     * @param {String} createdDate 
     * @param {String} createdByUserRID 
     * @param {String} lastUpdatedByUserRID 
     */
    constructor(
        id,
        rid,
        pid,
        fxItemPID,
        itemTypeID,
        projectRID,
        epicRID,
        featureRID,
        iterationRID,
        title,
        description,
        requirement,
        requirementValue,
        points,
        estimatedDeadline,
        dateClosed,
        statusID,
        assignedToUserRID,
        lastUpdatedDate,
        createdDate,
        createdByUserRID,
        lastUpdatedByUserRID){

        //start here...
        this.id = stringToNumber(id);
        this.rid = rid;
        this.pid = pid;
        this.fxItemPID = fxItemPID;
        this.itemTypeID = stringToNumber(itemTypeID);
        this.projectRID = projectRID;
        this.epicRID = epicRID;
        this.featureRID = featureRID;
        this.iterationRID = iterationRID;
        this.title = title;
        this.description = description;
        this.requirement = requirement;
        this.requirementValue = requirementValue;
        this.points = stringToNumber(points);
        this.estimatedDeadline = estimatedDeadline;
        this.dateClosed = dateClosed;
        this.statusID = stringToNumber(statusID);
        this.assignedToUserRID = assignedToUserRID;
        this.lastUpdatedDate = lastUpdatedDate;
        this.createdDate = createdDate;
        this.createdByUserRID = createdByUserRID;
        this.lastUpdatedByUserRID = lastUpdatedByUserRID;        
    }
    static fromRecord(record){
        return new Item(
            record[TABLE_NAME + "_" + "ID"],
            record[TABLE_NAME + "_" + "RID"],
            record[TABLE_NAME + "_" + "PID"],
            record[TABLE_NAME + "_" + "FX_Item_PID"],
            record[TABLE_NAME + "_" + "Item_Type_ID"],
            record[TABLE_NAME + "_" + "Project_RID"],
            record[TABLE_NAME + "_" + "Epic_RID"],
            record[TABLE_NAME + "_" + "Feature_RID"],
            record[TABLE_NAME + "_" + "Iteration_RID"],
            record[TABLE_NAME + "_" + "Title"],
            record[TABLE_NAME + "_" + "Description"],
            record[TABLE_NAME + "_" + "Requirement"],
            record[TABLE_NAME + "_" + "Requirement_Value"],
            record[TABLE_NAME + "_" + "Points"],
            record[TABLE_NAME + "_" + "Estimated_Deadline"],
            record[TABLE_NAME + "_" + "Date_Closed"],
            record[TABLE_NAME + "_" + "Status_ID"],
            record[TABLE_NAME + "_" + "Assigned_To_User_RID"],
            record[TABLE_NAME + "_" + "Last_Updated_Date"],
            record[TABLE_NAME + "_" + "Created_Date"],
            record[TABLE_NAME + "_" + "Created_By_User_RID"],
            record[TABLE_NAME + "_" + "Last_Updated_By_User_RID"]
        )
    }
}