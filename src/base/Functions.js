/**
 * Convert a template string into HTML DOM nodes
 * @param  {String} str The template string
 * @return {Node}       The template HTML
 * 
 * source: https://stackoverflow.com/a/3104237/9765927
 */
export const stringToHTML = function (str) {
	var parser = new DOMParser();
	var doc = parser.parseFromString(str, 'text/html');
	return doc;
};

export const stringToNumber = function(str){
	if(str){
		if(Number.isNaN(Number(str))){
			return new Error("Convert String is not a number");
		}else{
			return Number(str);
		}
	}
	return null;
	
}
/**
 * Paginate an array.
 * @param {Array} list
 * @param {Number} recPerPage
 */
export function paginateList(list, perPageCount){
    const newList = list;
    const temp = [];
    const recCount = list.length;
    const pageCount = Math.ceil(recCount/perPageCount);

    for(let i=0; i<pageCount;i++){
        const records = newList.splice(0,perPageCount);
        temp.push([...records]);
    }

    return temp;
}