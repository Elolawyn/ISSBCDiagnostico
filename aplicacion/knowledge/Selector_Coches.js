////////////////////////////////////////////////////////////////////////////////
// Sistema de Evaluación de Reglas
//------------------------------------------------------------------------------
// Máquina de inferencia simple con encadenamiento hacia adelante.
// Versión 0.1 Beta
// Escrito por J.M. Ayala Wilson. 
////////////////////////////////////////////////////////////////////////////////

var knowledge = {
    
	// Pregunta o preguntas iniciales 
	
	askfirst:[12,2,1],
	
	// Hechos iniciales 
	
	statefirst:[],
	
	// Definicion de las preguntas
	
	questions:[

    {qid:1,
      qtext:'Por favor, elija el modelo de coche que desea comprar.',
      qdesc:'<p><b>Cabrio</b>: es modelo de coche descapotable de dos puertas.</p>'+
      '<p><b>Cupé</b>: modelo de coche de dos puertas.</p>' +
      '<p><b>Berlina:</b> modelo de coche de cuatro puertas.</p>',
	  qtype:'selection',
      info:[
      'cabrio',
      'cupe',
      'berlina']} ,
    {qid:2,
      qtext:'Por favor, elija un rango de precios',
      qdesc:'Define el rango de precios del coche que queremos comprar',
	  qtype:'selection',
      info:[
      '10,000-30,000€',
      '31,000-50,000€',
      '+50,000€']} ,
    {qid:3,
      qtext:'Por favor, elija cabrio de entre 10,000 y 30,000€',
      qdesc:'',
	  qtype:'selection',
      info:[
      'Peugeot 207',
      'Renault Megane',
      'Maxda MX5']},
    {qid:4,
      qtext:'Por favor, elija cabrio de entre  31,000 y 50,000€',
      qdesc:'',
	  qtype:'selection',
      info:[
      'BMW z4',
      'Volvo c70']} ,
      {qid:5,
      qtext:'Por favor, elija cabrio de más de 50,000€',
      qdesc:'',
	  qtype:'selection',
      info:[
      'Audi TTRS',
      'Audi TTS',
      'BMW Serie G']},
    {qid:6,
      qtext:'Por favor, elija cupe de entre 10,000 y 30,000€',
      qdesc:'',
	  qtype:'selection',
      info:[
      'Renault Laguna',
      'BMW Serie 1']} ,
    {qid:7,
      qtext:'Por favor, elija cupe de entre  31,000 y 50,000€',
      qdesc:'',
	  qtype:'selection',
      info:[
      'Audi A5',
      'Chevrolet Camaro',
      'Mercedes Clase E']} ,
    {qid:8,
      qtext:'Por favor, elija cupe de más de 50,000€',
      qdesc:'',
	  qtype:'selection',
      info:[
      'Audi TTS',
      'Chevrolet Corvette',
      'Porsche 911']} ,
    {qid:9,
      qtext:'Por favor, elija berlina de entre 10,000 y 30,000€',
      qdesc:'',
	  qtype:'selection',
      info:[
      'Alfa Romeo MiTo',
      'Fiat Bravo']} ,
    {qid:10,
      qtext:'Por favor, elija berlina de entre  31,000 y 50,000€',
      qdesc:'',
	  qtype:'selection',
      info:[
      'Audi A5',
      'BMW Serie 5']}, 
    {qid:11,
      qtext:'Por favor, elija berlina de más de 50,000€',
      qdesc:'',
	  qtype:'selection',
      info:[
      'Audi S6',
      'BMW Serie 6',
      'BMW Serie 7']},
	 
	],

   

	
	// Hechos a los que tenemos que llegar a partir de las preguntas
	
	facts:[
	    {fid:1,ftext:'Peugeot 207 cabrio por 15,300€'},
        {fid:2,ftext:'Renault Megane cabrio por 22,000€'},
        {fid:3,ftext:'Maxda MX5 cabrio por 22,000€'},
        {fid:4,ftext:'BMW z4 cabrio por 32,000€'},
        {fid:5,ftext:'Volvo c70 cabrio por 37,000€'},
        {fid:6,ftext:'Audi TTRS cabrio por 64,000€'},
        {fid:7,ftext:'Audi TTS cabrio por 55,000€'},
        {fid:8,ftext:'BMW Serie G cabrio por 83,000€'},
        {fid:9,ftext:'Renault Laguna cupe por 23,000€'},
        {fid:10,ftext:'BMW Serie 1 cupe por 24,000€'},
        {fid:11,ftext:'Audi A5 cupe por 35,000€'},
        {fid:12,ftext:'Chevrolet Camaro cupe por 44,000€'},
        {fid:13,ftext:'Mercedes Clase E cupe por 44,000€'},
        {fid:14,ftext:'Audi TTS cupe por 51,000€'},
        {fid:15,ftext:'Chevrolet Corvette cupe por 86,000€'},
        {fid:16,ftext:'Porsche 911 por 96,000€'},
        {fid:17,ftext:'Alfa Romeo MiTo berlina por 14,000€'},
        {fid:18,ftext:'Fiat Bravo berlina por 12,000€'},
        {fid:19,ftext:'Audi A5 berlina por 34,000€'},
        {fid:20,ftext:'BMW Serie 5 berlina por 35,000€'},
        {fid:21,ftext:'Audi S6 berlina por 86,000€'},
        {fid:22,ftext:'BMW Serie 6 berlina por 80,000€'},
        {fid:23,ftext:'BMW Serie 7 berlina por 74,000€'},
	],
	
	// Reglas que nos permiten deducir los hechos a partir de las preguntas u otros hechos
	// La funcion boolean q() devuelve el resultado de una pregunta [Condicion]
	// La funcion boolean f() prueba si un hecho ha sido establecido [Condicion]
	// La funcion void final( ) establece un hecho como verdadero y conclusivo
	// La funcion void set() establece un hecho como verdadero 
	
	rules:[
	{rid:1,cond: 'q(1) == "cabrio" && q(2)=="10,000-30,000€"',
	  iftrue:'ask(3);',
	  iffalse:''},

    {rid:2,cond: 'q(1) == "cabrio" && q(2)=="31,000-50,000€"',
	  iftrue:'ask(4);',
	  iffalse:''},

    {rid:3,cond: 'q(1) == "cabrio" && q(2)=="+50,000€"',
	  iftrue:'ask(5);',
	  iffalse:''},

    {rid:4,cond: 'q(1) == "cupe" && q(2)=="10,000-30,000€"',
	  iftrue:'ask(6);',
	  iffalse:''},

    {rid:5,cond: 'q(1) == "cupe" && q(2)=="31,000-50,000€"',
	  iftrue:'ask(7);',
	  iffalse:''},

    {rid:6,cond: 'q(1) == "cupe" && q(2)=="+50,000€"',
	  iftrue:'ask(8);',
	  iffalse:''},

    {rid:7,cond: 'q(1) == "berlina" && q(2)=="10,000-30,000€"',
	  iftrue:'ask(9);',
	  iffalse:''},

    {rid:8,cond: 'q(1) == "berlina" && q(2)=="31,000-50,000€"',
	  iftrue:'ask(10);',
	  iffalse:''},

    {rid:9,cond: 'q(1) == "berlina" && q(2)=="+50,000€"',
	  iftrue:'ask(11);',
	  iffalse:''},

    {rid:10,cond: 'q(3) == "Peugeot 207"',
	  iftrue:'final(1);',
	  iffalse:''},

    {rid:11,cond: 'q(3) == "Renault Megane"',
	  iftrue:'final(2);',
	  iffalse:''},

    {rid:12,cond: 'q(3) == "Maxda MX5"',
	  iftrue:'final(3);',
	  iffalse:''},

    {rid:10,cond: 'q(4) == "BMW z4"',
	  iftrue:'final(4);',
	  iffalse:''},

    {rid:11,cond: 'q(4) == "Volvo c70"',
	  iftrue:'final(5);',
	  iffalse:''},

    {rid:12,cond: 'q(5) == "Audi TTRS"',
	  iftrue:'final(6);',
	  iffalse:''},

    {rid:13,cond: 'q(5) == "Audi TTS"',
	  iftrue:'final(7);',
	  iffalse:''},

    {rid:14,cond: 'q(5) == "BMW Serie G"',
	  iftrue:'final(8);',
	  iffalse:''},
		 
	{rid:15,cond: 'q(6) == "Renault Laguna"',
	  iftrue:'final(9);',
	  iffalse:''},

    {rid:16,cond: 'q(6) == "BMW Serie 1"',
	  iftrue:'final(10);',
	  iffalse:''},

    {rid:17,cond: 'q(7) == "Audi A5"',
	  iftrue:'final(11);',
	  iffalse:''},
	  
    {rid:18,cond: 'q(7) == "Chevrolet Camaro"',
	  iftrue:'final(12);',
	  iffalse:''},
	  
    {rid:19,cond: 'q(7) == "Mercedes Clase E"',
	  iftrue:'final(13);',
	  iffalse:''},

    {rid:20,cond: 'q(8) == "Audi TTS"',
	  iftrue:'final(14);',
	  iffalse:''},
	  
    {rid:21,cond: 'q(8) == "Chevrolet Corvette"',
	  iftrue:'final(15);',
	  iffalse:''},
	  
    {rid:22,cond: 'q(8) == "Porsche 911"',
	  iftrue:'final(16);',
	  iffalse:''},

    {rid:23,cond: 'q(9) == "Alfa Romeo MiTo"',
	  iftrue:'final(17);',
	  iffalse:''},
	  
    {rid:24,cond: 'q(9) == "Fiat Bravo"',
	  iftrue:'final(18);',
	  iffalse:''},

    {rid:25,cond: 'q(10) == "Audi A5"',
	  iftrue:'final(19);',
	  iffalse:''},
	  
    {rid:26,cond: 'q(10) == "BMW Serie 5"',
	  iftrue:'final(20);',
	  iffalse:''},

    {rid:27,cond: 'q(11) == "Audi A6"',
	  iftrue:'final(21);',
	  iffalse:''},
	  
    {rid:28,cond: 'q(11) == "BMW Serie 6"',
	  iftrue:'final(22);',
	  iffalse:''},
	  
    {rid:29,cond: 'q(11) == "BMW Serie 7"',
	  iftrue:'final(23);',
	  iffalse:''},
	 
	],
	
};
