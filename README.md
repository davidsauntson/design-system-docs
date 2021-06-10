# Documenting the Citizens Advice Design System using the Citizens Advice Design System

## Bridge(r)to(w)n

Attempting to use [Bridgetown static site generator](https://www.bridgetownrb.com/) to:

- create a static site we can use to document the design-system and replace storybook
- serve all the variants of each component as documented already in the `CitizensAdviceComponentPreview` classes **without** repeating the example parameters in this code base
- use the new `CitizensAdviceComponents` in this static site
- find a way of using the old `haml` templates for components that have not been brought into `CitizensAdviceComponents` yet

## Getting started

1. Clone this repo
2. run `bundle`
3. run `yarn install`

Then you can either:

- run `yarn start`
- run `bundle exec bridgetown serve` if you want to `binding.pry` smth

## The story so far

### Using the 'old' design-system

I have:

- installed the `npm` package
- loaded the `I18n` dictionaries in `plugins/cads-translations.rb`
- added `resolve-url-loader` to the webpack build for fonts
- created some logic in `plugins/builders/CadsBuilder.rb` to:
  - load in the `CitizensAdviceComponents` classes using `Zeitwerk`
  - copy over all the example html generated by the [rake task in the design-system demo app](https://github.com/citizensadvice/design-system/blob/master/demo/lib/tasks/generate_examples.rake)
  - build a new collection in the site that allows routing to the example html
