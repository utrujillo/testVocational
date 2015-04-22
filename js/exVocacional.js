/**
 * [Slider de examen vocacional para alumnos de la UAA]
 * Alumno Zuriel Pineda
 * Asesoria Ing. uziel Trujillo Colón
 * Repositorio de github - https://github.com/utrujillo/testVocational
 * Version .001
 */
(function( $ ){
  
  /**
   * [methods Metodos generales a los que se puede acceder dentro del plugin]
   */
  var methods = {

      /**
       * [init metodo que se ejecuta para inicializar la aplicación]
       * @param  {[object]} o [Contiene el objeto para acceder a cualquier variable que este dentro de settings]
       */
      init: function( o ){
        // Mostramos el bloque
        methods.mostrarBloque( o );
        // Verificamos en que bloque estamos para saber que accion tomar
        methods.verificaBloque( o );
      },
      /**
       * [mostrarPregunta Metodo utilizado para mostrar las preguntas]
       * @param  {[object]} o [Contiene el objeto para acceder a cualquier variable que este dentro de settings]
       */
      mostrarPregunta: function( o ){
        // Animamos la caja que contiene la pregunta para que se desplace a la posicion 0
        o.cajaPregunta.animate( {left: 0}, 1500);
        // Mostramos la pregunta dentro de la caja
        var block = 'bloque'+ o.bloque;
        o.cajaPregunta.html( o.preguntas[ block ][ o.pos ] );

      },
      /**
       * [mostrarRespuestas Metodo utilizado para mostrar las respuestas]
       * @param  {[object]} o [Contiene el objeto para acceder a cualquier variable que este dentro de settings]
       */
      mostrarRespuestas: function(o){
        // Animamos la caja que contiene las respuestas, para que se desplacen a la posicion 0
        o.cajaRespuestas.animate( {right: 0}, 1500 );
        // Mostramos Respuestas dinamicamente
        for (var i = o.respuestas.length - 1; i >= 0; i--) {
           $( '.resp'+ i ).html( o.respuestas[i] );
          
        };
      },
      /**
       * [cambiarPregunta Cambia la pregunta]
       * @param  {[type]} o [Contiene el objeto para acceder a cualquier variable que este dentro de settings]
       */
      cambiarPregunta : function( o ){
        // Incrementamos la posicion para mostrar la nueva pregunta
        o.pos++;
        // Restauramos las cajas a sus posiciones originales
        methods.restaurarCajas( o );
        // Ejecutamos el metodo que muestra la pregunta
        methods.mostrarPregunta( o );
        // Ejecutamos el metodo que muestra las respuestas
        methods.mostrarRespuestas( o );
      },
      /**
       * [restaurarCajas Esta funcion sirve para restaurar las cajas contenedoras de las preguntas y respuestas a sus posiciones originales]
       * @param  {[object]} o [Contiene el objeto para acceder a cualquier variable que este dentro de settings]
       */
      restaurarCajas : function( o ){
        o.cajaPregunta.css('left', '-1500px');
        o.cajaRespuestas.css('right', '-1500px');
      },
      /**
       * [ocultarBloque Metodo utilizado para ocultar un bloque]
       * @param  {[object]} o [Contiene el objeto para acceder a cualquier variable que este dentro de settings]
       */
      ocultarBloque: function(o){
        $("#bloque" + o.bloque).css( 'display', 'none' );
      },
      /**
       * [mostrarBloque Metodo utilizado para mostrar un bloque]
       * @param  {[object]} o [Contiene el objeto para acceder a cualquier variable que este dentro de settings]
       */
      mostrarBloque: function(o){
        $("#bloque" + o.bloque).css( 'display', 'block' );
      },
      /**
       * [verificaBloque Metodo que sirve para saber que accion se debe de tomar]
       * Actualmente se tienen 3 tipos de sets, click, drag&drop y multiples preguntas
       * Click y Drag&drop funcionan de la misma manera, van mostrando una pregunta y sus respuestas
       * pero multiples preguntas, funciona diferente, se deben de mostrar muchas preguntas y respuestas a la vez
       * este metodo nos permite identificar que proceso seguir, uno a uno o muchos a muchos
       * @param  {[object]} o [Contiene el objeto para acceder a cualquier variable que este dentro de settings]
       */
      verificaBloque: function( o ){
        // Si estamos en un bloque multiplo de 3
        // Entonces creamos las preguntas y respuestas dinamicamente
        if( ( o.bloque % 3 ) == 0 )
        {
        // Animamos la caja que contiene las respuestas, para que se desplacen a la posicion 0
        o.cajaRespuestas.animate( {right: 0}, 1500 );
          methods.creaPreguntasRespuestas( o );
        }
        // Si no estamos en un bloque multiplo de 3
        // entonces creamos las preguntas y respuestas de una por una
        else
        {
          // Mostramos la siguiente pregunta
          methods.mostrarPregunta( o );
          // Mostramos las respuestas
          methods.mostrarRespuestas( o );
        }
      },
      /**
       * [siguienteBloque Metodo ejecutado para pasar al siguiente bloque]
       * @param  {[object]} o [Contiene el objeto para acceder a cualquier variable que este dentro de settings]
       */
      siguienteBloque: function( o ){
        console.log('Tus datos registrados hasta ahorita');
        console.log( o.result );
        if( o.bloque != _.size( o.preguntas ) ){
          // Ocultamos el bloque(set)
          methods.ocultarBloque( o );
          // Incrementamos la variable que nos indica en que bloque(set) estamos
          // esto lo hacemos porque vamos a cambiar de bloque y queremos que se muestre el siguiente
          o.bloque += 1;
          // Reiniciamos la variable pos, para que en el siguiente bloque(set)
          // las preguntas empiezen a mostrarse desde la primera posicion
          o.pos = 0;
          // Mostramos el nuevo bloque
          methods.mostrarBloque( o );
          // Restauramos las cajas
          methods.restaurarCajas( o );
          // Verificamos en que bloque estamos, para saber que accion tomar
          methods.verificaBloque( o );
        }
        else
        {
          alert("Hemos terminado el proceso");
        }
      },
      /**
       * [creaPreguntasRespuestas Metodo utilizado en el bloque tipo 3, que generara preguntas y respuestas dinamicamente]
       * dependiendo de los elementos que existan en el array
       * @param  {[object]} o [Contiene el objeto para acceder a cualquier variable que este dentro de settings]
       */
      creaPreguntasRespuestas: function( o ){
        var block = "bloque"+ o.bloque,
        toInsert  = '';

        // Creamos las pregunas
        $.each( o.preguntas[ block ], function(index, val) {
          toInsert += '<tr>'
            toInsert += '<td>'+ val +'<td>';
            toInsert += '<td>';
              toInsert += '<select>'
                toInsert += '<option value="5">- Seleccionar -</option>';
                // Creamos las respuestas
                for (var i = o.respuestas.length - 1; i >= 0; i--) {
                  toInsert += '<option value="'+ i +'">'+ o.respuestas[i] +'</option>';
                };
              toInsert += '</select>';
            toInsert += '</td>';
          toInsert += '</tr>';
        });

        // Insertamos el elemento generado dentro de nuestro objeto
        o.pr.html( toInsert );
      }
  };//methods

  /**
   * [core Nombre de nuestro plugin]
   * @param  {[function]} options [Obtiene las variables que se puede pasar por parametro o que estaran utilizables dentro de nuestro plugin]
   */
  $.exVocacional = function( options ){

    /**
     * [settings variables que pueden ser accesadas dentro de nuestro plugin]
     * @type {Object}
     */
    var settings = {
      //Esta variable sirve para hacer debug e indicar al plugin a partir de que bloque deeseamos iniciarokok
      bloque: 1, 
      cajaPregunta: $('.cajaPregunta'),
      cajaRespuestas: $('.cajaRespuestas'),
      pr: $('.preguntasRespuestas'),
      pos: 0,
      preguntas: {
        bloque1: ["1. Atender y cuidar a enfermos.", "2.  Intervenir activamente en discusiones de clase.", "3. Escribir cuentos, crónicas o artículos.", "4. Dibujar y pintar.", "5. Cantar en un orfeón estudiantil.",
                  "6.  Llevar en orden tus libros y cuadernos.","7. Conocer y estudiar la estructura de las plantas y animales.","8.  Resolver mecanizaciones numéricas.","9. Armar o desarmar objetos mecánicos.","10. Salir de excursión."],
        bloque2: ["11.  Proteger a los muchachos  menores del grupo.", "12. Ser jefe de una sociedad.", "13.  Leer obras literarias.", "14. Moldear el barro, plastilina o cualquier otro material.", "15.  Escuchar música clásica.",
                  "16.  Ordenar y clasificar los libros de una biblioteca.","17.  Hacer experimentos en un laboratorio.","18. Resolver problemas de aritmética.","19. Manejar herramienta y maquinaria.","20. Pertenecer a un club de exploradores."],
        bloque3: ["21.  Ser miembro de una sociedad de ayuda y asistencia.", "22. Dirigir la campaña política de un candidato estudiantil. ", "23.  Hacer versos para una publicación.", "24. Encargarse del decorado de un lugar para un festival.", "25.  Aprender a tocar un instrumento musical.",
                  "26.  Aprender a escribir en maquina y taquigrafía.","27. Investigar el origen de las costumbre de los pueblos.","28. Llevar las cuentas de una institución.","29.  Construir objetos y muebles.","30.  Trabajar al aire libre fuera de la ciudad."],
        bloque4: ["31.  Enseñar a leer a los analfabetos.", "32.  Hacer propaganda para la difusión de una idea.", "33. Representar un papel en una obra teatral.", "34.  Idear o diseñar el escudo de un club o sociedad.", "35. Ser miembro de una sociedad musical.",
                  "36.  Ayudar a calificar pruebas.","37. Estudiar y entender las causas de los movimientos sociales.","38. Explicar a otros como resolver problemas de matemáticas.","39.  Reparar las instalaciones eléctricas;  de gas o de plomería en su casa.","40. Sembrar y planta en una granja durante las vacaciones."],
        bloque5: ["41.  Ayudar a los compañeros  en sus dificultades y preocupaciones.", "42.  Leer biografías de políticos eminentes.", "43. Participar en un concurso de oratoria.", "44. Diseñar el vestuario para una función teatral.", "45. Leer biografías de músicos eminentes.",
                  "46.  Encargarse del archivo y de los documentos de una sociedad.","47. Leer revistas y libros científicas.","48. Participar en concursos de matemáticas.","49. Proyectar y dirigir alguna constricción.","50.  Atender animales en un rancho durante las vaciones."],
        bloque6: ["51.  Funcionario al servicio de las clases humildes.", "52.  Experto en relaciones sociales de una gran empresa.", "53.  Escritor de un periódico o empresa editorial.", "54.  Dibujante profesional de una empresa.", "55.  Concertista de una sinfónica.",
                  "56.  Técnico organizador de oficinas.","57.  Investigar en un laboratorio.","58. Experto calculista en una institución.","59.  Perito mecánico en un gran taller.","60.  Técnico cuyas actividades se desempeñen fuera de la ciudad."],
      },
      respuestas: [ 'Me desagrada mucho', 'Me desagrada poco', 'Me es indiferente', 'Me gusta algo', 'Me gusta mucho' ],
      result:[],
    }//settings
    
    var o = $.extend( settings, options );

    //======================================
    //      Flujo del Slider
    //======================================
    methods.init( o );

    $("#myModal").modal('show');
    /**
     *  Programando el set 1
     *  Este set va a permitir seleccionar la respuesta utilizando el evento click
     */
    $(".resp").click(function()
    {
      var block = "bloque"+ o.bloque,
      respuesta = $(this).data('item');
      
      // Almacenamos la respuesta seleccionada
      o.result.push( respuesta );
      
      // Si la posicion inicial es menor al tamaño maximo de mi array de preguntas
      // Esto significa que por lo menos debo de tener una pregunta para ejecutar el cambio de pregunta
      // ej o.pos = 0 && o.preguntas[ block ].lenght = 5
      // tendriamos 0 < 5 eso significa que tengo que cambiar de pregunta
      if( o.pos < o.preguntas[ block ].length - 1 )
      {
        // En caso de que mi posicion no sea igual al tamaño maximo de mi array de preguntas
        // lo que tengo qeu hacer es cambiar de preegunta hasta llegar al final
        methods.cambiarPregunta(o);
      }
      // Si la posicion inicial es igual o mayor que el tamaño maximo de mi array de preguntas
      // ej o.pos = 5 && o.preguntas[ block ].lenght = 5
      // tendriamos que 5 < 5 eso significa que hemos llegado al final de mi array
      // Por lo tanto tengo que cambiar de bloque(set)
      else
      {
        methods.siguienteBloque( o );
        $("#myModal2").modal('show');
      }
    });

    /**
     *  Programando el set 2
     *  Este set va a permitir hacer drag a la respuesta, hacia el objeto droppable creado
     */
    $(".dragResp" ).draggable({ revert: true });
    // es en el segundo en realidad, pero probemos
    $( ".objetoDroppable" ).droppable(
      {
        drop: function( event, ui ) 
        {
          var block = "bloque"+ o.bloque,
          respuesta = ui.draggable.data('item');
          
          // Almacenamos la respuesta seleccionada
          o.result.push( respuesta );

          // Si la posicion inicial es menor al tamaño maximo de mi array de preguntas
          // Esto significa que por lo menos debo de tener una pregunta para ejecutar el cambio de pregunta
          // ej o.pos = 0 && o.preguntas[ block ].lenght = 5
          // tendriamos 0 < 5 eso significa que tengo que cambiar de pregunta
          if( o.pos < o.preguntas[block].length - 1 )
          {
            // En caso de que mi posicion no sea igual al tamaño maximo de mi array de preguntas
            // lo que tengo qeu hacer es cambiar de preegunta hasta llegar al final
            methods.cambiarPregunta(o);     
          }
          // Si la posicion inicial es igual o mayor que el tamaño maximo de mi array de preguntas
          // ej o.pos = 5 && o.preguntas[ block ].lenght = 5
          // tendriamos que 5 < 5 eso significa que hemos llegado al final de mi array
          // Por lo tanto tengo que cambiar de bloque(set)
          else
          {
            methods.siguienteBloque( o );
            $("#myModal3").modal('show');
          }
        }
      });

    /**
     *  Programando el set 3
     *  Este set va a permitir mostrar N preguntas con sus respectivas respuestas
     *  para que el usuario las pueda seleccionar
     */
    $('.btnSiguiente').click(function()
    { 
      // Arreglo que contendra las respuestas del usauario temporalmente
      // este arreglo es creado porque no sabemos si el usuario puede pasar a la siguiente etapa
      // En caso de no poder seguir a la siguiente etapa, estara en esta parte 
      // hasta que seleccione elementos validos
      var respuestasTmp = [];
      
      // Obtenemos todas las respuestas que hay actualmente en nuestro select
      $('#bloque'+ o.bloque +' select').each(function() 
      {
        respuestasTmp.push( parseInt( $(this).val() ) );
      });
      
      // Verifico si dentro de mi arreglo existe por lo menos un 5
      var vacio = $.inArray ( 5 , respuestasTmp );
      
      // Si el arreglo retorna -1 quiere decir que el elemento buscado no fue encontrado
      // y como el 5 es -Seleccionar- quiere decir que el usuario selecciono por lo menos una opcion
      // de las 5 posibles
      if (vacio == -1)
      {
        // Ya que el usuario ha seleccionado por lo menos una opcion
        // agrego el arreglo temporal a mi verdadero arreglo de respuestas
        o.result = $.merge( o.result, respuestasTmp );
        methods.siguienteBloque( o );
        $("#myModal").modal('show');
      }
      // Si el usuario tiene por lo menos una respuesta no seleccionada
      // entonces no podra avanzar a la siguiente etapa
      else  
      {
        alert("Elementos vacios");
      };


    });

  }//fin exVocacional function

})(jQuery);