  
 let estacionesBicis = {};
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

    return $.getJSON(url + ciudades[ciudadSeleccionada].networkId)
    .done(function(data,textStatus, jqXHR){
        procesarEstaciones(data, ciudadSeleccionada);

    }).fail(function(jqXHR, textStatus, erroThrown){
        alert(`Error al cargar las Bicicletas`);
    });
}

function procesarEstaciones(data, ciudadSeleccionada){
    const estaciones = data.network.stations;
    estacionesBicis[ciudadSeleccionada] = estaciones.map(estacion => ({
        nombre: estacion.name,
        coords: [estacion.latitude, estacion.longitude],
        bicis: estacion.free_bikes,
        espacios: estacion.empty_slots
    }));
}