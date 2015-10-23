"use strict"

/**
* Call route set-master-combination
*/
function postCombination(relUrl) {
  //get the actual user's word to send to server
  var numb1 = parseInt($('#numb1').val());
  var numb2 = parseInt($('#numb2').val());
  var numb3 = parseInt($('#numb3').val());
  var numb4 = parseInt($('#numb4').val());
  var numb5 = parseInt($('#numb5').val());
  var numb6 = parseInt($('#numb6').val());
  if ($('#comp').length){
    var comp = parseInt($('#comp').val());
  }
  var reimb = parseInt($('#reimb').val());
  var numbers = [numb1,numb2,numb3,numb4,numb5,numb6].sort(function(a, b){return a-b});


  var jsonresource = JSON.stringify({
    combination: { 
      numbers: numbers,
      comp: comp,
      reimb: reimb
    }
  });
  //service post
  $.ajax({
    type: "POST",
    url: relUrl,
    data: jsonresource,
    contentType: "application/json; charset=utf-8",
    dataType: "json",
    success: function(data) { 
      writeSuccess(data); 
      $('#numb1').focus();
    },
    failure: function() { 
      alert("Sorry, we were unable to find boletus service. Try again later."); 
    }
  });
}

/**
* Write back the response data to message panel
* @data {JSON} data Answer data structure
*/
function writeSuccess(data) {
  $('#msg').text(JSON.stringify(data));
}


