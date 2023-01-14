import { stringToNumber } from "../../Functions.js";
import TABLE_NAMES from "../../enums/TableNames.js";
const TABLE_NAME = TABLE_NAMES.USER;
export default class User{
    constructor(
        id,
        rid,
        publicID,
        firstName,
        lastName,
        fxFullname,
        username,
        email,
        profileImage,
        createdDate,
        lastUpdatedDate,
        createdByUserID,
        lastUpdatedByUserID
    ){
        this.id = stringToNumber(id)
        this.rid = rid
        this.publicID = publicID
        this.firstName = firstName
        this.lastName = lastName
        this.fxFullname = fxFullname
        this.username = username
        this.email = email
        this.profileImage = profileImage
        this.createdDate = createdDate
        this.lastUpdatedDate = lastUpdatedDate
        this.createdByUserID = createdByUserID
        this.lastUpdatedByUserID = lastUpdatedByUserID
    }

    /**
     * Convers PM_Project record to usable Project Object
     * @param {Object} record 
     * @returns {User}
     */
    static fromRecord(record){
        return new User(
            record[TABLE_NAME + "_" + "ID"],
            record[TABLE_NAME + "_" + "RID"],
            record[TABLE_NAME + "_" + "Public_ID"],
            record[TABLE_NAME + "_" + "First_Name"],
            record[TABLE_NAME + "_" + "Last_Name"],
            record[TABLE_NAME + "_" + "FX_Fullname"],
            record[TABLE_NAME + "_" + "Username"],
            record[TABLE_NAME + "_" + "Email"],
            record[TABLE_NAME + "_" + "Profile_Image"],
            record[TABLE_NAME + "_" + "Created_Date"],
            record[TABLE_NAME + "_" + "Last_Updated_Date"],
            record[TABLE_NAME + "_" + "Created_By_User_ID"],
            record[TABLE_NAME + "_" + "Last_Updated_By_User_ID"]
        )
    }
}