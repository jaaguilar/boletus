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

/**
* Papa parse code
* 
**/
function postParsedCSVFile(element,delimiter,header,relUrl){
  var combs = [];
  //var filePath = $(element).val();
  //alert(filePath[0]);
  $(element).parse({
    config: {
      "delimiter": delimiter,
      "newline": "",  // auto-detect
      "header": header,
      "complete": function(results, file) {
        console.log("This file done:", file, results);

        for (var i=0; i<results.data.length; i++){
          var numbers = [];
          for (var j=0; j<results.data[i].length; j++)
          {
            numbers.push(parseInt(results.data[i][j]));
          }  

          combs.push({
            combination: {
              numbers: numbers
            } 
          })
        }

        //service post
        $.ajax({
          "type": "POST",
          "url": relUrl,
          "data": JSON.stringify({data: combs}),
          "contentType": "application/json; charset=utf-8",
          "dataType": "json",
          "success": function(data) { 
            console.log("server response", data);
            if (data.ok){
              writeSuccess("file parsed!");
            }else{
              writeSuccess("server response was ko.");              
            }

          },
          "failure": function() { 
            alert("Sorry, we were unable to find boletus service. Try again later."); 
          }
        });  
      }      
    },
    before: function(file, inputElem)
    {
      // executed before parsing each file begins;
      // what you return here controls the flow
      console.log("Parsing file:", file);
    },
    error: function(err, file, inputElem, reason)
    {
      // executed if an error occurs while loading the file,
      // or if before callback aborted for some reason
      alert("an error has occurred!");
    },
    complete: function(results)
    {
      // executed after all files are complete
      console.log("All the fish is sold...");
    }
  });
}


/**
* Papa parse code
* 
**/
function postDataAndHistorical(element1,delimiter1,header1,element2,delimiter2,header2,relUrl){
  $(element1).parse({
    config: {
      "delimiter": delimiter1,
      "newline": "",  // auto-detect
      "header": header1,
      "complete": function(results, file) {
        console.log("First file done:", file, results);
        var hist = [];
        for (var i=0; i<results.data.length; i++){
          var numbers = [];
          var date = results.data[i].DATE;
          numbers.push(parseInt(results.data[i].NUMB1));
          numbers.push(parseInt(results.data[i].NUMB2));
          numbers.push(parseInt(results.data[i].NUMB3));
          numbers.push(parseInt(results.data[i].NUMB4));
          numbers.push(parseInt(results.data[i].NUMB5));
          numbers.push(parseInt(results.data[i].NUMB6));
          var comp = results.data[i].COMP;   
          hist.push({
            combination: {
              date: date,
              numbers: numbers,
              comp: comp
            } 
          })
        }
        parseNext(element2,delimiter2,header2,hist,relUrl);        
      }      
    },
    error: function(err, file, inputElem, reason)
    {
      // executed if an error occurs while loading the file,
      // or if before callback aborted for some reason
      alert("an error has occurred!");
    },
    complete: function(results)
    {
      // executed after all files are complete
      console.log("All the fish is sold...");
    }
  });

  function parseNext(element2,delimiter2,header2,hist,relUrl){
    $(element2).parse({
      config: {
        "delimiter": delimiter2,
        "newline": "",  // auto-detect
        "header": header2,
        "complete": function(results, file) {
          console.log("Second file done:", file, results);

          var combs = [];
          for (var i=0; i<results.data.length; i++){
            var numbers = [];
            for (var j=0; j<results.data[i].length; j++)
            {
              numbers.push(parseInt(results.data[i][j]));
            }  

            combs.push({
              combination: {
                numbers: numbers
              } 
            })
          }

          //service post
          $.ajax({
            "type": "POST",
            "url": relUrl,
            "data": JSON.stringify({data: combs, hist: hist}),
            "contentType": "application/json; charset=utf-8",
            "dataType": "json",
            "success": function(data) { 
              console.log("server response", data);
              if (data.ok){
                writeSuccess("file parsed!");
              }else{
                writeSuccess("server response was ko.");              
              }

            },
            "failure": function() { 
              alert("Sorry, we were unable to find boletus service. Try again later."); 
            }
          });  
        }      
      },
      error: function(err, file, inputElem, reason)
      {
        // executed if an error occurs while loading the file,
        // or if before callback aborted for some reason
        alert("an error has occurred!");
      }
    });
  }
}