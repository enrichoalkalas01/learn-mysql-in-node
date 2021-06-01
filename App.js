const express = require('express')
const mysql = require('mysql')
const App = express()

const MysqlController = require('./MysqlController')

App.use('/mysql', MysqlController.Routes)

App.listen(5000)