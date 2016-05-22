/**
 * [Slider de examen vocacional para alumnos de la UAA]
 * Alumno Zuriel Pineda
 * Asesoria Ing. uziel Trujillo Colón
 * Repositorio de github - https://github.com/utrujillo/testVocational
 * Version .003
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
          if (o.bloque <= 6)
          {
            $( '.resp'+ i ).html( o.respuestas[i] );
          }
          else
          {
            $( '.resp'+ i ).html( o.respuestasApt[i] );
          }
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
                if (o.bloque <= 6)
                {
                  for (var i = o.respuestas.length - 1; i >= 0; i--) {
                    toInsert += '<option value="'+ i +'">'+ o.respuestas[i] +'</option>';
                  };
                }else{
                  for (var i = o.respuestasApt.length - 1; i >= 0; i--) {
                    toInsert += '<option value="'+ i +'">'+ o.respuestasApt[i] +'</option>';
                  };
                }
              toInsert += '</select>';
            toInsert += '</td>';
          toInsert += '</tr>';
        });

        // Insertamos el elemento generado dentro de nuestro objeto
        o.pr.html( toInsert );
      },
      /**
       * sumaArray Suma los valores de un array pasado por parametro
       * @return {[Integer] Entero con la sumatoria del array}
       */
      sumaArray: function(array){
        var suma = 0;

        $(array).each(function(index, valor){
          suma += valor;
        });
        return suma;
      },
      /**
       * showModal Muestra la ventana modal de las instrucciones
       * @param  {[o]} Variables generales del proyecto
       * @return {[null]} No retorna nada
       */
      showModal: function( o ){

        o.inst++;
        var instruccion = "instruccion"+ o.inst;
        // Asignamos el titulo del modal
        if (o.inst <= 6) {
          $('.md-content h3').html( "Bloque "+ o.inst +" - intereses" );
        }else{
          $('.md-content h3').html( "Bloque "+ o.inst +" - aptitudes" );
        }
        // Asignamos el cuerpo(mensaje) del modal
        $('.md-content p').html( o.textoModal[ instruccion ] );
        // Mostramos el modal
        $('.instructions').addClass('md-show');

      },
      /**
       * showModalAlert Muestra la ventana modal que se utlizara para alertas, ya sean mensajes de error, mensajes de exito o cualquier otro mensaje que no sea instruccion
       * @param  {[o]} Variables generales del proyecto
       * @param  {[String]} nombre del indice de nuestro array asociativo en donde se encontrara la alerta
       * @return {[none]} No retorna valores
       */
      showModalAlert: function( o, msgAlert ){

        $('.md-content h3').html( "Bloque "+ o.bloque );
        $('.md-content p').html( o.modalAlerts[ msgAlert ] );
        $('.modalAlerts').addClass('md-show');

        // Solo se activa la bandera de errores si es que los vamos a mostrar el mensaje de error
        if( msgAlert == 'msgError' )
          o.getErrors = true;

      },

      CalculateResults: function(o){

          $(o.result).each(function(index, valor) {
            var indice = parseInt(index + 1);

            switch (indice){
              // Respuestas de Intereses
              case 1: case 11: case 21: case 31: case 41: case 51:{
                o.ServicioSocial.push(valor);
              } break;
              case 2: case 12: case 22: case 32: case 42: case 52:{
                o.EjecutivoPersuasivo.push( valor );
              } break;
              case 3: case 13: case 23: case 33: case 43: case 53:{
                o.Verbal.push( valor );
              } break;
              case 4: case 14: case 24: case 34: case 44: case 54:{
                o.ArtesPlasticas.push( valor );
              } break;
              case 5: case 15: case 25: case 35: case 45: case 55:{
                o.Musical.push( valor );
              } break;
              case 6: case 16: case 26: case 36: case 46: case 56:{
                o.OrganizacionYOficina.push( valor );
              } break;
              case 7: case 17: case 27: case 37: case 47: case 57:{
                o.Cientifico.push( valor );
              } break;
              case 8: case 18: case 28: case 38: case 48: case 58:{
                o.CalculoNumerico.push( valor );
              } break;
              case 9: case 19: case 29: case 39: case 49: case 59:{
                o.Mecanico.push( valor );
              } break;
              case 10: case 20: case 30: case 40: case 50: case 60:{
                o.AireLibre.push( valor );
              } break;
              // Respuestas de Aptitudes
              case 61: case 71: case 81: case 91: case 101: case 111:{
                o.ServicioSocialApt.push(valor);
              } break;
              case 62: case 72: case 82: case 92: case 102: case 112:{
                o.EjecutivoPersuasivoApt.push(valor);
              } break;
              case 63: case 73: case 83: case 93: case 103: case 113:{
                o.VerbalApt.push(valor);
              } break;
              case 64: case 74: case 84: case 94: case 104: case 114:{
                o.ArtesPlasticasApt.push(valor);
              } break;
              case 65: case 75: case 85: case 95: case 105: case 115:{
                o.MusicalApt.push(valor);
              } break;
              case 66: case 76: case 86: case 96: case 106: case 116:{
                o.OrganizacionYOficinaApt.push(valor);
              } break;
              case 67: case 77: case 87: case 97: case 107: case 117:{
                o.CientificoApt.push(valor);
              } break;
              case 68: case 78: case 88: case 98: case 108: case 118:{
                o.CalculoNumericoApt.push(valor);
              } break;
              case 69: case 79: case 89: case 99: case 109: case 119:{
                o.MecanicoApt.push(valor);
              } break;
              case 70: case 80: case 90: case 100: case 110: case 20:{
                o.AireLibreApt.push(valor);
              } break;
            }
          });

      },
      showGraphic: function(o){

         var polarData = [
            {
              value: Math.round(methods.sumaArray( o.ServicioSocial )*100/24),
              color:"#F7464A",
              highlight: "#FF5A5E",
              label: "Servicio Social"
            },
            {
              value: Math.round(methods.sumaArray(o.EjecutivoPersuasivo)*100/24),
              color: "#46BFBD",
              highlight: "#5AD3D1",
              label: "Ejecutivo Persuasivo"
            },
            {
              value: Math.round(methods.sumaArray(o.Verbal)*100/24),
              color: "#FDB45C",
              highlight: "#FFC870",
              label: "Verbal"
            },
            {
              value: Math.round(methods.sumaArray(o.ArtesPlasticas)*100/24),
              color: "#949FB1",
              highlight: "#A8B3C5",
              label: "Artes Plasticas"
            },
            {
              value: Math.round(methods.sumaArray(o.Musical)*100/24),
              color: "#4D5360",
              highlight: "#616774",
              label: "Musical"
            },
            {
              value: Math.round(methods.sumaArray( o.OrganizacionYOficina )*100/24),
              color:"#11D721",
              highlight: "#5EDD73",
              label: "Organización Y Oficina"
            },
            {
              value: Math.round(methods.sumaArray(o.Cientifico)*100/24),
              color: "#F2EF31",
              highlight: "#E0DA22",
              label: "Científico"
            },
            {
              value: Math.round(methods.sumaArray(o.CalculoNumerico)*100/24),
              color: "#B6620E",
              highlight: "#C1884F",
              label: "Cálculo Númerico"
            },
            {
              value: Math.round(methods.sumaArray(o.Mecanico)*100/24),
              color: "#5638EB",
              highlight: "#6B66C5",
              label: "Mecánico"
            },
            {
              value: Math.round(methods.sumaArray(o.AireLibre)*100/24),
              color: "#C102F1",
              highlight: "#A63CB8",
              label: "Aire Libre"
            }

          ];

        var polarDataApt = [
            {
              value: Math.round(methods.sumaArray( o.ServicioSocialApt )*100/24),
              color:"#F7464A",
              highlight: "#FF5A5E",
              label: "Servicio Social"
            },
            {
              value: Math.round(methods.sumaArray(o.EjecutivoPersuasivoApt)*100/24),
              color: "#46BFBD",
              highlight: "#5AD3D1",
              label: "Ejecutivo Persuasivo"
            },
            {
              value: Math.round(methods.sumaArray(o.VerbalApt)*100/24),
              color: "#FDB45C",
              highlight: "#FFC870",
              label: "Verbal"
            },
            {
              value: Math.round(methods.sumaArray(o.ArtesPlasticasApt)*100/24),
              color: "#949FB1",
              highlight: "#A8B3C5",
              label: "Artes Plasticas"
            },
            {
              value: Math.round(methods.sumaArray(o.MusicalApt)*100/24),
              color: "#4D5360",
              highlight: "#616774",
              label: "Musical"
            },
            {
              value: Math.round(methods.sumaArray( o.OrganizacionYOficinaApt )*100/24),
              color:"#11D721",
              highlight: "#5EDD73",
              label: "Organización Y Oficina"
            },
            {
              value: Math.round(methods.sumaArray(o.CientificoApt)*100/24),
              color: "#F2EF31",
              highlight: "#E0DA22",
              label: "Científico"
            },
            {
              value: Math.round(methods.sumaArray(o.CalculoNumericoApt)*100/24),
              color: "#B6620E",
              highlight: "#C1884F",
              label: "Cálculo Númerico"
            },
            {
              value: Math.round(methods.sumaArray(o.MecanicoApt)*100/24),
              color: "#5638EB",
              highlight: "#6B66C5",
              label: "Mecánico"
            },
            {
              value: Math.round(methods.sumaArray(o.AireLibreApt)*100/24),
              color: "#C102F1",
              highlight: "#A63CB8",
              label: "Aire Libre"
            }

          ];

            var ctx = document.getElementById("chart-area").getContext("2d");
            window.myPolarArea = new Chart(ctx).PolarArea(polarData, {
              responsive:false
            });

            var ctxApt = document.getElementById("apt-area").getContext("2d");
            window.myPolarAreaApt = new Chart(ctxApt).PolarArea(polarDataApt, {
              responsive:false
            });

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
      minDelay: 500,
      midDelay: 1000,
      maxDelay: 1500,
      preguntas: {
        // Cuestionario Intereses
        bloque1: ["1. Atender y cuidar a enfermos.", "2.  Intervenir activamente en discusiones de clase.", "3. Escribir cuentos, crónicas o artículos.", "4. Dibujar y pintar.", "5. Cantar en un coro estudiantil.",
                  "6.  Llevar en orden tus libros y cuadernos.","7. Conocer y estudiar la estructura de las plantas y animales.","8.  Resolver mecanizaciones numéricas.","9. Armar o desarmar objetos mecánicos.","10. Salir de excursión."],
        bloque2: ["11.  Proteger a los muchachos  menores del grupo.", "12. Ser jefe de una sociedad.", "13.  Leer obras literarias.", "14. Moldear el barro, plastilina o cualquier otro material.", "15.  Escuchar música clásica.",
                  "16.  Ordenar y clasificar los libros de una biblioteca.","17.  Hacer experimentos en un laboratorio.","18. Resolver problemas de aritmética.","19. Manejar herramienta y maquinaria.","20. Pertenecer a un club de exploradores."],
        bloque3: ["21.  Ser miembro de una sociedad de ayuda y asistencia.", "22. Dirigir la campaña política de un candidato estudiantil. ", "23.  Hacer versos para una publicación.", "24. Encargarse del decorado de un lugar para un festival.", "25.  Aprender a tocar un instrumento musical.",
                  "26.  Aprender a escribir en maquina y taquigrafía.","27. Investigar el origen de las costumbre de los pueblos.","28. Llevar las cuentas de una institución.","29.  Construir objetos y muebles.","30.  Trabajar al aire libre fuera de la ciudad."],
        bloque4: ["31.  Enseñar a leer a los analfabetos.", "32.  Hacer propaganda para la difusión de una idea.", "33. Representar un papel en una obra teatral.", "34.  Idear o diseñar el escudo de un club o sociedad.", "35. Ser miembro de una sociedad musical.",
                  "36.  Ayudar a calificar pruebas.","37. Estudiar y entender las causas de los movimientos sociales.","38. Explicar a otros como resolver problemas de matemáticas.","39.  Reparar las instalaciones eléctricas;  de gas o de plomería en su casa.","40. Sembrar y plantar en una granja durante las vacaciones."],
        bloque5: ["41.  Ayudar a los compañeros  en sus dificultades y preocupaciones.", "42.  Leer biografías de políticos eminentes.", "43. Participar en un concurso de oratoria.", "44. Diseñar el vestuario para una función teatral.", "45. Leer biografías de músicos eminentes.",
                  "46.  Encargarse del archivo y de los documentos de una sociedad.","47. Leer revistas y libros científicos.","48. Participar en concursos de matemáticas.","49. Proyectar y dirigir alguna constricción.","50.  Atender animales en un rancho durante las vaciones."],
        bloque6: ["51.  Funcionario al servicio de las clases humildes.", "52.  Experto en relaciones sociales de una gran empresa.", "53.  Escritor de un periódico o empresa editorial.", "54.  Dibujante profesional de una empresa.", "55.  Concertista de una sinfónica.",
                  "56.  Técnico organizador de oficinas.","57.  Investigar en un laboratorio.","58. Experto calculista en una institución.","59.  Perito mecánico en un gran taller.","60.  Técnico cuyas actividades se desempeñen fuera de la ciudad."],

        // Cuestionario Aptitudes
        bloque7: ["1. Tratar y hablar con tacto a las personas.", "2. Ser jefe competente de un grupo, equipo o sociedad.", "3. Expresarte con facilidad en clase o al participar con tus amigos.", "4. Dibujar casas, objetos, figuras humanas, etc.", "5. Cantar en un orfeón o grupo coral.",
                  "6. Llevar en forma correcta y ordenada.","7. Entender principios y experimentos de Biología.","8. Ejecutar con rapidez y exactitud mecanizaciones aritméticas.","9. Armar y componer objetos mecánicos como chapas, timbres, etc.","10. Actividades que requieren destreza manual."],
        bloque8: ["11. Ser miembro activo y útil en un club o sociedad.", "12. Organizar y dirigir festivales, encuentros deportivos, excursiones o campañas sociales.", "13. Redactar composiciones o artículos periodísticos.", "14. Pintar paisajes.", "15. Aprender a tocar un instrumento musical.",
                  "16. Ordenar y clasificar debidamente documentos de una oficina.", "17. Entender principios y experimentos de Física.", "18. Resolver Problemas de Aritmética.", "19. Desarmar, armar y componer objetos complicados.", "20. Manejar con habilidad herramientas de carpintería."],
        bloque9: ["21. Colaborar con otros para el bien de la comunidad.", "22. Convencer a otros para que hagan lo que tú crees que deben de hacer.", "23. Componer versos serios o jocosos.", "24. Decorar artísticamente un salón, corredor, escenario o patio para un festival.", "25. Distinguir cuando alguien desentona en las canciones o piezas musicales.",
                  "26. Contestar y redactar correctamente oficios y cartas.", "27. Entender principios y experimentos de Química.", "28. Resolver rompecabezas numéricos.", "29. Resolver rompecabezas de alambre o de madera.", "30. Manejar con facilidad herramientas mecánicas como pinzas."],
        bloque10: ["31. Saber escuchar a otros con paciencia y comprender su punto de vista.", "32. Dar órdenes a otros con seguridad y naturalidad.", "33. Escribir cuentos, narraciones o historietas.", "34. Modelar con barro, plastilina o grabar madera.", "35. Aprender a entonar correctamente las canciones de moda.",
                  "36. Anotar y manejar con exactitud y rapidez nombres, números y otros datos.", "37. Entender principios y hechos e conómicos y sociales.", "38. Resolver problemas de algebra.", "39. Armar y componer muebles.", "40. Manejar con habilidad pequeñas piezas y herramientas como agujas, manecillas, joyas, piezas de relojería, etc."],
        bloque11: ["41. Conversar en las reuniones y fiestas con acierto y naturalidad.", "42. Dirigir un grupo o equipo en situaciones difíciles o peligrosas.", "43. Saber distinguir y apreciar la buena literatura.", "44. Saber distinguir y apreciar la buena pintura.", "45. Saber distinguir y apreciar la buena música.",
                  "46. Encargarse de recibir, anotar y dar recados sin olvidar detalles.", "47. Entender las causas que determinan los acontecimientos históricos.", "48. Resolver problemas de Geografía.", "49. Aprender el funcionamiento de ciertos mecanismos complicados como motores, relojes, bombas, etc.", "50. Hacer con facilidad trazos geométricos con la ayuda de la regla T y el compás."],
        bloque12: ["51. Actuar con “desinterés” y condolencia.", "52. Corregir a los demás sin ofenderlos.", "53. Exponer juicios públicamente sin preocupaciones de la crítica.", "54. Colaborar en la elaboración de un libro sobre el arte en la arquitectura.", "55. Dirigir un conjunto musical.",
                  "56. Colaborar con el desarrollo de métodos más eficientes de trabajo.", "57. Realizar investigaciones científicas teniendo como finalidad la búsqueda de la verdad.", "58. Enseñar a resolver problemas de matemáticas.", "59. Inducir a la gente a obtener resultados prácticos.", "60. Participar en un concurso de modalismo, de coches, aviones, barcos, etc."],


        // bloque1: ["1. Atender y cuidar a enfermos."],
        // bloque2: ["11.  Proteger a los muchachos  menores del grupo."],
        // bloque3: ["21.  Ser miembro de una sociedad de ayuda y asistencia."],
        // bloque4: ["31.  Enseñar a leer a los analfabetos."],
        // bloque5: ["41.  Ayudar a los compañeros  en sus dificultades y preocupaciones."],
        // bloque6: ["51.  Funcionario al servicio de las clases humildes."],
        // bloque7: ["61. Atender y cuidar a enfermos."],
        // bloque8: ["71.  Proteger a los muchachos  menores del grupo."],
        // bloque9: ["81.  Ser miembro de una sociedad de ayuda y asistencia."],
        // bloque10: ["91.  Enseñar a leer a los analfabetos."],
        // bloque11: ["101.  Ayudar a los compañeros  en sus dificultades y preocupaciones."],
        // bloque12: ["111.  Funcionario al servicio de las clases humildes."],
      },
      inst: 0,
      getErrors: false,
      textoModal: {
        instruccion1: "<p class='text-center'>Cuestionario de evaluación de <u>intereses</u></p><p class='text-center'>Intrucciones</p>Lea cuidadosamente la pregunta y seleccione la respuesta que consideres apropiada.",
        instruccion2: "Lea cuidadosamente la pregunta y arrastre la respuesta que consideres apropiada al recuadro que esta en la parte inferior.",
        instruccion3: "Lea cuidadosamente las preguntas y seleccione la respuesta que consideres apropiada.",

        instruccion4: "Lea cuidadosamente la pregunta y seleccione la respuesta que consideres apropiada.",
        instruccion5: "Lea cuidadosamente la pregunta y arrastre la respuesta que consideres apropiada al recuadro que esta en la parte inferior.",
        instruccion6: "Lea cuidadosamente las preguntas y seleccione la respuesta que consideres apropiada.",
        instruccion7: "<p class='text-center'>Cuestionario de evaluación de <u>aptitudes</u></p><p class='text-center'>Instrucciones</p>Lea cuidadosamente la pregunta y seleccione la respuesta que consideres apropiada.",
        instruccion8: "Lea cuidadosamente la pregunta y arrastre la respuesta que consideres apropiada al recuadro que esta en la parte inferior.",
        instruccion9: "Lea cuidadosamente las preguntas y seleccione la respuesta que consideres apropiada.",

        instruccion10: "Lea cuidadosamente la pregunta y seleccione la respuesta que consideres apropiada.",
        instruccion11: "Lea cuidadosamente la pregunta y arrastre la respuesta que consideres apropiada al recuadro que esta en la parte inferior.",
        instruccion12: "Lea cuidadosamente las preguntas y seleccione la respuesta que consideres apropiada.",
      },
      modalAlerts: {
        msgError: "<b>¡Cuidado!</b><br />Tiene por lo menos una pregunta por contestar, por favor verifique que tenga todo contestado para poder continuar.",
        msgFinish: "<b>¡Excelente!</b><br /> Ha concluido con el test, a continuación se presentarán los resultados, presione el boton <b>Cerrar</b> para visualizarlos.",
      },
      respuestas: [ 'Me desagrada mucho', 'Me desagrada poco', 'Me es indiferente', 'Me gusta algo', 'Me gusta mucho' ],
      respuestasApt: [ 'Te consideras incompetente', 'Te consideras muy poco competente', 'Te consideras medianamente competente', 'Te consideras competente', 'Te consideras muy competente' ],
      result:[],
      // Almacena resultado de intereses
      ServicioSocial:[],
      EjecutivoPersuasivo:[],
      Verbal:[],
      ArtesPlasticas:[],
      Musical:[],
      OrganizacionYOficina:[],
      Cientifico:[],
      CalculoNumerico:[],
      Mecanico:[],
      AireLibre:[],
      // Almacena resultado de aptitudes
      ServicioSocialApt:[],
      EjecutivoPersuasivoApt:[],
      VerbalApt:[],
      ArtesPlasticasApt:[],
      MusicalApt:[],
      OrganizacionYOficinaApt:[],
      CientificoApt:[],
      CalculoNumericoApt:[],
      MecanicoApt:[],
      AireLibreApt:[],
    }//settings

    var o = $.extend( settings, options );

    //======================================
    //      Flujo del Slider
    //======================================
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
        // Mostramos la ventana modal
        methods.showModal( o );
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
            methods.showModal( o );
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
        o.getErrors = false;
        o.result = $.merge( o.result, respuestasTmp );

        // Verificamos que no sea el ultimo bloque
        if( o.bloque != _.size( o.preguntas ) )
        {
          methods.showModal( o );
        }
        // En caso de ser el ultimo bloque, mostramos la ventana final
        else
        {
          methods.showModalAlert( o, 'msgFinish' );
        }

      }
      // Si el usuario tiene por lo menos una respuesta no seleccionada
      // entonces no podra avanzar a la siguiente etapa
      else
      {
         methods.showModalAlert( o, 'msgError' );
      };

    });

    // Boton para avanzar el slider de manera manual
    $('.siguienteSlide').click(function(){
      o.slider._navigate('next');
    });

    /**
    * Funcionamiendo de ventana modal
    */
    $('.iniciarTest').click(function(){
      methods.showModal( o );
    });

    $('.md-cerrarFormAlert').click(function(){
       $(this).parents().eq(2).removeClass("md-show");
    });

    $('.md-close').click(function(){

      // Limpiando valores de ventana modal
      $('.md-content h3').html( "" );
      $('.md-content p').html( "" );

      // Oculto la ventana modal
      $(this).parents().eq(2).removeClass("md-show");

      // Si es el primer bloque, inicio la actividad
      if( o.inst == 1  && !o.getErrors )
      {
        o.slider._navigate('next');
        setTimeout(function(){ methods.init( o ); }, o.minDelay);
      }
      // Si no es el primero, entonces avanzo al siguiente bloque
      // Verificamos que no exista un error guardado, esto es por el bloque 3
      else if( ( o.bloque != _.size( o.preguntas ) ) && !o.getErrors )
      {
        console.log(o.bloque+" "+_.size( o.preguntas )+" "+o.getErrors);
        o.slider._navigate('next');
        methods.siguienteBloque( o );

      }
      // Si es el ultimo bloque y no hay errores
      // Es hora de terminar el test
      else if( ( o.bloque == _.size( o.preguntas ) ) && !o.getErrors)
      {
        o.slider._navigate('next');
        methods.CalculateResults(o);
        setTimeout(function(){ methods.showGraphic( o ); }, o.midDelay);
      }

    });

    // Formulario
    $(".submit").click(function(event)
    {

      event.preventDefault();
      // var Form = $("#commentForm").serializeArray();
      var validador = true;

      $("#commentForm input").removeClass('inputError');
      $("#commentForm input").next('span').remove();

      $("#commentForm input").each(function(){
        $this = $(this);

        if($this.val().length > 0)
        {
          validador = validador && true;
        }
        else
        {
          validador = validador && false;
          $this.addClass('inputError');
          $this.after('<span class="glyphicon glyphicon-remove"></span>');
          $('.modalForm').addClass('md-show');
        }
      });

      if (validador)
      {
        o.slider._navigate('next');
      }
    });

    //Modals De conceptos
    $('.modalCon1').click(function(){
      $('.modalConcepto1').addClass('md-show');
    });

     $('.modalCon2').click(function(){
      $('.modalConcepto2').addClass('md-show');
    });

    $('.modalCon3').click(function(){
      $('.modalConcepto3').addClass('md-show');
    });

    $('.modalCon4').click(function(){
      $('.modalConcepto4').addClass('md-show');
    });

    $('.modalCon5').click(function(){
      $('.modalConcepto5').addClass('md-show');
    });

     $('.modalCon6').click(function(){
      $('.modalConcepto6').addClass('md-show');
    });

    $('.modalCon7').click(function(){
      $('.modalConcepto7').addClass('md-show');
    });

    $('.modalCon8').click(function(){
      $('.modalConcepto8').addClass('md-show');
    });

     $('.modalCon9').click(function(){
      $('.modalConcepto9').addClass('md-show');
    });

     $('.modalCon10').click(function(){
      $('.modalConcepto10').addClass('md-show');
    });

  }//fin exVocacional function

})(jQuery);
