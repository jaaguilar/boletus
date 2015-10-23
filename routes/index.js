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
    exists = misc.isNotEmpty(comb);
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
    var reset = req.body.reset;
    if (reset == undefined) reset = false;
    if (misc.isNotEmpty(req.session.combination)){
      currComb = req.session.combination;
    }
    if (config.debug) console.log("compare: %s <-> %s",JSON.stringify(currComb),JSON.stringify(combIn));
    var comparation = misc.compareCombinations(currComb,combIn);
    if (config.debug) console.log("result: %s",JSON.stringify(comparation));    
    res.send(comparation);
  });

  //error handlers
  errors(app);
}