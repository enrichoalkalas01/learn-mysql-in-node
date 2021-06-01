const express = require('express')
const mysql = require('mysql')
const App = express()
const router = express.Router()

router.get('/create', (req, res) => {
	const conn = mysql.createConnection({
		host: "localhost",
		user: "root",
		password: ""
	})

	conn.connect((err, result) => {
		if ( err ) { console.log('Mysql Not Connected') }
		else {
			// let dbname =  + req.query.namedb
			conn.query( "CREATE DATABASE LearnNodeMySQL" , (err, ResultCreate) => {
				if ( err ) return console.log(err)
				if ( ResultCreate ) return res.send(ResultCreate)
			})
		}
	})
})

router.get('/create-table', (req, res) => {
	const conn = mysql.createConnection({
		host: "localhost",
		user: "root",
		password: "",
		database: req.query.dbname
	})

	let TableName = req.query.nametable
	let QuerySetting = "CREATE TABLE " + TableName + " (username VARCHAR(255) null, password VARCHAR(255) null, email VARCHAR(255) null, fullname VARCHAR(255) null)"
	console.log(QuerySetting)
	conn.connect((err, ResultConnect) => {
		if ( err ) return console.log(ResultConnect)
		if ( ResultConnect ) {
			conn.query(QuerySetting, function (err, ResultQuery) {
				if (err) throw err;
				console.log("Table created");
				res.send(ResultQuery)
			});	
		}
	})
})

router.get('/insert-data', (req, res) => {
	const conn = mysql.createConnection({
		host: "localhost",
		user: "root",
		password: "",
		database: req.query.dbname
	})

	let TableName = req.query.nametable
	let QueryValue = {
		username: req.query.username,
		password: req.query.password,
		email: req.query.email,
		fullname: req.query.fullname,
	}

	let QuerySetting = "INSERT INTO " + TableName + " (username, password, email, fullname) VALUES ('"
		+ QueryValue.username +"', '"+ QueryValue.password +"', '"+ QueryValue.email +"', '"+ QueryValue.fullname +"');";
	
	// ===== || =====

	conn.connect((err, ResultConnect) => {
		if ( err ) throw err
		if ( ResultConnect ) {
			conn.query( QuerySetting, (err, ResultQuery) => {
				if ( err ) throw err
				if ( ResultQuery ) return res.send(ResultQuery)
			})
		}
	})
})

exports.Routes = router
