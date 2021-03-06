---
# Feel free to add content and custom Front Matter to this file.

layout: section
title: Getting started
breadcrumbs:
  - title: Getting started
    url: "/"
---

👋🏼 Hi there! Let's get you started.

## Using with Rails

The design system package is made up of five parts:

- Haml partials. Designed to be used in Rails apps.
- Locale files. A set of bundled locale files required by Haml templates.
- SCSS files containing CSS styles for the design system.
- JavaScript modules. Required for the navigation, header, tables and targeted-content components.
- Fonts. Our brand font and an icon font.

This guide assumes that you are using:

- Rails
- Rails i18n
- Haml
- SCSS
- Webpacker

You can install the package from npm:

```sh
npm install @citizensadvice/design-system
```

### Haml

To use the provided Haml partials you will need to add the following to your Rails `ApplicationController`:

```ruby
prepend_view_path(Rails.root.join("node_modules"))
```

Once you've done this you can reference them from your app as follows:

```haml
= render partial: "@citizensadvice/design-system/haml/breadcrumb", locals: { breadcrumbs: { "breadcrumb_links" => [{ "url" => "/benefits/", "title" => "Benefits" },{ "url" => "/benefits/", "title" => "Accessing UK benefits and services if you’re subject to immigration control" }, { "url" => "/benefits/benefits-introduction/", "title" => "Benefits - introduction"}, { "url" => "/benefits/benefits-introduction/what-benefits-can-i-get/", "title" => "Benefit calculators: what benefits can you get" }] } }
```

Most components include sample code you can copy and paste. Look for the "Show code" button next to each story.

### Locale files

We export a locales folder which includes both `en.yml` and `cy.yml`. Files are located in `node_modules/@citizensadvice/design-system/locales`.

You can include them in your Rails app by adding a `config/initializers/locales.rb` file:

```ruby
# frozen_string_literal: true

I18n.available_locales = [:en, :cy]

# Add design-system locales to the load path
I18n.load_path += Dir[
  Rails.root.join("node_modules/@citizensadvice/design-system/locales/*.yml"),
]
```

This requires that you have the `rails-i18n` gem installed. See the [Rails i18n guide](https://guides.rubyonrails.org/i18n.html#configure-the-i18n-module) for more details.

### CSS

The recommended way of using CSS from the design system is through SCSS.

If you are using Webpacker for your assets you can load the design-system SCSS files by adding the following to your stylesheet:

```scss
@import "~@citizensadvice/design-system/scss/lib.scss";
```

The design system uses [Dart Sass](https://sass-lang.com/dart-sass). If you're using webpacker, please use v5.2.2+ as previous versions use `node-sass`.

The distributed package includes compiled CSS in `lib/lib.css` if you are not using SCSS.

### Fonts

The design system uses a custom font to distribute icons. These are included with the npm package and can be found under the `fonts` directory.

If you are using SCSS files through Webpacker with Rails then place the following in `config/webpack/environment.js`:

```js
// resolve-url-loader must be used before sass-loader
environment.loaders.get("sass").use.splice(-1, 0, {
  loader: "resolve-url-loader",
});
```

This requires that you have `resolve-url-loader` installed:

```sh
npm install -D resolve-url-loader
```

### Javascript components

JavaScript components can be included as part of your application bundle.

Components which require JavaScript include the expected usage in their documentation. Typical usage is as follows:

```js
import header from "@citizensadvice/design-system/lib/header";
import greedyNav from "@citizensadvice/design-system/lib/greedy-nav/index";
import targetedContent from "@citizensadvice/design-system/lib/targeted-content";
import tables from "@citizensadvice/design-system/lib/tables";

window.addEventListener("load", () => {
  header();
  greedyNav.init();
  targetedContent();
  tables();
});
```

### Polyfills

Some components require polyfills for older browsers. Components which require polyfills note this in their documentation. The full list is:

- Targeted content:

  - [Element.prototype.closest polyfill](https://www.npmjs.com/package/element-closest)
  - [Scroll behaviour (Element.prototype.scrollIntoView) polyfill](https://github.com/wessberg/scroll-behavior-polyfill)

- Navigation (specifically the greedynav behaviour):
  - [ResizeObserver polyfill](https://www.npmjs.com/package/resize-observer-polyfill)
  - Note: this polyfill is not a global polyfill, you will need to assign it to window.ResizeObserver.

We don't include the polyfills by default in order to avoid double bundling if you have your own.

If you are not using either of these components then you may not need any polyfills.

## Changelog

- Release notes for each version (starting with v2.0.0) can be seen at [https://github.com/citizensadvice/design-system/releases](https://github.com/citizensadvice/design-system/releases)
- The full changelog can be found at [https://github.com/citizensadvice/design-system/blob/master/CHANGELOG.md](https://github.com/citizensadvice/design-system/blob/master/CHANGELOG.md)

## Contact

All design system discussions take place in the #design-system Slack channel. For current issues, roadmap and other info see the [Github project board](https://github.com/citizensadvice/design-system-testing/projects/1) and [related issues](https://github.com/citizensadvice/design-system-testing/issues).
