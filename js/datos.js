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
        { nombre: "Puerta del Sol", coords: [40.4167, -3.7033], bicis: 12, espacios: 8 },
        { nombre: "Atocha", coords: [40.4067, -3.6887], bicis: 5, espacios: 15 },
        { nombre: "Puerta del Sol", coords: [40.4167, -3.7033], bicis: 12, espacios: 8 },
        { nombre: "Atocha", coords: [40.4067, -3.6887], bicis: 5, espacios: 15 }
        ],
    "Barcelona": [
        { nombre: "Plaza Cataluña", coords: [41.3870, 2.1700], bicis: 8, espacios: 12 },
        { nombre: "Sagrada Familia", coords: [41.4036, 2.1744], bicis: 3, espacios: 17 }
    ],
        "Valencia": [
        { nombre: "Ciudad de las Artes", coords: [39.4533, -0.3524], bicis: 20, espacios: 10 },
        { nombre: "Mercado Central", coords: [39.4736, -0.3790], bicis: 4, espacios: 16 },
        { nombre: "Torres de Serranos", coords: [39.4791, -0.3761], bicis: 7, espacios: 13 },
        { nombre: "Estación del Norte", coords: [39.4666, -0.3774], bicis: 11, espacios: 9 },
        { nombre: "Playa de la Malvarrosa", coords: [39.4800, -0.3260], bicis: 18, espacios: 2 }
    ],
        "Sevilla": [
        { nombre: "Plaza de España", coords: [37.3771, -5.9869], bicis: 14, espacios: 6 },
        { nombre: "Torre del Oro", coords: [37.3824, -5.9964], bicis: 6, espacios: 14 },
        { nombre: "Catedral de Sevilla", coords: [37.3862, -5.9926], bicis: 2, espacios: 18 },
    ]
    };

//Zonas de trafico
const traficoZonas = {
    "Centro":[
        {id:1, calle:"Calle Mayor",incidencias:1 ,estado:"Activo"},
        {id:2, calle:"Gran Vía",incidencias:0 ,estado:"Inactivo"},
        {id:3, calle:"Avenida Reina",incidencias:2 ,estado:"Activo"},
        {id:4, calle:"Paseo del Prado",incidencias:1 ,estado:"Activo"},
        {id:5, calle:"Calle Serrano",incidencias:0 ,estado:"Inactivo"},
        {id:6, calle:"Calle Alcalá",incidencias:0 ,estado:"Inactivo"},
        {id:7, calle:"Bravo Murillo",incidencias:1 ,estado:"Activo"},
        {id:8, calle:"Calle Velazquez",incidencias:1 ,estado:"Activo"},
        {id:9, calle:"Ronda de Valencia",incidencias:0 ,estado:"Inactivo"},
        {id:10, calle:"Plaza España",incidencias:1 ,estado:"Activo"},
    ],
    "Norte":[
        {id:1, calle:"Paseo de la Castellana", incidencias:2, estado:"Activo"},
        {id:2, calle:"Plaza de Castilla", incidencias:1, estado:"Activo"},
        {id:3, calle:"Avenida de Burgos", incidencias:0, estado:"Inactivo"},
        {id:4, calle:"Calle Mateo Inurria", incidencias:1, estado:"Activo"},
        {id:5, calle:"Calle Agustín de Foxá", incidencias:0, estado:"Inactivo"},
        {id:6, calle:"Avenida de Asturias", incidencias:2, estado:"Activo"},
        {id:7, calle:"Calle Costa Rica", incidencias:1, estado:"Activo"},
        {id:8, calle:"Concha Espina", incidencias:0, estado:"Inactivo"},
        {id:9, calle:"Calle Alberto Alcocer", incidencias:1, estado:"Activo"},
        {id:10, calle:"Calle López de Hoyos", incidencias:0, estado:"Inactivo"},
    ],
    "Sur":[
        {id:1, calle:"Avenida de Córdoba", incidencias:1, estado:"Activo"},
        {id:2, calle:"Calle Méndez Álvaro", incidencias:2, estado:"Activo"},
        {id:3, calle:"Paseo de las Delicias", incidencias:1, estado:"Activo"},
        {id:4, calle:"Avenida de la Albufera", incidencias:0, estado:"Inactivo"},
        {id:5, calle:"Calle Embajadores", incidencias:1, estado:"Activo"},
        {id:6, calle:"Calle Doctor Esquerdo", incidencias:0, estado:"Inactivo"},
        {id:7, calle:"Avenida de Andalucía", incidencias:2, estado:"Activo"},
        {id:8, calle:"Calle Antonio López", incidencias:1, estado:"Activo"},
        {id:9, calle:"Paseo de Santa María de la Cabeza", incidencias:0, estado:"Inactivo"},
        {id:10, calle:"Calle Marcelo Usera", incidencias:1, estado:"Activo"},
    ],
    "Este":[
        {id:1, calle:"Calle Alcalá", incidencias:1, estado:"Activo"},
        {id:2, calle:"Avenida de América", incidencias:2, estado:"Activo"},
        {id:3, calle:"Calle Arturo Soria", incidencias:1, estado:"Activo"},
        {id:4, calle:"Calle Hermanos García Noblejas", incidencias:0, estado:"Inactivo"},
        {id:5, calle:"Avenida de Canillejas a Vicálvaro", incidencias:1, estado:"Activo"},
        {id:6, calle:"Calle O'Donnell", incidencias:0, estado:"Inactivo"},
        {id:7, calle:"Avenida de Daroca", incidencias:2, estado:"Activo"},
        {id:8, calle:"Calle Alcalá Norte", incidencias:1, estado:"Activo"},
        {id:9, calle:"Avenida de Guadalajara", incidencias:0, estado:"Inactivo"},
        {id:10, calle:"Calle José del Hierro", incidencias:1, estado:"Activo"},
    ],
    "Oeste":[
        {id:1, calle:"Paseo de Extremadura", incidencias:1, estado:"Activo"},
        {id:2, calle:"Avenida de Valladolid", incidencias:0, estado:"Inactivo"},
        {id:3, calle:"Calle Princesa", incidencias:1, estado:"Activo"},
        {id:4, calle:"Paseo Moret", incidencias:0, estado:"Inactivo"},
        {id:5, calle:"Avenida de la Victoria", incidencias:2, estado:"Activo"},
        {id:6, calle:"Calle Ferraz", incidencias:1, estado:"Activo"},
        {id:7, calle:"Paseo de Pintor Rosales", incidencias:0, estado:"Inactivo"},
        {id:8, calle:"Calle Isaac Peral", incidencias:1, estado:"Activo"},
        {id:9, calle:"Avenida de Portugal", incidencias:2, estado:"Activo"},
        {id:10, calle:"Carretera de Castilla", incidencias:0, estado:"Inactivo"},
    ]
};