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

        rellenaTabla("Centro"); //relleno la tabla en centro predefinido
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
        //const marcador = L.marker(estacion.coords).addTo(capaMarcadores); // Añadimos el marcador a la capa
        const marcador = L.marker(estacion.coords, {
            icon: L.divIcon({
                className: 'marcador-bici-' + getColor(estacion.bicis), // Clase de CSS dependiendo de la cantidad de bicis disponibles
                iconSize: [20, 20],
                iconAnchor: [10, 10]
            })
        }).addTo(capaMarcadores);
        marcador.on('click', function() {
            $("#modalTitulo").text(estacion.nombre);
            let contenido = `<strong>Ciudad:</strong> ${"Madrid"}<br>`;
            contenido += `<strong>Bicicletas disponibles:</strong> ${estacion.bicis}<br>`;
            contenido += `<strong>Espacios disponibles:</strong> ${estacion.espacios}`;
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
                    const marcador = L.marker(estacion.coords, {
                        icon: L.divIcon({
                            className: 'marcador-bici-' + getColor(estacion.bicis), // Clase de CSS dependiendo de la cantidad de bicis disponibles
                            iconSize: [20, 20],
                            iconAnchor: [10, 10]
                        })
                    }).addTo(capaMarcadores);
                    marcador.on('click', function() {
                        $("#modalTitulo").text(estacion.nombre);
                        let contenido = `<strong>Ciudad:</strong> ${ciudadSeleccionada}<br>`;
                        contenido += `<strong>Bicicletas disponibles:</strong> ${estacion.bicis}<br>`;
                        contenido += `<strong>Espacios disponibles:</strong> ${estacion.espacios}`;
                        $("#modalCuerpo").html(contenido);
                        const modal = new bootstrap.Modal(document.getElementById('modalEstacion'));
                        modal.show();
                    });
                });
            }
        }
        });

        // Devuelve el color que tendrá el marcador en función de las bicis disponibles
        function getColor(disponibles){
            let color = "verde";
            if(disponibles <= 10 && disponibles > 5){
                color = "naranja";
            } else if(disponibles <= 5){ 
                color = "rojo";
            }
            return color;
        }

        //funcion para el tabla Trafico
        $("#menuTrafico select").change(function(){
            let zona = $(this).val();
            rellenaTabla(zona);
        });

        function rellenaTabla(zona){
            let datosTrafico = traficoZonas[zona];
            let tabla = $("#cuerpoTabla");

            tabla.empty(); //vacio la tabla antes de pintarla

            datosTrafico.forEach(function(datoFila){ //cada elemento que coge el foreach de datos trafico se lo pasa como datoFila que sera una fila a poner en la tabla
                let nuevaFila = `
                <tr>
                    <td> ${datoFila.id} </td>
                    <td>${datoFila.calle}</td>
                    <td>${datoFila.incidencias}</td>
                    <td>${datoFila.estado}</td>
               </tr>`;
               
               tabla.append(nuevaFila); //mete la fila al final de lo que haya antes
            });
        }
});