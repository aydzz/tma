/**
 * This script should be present in all pages
 * 
 * CREATED: 2022/12/28 - adzz
 */
const ACCOUNT_ID = "c1hbp155";
const APPKEY_PREFIX = "72d1b000";
const LOGOUT_LINK = `https://${ACCOUNT_ID}.caspio.com/folderlogout"`;
const CURRENT_PAGE = window.location.pathname;




class Application{
    constructor(){
        this.accountID = ACCOUNT_ID;
        this.appkeyPrefix = APPKEY_PREFIX;
        this.logoutLink = LOGOUT_LINK;
        this.currentPage = CURRENT_PAGE;
    }
}

const application = new Application();

export  default application;