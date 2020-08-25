# <%= projectName %> - A Bulma Theme

## What this is

This is a Bulma theme. It is a way for developers to quickly customize Bulma for their own needs. Bulma is great in that it uses very clearly defined variables and overrides to let devs change its look and feel.

## How to use it

`npm start` OR `yarn start` will run the server. You can use it to developer your theme.

You're already set up with `src/_overrides.scss` and `src/_variables.scss` files. You don't need to do anything more to start theming.

## How to use your theme in a new site

### Option A - Just keep using this project (simple)

Delete everything inside the `body` tag of `index.html` and start from scratch.

### Option B - Copy/paste the theme over to your project (advanced)

Simply copy the contents of `src` into your new project and `@import` the `src/bulma-theme.scss` file.

To do this, you'll have to install Bulma and SCSS on your new project.

## About

This is a [Mintbean CLI](https://www.npmjs.com/package/mintbean-cli) generated project.

[Mintbean](https://mintbean.io) does hackathons almost 10 times a month! Come hack with us.

Credit for `index.html` contents goes to `bulmaswatch`.
