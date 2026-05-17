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
        // CARGA LAS LOCALIDADES EN EL MENU SELECT
        getLocalidades();
        capaMarcadores.clearLayers();
        cargarEstaciones("Madrid").done(function() { // Por defecto cargamos las estaciones de Madrid al hacer click en Bicicletas y las pintamos
            pintarMarcadores("Madrid");
        });
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
    const mapa = L.map('mapa-leaflet').setView(ciudades["Madrid"].location, 13);
    L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
        maxZoom: 19,
        attribution: '&copy; OpenStreetMap contributors',
        dragging: !L.Browser.mobile,
        tap: !L.Browser.mobile
    }).addTo(mapa);

    // CAPA DE MARCADORES
    let capaMarcadores = L.layerGroup().addTo(mapa);
    $("#menuBicicletas select").change(function() {
        const ciudadSeleccionada = $(this).val();
        const nuevaCiudad = ciudades[ciudadSeleccionada];
        if (nuevaCiudad) {
            mapa.setView(nuevaCiudad.location, 13); // 13 es el nivel de zoom
            capaMarcadores.clearLayers(); // Limpiamos los marcadores anteriores
            cargarEstaciones(ciudadSeleccionada).done(function() {
                pintarMarcadores(ciudadSeleccionada);
            });
        }
        });

        // Funcion para pintar marcadores
        function pintarMarcadores(ciudadSeleccionada) {
            if(estacionesBicis[ciudadSeleccionada]) { // Si existe en json estacionesBicis
                estacionesBicis[ciudadSeleccionada].forEach(estacion => {
                    const marcador = L.marker(estacion.coords, {
                        icon: L.divIcon({
                            className: 'marcador-bici-' + getColor(estacion.bicis), 
                            iconSize: [20, 20],
                            iconAnchor: [10, 10]
                        })
                    }).addTo(capaMarcadores); // Usa la variable local sin problemas

                    marcador.on('click', function() { // Modal al hacer click
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

        // Funcion para cargar las localidades definidas en api.js
        function getLocalidades() { 
            const localidades = Object.keys(ciudades);
            const select = $("#menuBicicletas select");
            select.empty();
            localidades.forEach(localidad => {
                select.append(`<option value="${localidad}">${localidad}</option>`);
            });
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
                let claseIncidencia = pintaAtascos(datoFila); //pinto la fila si lleva atascos
                
                let nuevaFila = `
                <tr>
                    <td class="${claseIncidencia}"> ${datoFila.id} </td>
                    <td class="${claseIncidencia}">${datoFila.calle}</td>
                    <td class="${claseIncidencia}">${datoFila.incidencias}</td>
                    <td class="${claseIncidencia}">${datoFila.estado}</td>
               </tr>`;
               
               tabla.append(nuevaFila); //mete la fila al final de lo que haya antes
            });
        }

        function pintaAtascos(fila){
            let claseIncidencia;
            //si hay atasco pongo las clases definidas en css para ello
            if(fila.incidencias > 0){
                claseIncidencia = "atasco";
            }
            else{
                claseIncidencia = "sin-atasco";
            }
            return claseIncidencia;
        }
});
