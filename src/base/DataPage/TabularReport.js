import DataPage from ".";

const TABULAR_DPO_TEMPLATE = {
    pageState: {
        size: null, //set record per page

    },
    totalRecords: null,
    totalPageCount: null,
    totalDataRowCount: null,
}
export default class TabularReport extends DataPage{
    constructor(accountID,appKeyPrefix,appKey,options){
        super(accountID,appKeyPrefix,appKey,options);
    }
}