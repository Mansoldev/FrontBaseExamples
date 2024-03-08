## MEDIDAS RELATIVAS


1. **`rem`**: relativa al elemento root, en general equivale a `16px` y es útil como unidad por defecto. Todos los tamaños definidos con `rem` escalaran automáticamente según las preferencias del usuario, o si modificamos el tamaño del root con una media query para ciertos viewports.
2. **`em`**: relativa al tamaño de fuente del elemento, nos será útil para aplicar en paddings o margins de elementos que queremos que crezcan proporcionalmente al tamaño de letra. **En font-size** es relativa al padre y **en padding y margin** relativo al font-size del propio elemento.
3. `ch`: character unit, corresponde al ancho del caracter `0` de la tipografía. Nos sirve para definir tamaños teniendo en cuenta el ancho ideal de línea para conseguir una legibilidad óptima, independientemente de la tipografía o del tamaño del texto. **Para width** regula el ancho en caracteres de una Línea, independientemente del tamaño de fuente.
4. `%`: relativa al tamaño del parent, nos sirve para que los elementos children cambien en proporción. És útil combinarlo con min-width con otra unidad.
5. `vw` y `vh`: relativos al ancho y alto del viewport respectivamente, nos sirve para ajustar tamaños de elementos anidados según el viewport.
