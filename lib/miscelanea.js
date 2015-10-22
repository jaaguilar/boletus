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
* Returns JSON object with combinations comparation result.
* If one of arguments is float, it rounds this downward to its nearest integer
* @param {JSON} master master numbers combination
* @param {JSON} comb numbers combination to be compared with master combination
*/ 
function compareCombinations(master,comb){
	var nums1 = comb.numbers;
	var nums2 = master.numbers;
	var count = 0;
	if (nums1.length != nums2.length)
		throw "compareCombinations: lengths are not equal.";
	for (var i=0;i<nums1.length;i++){
		if (nums2.indexOf(nums1[i]) >= 0){
			count++;
		}
	}
	var compOk = (nums1.indexOf(master.comp) >= 0);	
	var reimbOk = comb.reimb == master.reimb;

	return {
		count: count,
		compOk: compOk,
		reimbOk: reimbOk
	};
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

module.exports= {
	isNotEmpty: isNotEmpty,
	compareCombinations: compareCombinations,
	randomInt: randomInt
}