

const  mysql = require('mysql');
const  http = require('http');
const pass = require('./pass');
var fs =require('fs');


// console.log('messageing');
pass('this is my message to the world');

// fs.readFile("./html/bootstratTemplate.html",null, function(error) {
// 	// show an error. 
// 	if (error) {
// 		console.log("you did not find the file");
// 	}
// 	else{
// 		response.write(data);
// 	}
// response.end();
// });


function onRequest(request, response) {
    response.writeHead(200, {'Content-Type': 'text/html'});
    fs.readFile('./html/bootstratTemplate.html', null, function(error, data) {
        if (error) {
            response.writeHead(404);
            response.write('File not found!');
        } else {
        	response.write('File was found!');
            response.write(data);
        }
        response.end();
    });
}



// // this will act as a server and you can watch it from. http://localhost:8080
// http.createServer(function (req, res) {
//     res.writeHead(200, {'Content-Type': 'text/html'});
//     res.end('The server is up and running');

// }).listen(8081);


console.log('receiving');
http.createServer(onRequest).listen(8081);


// // this is were you enter the mysql info this should probably be in another file. 
// var con = mysql.createConnection({
//   host: "localhost",
//   user: "root",
//   password: "",
//   database: "markers"
// });

// // // this can add a user to the data base. 
// //  con.connect(function(err) {
// //    //if (err)throw err;
// //    console.log("Connected!");
// //   var sql = "INSERT INTO markers ( name, address, lat, lng, type) VALUES ('aaron barge2', '23 forest hill ave3', '-33.9107514', '151.1941684', 'person3')";
// //    con.query(sql, function (err, result) {
// // //     if (err) throw err;
// //      console.log("1 record inserted");
// //    });
// // });


// //use this to view the whole database. 
// con.connect(function(err) {
//   //if (err) throw err;
//   con.query("SELECT * FROM markers", function (err, result, fields) {
//     //if (err) throw err;
//     console.log(result);
//   });
// });

// // SELECT * FROM markers ORDER BY id;

// //Delete Record
// con.connect(function(err) {
//   //if (err) throw err;
//   var sql = "DELETE FROM markers WHERE id = '27' ";
//   con.query(sql, function (err, result) {
//     //if (err) throw err;
//     console.log("Number of records deleted: " + result.affectedRows);
//   });
// });

// delete from markers WHERE id >= 40 and id <= 45;



// +---------+-------------+------+-----+---------+----------------+
// | Field   | Type        | Null | Key | Default | Extra          |
// +---------+-------------+------+-----+---------+----------------+
// | id      | int(11)     | NO   | PRI | NULL    | auto_increment |
// | name    | varchar(60) | NO   |     | NULL    |                |
// | address | varchar(80) | NO   |     | NULL    |                |
// | lat     | float(10,6) | NO   |     | NULL    |                |
// | lng     | float(10,6) | NO   |     | NULL    |                |
// | type    | varchar(30) | NO   |     | NULL    |                |
// +---------+-------------+------+-----+---------+----------------+

// INSERT INTO markers ( name, address, lat, lng, type)
// VALUES ('aaron barge2', '23 forest hill ave3', '-33.9107514', '151.1941684', 'person3');