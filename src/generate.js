try {
  require('dotenv').config()
} catch (e) {}

var fs = require('fs')
var util = require('util')
var path = require('path')
var log = require('debug')('moysklad-model')
var jsonDiffFormat = require('jsondiffpatch').formatters.console.format
var diffPatch = require('./diff-patch')
var generateModel = require('./generate-model')
var getIdrefTypes = require('moysklad-model-generator').getIdrefTypes

generateModel(function (err, model) {
  if (err) { throw err }

  var currentModel = JSON.parse(
    fs.readFileSync(
      path.resolve(__dirname, '../dist/moysklad-model.min.json')))
  
  var idrefTypes = getIdrefTypes(model)
  
  var diff = diffPatch.diff(currentModel, model)

  if (!diff) {
    log('Схема данных не изменилась. Модель не обновлена.')
    return
  }

  // Записываем изменения модели
  fs.writeFileSync(
    path.resolve(__dirname,
      util.format('../dist/diffs/model-update-diff-%s.json', +(new Date))),
    JSON.stringify(diff, null, 2))

  log('Изменения в модели:', jsonDiffFormat(diff))

  // Shema: min версия
  fs.writeFileSync(
    path.resolve(__dirname, '../dist/moysklad-model.min.json'),
    JSON.stringify(model))

  // Shema: beautified version
  fs.writeFileSync(
    path.resolve(__dirname, '../dist/moysklad-model.json'),
    JSON.stringify(model, null, 2))

  // IDREF types
  // Shema: min версия
  fs.writeFileSync(
    path.resolve(__dirname, '../dist/moysklad-idref-types.min.json'),
    JSON.stringify(idrefTypes))

  // Shema: beautified version
  fs.writeFileSync(
    path.resolve(__dirname, '../dist/moysklad-idref-types.json'),
    JSON.stringify(idrefTypes, null, 2))

  log('Модель обновлена')
})
