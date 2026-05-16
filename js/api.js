//la api usa la red de las bicis para identificar las estaciones 
const ciudadesConfig = {
    "Madrid": {
        location: [40.4168, -3.7038],
        networkId: "BiciMAD"
    },
    "Barcelona": {
        location: [41.3874, 2.1686],
        networkId: "Bicing"
    },
    "Valencia": {
        location: [39.4699, -0.3763],
        networkId: "Valenbisi"
    },
    "Sevilla": {
        location: [37.3891, -5.9845],
        networkId: "Sevibi"
    }
};

function cargarEstaciones(ciudadSeleccionada){
    const url = `https://api.citybik.es/v2/`;

    $.getJson(url+ciudadesConfig[ciudadSeleccionada].networkId)
    .done(function(data,textStatus, jqXHR){
        let estaciones = data;

    }).fail(function(jqXHR, textStatus, erroThrown){
        alert(`Error al carhar las Bicicletas`);
    });
}