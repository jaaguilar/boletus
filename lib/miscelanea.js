"use strict"
/**
* Returns a boolean with true if obj is a not empty object
* @param {object} obj primitive object
*/ 
function isNotEmpty(obj) {
	if (typeof(obj) == 'string')
		return (obj != '')
	else if (obj)
    	return Object.keys(obj).length > 0;
    else
    	return false;
}

/**
* Returns random int between [from-to] interval.
* If one of arguments is float, it rounds this downward to its nearest integer
* @param {number} from Start of  interval
* @param {number} to End of interval
*/ 
function randomInt(from,to){
	if (typeof(from) != "number") throw "randomInt: from param must be a number.";	
	if (typeof(to) != "number") throw "randomInt: to param must be a number.";		
	if (to < from) throw "randomInt: from must be greater or equal than to";
	return Math.floor((Math.random() * (to-from+1)) + from);
}