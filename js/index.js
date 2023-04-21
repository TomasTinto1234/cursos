
/****************************************************************************************************************************************************
  VALIDACION DE DATOS DE ENTRADA
  En nuestra página web existen 3 Formularios: 1)Datos personales, 2)Datos del negocio y 3)Formulario de Confirmación de envío de datos (ReadOnly).
/****************************************************************************************************************************************************/

$(document).ready(function() {

    // Se declara la clase Formulario{} con alcance Global a todo el script con el fin de alojar todos los datos que el usuario carga 
    // en los Formularios UNA VEZ QUE SE CONFIRMAN LOS DATOS PARA EL ENVIO.
    // ---- Recordemos: Las Clases son objetos que nos sirven, entre otras cosas, para transportar datos de un lugar a otro. En nuestro 
    //                  caso la usaremos para guardar todos los datos de los Formularios y hacer la simulación de un SUBMIT (envío de datos) por ej. al back-end
    class Formulario {
        nombre;
        apellido;
        email;
        ciudad;
        provincia;
        git;
        proyecto;
        nacimiento;
        favorito;
        nofavorito;
    }

    //Se crea la Instancia de la clase Formulario{} 
    // ---- Recordemos: una instancia de clase es una representación concreta de un objeto o clase donde se asignan valores específicos. 
    //para realizar una instancia de clase, usamos la palabra reservada  * new * seguido del nombre de la clase.
    var f = new Formulario();



    // *******   Función autoinvocada: Cuando se carga la página web se ejecutan esta función.
    (() => {
        'use strict'


        //obtiene los formularios 1) y 2) 
        var bloque1 = $('#primerVista'); //tantos bloques como Formularios haya
        var bloque2 = $('#segundaVista');



        // obtenemos los Formularios que tienen aplicada la clase needs-validation: en nuestro caso Formulario 1) y Formulario 2)
        const forms = $('.needs-validation')

        // Creamos un Array de Formularios con  Array.from(forms). En nuestro caso el Array contiene los 2 Formularios mencionados arriba. El forEach itera con un Loop cada uno de ellos
        // con el fin de agregar una esucha de evento. De esta manera los formularios quedan a la espera del SUBMIT (envio de datos) --> form.addEventListener('submit')
        // Cuando se produce el submit (el usuario toca el boton de envio), se ejecuta el códio que está dentro del form.addEventListener('submit') entre las llaves {}
        // y comienza la validacion de los datos propiamente dicha
        Array.from(forms).forEach(form => {
            form.addEventListener('submit', event => {

                //comienza la validación de los datos (si no puede validar datos no avanza al siguiente Formulario)
                if (form.checkValidity() == false) { // hubo error en la entra de datos, no pasó la validacion

                    event.stopPropagation(); //evita enviar el Formulario (submit)
                    event.preventDefault(); //evita enviar el Formulario (submit)
                    form.classList.add('was-validated'); //clase que cambia el color de los inputs a verde y/o rojo según corresponda. Esto lo maneja Bootstrap automáticamente.

                } else { // no existe error en los datos de entrada del formulario

                    form.classList.add('was-validated'); //clase que cambia el color de los inputs a verde

                    event.stopPropagation();
                    event.preventDefault();




                    // segun cual se el Formulario que itera el loop del forEach(), realiza una acción u otra.
                    switch (form.id) {
                        case "primerVista":
                            bloque1.addClass('d-none'); //ocultamos la vista del Formulario 1
                            bloque2.removeClass('d-none'); //mostramos la vista siguiente del Formulario 2
                            break;
                        case "segundaVista":
                            //Inicializa la instancia de clase Formulario{} con los valores que ingreso el usuario en ambos Formularios
                            LlenarClaseFormulario();
                            break;
                            case "formContacto":
                                //muestro mensaje de Envío de mail 
                                break;
                    }

                }

            }, false)
        })




    })()
    // ************  Fin de la Función autoinvocada *****




    // ----------------------------------------------------------------------------------------------------

    ///************  Funciones de Apoyo   *******
    function LlenarClaseFormulario() {

        // dada la instancia de la clase Formulario creada globalmente, inicialzamos la instancia con los valores que el usuario ingresó en los Formularios
        // La idea es que esta clase Formulario nos sirva como contenedor de nuestros datos para hacer el SUBMIT posteriormente y emvar los datos (por ej al back-end)

        f.nombre = $('#nombre').val();
        f.apellido = $('#apellido').val();
        f.email = $('#email').val();
        f.ciudad = $('#ciudad').val();
        f.provincia = $('#provincia').val();
        f.nacimiento = $('#nacimiento').val();
        f.favorito = $("#favorito option:selected").val();
        f.nofavorito = $("#nofavorito option:selected").val();
        f.git = $('#git').val();
        f.proyecto = $('#proyecto').val();




        // muestra por pantalla los datos cargados anteriormente, dando al usuario la posibilidad de verificarlos y si está todo bien realizar la confirmación y envío.
        $('#nombreConfirmar').val(f.nombre);
        $('#apellidoConfirmar').val(f.apellido);
        $('#ciudadConfirmar').val(f.ciudad);
        $('#provinciaConfirmar').val(f.provincia);
        $('#emailConfirmar').val(f.email);
        $('#nacimientoConfirmar').val(f.nacimiento);
        $('#favoritoConfirmar').val(f.favorito);
        $('#noFavoritoConfirmar').val(f.nofavorito);
        $('#gitConfirmar').val('@' + f.git);
        $('#proyectoConfirmar').val(f.proyecto);

        $('#segundaVista').addClass('d-none'); //ocultamos la vista 2
        $('#confirmar').removeClass('d-none'); //mostramos la vista de confirmación


    }




    ///************  Funciones   *******

    $("#btnSegundaVistaAtras").click(function() {
        $('#primerVista').removeClass('d-none'); //mostramos la vista anterior
        $('#segundaVista').addClass('d-none'); //ocultamos la vista actual
    });


    $("#btnVolverConfirma").click(function() {
        $('#primerVista').removeClass('d-none'); //mostramos la vista anterior
        $('#confirmar').addClass('d-none'); //ocultamos la vista actual
    });



    $("#btnConfirmarDatos").click(function() {
        $('#contenedorJson').removeClass('d-none');


        // envio de datos.   ----> muestra los datos cargados en la instancia Formulario
        // f es la instancia de la case Formulario{} de alcance global
        $('#json').html(JSON.stringify(f, null, 4));
    });




    ///************ Fin de: Funciones   *******


});

