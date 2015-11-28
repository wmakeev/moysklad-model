var fs = require('fs')
var path = require('path')
var ModelGenerator = require('moysklad-model-generator')

module.exports = function generateModel (cb) {
  var xsdPath = path.resolve(__dirname, '../res/MOYsklad.xsd')
  fs.readFile(xsdPath, 'utf8', function (err, xsd) {
    if (err) { return cb(err) }
    var modelGenerator = new ModelGenerator()
    var model = modelGenerator.generateModel(xsd)
    cb(null, model)
  })
}


