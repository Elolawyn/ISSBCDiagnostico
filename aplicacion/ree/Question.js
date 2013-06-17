//
// RULES EVALUATION ENGINE
// Simple forward chaining inference machine 
// Version 0.1 Beta
// Written by J.M. Ayala Wilson
// June 25th, 2012
//

function Question(qid,qtext,qdesc,qtype,info)
{
  this.__id    = qid;
  this.__text  = qtext;
  this.__type  = qtype;
  this.__desc  = qdesc;
  this.__value = undefined;
  this.__asked = false;
  this.__info  = info;
}

