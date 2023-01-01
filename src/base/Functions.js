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