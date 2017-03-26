const webpack = require('webpack');

// filepath resolutions
var jquery = `${__dirname}/node_modules/jquery/dist/jquery.min.js`;
var hbs = `${__dirname}/node_modules/handlebars/dist/handlebars.js`;
var pixi = `${__dirname}/node_modules/phaser/build/custom/pixi.js`;
var phaser = `${__dirname}/node_modules/phaser/build/custom/phaser-split.js`;
var p2 = `${__dirname}/node_modules/phaser/build/custom/p2.js`;
var phaser_debug = `${__dirname}/node_modules/phaser-debug/dist/phaser-debug.js`;

module.exports = {
  entry: {
    phaser: `${__dirname}/app/resources/js/phaser_entry.js`,
    templating: `${__dirname}/app/resources/js/templating_entry.js`
  },
  output: {
    filename: '[name]-bundle.js',
    path: `${__dirname}/app/public/js/lib`
  },  
  module: {
    rules: [
      { // jquery.$, jquery.jQuery
        test: require.resolve('jquery'), 
        use: [
          { loader: 'expose-loader', options: 'jQuery' },
          { loader: 'expose-loader', options: '$' },
        ]
      }, { // handlebars.Handlebars
        test: require.resolve('handlebars'),
        use: [
          { loader: 'expose-loader', options: 'Handlebars' }
        ]
      }, { // pixi.PIXI
        test: /pixi.js/,
        use: [
          { loader: 'expose-loader', options: 'PIXI' }
        ]
      }, { // phaser.Phaser
        test: /phaser-split.js/,
        use: [
          { loader: 'expose-loader', options: 'Phaser' }
        ]
      }, { // p2.p2
        test: /p2.js/,
        use: [
          { loader: 'expose-loader', options: 'p2' }
        ]
      }
    ]
  },
  resolve: {
    alias: {
      'pixi': pixi,
      'p2': p2,
      'phaser': phaser,
      'phaser-debug': phaser_debug,
      'jquery': jquery,
      'handlebars': hbs
    }
  }
};