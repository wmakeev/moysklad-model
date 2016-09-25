'use strict'

var jsondiffpatch = require('jsondiffpatch')
var stringify = require('json-stable-stringify')

var objectHashFunctions = [
  function (obj) {
    return obj.elementName
  },
  function (obj) {
    if (obj.name) {
      return obj.name + obj.type ? '|' + obj.type : ''
    }
  },
  function (obj) {
    if (obj.localName) {
      return obj.localName + obj.baseTypeInfo ? '|' + obj.baseTypeInfo : ''
    }
  },
  function (obj) { return stringify(obj) }
]

module.exports = jsondiffpatch.create({
  // used to match objects when diffing arrays, by default only === operator is used
  objectHash: function (entity) {
    // this function is used only to when objects are not equal by ref
    var hash
    for (var i = 0; i < objectHashFunctions.length; i++) {
      try {
        hash = objectHashFunctions[i](entity)
        if (hash) { return hash }
      } catch (e) {}
    }
  },
  arrays: {
    // default true, detect items moved inside the array
    // (otherwise they will be registered as remove+add)
    detectMove: true,
    // default false, the value of items moved is not included in deltas
    includeValueOnMove: false
  },
  textDiff: {
    // default 60, minimum string length (left and right sides)
    // to use text diff algorythm: google-diff-match-patch
    minLength: 60
  },
  propertyFilter: function (name, context) {
    // this optional function can be specified to ignore object properties (eg. volatile data)
    // name: property name, present in either context.left or context.right objects
    // context: the diff context (has context.left and context.right objects)

    // Изменения в updatedBy создают слишком большой diff (вынесего в родительский объект)
    return true
  },
  cloneDiffValues: false /* default false. if true, values in the obtained delta will be cloned,
   to ensure delta keeps no references to left or right objects. this becomes useful
   if you're diffing and patching the same objects multiple times without serializing deltas.
   instead of true, a function can be specified here to provide a custom clone(value)
   */
})
