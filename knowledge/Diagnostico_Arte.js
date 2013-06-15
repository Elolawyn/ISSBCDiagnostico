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
	//////////////////////////////////////////////////////////////////////////////
	askfirst:[0],
	
	//////////////////////////////////////////////////////////////////////////////
	// Hechos iniciales
	//////////////////////////////////////////////////////////////////////////////
	statefirst:[],
	
	// Definicion de las preguntas
	questions:[
		{qid:0,
			qtext:'Seleccione el módulo de la aplicación',
			qdesc:
			'<p><b>Elaborar hipótesis:</b> el sistema elabora unas hipótesis a partir de un fallo indicado.</p>' +
			'<p><b>Comprobar hipótesis:</b> el sistema pide información para comprobar las hipótesis.</p>',
			qtype:'selection',
			info:[
				'Elaborar hipótesis',
				'Comprobar hipótesis',]},
		{qid:1,
			qtext:'Indique el fallo que se ve en la obra',
			qdesc:'',
			qtype:'selection',
			info:[
				'El cuadro tiene un tono anormal',
				'La pintura destiñe',
				'La pintura está craquelada',
				'La pintura está caída',
				'La pintura se disgrega',
				'Hay elementos indeseables en la pintura',
				'La pintura está curvada o alabeada',
				'El color del soporte ha cambiado',
				'El estado del soporte ha cambiado',]},
		{qid:2,
			qtext:'Indique la hipótesis a comprobar',
			qdesc:'',
			qtype:'selection',
			info:[
				'Se ha barnizado el temple',
				'No se han mezclado los colores bien con el agua al usar un colorante',
				'Hay poco aglutinante en la mezcla',
				'Hay un exceso de aglutinante',
				'La pintura esté empastada',
				'Falta aglutinante en la capa de preparación',
				'Sobra aglutinante en la capa de preparación',
				'Se han usado los nudos y la médula del árbol como soporte',
				'Se han oxidado de elementos metálicos del soporte',
				'Se han usado refuerzos para impedir el movimiento',
				'Hongos atacado la pintura',
				'Algún mamífero hay defecado en la pintura',
				'Algún ave hay defecado en la pintura',
				'Los hongos han atacado el soporte',
				'Los hongos xilófagos han atacado el soporte',
				'El soporte ha sido afectado por pudrición parda',
				'El soporte ha sido afectado por pudrición blanda',
				'El soporte ha sido afectado por pudrición blanca',
				'El soporte ha sido afectado por insectos',
				'El barniz se ha oxidado',
				'Se ha depositado polvo encima del barniz',
				'El humo de una vela ha ennegrecido el barniz',
				'La pintura se ha sometido a calor continuado',
				'Se ha quemado el cuadro',]},
		{qid:3,
			qtext:'¿Cuál es el tono del cuadro?',
			qdesc:
			'<p>Compruebe la tonalidad del cuadro.</p>',
			qtype:'selection',
			info:[
				'Tono translúcido',
				'Tono amarillento',
				'Tono opaco',
				'Tono negro',
				'Otro tono',]},
		{qid:4,
			qtext:'¿De qué color tiene la mano manchada?',
			qdesc:
			'<p>Pase la mano por la superficie del cuadro.</p>',
			qtype:'selection',
			info:[
				'Mano manchada de rojo cadmio medio',
				'Mano manchada de amarillo cadmio',
				'Mano manchada de azul esmalte',
				'Mano manchada de otro color',
				'Mano manchada con varios colores',]},
		{qid:5,
			qtext:'¿De qué color tiene la mano manchada?',
			qdesc:
			'<p>Pase la mano por la superficie del cuadro.</p>',
			qtype:'selection',
			info:[
				'Mano manchada de rojo cadmio medio',
				'Mano manchada de amarillo cadmio',
				'Mano manchada de azul esmalte',
				'Mano manchada de otro color',
				'Mano manchada con varios colores',]},
		{qid:6,
			qtext:'¿Observas surcos grasos en la zona craquelada?',
			qdesc:
			'<p>Observe la zona craquelada. Una zona craquelada es una zona que presenta grietas en forma de mosaico.</p>',
			qtype:'selection',
			info:[
				'Si',
				'No',]},
		{qid:7,
			qtext:'¿Cómo es el perfil del cuadro?',
			qdesc:
			'<p>Compruebe el perfil del cuadro.</p>',
			qtype:'selection',
			info:[
				'Zona con grueso de pintura craquelada',
				'Zona con grueso de pintura craquelada y con laguna faltante',
				'Ninguna de las anteriores',]},
		{qid:8,
			qtext:'¿Cómo se lija?',
			qdesc:
			'<p>Lije un resto de la capa de preparación a la que le falte pintura.</p>',
			qtype:'selection',
			info:[
				'Se lija fácilmente',
				'Se lija con dificultad',]},
		{qid:9,
			qtext:'¿Cómo se lija?',
			qdesc:
			'<p>Lije un resto de la capa de preparación a la que le falte pintura.</p>',
			qtype:'selection',
			info:[
				'Se lija fácilmente',
				'Se lija con dificultad',]},
	],

	//////////////////////////////////////////////////////////////////////////////
	// Hechos del cuestionario
	//////////////////////////////////////////////////////////////////////////////
	facts:[
		{fid:1 ,ftext:'Puede que se haya barnizado el temple'},
		{fid:2 ,ftext:'Puede que no se hayan mezclado los colores bien con el agua al usar un colorante'},
		{fid:3 ,ftext:'Puede que haya poco aglutinante en la mezcla'},
		{fid:4 ,ftext:'Puede que haya un exceso de aglutinante'},
		{fid:5 ,ftext:'Puede que la pintura esté empastada'},
		{fid:6 ,ftext:'Puede que falte aglutinante en la capa de preparación'},
		{fid:7 ,ftext:'Puede que sobre aglutinante en la capa de preparación'},
		{fid:8 ,ftext:'Puede que se hayan usado los nudos y la médula del árbol como soporte'},
		{fid:9 ,ftext:'Puede que se haya oxidado de elementos metálicos del soporte'},
		{fid:10,ftext:'Puede que se hayan usado refuerzos para impedir el movimiento'},
		{fid:11,ftext:'Puede que hongos hayan atacado la pintura'},
		{fid:12,ftext:'Puede que algún mamífero haya defecado en la pintura'},
		{fid:13,ftext:'Puede que algún ave haya defecado en la pintura'},
		{fid:14,ftext:'Puede que los hongos hayan atacado el soporte'},
		{fid:15,ftext:'Puede que los hongos xilófagos hayan atacado el soporte'},
		{fid:16,ftext:'Puede que el soporte haya sido afectado por pudrición parda'},
		{fid:17,ftext:'Puede que el soporte haya sido afectado por pudrición blanda'},
		{fid:18,ftext:'Puede que el soporte haya sido afectado por pudrición blanca'},
		{fid:19,ftext:'Puede que el soporte haya sido afectado por insectos'},
		{fid:20,ftext:'Puede que el barniz se haya oxidado'},
		{fid:21,ftext:'Puede que se haya depositado polvo encima del barniz'},
		{fid:22,ftext:'Puede que el humo de una vela haya ennegrecido el barniz'},
		{fid:23,ftext:'Puede que la pintura se haya sometido a calor continuado'},
		{fid:24,ftext:'Puede que se haya quemado el cuadro'},
		{fid:25,ftext:'Que se haya barnizado el temple es VERDAD'},
		{fid:26,ftext:'Que no se hayan mezclado los colores bien con el agua al usar un colorante es VERDAD'},
		{fid:27,ftext:'Que haya poco aglutinante en la mezcla es VERDAD'},
		{fid:28,ftext:'Que haya un exceso de aglutinante es VERDAD'},
		{fid:29,ftext:'Que la pintura esté empastada es VERDAD'},
		{fid:30,ftext:'Que falte aglutinante en la capa de preparación es VERDAD'},
		{fid:31,ftext:'Que sobre aglutinante en la capa de preparación es VERDAD'},
		{fid:32,ftext:'Que se hayan usado los nudos y la médula del árbol como soporte es VERDAD'},
		{fid:33,ftext:'Que se haya oxidado de elementos metálicos del soporte es VERDAD'},
		{fid:34,ftext:'Que se hayan usado refuerzos para impedir el movimiento es VERDAD'},
		{fid:35,ftext:'Que hongos hayan atacado la pintura es VERDAD'},
		{fid:36,ftext:'Que algún mamífero haya defecado en la pintura es VERDAD'},
		{fid:37,ftext:'Que algún ave haya defecado en la pintura es VERDAD'},
		{fid:38,ftext:'Que los hongos hayan atacado el soporte es VERDAD'},
		{fid:39,ftext:'Que los hongos xilófagos hayan atacado el soporte es VERDAD'},
		{fid:40,ftext:'Que el soporte haya sido afectado por pudrición parda es VERDAD'},
		{fid:41,ftext:'Que el soporte haya sido afectado por pudrición blanda es VERDAD'},
		{fid:42,ftext:'Que el soporte haya sido afectado por pudrición blanca es VERDAD'},
		{fid:43,ftext:'Que el soporte haya sido afectado por insectos es VERDAD'},
		{fid:44,ftext:'Que el barniz se haya oxidado es VERDAD'},
		{fid:45,ftext:'Que se haya depositado polvo encima del barniz es VERDAD'},
		{fid:46,ftext:'Que el humo de una vela haya ennegrecido el barniz es VERDAD'},
		{fid:47,ftext:'Que la pintura se haya sometido a calor continuado es VERDAD'},
		{fid:48,ftext:'Que se haya quemado el cuadro es VERDAD'},
		{fid:49,ftext:'Que se haya barnizado el temple es FALSO'},
		{fid:50,ftext:'Que no se hayan mezclado los colores bien con el agua al usar un colorante es FALSO'},
		{fid:51,ftext:'Que haya poco aglutinante en la mezcla es FALSO'},
		{fid:52,ftext:'Que haya un exceso de aglutinante es FALSO'},
		{fid:53,ftext:'Que la pintura esté empastada es FALSO'},
		{fid:54,ftext:'Que falte aglutinante en la capa de preparación es FALSO'},
		{fid:55,ftext:'Que sobre aglutinante en la capa de preparación es FALSO'},
		{fid:56,ftext:'Que se hayan usado los nudos y la médula del árbol como soporte es FALSO'},
		{fid:57,ftext:'Que se haya oxidado de elementos metálicos del soporte es FALSO'},
		{fid:58,ftext:'Que se hayan usado refuerzos para impedir el movimiento es FALSO'},
		{fid:59,ftext:'Que hongos hayan atacado la pintura es FALSO'},
		{fid:60,ftext:'Que algún mamífero haya defecado en la pintura es FALSO'},
		{fid:61,ftext:'Que algún ave haya defecado en la pintura es FALSO'},
		{fid:62,ftext:'Que los hongos hayan atacado el soporte es FALSO'},
		{fid:63,ftext:'Que los hongos xilófagos hayan atacado el soporte es FALSO'},
		{fid:64,ftext:'Que el soporte haya sido afectado por pudrición parda es FALSO'},
		{fid:65,ftext:'Que el soporte haya sido afectado por pudrición blanda es FALSO'},
		{fid:66,ftext:'Que el soporte haya sido afectado por pudrición blanca es FALSO'},
		{fid:67,ftext:'Que el soporte haya sido afectado por insectos es FALSO'},
		{fid:68,ftext:'Que el barniz se haya oxidado es FALSO'},
		{fid:69,ftext:'Que se haya depositado polvo encima del barniz es FALSO'},
		{fid:70,ftext:'Que el humo de una vela haya ennegrecido el barniz es FALSO'},
		{fid:71,ftext:'Que la pintura se haya sometido a calor continuado es FALSO'},
		{fid:72,ftext:'Que se haya quemado el cuadro es FALSO'},
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
		////////////////////////////////////////////////// BLOQUE MENU //////////////////////////////////////////////
		{rid:0,cond: 'q(0) == "Elaborar hipótesis"',
		iftrue:'ask(1)',
		iffalse:''},
		{rid:1,cond: 'q(0) == "Comprobar hipótesis"',
		iftrue:'ask(2)',
		iffalse:''},
		////////////////////////////////////////////////// BLOQUE FALLOS ////////////////////////////////////////////
		{rid:2,cond: 'q(1) == "El cuadro tiene un tono anormal"',
		iftrue:'final(1);set(12);set(13);set(20);set(21);set(22);set(24);',
		iffalse:''},
		{rid:3,cond: 'q(1) == "La pintura destiñe"',
		iftrue:'final(2);set(3);',
		iffalse:''},
		{rid:4,cond: 'q(1) == "La pintura está craquelada"',
		iftrue:'final(4);set(5);set(6);set(7);set(9);',
		iffalse:''},
		{rid:5,cond: 'q(1) == "La pintura está caída"',
		iftrue:'final(2);set(3);set(4);set(5);set(6);set(7);set(8);set(24);',
		iffalse:''},
		{rid:6,cond: 'q(1) == "La pintura se disgrega"',
		iftrue:'final(6);',
		iffalse:''},
		{rid:7,cond: 'q(1) == "Hay elementos indeseables en la pintura"',
		iftrue:'final(9);set(11);set(23);',
		iffalse:''},
		{rid:8,cond: 'q(1) == "La pintura está curvada o alabeada"',
		iftrue:'final(10);',
		iffalse:''},
		{rid:9,cond: 'q(1) == "El color del soporte ha cambiado"',
		iftrue:'final(12);set(13);set(14);set(15);set(16);set(18);',
		iffalse:''},
		{rid:10,cond: 'q(1) == "El estado del soporte ha cambiado"',
		iftrue:'final(15);set(17);set(19);',
		iffalse:''},
		////////////////////////////////////////////////// BLOQUE HIPOTESIS /////////////////////////////////////////
		////////////////////////////////////////////////// HIPOTESIS 1 //////////////////////////////////////////////
		{rid:11,cond: 'q(2) == "Se ha barnizado el temple"',
		iftrue:'ask(3);',
		iffalse:''},
		{rid:12,cond: 'q(3) == "Tono translúcido" | q(3) == "Tono amarillento"',
		iftrue:'final(25);',
		iffalse:'final(49);'},
		////////////////////////////////////////////////// HIPOTESIS 2 //////////////////////////////////////////////
		{rid:13,cond: 'q(2) == "No se han mezclado los colores bien con el agua al usar un colorante"',
		iftrue:'ask(4);',
		iffalse:''},
		{rid:14,cond: 'q(4) == "Mano manchada de rojo cadmio medio" | q(4) == "Mano manchada de amarillo cadmio" | q(4) == "Mano manchada de azul esmalte"',
		iftrue:'final(26);',
		iffalse:'final(50);'},
		////////////////////////////////////////////////// HIPOTESIS 3 //////////////////////////////////////////////
		{rid:15,cond: 'q(2) == "Hay poco aglutinante en la mezcla"',
		iftrue:'ask(5);',
		iffalse:''},
		{rid:16,cond: 'q(5) == "Mano manchada de otro color" | q(5) == "Mano manchada con varios colores"',
		iftrue:'final(27);',
		iffalse:'final(51);'},
		////////////////////////////////////////////////// HIPOTESIS 4 //////////////////////////////////////////////
		{rid:17,cond: 'q(2) == "Hay un exceso de aglutinante"',
		iftrue:'ask(6);',
		iffalse:''},
		{rid:19,cond: 'q(6) == "Si"',
		iftrue:'final(28);',
		iffalse:'final(52);'},
		////////////////////////////////////////////////// HIPOTESIS 5 //////////////////////////////////////////////
		{rid:20,cond: 'q(2) == "La pintura esté empastada"',
		iftrue:'ask(7);',
		iffalse:''},
		{rid:21,cond: 'q(7) == "Zona con grueso de pintura craquelada" | q(7) == "Zona con grueso de pintura craquelada y con laguna faltante"',
		iftrue:'final(29);',
		iffalse:'final(53);'},
		////////////////////////////////////////////////// HIPOTESIS 6 //////////////////////////////////////////////
		{rid:22,cond: 'q(2) == "Falta aglutinante en la capa de preparación"',
		iftrue:'ask(8);',
		iffalse:''},
		{rid:23,cond: 'q(8) == "Se lija fácilmente"',
		iftrue:'final(30);',
		iffalse:'final(54);'},
		////////////////////////////////////////////////// HIPOTESIS 7 //////////////////////////////////////////////
		{rid:24,cond: 'q(2) == "Sobra aglutinante en la capa de preparación"',
		iftrue:'ask(9);',
		iffalse:''},
		{rid:25,cond: 'q(9) == "Se lija con dificultad"',
		iftrue:'final(31);',
		iffalse:'final(55);'},
		////////////////////////////////////////////////// HIPOTESIS 8 //////////////////////////////////////////////
		{rid:26,cond: 'q(2) == "Se han usado los nudos y la médula del árbol como soporte"',
		iftrue:'ask(10);',
		iffalse:''},
		{rid:27,cond: 'q(10) == "Se lija con dificultad"',
		iftrue:'final(32);',
		iffalse:'final(56);'},
		/*
'Se han oxidado de elementos metálicos del soporte'
'Se han usado refuerzos para impedir el movimiento'
'Hongos atacado la pintura'
'Algún mamífero hay defecado en la pintura'
'Algún ave hay defecado en la pintura'
'Los hongos han atacado el soporte'
'Los hongos xilófagos han atacado el soporte'
'El soporte ha sido afectado por pudrición parda'
'El soporte ha sido afectado por pudrición blanda'
'El soporte ha sido afectado por pudrición blanca'
'El soporte ha sido afectado por insectos'
'El barniz se ha oxidado'
'Se ha depositado polvo encima del barniz'
'El humo de una vela ha ennegrecido el barniz'
'La pintura se ha sometido a calor continuado'
'Se ha quemado el cuadro'
		*/
	],
};
