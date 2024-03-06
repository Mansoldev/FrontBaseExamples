# ORDEN DE CSS:

**ORIGEN (Entorno/Navegador):**

1. Estilos del navegador (User-agent styles)
2. Estilos locales del usuario (Local user styles)
3. CSS de la web (Custom web CSS)

**ORDEN (App/Página web):**

1. Estos en la propia etiqueta HTML (inline-styles)
2. En el `<style>` de la propia Página HTML (`<style>` HTML)
3. En otro archivo importado con un `<link>` (`<link>` HTML)

**ESPECIFICIDAD (Selectores):**

1. #IDs
2. .Clases
3. elementos HTML y ::Pseudo-elementos

**IMPORTANCIA (Para una propiedad):**

1. Transiciones
2. !important
3. Animaciones
4. Reglas normales
