module.exports = {
  plugins: [
    require('autoprefixer')({
      browsers: ['> 1%', 'last 3 versions', 'Firefox >= 20', 'iOS >=7']
    }),
    require('cssnano')({
      preset: 'default'
    })
  ]
};