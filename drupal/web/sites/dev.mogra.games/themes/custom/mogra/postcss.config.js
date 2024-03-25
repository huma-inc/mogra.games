const plugins = [
  require('postcss-import')(),
  require('postcss-mixins')(),
  require('postcss-extend')(),
  require('postcss-preset-env')({
    stage: 3,
    features: {
      'nesting-rules': true
    }
  }),
  require('postcss-flexbugs-fixes')(),
  require('lost')()
]

module.exports = (ctx) => ({
  map: ctx.options.map,
  plugins: plugins
});
