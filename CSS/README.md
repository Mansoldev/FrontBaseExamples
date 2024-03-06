# ORDEN DE CSS:

[Web practica cascada](https://2019.wattenberger.com/blog/css-cascade)

**ORIGEN (Entorno/Navegador):**

1. Estilos del navegador (User-agent styles)
2. Estilos locales del usuario (Local user styles)
3. CSS de la web (Custom web CSS)

**ORDEN (App/Página web):**

1. Estos en la propia etiqueta HTML (inline-styles)
2. En el `<style>` de la propia Página HTML (`<style>` HTML)
3. En otro archivo importado con un `<link>` (`<link>` HTML)

**ESPECIFICIDAD (Selectores):**

1. Layers
2. #IDs
3. .Clases, atributos ([checked]) y pseudo-clases (:hover, :first-of-type))
4. elementos HTML y ::Pseudo-elementos (::before y ::after)

**IMPORTANCIA (Para una propiedad):**

1. Transiciones
2. !important
3. Animaciones
4. Reglas normales

## BUENA ESTRUCTURA CSS:

* Settings: Tokens de diseño y variables CSS, colores, typografia
* Tools: mixins
* Generic: normalize, box-sizing...
* Base: elementos y pseudo-elementos
* Componentes: clases
* Trumps: Ids
