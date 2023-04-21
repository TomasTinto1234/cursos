$(document).ready(function(){
    $.ajax({
      url: "https://api.openweathermap.org/data/2.5/weather?q=CABA&appid=9907da3a3df67eebeb31254d4d2115b4&units=metric",
      type: "GET",
      dataType: "jsonp",
      success: function(data){
        console.log(data);
        var weatherIcon = "http://openweathermap.org/img/w/" + data.weather[0].icon + ".png";
        var weatherTemp = Math.round(data.main.temp) + "°C";
        var weatherDesc = data.weather[0].description;
        $('#weather-image').html('<img src="' + weatherIcon + '">');
        $('#weather-temperature').html(weatherTemp);
        $('#weather-description').html(weatherDesc);
      }
    });
  });
  


document.addEventListener("DOMContentLoaded", () => {
    // Escuchamos el click del botón
    const $boton = document.querySelector("#btnCrearPdf");
    $boton.addEventListener("click", () => {
       

        // <-- Aquí puedes elegir cualquier elemento del DOM para Exportar a PDF  -->
        //const $elementoParaConvertir = document.body; 
        
        //  <-- Descomentar la linea siguiente y probar exportar solamente la tabla -->
         const $elementoParaConvertir = document.querySelector('#confirmar');
        
        
        
        html2pdf()
            .set({
                margin: 1,
                filename: 'registro.pdf',
                image: {
                    type: 'png',
                    quality: 0.98
                },
                html2canvas: {
                    scale: 3, // A mayor escala, mejores gráficos, pero más peso
                    letterRendering: true,
                    scrollY: 0
                },
                jsPDF: {
                    unit: "in",
                    format: "a3", //formato de hoja
                    orientation: 'portrait' // landscape o portrait (disposicion vertical u orizontal)
                }
            })
            .from($elementoParaConvertir)
            .save()
            .catch(err => console.log(err));
    });
});