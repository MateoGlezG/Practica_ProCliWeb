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
    $(document).ready(function () {
        const mapa = L.map('mapa-leaflet').setView([41.3874, 2.1686], 13);

        L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
            maxZoom: 19,
        attribution: '&copy; OpenStreetMap contributors',
            dragging: !L.Browser.mobile,
            tap: !L.Browser.mobile
        }).addTo(mapa);
    });

});