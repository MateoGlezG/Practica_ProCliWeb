 $(document).ready( function(){ //espera a q s cargue completamente 

    // BOTÓN BICICLETAS
    $("#btnBicis").click(function (e) {
    e.preventDefault();
    // MOSTRAR SIDEBAR
    $("#barraLateral").removeClass("d-none");
    // OCULTAR TODO
     $("main").removeClass("inicio");//quito el estilo
    $("#menuBicicletas").addClass("d-none");
    $("#menuTrafico").addClass("d-none");
    $("#panelInicio").addClass("d-none");
    $("#panelBicicletas").addClass("d-none");
    $("#panelTrafico").addClass("d-none");
    // MOSTRAR BICICLETAS
    $("#menuBicicletas").removeClass("d-none");
    $("#panelBicicletas").removeClass("d-none");
    // RECALCULAR EL TAMAÑO DEL MAPA, PARA EVITAR PROBLEMAS DE RENDERIZADO
    setTimeout(function () {
            mapa.invalidateSize();
        }, 10);
    });
    // BOTÓN TRÁFICO
    $("#btnTrafico").click(function (e) {
        e.preventDefault();
        // MOSTRAR SIDEBAR
        $("#barraLateral").removeClass("d-none");
        // OCULTAR TODO
        $("main").removeClass("inicio");//quito el estilo
        $("#menuBicicletas").addClass("d-none");
        $("#menuTrafico").addClass("d-none");
        $("#panelInicio").addClass("d-none");
        $("#panelBicicletas").addClass("d-none");
        $("#panelTrafico").addClass("d-none");
        // MOSTRAR TRÁFICO
        $("#menuTrafico").removeClass("d-none");
        $("#panelTrafico").removeClass("d-none");
    });
    //BOTON LOGO
    $("#btnLogo").click(function(e){
        e.preventDefault();

        $("#barraLateral").addClass("d-none");
        $("#panelBicicletas").addClass("d-none");
        $("#panelTrafico").addClass("d-none");
        $("#menuBicicletas").addClass("d-none");
        $("#menuTrafico").addClass("d-none");

        $("main").addClass("inicio");
        $("#panelInicio").removeClass("d-none");
    })



    //MAPA
    // COORDENADAS DE CADA CIUDAD
    const coordenadasCiudades = {
        "Madrid": [40.4168, -3.7038],
        "Barcelona": [41.3874, 2.1686],
        "Valencia": [39.4699, -0.3763],
        "Sevilla": [37.3891, -5.9845]
    };
    // Estaciones de ejemplo
    const estacionesBicis = {
        "Madrid": [
            { nombre: "Puerta del Sol", coords: [40.4167, -3.7033], bicis: 12 },
            { nombre: "Atocha", coords: [40.4067, -3.6887], bicis: 5 }
        ],
        "Barcelona": [
            { nombre: "Plaza Cataluña", coords: [41.3870, 2.1700], bicis: 8 },
            { nombre: "Sagrada Familia", coords: [41.4036, 2.1744], bicis: 3 }
        ]
    };
    // YA NO ESTÁ DENTRO DE DOCUMENT READY, PARA PODER SER LLAMADO EN EL BOTON DE BICICLETAS Y RECALCULAR SU TAMAÑo
    const mapa = L.map('mapa-leaflet').setView(coordenadasCiudades["Madrid"], 13);
    L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
        maxZoom: 19,
    attribution: '&copy; OpenStreetMap contributors',
        dragging: !L.Browser.mobile,
        tap: !L.Browser.mobile
    }).addTo(mapa);
    // CAPA DE MARCADORES
    let capaMarcadores = L.layerGroup().addTo(mapa);
    // POR DEFECTO CARGAMOS MADRID
    estacionesBicis["Madrid"].forEach(estacion => {
        const marcador = L.marker(estacion.coords).addTo(capaMarcadores); // Añadimos el marcador a la capa
        marcador.on('click', function() {
            $("#modalTitulo").text(estacion.nombre);
            let contenido = `<strong>Ciudad:</strong> ${"Madrid"}<br>`;
            contenido += `<strong>Bicicletas disponibles:</strong> ${estacion.bicis}`;
            $("#modalCuerpo").html(contenido);
            
            const modal = new bootstrap.Modal(document.getElementById('modalEstacion'));
            modal.show();
        });
    });
    $("#menuBicicletas select").change(function() {
        const ciudadSeleccionada = $(this).val();
        const nuevaCiudad = coordenadasCiudades[ciudadSeleccionada];
        if (nuevaCiudad) {
            mapa.setView(nuevaCiudad, 13); // 13 es el nivel de zoom
            capaMarcadores.clearLayers(); // Limpiamos los marcadores anteriores
            if(estacionesBicis[ciudadSeleccionada]) {
                estacionesBicis[ciudadSeleccionada].forEach(estacion => {
                    const marcador = L.marker(estacion.coords).addTo(capaMarcadores); // Añadimos el marcador a la capa
                    marcador.on('click', function() {
                        $("#modalTitulo").text(estacion.nombre);
                        let contenido = `<strong>Ciudad:</strong> ${ciudadSeleccionada}<br>`;
                        contenido += `<strong>Bicicletas disponibles:</strong> ${estacion.bicis}`;
                        $("#modalCuerpo").html(contenido);
                        const modal = new bootstrap.Modal(document.getElementById('modalEstacion'));
                        modal.show();
                    });
                });
            }
        }
        });


});