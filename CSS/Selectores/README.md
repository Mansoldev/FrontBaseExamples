## PSEUDO-ELEMENTOS

Los pseudo-elementos nos permiten poder añadir elementos al DOM sin necesidad de tener que modificar nuestro HTML.

[Listado](https://developer.mozilla.org/en-US/docs/Web/CSS/::after)

* ::before
* ::after
* ::first-letter
* ::first-line
* ::selection
* ::marker
* ::cue
* ::gramar-error
* ::file-selector-button
* ::placeholder

## PSEUDO-CLASES


* :focus-visible
* :focus
* :not()
* :placeholder-shown
* :invalid
* :first-child
* :last-child
* :nth-child(odd)
* :nth-of-type(2n+1)
* :nth-last-of-type(odd)

**Combinadores Lógicos:**

* :is(article, aside) :is(h1, h2, h3, h4, h5, h6) > Permite aplicar cosas a todas las combinaciones de etiquetas
* :where(selector) > = que is, pero con prioridad 0 (El anti !important)
* :has() > nos permite poder modificar propiedades del padre en base a los hijos sin necesidad de clases modificadoras y sin Javascript
