var fs = require('fs')
var path = require('path')
var JsonixSchemaGenerator = require('moysklad-model-generator').JsonixSchemaGenerator

module.exports = function generateModel (cb) {
  var xsdPath = path.resolve(__dirname, '../res/MOYsklad.xsd')
  fs.readFile(xsdPath, 'utf8', function (err, xsd) {
    if (err) { return cb(err) }
    var jsonixSchemaGenerator = new JsonixSchemaGenerator()
    var schema = jsonixSchemaGenerator.generateSchema(xsd)
    cb(null, schema)
  })
}


