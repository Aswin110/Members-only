# Members-only
start the project creating a skelton project with express.

setting up a Node development environment.


## Deployment

To deploy this project run

```bash
  npm install express-generator -g
```

```bash
  express
```

or

```bash
express express-locallibrary-tutorial --view=pug
```
package.json

```bash
 "scripts": {
    "start": "node ./bin/www",
    "devstart": "nodemon ./bin/www",
}
```


How to implement tailwind with pug in express app

Add tailwind

```bash
 npm install tailwindcss postcss autoprefixer postcss-cli
```

Firstly, postCSS allows us to "convert modern CSS into something most browsers can understand, determining the polyfills you need based on your targeted browsers or runtime environments". But why do we need it for Tailwind? The reason is that TailwindCSS is a PostCSS plugin. As a result, we need a tool to translate the modern CSS into something the browsers can understand.

Secondly, autoprefixer is a PostCSS plugin as well. Autoprefixer adds vendor prefixes to CSS rules using the values from Can I Use. In other words, it makes sure the application looks the same in all browsers.

Let's generate the tailwind.config.js file. The purpose of this file is to allow you to customize your TailwindCSS installation. It is a configuration file where you can add additional information such as plugins, themes, margins, padding, and everything you require and Tailwind does not have.

```bash
 npx tailwindcss init
```
By running the above command, it automatically creates the tailwind.config.js file.

```bash
/** @type {import('tailwindcss').Config} */
module.exports = {
	content: ["./views/**/*.pug"],
	theme: {
		extend: {},
	},
	plugins: [],
};
```
postcss.config.js

```bash
touch postcss.config.js
```
Once the file is created, add the following configuration to it:

```bash
module.exports = {
  plugins: [
    require('tailwindcss'),
    require('autoprefixer'),
  ]
}
```

```bash
touch public/stylesheets/tailwind.css
```

Create tailwind.css file and add the following configuration.


```bash
@tailwind base;
@tailwind components;
@tailwind utilities;
```

package.json

```bash
"scripts": {
    "start": "node ./bin/www",
    "tailwind:css": "postcss public/stylesheets/tailwind.css -o public/stylesheets/style.css",
    "devstart": "nodemon ./bin/www"
  },
  ```