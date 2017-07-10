var express = require('express')
var app = express()
var path = require('path')
var mysql = require('mysql')
var con = mysql.createConnection({
  host: "localhost",
  user: "java",
  password: "java",
  database: "javabase"
})

app.use(express.static(path.join(__dirname, 'public')));
app.set('views', './views')
app.set('view engine', 'pug')

app.get('/', function (req, res) {
  res.render('index')
})

app.get('/hello', function (req, res) {
  res.render('hello')
})

app.get('/users', function(req, res) {
	var userList = [];
	con.query('SELECT * FROM users', function(err, rows, fields) {
	  		for (var i = 0; i < rows.length; i++) {
		  		var user = {
		  			'name':rows[i].name,
		  			'email':rows[i].email,
		  			'password':rows[i].password,
		  			'id':rows[i].id
		  		}
		  		userList.push(user);
	  	}
	  	res.render('users', {"userList": userList});
	});
});

app.listen(3000, function () {
  console.log('Example app listening on port 3000!')
})




