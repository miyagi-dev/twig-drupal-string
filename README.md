# Twig Drupal String

Add support for the Drupal [Twig `t` and `trans` filters](https://symfony.com/doc/current/translation.html#translation-filters) in combination with the [String module](https://www.drupal.org/project/string) and [Twig.js](https://github.com/twigjs/twig.js/).

## Installation

Add the package to your dependencies:

```sh
npm install --save-dev twig twig-drupal-string
```

## Example

Crate a file called `strings.yaml` with the following content:

```yaml
welcome:
  default: Welcome
```

Then create `render-template.mjs`:

```js
import Twig from "twig";
import { twigDrupalString } from "twig-drupal-string";

twigDrupalString({
  Twig,
  files: ["strings.yaml"],
});

const data = `<h1>{{ 'welcome'|t }}</h1>`;
const template = Twig.twig({ data });
const output = template.render();

console.log(output);
```

Run the example with:

```sh
node render-template.mjs

# The output is:
# <h1>Welcome</h1>
```

## Placeholders

The filter also supports placeholders inside the strings that will be replaced with dynamic data during template rendering.

Add the following to `strings.yaml`:

```yaml
greeting:
  default: Hello @name
```

Then adjust the template inside `render-template.mjs`:

```js
const data = `<h1>{{ 'greeting'|t({'@name': 'world'}) }}</h1>`;
const template = Twig.twig({ data });
const output = template.render();

// Output will be:
// <h1>Hello world</h1>
```

## Watch mode

For development purposes, a watch mode can be enabled that reloads the translation strings from disk if any of the referenced files change.

Set the `watch` options:

```js
twigDrupalString({
  Twig,
  files: ["strings.yaml"],
  watch: true,
});
```

## Options

The `twigDrupalString` method receives an options object with the following properties:

| Property | Type       | Description                                   |
| -------- | ---------- | --------------------------------------------- |
| `Twig`   | `Twig`     | Twig.js engine instance                       |
| `files`  | `string[]` | Array of paths to translation string files    |
| `watch`  | `boolean`  | Enable or disable watch mode, default `false` |

## Contributing

See [contributing documentation](CONTRIBUTING.md) for more information.

## Sponsors

<a href="https://factorial.io/">
  <img src="https://logo.factorial.io/color.svg" width="40" height="56" alt="Factorial">
</a>
