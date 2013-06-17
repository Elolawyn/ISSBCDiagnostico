//
// RULES EVALUATION ENGINE
// Simple forward chaining inference machine 
// Version 0.1 Beta
// Written by J.M. Ayala Wilson
// June 25th, 2012
//

function Rule(rid,cond,thenactions,elseactions,askcallback,stepstack)
{
  this.__id        = rid;
  this.__evaluated = false;
  this.__cond      = this.FixCond(cond);
  this.__questions = null;
  this.__facts     = null; 
  this.__result    = false;
  this.__count     = 0;
  this.__then      = this.FixActions(thenactions);
  this.__else      = this.FixActions(elseactions);
  this.__final     = -1;
  this.__askcallback = askcallback;
  this.__stack     = stepstack;
}

Rule.prototype.FixCond = function(cond)
{
  cond = cond.replace(/q\(/gi,"this.q(");
  cond = cond.replace(/f\(/gi,"this.f(");
  return cond;
}

Rule.prototype.FixActions = function(actions)
{
  actions = actions.replace(/ask\(/gi,"this.ask(");
  actions = actions.replace(/final\(/gi,"this.final(");
  actions = actions.replace(/set\(/gi,"this.set(");
  return actions;
}

Rule.prototype.Evaluate = function(questions,facts)
{
  this.__questions = questions;
  this.__facts     = facts;
  this.__evaluated = false;
  this.__count     = 0;
  this.__final     = -1; 
  
  this.__result = eval(this.__cond);
  
  var qcnt = 0;
  var fcnt = 0;
  
  if (this.__cond.indexOf("this.q") > -1){
      qcnt = this.__cond.match(/this.q/g).length;
  }	  

  if (this.__cond.indexOf("this.f") > -1){
      fcnt = this.__cond.match(/this.f/g).length;
  } 
  
  
  this.__evaluated = (this.__count ==  (qcnt + fcnt));
  
  if (this.__evaluated){
  
    if (this.__result){
	    if (this.__then != ''){
	        eval(this.__then);
		}	
    }
	else{
	    if (this.__else != ''){
	       eval(this.__else);
		}   
	}
  }
  
  if (!this.__evaluated) return 0;

  if (this.__stack.length > 0) return 1;
  if (this.__final != -1) return 2;
  return 3;
}

Rule.prototype.q = function(qid)
{
  for(var i=0;i<this.__questions.length;i++){
    if ((this.__questions[i].__id == qid) && (this.__questions[i].__asked)){ 
	    this.__count++;
		if (this.__questions[i].__type == 'boolean'){
	        return (this.__questions[i].__value === 'true');      
		}
        return this.__questions[i].__value;		
	}	 
  }
  return false;
}

Rule.prototype.f = function(fid)
{
  for(var i=0;i<this.__facts.length;i++){
    if (this.__facts[i].__id == fid){ 
	    this.__count++;
		return this.__facts[i].__selected;      
	}	 
  }
  return false;
}


Rule.prototype.ask = function(qid)
{ 
  for(var i=0;i<this.__questions.length;i++){
     if (this.__questions[i].__id == qid){
	     if (this.__stack == null){ 
	         this.__askcallback(this.__questions[i]);
	     }
         else {
		     this.__stack.push(this.__questions[i]);
         }   		 
		 break;
	 }
  }
}

Rule.prototype.final = function(fid)
{ 
  for(var i=0;i<this.__facts.length;i++){
     if (this.__facts[i].__id == fid){
	    this.__facts[i].__selected = true;
	    this.__final = i;
		break;
	 }
  }
}

Rule.prototype.set = function(fid)
{ 
  for(var i=0;i<this.__facts.length;i++){
     if (this.__facts[i].__id == fid){
	    this.__facts[i].__selected = true;
		break;
	 }
  }
}

Rule.prototype.Conclusion = function()
{
  return this.__final;
}

Rule.prototype.isEvaluated = function()
{
  return this.__evaluated;
}

Rule.prototype.Condition = function()
{
  return this.__result;
}
