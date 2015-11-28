var fs = require('fs')
var path = require('path')
var generateModel = require('./generate-model')


generateModel(function (err, model) {
  if (err) { throw err }
  fs.writeFileSync(
    path.resolve(__dirname, '../dist/moysklad-model.json'),
    JSON.stringify(model))
})