[Codigo curso](https://github.com/CodelyTV/css-colors-course/blob/main/02-working-with-colors/1-create-your-palette/package.json)

## TIPOS

* rgb() o rgba():
* hsl() o hsla():
* lch() o oklch():
* lab():
* hwb():

Conversor de colores a oklch: [enlace NPM](https://github.com/fpetrakov/convert-to-oklch)

Web: [Color mix](https://codepen.io/codelytv/pen/KKrYrdX/)

## Webs de diseño

https://randomcolorgenerator.net/

https://coolors.co/

https://color.adobe.com/es/

[Colección de codepens del curso](https://codepen.io/collection/zxJqbq?cursor=eyJwYWdlIjoxfQ==): Degradados, herramientas de desarrollo, etc...

## TEMA LIGHT-DARK:

Con variables de variables: https://css-tricks.com/a-dry-approach-to-color-themes-in-css/

Contrastes: https://webaim.org/resources/contrastchecker/

https://m2.material.io/design/color/dark-theme.html#usage

imagenes:

```css
.dark-theme img {
  filter: opacity(0.95) saturate(90%);
}
```

### Por media querys:

Solemos usar media queries para adaptarnos a distintos tamaños de pantalla, pero en realidad sirven para mucho más. Gracias a la media query `prefers-color-scheme`, podemos detectar si el usuario ha establecido alguna preferencia y ajustar los colores acorde, sin necesidad de un reload:

```css
:root {
  --background-color: #fcfcfc;
  --text-color: #333;
}

@media (prefers-color-scheme: dark) {
  :root {
    --background-color: #181818;
    --text-color: #ccc;
  }
}
```

Las media queries tambien se pueden usar para cargar imágenes distintas segun la resolución o el tema preferido:

```html
<picture>
  <source media="(prefers-color-scheme: dark)" srcset="/img/dark.png">
  <img src="/img/light.png" alt="Codely TV">
</picture>
```

De esta forma no se cargan las dos versiones de las imágenes, solo la que responde a las preferencias del usuario, mejorando así la performance de nuestra página.

#### Con preferencias de usuario:

A pesar de que demos soporte a las preferencias del usuario, es posible que la persona que usa nuestra página no tenga opción de configurar sus preferencias, o bien que por el motivo que sea necesite cambiar de tema para nuestra página concreta. Es importante siempre dejar que puedan sobreescribir el tema por defecto, si bien podemos permitirnos que esta configuración no esté tan a la vista.

Con JavaScript podemos seguir añadiendo clases a nuestro HTML, e incluso guardar la preferencia de la persona usuaria para que persista y cuando vuelva a nuestra página, se muestre en el tema que había escogido. Como no se trata de un dato sensible, podemos guardarlo en `localStorage`.

Este approach tiene dos problemas. Uno es la duplicidad de código que generamos en nuestro CSS:

```css
:root {
  --background-color: #fff;
  --background-closer-color: #ececec;
  --text-color: #181818;
  --text-muted-color: #666;
  --brand-text-color: #2d4358;
  --border-color: #ececec;
}
:root.dark-theme {
  --background-color: #181818;
  --background-closer-color: #282729;
  --text-color: #fff;
  --text-muted-color: #ececec;
  --brand-text-color: #d3d3d3;
  --border-color: #666;
}
@media (prefers-color-scheme: dark) {
  :root {
    --background-color: #181818;
    --background-closer-color: #282729;
    --text-color: #fff;
    --text-muted-color: #ececec;
    --brand-text-color: #d3d3d3;
    --border-color: #666;
  }
  :root.light-theme {
    --background-color: #fff;
    --background-closer-color: #ececec;
    --text-color: #181818;
    --text-muted-color: #666;
    --brand-text-color: #2d4358;
    --border-color: #ececec;
  }
}
```

Podríamos prescindir de añadir la variación según la media query en el CSS, leyendo la preferencia en JavaScript usando `window.matchMedia("(prefers-color-scheme: dark)")`, y añadiendo la clase correspondiente al HTML. También deberíamos [añadir un listener](https://developer.mozilla.org/en-US/docs/Web/API/MediaQueryList/matches#examples) para que, si el usuario cambia la preferencia, se actualice el estilo sin necesidad de recargar. Otra opción es usar preprocesadores para evitar esta repetición de código, que veremos en el siguiente vídeo.

El otro problema de este método es que, entre que se hace la comprobación de si hay una preferencia en localStorage y se aplica la clase, se puede producir un flash del theme incorrecto durante unas milésimas de segundo. Veremos más adelante cómo solucionarlo.

### Variables guays + mixins 43b:

Puedes encontrar el código de este vídeo en GitHub: [ejemplo con mixins](https://github.com/CodelyTV/css-light-dark-mode-course/tree/main/43-preprocessors) y [ejemplo con variable toggle y función](https://github.com/CodelyTV/css-light-dark-mode-course/tree/main/43b-preprocessors).

Sass nos ofrece varias maneras de evitar la duplicidad de código: mixins, extends y funciones. Por [sus limitaciones](https://sass-lang.com/documentation/at-rules/extend#extend-in-media) no podemos usar `@extend` en media queries, por lo que en este caso optamos por usar mixins. La forma básica de usar un mixin para aplicar varias declaraciones es esta:

```scss
@mixin light-theme {
  --background-color: #{variables.$background-lightest-color};
  --background-closer-color: #{variables.$background-light-color};
  --text-color: #{variables.$text-color};
  --text-muted-color: #{variables.$text-muted-color};
  --brand-text-color: #{variables.$brand-text-color};
  --border-color: #{variables.$border-inverted-color};
}

@mixin dark-theme {
  --background-color: #{variables.$background-darker-color};
  --background-closer-color: #{variables.$background-dark-color};
  --text-color: #{variables.$text-inverted-color};
  --text-muted-color: #{variables.$text-inverted-muted-color};
  --brand-text-color: #{variables.$brand-text-inverted-color};
  --border-color: #{variables.$border-color};
}

:root {
  @include light-theme;

  &.dark-theme {
    @include dark-theme;
  }

  @media (prefers-color-scheme: dark) {
    @include dark-theme;

    &.light-theme {
      @include light-theme;
    }
  }
}
```

Como seguramente queremos aplicar las variaciones en otros archivos, nos podemos crear un mixin que tome el nombre de la variable (`$key`) con sus dos variaciones de colores (`$light` y `$dark`) y devuelva el bloque con sus clases y media queries aplicadas:

```scss
@mixin light-dark($key, $light, $dark) {
  #{$key}: $light;

  .dark-theme & {
    #{$key}: $dark;
  }

  @media (prefers-color-scheme: dark) {
    #{$key}: $dark;

    .light-theme & {
      #{$key}: $light;
    }
  }
}
```

De esta forma podemos aplicarlo de esta forma en cualquier clase:

```scss
.g-courses {
  @include mixins.light-dark(
    --courses-background-color,
    #ececec,
    #181818
  );
  @include mixins.light-dark(
    --courses-border-color,
    #fff,
    #666
  );

  border-bottom: 1px solid var(--courses-border-color);
  background: var(--courses-background-color);
}
```

Si queremos llevarlo un paso más allá, podemos usar el truco para hacer toggle de variables que se detalla en [este artículo de CSS Tricks](https://css-tricks.com/a-dry-approach-to-color-themes-in-css/) (gracias a [Antonio que nos lo compartió en este mismo curso](https://pro.codely.tv/library/light-dark-themes-accesibles/204518/path/step/118483783/discussion/1676095/)). De esta forma solo tenemos que hacer toggle de las variables `--light` y `--dark`:

```brainfuck
:root {
  --ON: initial;
  --OFF: ;

  --light: var(--ON);
  --dark: var(--OFF);

  &.dark-theme {
    --light: var(--OFF);
    --dark: var(--ON);
  }

  @media (prefers-color-scheme: dark) {
    --light: var(--OFF);
    --dark: var(--ON);

    &.light-theme {
      --light: var(--ON);
      --dark: var(--OFF);
    }
  }
}
```

Al usar una función Sass para abstraernos de la magia nos quedarían las declaraciones igual de legibles:

```maxima
.g-courses {
  --courses-background-color: #{ light-dark(#ececec, #181818) };
  --courses-border-color: #{ light-dark(#fff, #666) };

  border-bottom: 1px solid var(--courses-border-color);
  background: var(--courses-background-color);
}
```

### Fuentes:

Como hemos visto anteriormente los textos en un tema oscuro pueden ser más difíciles de leer. Podemos compensar un poco estos problemas realizando ajustes tipográficos.

En un tema oscuro el texto tiende a verse más bold que en uno claro. Ciertos ajustes como `-webkit-font-smoothing: antialiased;` minimizan este efecto, pero no estan disponibles en todos los navegadores.

Las fuentes variables nos permiten ajustar el peso de la tipografía gradualmente, sin saltos tan evidentes como regular/bold, que serian demasiado para este caso. Además, ayudan a la performance de nuestra página ya que no tenemos que cargar todos los pesos en nuestra página. Google Fonts ya ofrece las tipografias variables.
