//
// RULES EVALUATION ENGINE
// Simple forward chaining inference machine 
// Version 0.1 Beta
// Written by J.M. Ayala Wilson
// June 25th, 2012
//

function RulesEvaluationEngine(ruleset,askcallback,solcallback,logcallback,withSteps)
{
 // Current question

  this.__currentQuestion = -1;
  
 // Stack evaluation
 
  this.__stack = null;
 
  if (withSteps){
     this.__stack = new Array();
  }
 
  // Ask callback
  this.__askcallback = askcallback; 

 // Questions
 this.__questions = new Array();
 for (var i=0;i<ruleset.questions.length;i++){
     this.__questions[i] = new Question(ruleset.questions[i].qid,
	                                    ruleset.questions[i].qtext,
										ruleset.questions[i].qdesc,
										ruleset.questions[i].qtype,
										ruleset.questions[i].info);
 }
 
 // Facts
 this.__facts = new Array();
 for(var i=0;i<ruleset.facts.length;i++){
   this.__facts[i] = new Fact(ruleset.facts[i].fid,ruleset.facts[i].ftext); 
 }
 
 // Rules
 
 this.__rules = new Array();
 for(var i=0;i<ruleset.rules.length;i++){
    this.__rules[i] = new Rule(ruleset.rules[i].rid,
	                           ruleset.rules[i].cond,
						       ruleset.rules[i].iftrue,
						       ruleset.rules[i].iffalse,
							   this.__askcallback,
							   this.__stack); 
 }
 
 // Starting questions
 
 this.__askfirst = new Array();
 this.__askfirst = ruleset.askfirst;
 
 // Starting facts
 
 this.__statefirst = new Array();
 this.__statefirst = ruleset.statefirst;
 
 // Solution

 this.__solution          = new Array();
 this.__solutionFound     = false;
 this.__solutionCallback  = solcallback;
 this.__logicaCallback    = logcallback;
}

//----------------------------------------------------------------------------------------------------------------------------------

RulesEvaluationEngine.prototype.Logica = function()
{
  if (this.__solutionFound){
      this.__logicaCallback(this.__questions,this.__facts);
  }	  
}

//----------------------------------------------------------------------------------------------------------------------------------

RulesEvaluationEngine.prototype.initEvaluation = function()
{
  // No facts stated
  
  for(var i=0;i<this.__facts.length;i++){
	  this.__facts[i].__selected = false;
  }		

  // Initial facts
  
  for(var i=0;i<this.__statefirst.length;i++){
      for(var j=0;j<this.__facts;j++){
	      if (this.__statefirst[i] == this.__facts[i].__id){
              this.__facts[i].__selected = true; 
		  }
	  }
  }

  // No rules evaluated
  
  for(var i=0;i<this.__rules.length;i++){
	    this.__rules[i].__evaluated = false;
  }		
  
  // No questions asked and initial questions
  
  for (var i=0;i<this.__questions.length;i++){    
      this.__questions[i].__asked = false;
	  for (var j=0;j<this.__askfirst.length;j++){
	     if (this.__questions[i].__id == this.__askfirst[j]){
            this.__stack.push(this.__questions[i]);
		}   
	  }
  }
  
  this.__solutionFound = false; 
  this.__currentQuestion = -1;
}

//----------------------------------------------------------------------------------------------------------------------------------


RulesEvaluationEngine.prototype.Next = function()
{
  if (this.__currentQuestion < this.__questions.length-1){
      this.__currentQuestion++;
      this.__askcallback(this.__questions[this.__currentQuestion]);
  }
}

//----------------------------------------------------------------------------------------------------------------------------------

RulesEvaluationEngine.prototype.Prev = function()
{
  if (this.__currentQuestion > 0){
      this.__currentQuestion--;
      this.__askcallback(this.__questions[this.__currentQuestion]);
  }  
}

//----------------------------------------------------------------------------------------------------------------------------------

RulesEvaluationEngine.prototype.Step = function()
{
   if (this.__solutionFound) return;
   
   if (this.__stack.length > 0){
      var quest = this.__stack.pop();
	  this.__askcallback(quest);
	  return;
   }   
   
   var solution = -1;
   var r = 0;
   for(var i=0;i<this.__rules.length;i++){
     if (!this.__rules[i].__evaluated){
        r = this.__rules[i].Evaluate(this.__questions,this.__facts);
	  
	    if (r == 1) break;
	    if (r == 2) {
	        solution = this.__rules[i].Conclusion(); 
	        break;
	    }
	 }	
   }
   
   if (r == 1){
      var quest = this.__stack.pop();
	  this.__askcallback(quest);
	  return;
   }
   
   if (r == 2) {
 	   if (solution != -1) {
           var j = 0; 
           for(var i=0;i<this.__facts.length;i++){
	           if (this.__facts[i].__selected){
	               this.__solution[j] = ' [' + j + '] ' + this.__facts[i].__text;
                   j++;
               }			
	       }
		   this.__solutionFound = true;
		   this.__solutionCallback(this.__solution);
       }	
	   
  }
  
   
}

//----------------------------------------------------------------------------------------------------------------------------------

RulesEvaluationEngine.prototype.Evaluate = function()
{
  var solution = -1;
  var count = 0;

  while (solution == -1)
  {
  
    // Endless loop protection
    if (count >= this.__rules.length) break;
	
    var r = 0;
    for(var i=0;i<this.__rules.length;i++){
        if (!this.__rules[i].__evaluated){
             r = this.__rules[i].Evaluate(this.__questions,this.__facts);
	     if (r == 2) {
	        solution = this.__rules[i].Conclusion(); 
	        break;
	    }
	}	
    }
	
    count++;
  }
  
  if (solution != -1) {
           var j = 0; 
           for(var i=0;i<this.__facts.length;i++){
	           if (this.__facts[i].__selected){
	               this.__solution[j] = ' [' + j + '] ' + this.__facts[i].__text;
                       j++;
                   }			
	   }
	   this.__solutionFound = true;
	   this.__solutionCallback(this.__solution);
  }	  
}

//----------------------------------------------------------------------------------------------------------------------------------

RulesEvaluationEngine.prototype.Solution = function()
{
  return this.__solution;
}

//----------------------------------------------------------------------------------------------------------------------------------

RulesEvaluationEngine.prototype.Explanation = function()
{
  var expl = new Array(); 
  for(var i=0;i<this.__questions.length;i++){
     if (this.__questions[i].__asked){
	    expl[i] = ' ['+i+ '] ' +  this.__questions[i].__text + 
		          ' : ' + this.__questions[i].__value;
	 }
  }
  return expl;
}

//----------------------------------------------------------------------------------------------------------------------------------

RulesEvaluationEngine.prototype.askQuestion = function(qid,questions)
{
  for(var i=0;i<questions.length;i++){
      if (questions[i].__id == qid){
	     this.__askcallback(questions[i]);
	     break;
	  }
  }
}

//----------------------------------------------------------------------------------------------------------------------------------
