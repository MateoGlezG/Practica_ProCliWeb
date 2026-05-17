  
 //variables que se van a ir rellenando segun se saquen datos de los json
 let estacionesBicis = {};
 let traficoZonas = {};

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