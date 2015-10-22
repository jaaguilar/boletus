var misc = require('../miscelanea')
/**
** compareCombinations function
**/
describe('compareCombinations', function() {
   it('should compare two number combinations stored in JSON: equals with the same order', function(){
       var comb = {numbers: [10,15,20,25,30,35], reimb: 0};
       var master = {numbers: [10,15,20,25,30,35], comp: 12, reimb: 0};       
       var resultOk = {count: 6, compOk: false, reimbOk: true};
       var result = misc.compareCombinations(comb,master);
       expect(result).toEqual(resultOk);
   });
   it('should compare two number combinations stored in JSON: equals with one permutation', function(){
       var comb = {numbers: [15,10,20,25,30,35], reimb: 0};
       var master = {numbers: [10,15,20,25,30,35], comp: 12, reimb: 0};       
       var resultOk = {count: 6, compOk: false, reimbOk: true};
       var result = misc.compareCombinations(comb,master);
       expect(result).toEqual(resultOk);
   });
   it('should compare two number combinations stored in JSON: equals with reverse order', function(){
       var comb = {numbers: [10,15,20,25,30,35], reimb: 0};
       var master = {numbers: [35,30,25,20,15,10], comp: 12, reimb: 0};       
       var resultOk = {count: 6, compOk: false, reimbOk: true};
       var result = misc.compareCombinations(comb,master);
       expect(result).toEqual(resultOk);
   });
   it('should compare two number combinations stored in JSON: only one not equal in reverse order and no reimburse', function(){
       var comb = {numbers: [10,15,20,25,30,35], reimb: 8};
       var master = {numbers: [48,30,25,20,15,10], comp: 12, reimb: 0};       
       var resultOk = {count: 5, compOk: false, reimbOk: false};
       var result = misc.compareCombinations(comb,master);
       expect(result).toEqual(resultOk);
   });
   it('should compare two number combinations stored in JSON: five coincidences plus complementary and reimburse', function(){
       var comb = {numbers: [10,15,20,25,30,35], reimb: 0};
       var master = {numbers: [35,30,25,5,15,10], comp: 5, reimb: 0};       
       var resultOk = {count: 5, compOk: false, reimbOk: true};
       var result = misc.compareCombinations(comb,master);
       expect(result).toEqual(resultOk);
   });
   it('should compare two number combinations stored in JSON: five equals with no complementary and no reimburse', function(){
       var comb = {numbers: [10,15,20,25,30,35], reimb: 0};
       var master = {numbers: [48,30,25,20,15,10], comp: 5, reimb: 3};       
       var resultOk = {count: 5, compOk: false, reimbOk: false};
       var result = misc.compareCombinations(comb,master);
       expect(result).toEqual(resultOk);
   });

});

