var https = require('https')
var fs = require('fs')
var path = require('path')

var login = process.env.MOYSKLAD_LOGIN
var password = process.env.MOYSKLAD_PASSWORD

if (!login || !password) {
  throw new Error('Username and password must be specified')
}

var file = fs.createWriteStream(path.resolve(__dirname, '../res/MOYsklad.xsd'))

https.get({
  hostname: 'online.moysklad.ru',
  path: '/exchange/schema/MOYsklad.xsd',
  headers: {
    Authorization: 'Basic ' + new Buffer(login + ':' + password).toString('base64')
  }
}, function (res) {
  if (res.statusCode !== 200) {
    throw new Error('Server response error ' + res.statusCode)
  }
  res.pipe(file)

}).on('error', function (err) {
  throw err;
})