module.exports = {
  presets: [
    '@vue/cli-plugin-babel/preset'
  ]
}
// Only instrument code when running e2e tests
if (process.env.npm_lifecycle_script === 'vue-cli-service test:e2e') {console.log('Instrument the code')
  module.exports.plugins = [
    ['istanbul', {useInlineSourceMaps: false}]
  ]
}

if (process.env.npm_lifecycle_script === 'vue-cli-service test.headless:e2e') {console.log('Instrument the code')
  module.exports.plugins = [
    ['istanbul', {useInlineSourceMaps: false}]
  ]
}