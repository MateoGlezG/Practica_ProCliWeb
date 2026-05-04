# Practica_ProCliWeb
Trabajo para la asignatura de Programaciín Cliente Web Ligero de la UPM, el trabajo es de la temática de movilidad
# Movilidad
El grupo de trabajo que elija este caso de uso deberá considerar los siguientes requisitos:
• Cuando el usuario ha elegido visualizar información del servicio de alquiler de bicis:
o Se podrá seleccionar en el menú vertical, mediante un formulario, el nombre de
la ciudad cuya información se desea visualizar.
o En el resto de la pantalla aparece un mapa de la ciudad en cuestión y
marcadores con la localización de los puntos de recogida/entrega de bicis.
 El zoom del mapa debe ser bajo alrededor de la ciudad para que
aparezcan varios puntos. Cada vez que se ajusta el zoom habrá que
actualizar la información del mapa.
 Sería deseable, aunque no imprescindible, que el color del marcador
indicara el número de bicis disponibles.
La lista de ciudades debe ser fácilmente modificable
o Al pulsar sobre los marcadores se abre un modal con la siguiente información:
 Nombre o descripción del punto de recogida/entrega de bicis.
 Número de bicis libres.
o Se usará la información proporcionada por CityBikes a través de su API REST.
• Cuando el usuario ha elegido visualizar información de concentración de tráfico:
o En el menú vertical aparecerá un formulario para que el usuario elija que zona
de Madrid se quiere visualizar. El conjunto de zonas debe ser fácilmente
modificable.
o Cuando se elija una zona, aparecerá en el resto de la pantalla una tabla con la
información de concentración de tráfico. Deberán aparecer de 10 en 10 filas.
