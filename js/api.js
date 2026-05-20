  
 //variables que se van a ir rellenando segun se saquen datos de los json
 let estacionesBicis = {};
 let traficoZonas = {};
 let ciudadesVisitadas=[]; //almacena las ciudades que se han visitado surante la visita a la web

 //BICICLETAS
 // DATOS DE CADA CIUDAD
const ciudades = {
    "Madrid": {
        location: [40.4168, -3.7038], // Coordenadas para aplicar el zoom en el mapa
        networkId: "bicimad" // Nombre de ID en la API para cargar las estaciones
    },
    "Barcelona": {
        location: [41.3874, 2.1686],
        networkId: "bicing"
    },
    "Valencia": {
        location: [39.4699, -0.3763],
        networkId: "valenbisi"
    },
    "Sevilla": {
        location: [37.3891, -5.9845],
        networkId: "sevici"
    },
    "León": {
        location: [42.5982636,-5.5661249],
        networkId:"alsa-nextbike-leon"
    }
};


function cargarEstaciones(ciudadSeleccionada){
    const url = `https://api.citybik.es/v2/networks/`;

    return $.getJSON(url + ciudades[ciudadSeleccionada].networkId) // Petición de JQuery AJAX
    .done(function(data,textStatus, jqXHR){
        procesarEstaciones(data, ciudadSeleccionada);

    }).fail(function(jqXHR, textStatus, erroThrown){
        alert(`Error al cargar las Bicicletas`);
    });
}

// Ordena los datos de las estaciones para despues usarlas bien en el modal y en el mapa
function procesarEstaciones(data, ciudadSeleccionada){
    const estaciones = data.network.stations;
    estacionesBicis[ciudadSeleccionada] = estaciones.map(estacion => ({
        nombre: estacion.name,
        coords: [estacion.latitude, estacion.longitude],
        bicis: estacion.free_bikes,
        espacios: estacion.empty_slots
    }));
}

function postCiudadesServidor(ciudadSeleccionada){
    let city = { //city es un array de las ciudades
        name: ciudadSeleccionada,
        location: ciudades[ciudadSeleccionada].location,
        networkId: ciudades[ciudadSeleccionada].networkId
    };
    let urlJson = `datos/ciudades`; //poner la ruta donde queremos que se guarde y el nombre del fichero sin el .json q lo pone el server
    ciudadesVisitadas.push(city); //metodo push es para añadir un elemento a un array

    //creamos el parametro para ajax
    const parametroAjax={
        url: urlJson,
        method: 'POST',
        data: JSON.stringify(ciudadesVisitadas),
        contentType: 'application/json; charset=uft-8',
        dataType: 'json'
    }

    //post al servidor
    $.ajax(parametroAjax)
        .done(function(){
            console.log("Se han enviado las ciudades al servidor");
        })
        .fail(function (jqXHR, textStatus, errorThrown) {
            console.error('Error al enviar los datos de la ciudad');
            console.error(textStatus, errorThrown);
    });
}

//DATOS DEL TRÁFICO
function cargarTrafico(zona){
    const url= "datos/trafico.json"; //const valores fijos a lo largo de una funcion 

    return $.getJSON(url)
    .done( function(data, textStatus, jqXHR){
        const trafico = data[zona];

        traficoZonas[zona] = trafico.map(fila =>({ //recorro cada fila y estraigo los datos del json
            id: fila.id,
            calle: fila.calle,
            incidencias: fila.incidencias,
            estado: fila.estado,
        }))
    }).fail(function(jqXHR, textStatus, erroThrown){
        alert(`Error al cargar el Tráfico`);
    });
}