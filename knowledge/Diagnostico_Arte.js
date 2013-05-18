////////////////////////////////////////////////////////////////////////////////
// Sistema de Evaluación de Reglas
//------------------------------------------------------------------------------
// Máquina de inferencia simple con encadenamiento hacia adelante.
// Versión 0.1 Beta
// Escrito por J.M. Ayala Wilson.
//------------------------------------------------------------------------------
// Base del conocimiento para 
////////////////////////////////////////////////////////////////////////////////

var knowledge = {

	//////////////////////////////////////////////////////////////////////////////
	// Pregunta o preguntas iniciales
	//----------------------------------------------------------------------------
	// Se los números de las preguntas iniciales separados por coma.
	//////////////////////////////////////////////////////////////////////////////
	askfirst:[

	],
	
	//////////////////////////////////////////////////////////////////////////////
	// Hechos iniciales
	//----------------------------------------------------------------------------
	//
	//////////////////////////////////////////////////////////////////////////////
	statefirst:[

	],
	
	// Definicion de las preguntas
	
	questions:[
		{},
	],

	//////////////////////////////////////////////////////////////////////////////
	// Conclusiones finales del cuestionario
	//----------------------------------------------------------------------------
	// Se escriben: fid:Numero,ftext:'Texto'
	//////////////////////////////////////////////////////////////////////////////
	facts:[
		{},
	],
	
	//////////////////////////////////////////////////////////////////////////////
	// Reglas de deducción
	//----------------------------------------------------------------------------
	// La funcion boolean q(Numero) devuelve el resultado de una pregunta [Condicion].
	// La funcion boolean f(Numero) prueba si un hecho ha sido establecido [Condicion].
	// La funcion void final(Numero) establece un hecho como verdadero y conclusivo.
	// La funcion void set(Numero) establece un hecho como verdadero.
	// La función ask(Numero) establece la siguiente pregunta.
	//////////////////////////////////////////////////////////////////////////////
	rules:[
	 
	],
};
