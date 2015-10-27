"use strict"

var config = require('../config');
var errors = require('./errors');
var session = require('../lib/session');
var misc = require('../lib/miscelanea');

module.exports = function(app){
  //home page
  app.get('/',function(req, res){
    var options = {};
    //if debug mode we enable pretty html render
    if (config.debug) options = { pretty: true };
    res.render('home.jade',options)
  });

  //setting up combination
  app.post("/set-master-combination", function(req,res,next){
  	var comb = req.body.combination;
  	req.session.combination = comb;
    if (config.debug) console.log("session content: %s",JSON.stringify(req.session));  	  	
    if (config.debug) console.log("setting master: %s",JSON.stringify(comb));
    res.send({combination: comb, ok: 1});
  });

  //test set-master-comb route
  app.get('/set-master-combination',function(req, res){
    var options = {};
    //if debug mode we enable pretty html render
    if (config.debug) options = { pretty: true };
    if (config.debug) console.log('get set-master-combination.');    
    res.render('set-master-combination.jade',options)
  });



  //query current master combination
  app.get("/query-master", function(req,res,next){
  	var comb = req.session.combination;
    if (config.debug) console.log("session content: %s",JSON.stringify(req.session));  	
    if (config.debug) console.log("querying master: %s",JSON.stringify(comb));
    var exists = misc.isNotEmpty(comb);
    res.send({combination: comb, exists: exists});
  });


  //test compare route
  app.get('/compare',function(req, res){
    var options = {};
    //if debug mode we enable pretty html render
    if (config.debug) options = { pretty: true };
    if (config.debug) console.log('get compare.');    
    res.render('compare.jade',options)
  });

  //compare combination
  app.post("/compare", function(req,res,next){
    var numCoincidences = 0;
    //initializing
  	var currComb = {};
    var combIn = req.body.combination;
    if (misc.isNotEmpty(req.session.combination)){
      currComb = req.session.combination;
    }
    if (config.debug) console.log("compare: %s <-> %s",JSON.stringify(currComb),JSON.stringify(combIn));
    var comparation = misc.compareCombinations(currComb,combIn);
    if (config.debug) console.log("result: %s",JSON.stringify(comparation));    
    res.send(comparation);
  });

  //test compare-multi route
  app.get('/compare-multi',function(req, res){
    var options = {};
    //if debug mode we enable pretty html render
    if (config.debug) options = { pretty: true };
    if (config.debug) console.log('get compare.');    
    res.render('compare-multi.jade',options)
  });

  //compare-multi
  app.post("/compare-multi", function(req,res,next){
    var currComb = {};
    if (misc.isNotEmpty(req.session.combination)){
      currComb = req.session.combination;
    }

    var stats={};

    var combinations = req.body.data;
    for (var i=0; i<combinations.length; i++){
      console.log('master: %s',JSON.stringify(currComb));
      console.log('next: %s',JSON.stringify(combinations[i].combination));      
      stats = misc.statsAccounting(currComb,combinations[i].combination,stats);
      console.log('stats: %s',JSON.stringify(stats));
    }   
    if (config.debug) console.log("stats %s",JSON.stringify(stats));
    res.send({"ok": true, stats: stats});
  });


  //compare historical
  app.get('/compare-historical',function(req, res){
    var options = {};
    //if debug mode we enable pretty html render
    if (config.debug) options = { pretty: true };
    if (config.debug) console.log('get compare.');    
    res.render('compare-historical.jade',options)
  });

  //compare-historical
  app.post("/compare-historical", function(req,res,next){
    var sumStats=[];
    var combinations = req.body.data;
    var historical = req.body.hist;
    sumStats={
        "cat1": [], "cat2": [], "cat3": [], "cat4": [], "cat5": [], "reimb": [], "remainder": []
    }   
    for (var i=0;i<historical.length;i++){
      var stats={};
      for (var j=0;j<combinations.length;j++){
        stats = misc.statsAccounting(historical[i].combination,combinations[j].combination,stats);      
      }
      var result = {date: historical[i].combination.date, combination: historical[i].combination, "stats": stats}
      if (stats['6'] > 0){
        sumStats.cat1.push(result);
      }else if (stats['5C'] > 0){
        sumStats.cat2.push(result);
      }else if (stats['5'] > 0){
        sumStats.cat3.push(result);
      }else if (stats['4'] > 0){
        sumStats.cat4.push(result);
      }else if (stats['3'] > 0){
        sumStats.cat5.push(result);
      }else if (stats['reimb'] > 0){
        sumStats.reimb.push(result);
      }else{
        sumStats.remainder.push(result);
      }

    }
    var results = {"ok": true, "results": sumStats};
    //console.log('response: %s',JSON.stringify(stats));    
    res.send(results);
  });


  //error handlers
  errors(app);
}