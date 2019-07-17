function type(obj) {
  return Object.prototype.toString.call(obj).slice(8, -1).toLowerCase()
}

function clone(object) {
  var result
  if (typeof object !== 'object') {
    result = object
  } else if (type(object) === 'null' || type(object) === 'undefined') {
    result = object
  } else if (type(object) === 'array') {
    result = []
    var i
    var length = object.length
    for (i = 0; i < length; i++) {
      result.push(object[i])
    }
  } else if (type(object) === 'object') {
    result = {}
    for (var key in object) {
      if (object.hasOwnProperty(key)) {
        var element = object[key]
        if (element === object) {
          continue
        }
        if (type(element) === 'array' || type(element) === 'object') {
          result[key] = clone(element)
        } else {
          result[key] = element
        }
      }
    }
  } else {
    result = object
  }
  return result
}

var originalConfig = {
  loaders: [],
  plugins: [],
  library: 'vanilla',
  babel: [],
  cssPreprocessor: 'off',
  lint: 'off',
  typescript: 'off'
}

var app = new Vue({
  el: '#app',
  data: {
    config: clone(originalConfig),
    loaderOptions: [],
    pluginOptions: [],
    babelOptions: [],
    libraryOptions: [ 'vanilla', 'jQuery', 'vue', 'react', 'angular'],
    cssPreprocessorOptions: [ 'off', 'scss', 'less', 'stylus', 'postCSS' ],
    lintOptions:  [ 'off', 'jslint', 'eslint' ],
    typescriptOptions: [ 'off', 'on' ]
  },
  methods: {
    confirm: function() {
      console.log(this.config)
    },
    reset: function() {
      this.config = clone(originalConfig)
    }
  }
})
