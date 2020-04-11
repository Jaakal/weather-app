# Webpack Template

Project template for using Webpack as the bundler for a project. Set up with Babel-, SCSS/CSS-, image- and font-loaders. jQuery module is added as well and included globally. I'm using jQuery function `$(document).ready(() => {})` in different modules do describe, in which order the final bundle is composed to together, because that function is executed in multiple bindings in the order it was attached.

## Screenshot

![Screenshot of the webpage](https://github.com/Jaakal/webpack-template/blob/master/src/images/screenshot.png)

## Getting Started

Clone the repository into your local computer.

### Installing

First you'll have to install the newest version of [Node](https://nodejs.org/en/download/). Otherwise the npx command could not be available. Then move into the project main directory on the console and follow the instructions below. 

Install all packages:

```
$ npm install
```

Run Webpack:

```
$ npx webpack
```

Now open the `index.html` in the browser.


You can instruct webpack to "watch" all files within your dependency graph for changes. If one of these files is updated, the code will be recompiled so you don't have to run the full build manually:

```
$ npx webpack --watch
```

### webpack.config.js

The main file of which the bundle is created is set in the entry:

```
entry: './src/javascript/index.js'
```

The output file of the JavaScript bundle and its name is set in the output:

```
output: {
    path: path.resolve(__dirname, 'dist'),
    filename: 'main.js'
  },
```

The output file name of the CSS bundle is set in the plugins:

```
plugins: [
  
    new MiniCssExtractPlugin({
      filename: "main.css"
    })
  
  ]
```

### Notice about production mode and postcss.config.js

In postcss.config.js there is a check for **process.env.NODE_ENV** variable. The thing is even if you set Webpack mode to production in `webpack.config.js` it won't automatically change Node environment variable.

The simplest way to configure this is to install cross-env package:

```
$ npm install --save-dev cross-env
```

Now when you run `npx cross-env NODE_ENV=production webpack --config webpack.config.js` the process.env.NODE_ENV variable will be production and postcss.config.js check is going to work:

```
if(process.env.NODE_ENV === 'production') {
    module.exports = {
        plugins: [
            require('autoprefixer'),
            require('cssnano')
        ]
    }
}
```

[From Webpack documentation:](https://webpack.js.org/guides/production/) Technically, NODE_ENV is a system environment variable that Node.js exposes into running scripts. It is used by convention to determine dev-vs-prod behavior by server tools, build scripts, and client-side libraries. Contrary to expectations, process.env.NODE_ENV **is not set to "production"** within the build script webpack.config.js. Thus, conditionals like `process.env.NODE_ENV === 'production' ? '[name].[hash].bundle.js' : '[name].bundle.js'` within webpack configurations do not work as expected.

## Built With

* [JavaScript](https://www.javascript.com/) - Programming language used
* [Webpack](https://webpack.js.org/) - Bundler used
* [HTML](https://en.wikipedia.org/wiki/HTML) - Hypertext Markup Language
* [SCSS](https://sass-lang.com/) - Sassy CSS
* [CSS](https://www.w3.org/Style/CSS/Overview.en.html) - Cascading Style Sheets
* [VS Code](https://code.visualstudio.com/) - The code editor used 

## Authors

👤 **Jaak Kivinukk**

<a href="https://github.com/Jaakal" target="_blank">

  ![Screenshot Image](src/images/jaak-profile.png) 

</a>

- Github: [@Jaakal](https://github.com/Jaakal)
- Twitter: [@JKivinukk](https://twitter.com/JKivinukk)
- Linkedin: [Jaak Kivinukk](https://www.linkedin.com/in/jaak-kivinukk)
- Email: [jaak.kivinukk@gmail.com](jaak.kivinukk@gmail.com)

## License

This project is licensed under the MIT License - see the [LICENSE](LICENSE) file for details

## Acknowledgments

* Article [How to configure Webpack 4 from scratch for a basic website](https://dev.to/pixelgoo/how-to-configure-webpack-from-scratch-for-a-basic-website-46a5) used as a reference.
* Video tutorial in [Youtube](https://www.youtube.com/watch?v=ytRnPV0kRN0) used as a reference.
* Font [Lobster](https://fonts.google.com/specimen/Lobster) used for the main headline.
* Link to the [background image](https://unsplash.com/photos/nmpW_WwwVSc).
