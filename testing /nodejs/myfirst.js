var mysql = require('mysql');

var http = require('http');

http.createServer(function (req, res) {
    res.writeHead(200, {'Content-Type': 'text/html'});
    res.end('its open');
}).listen(8080);

// this will act as a server and you can watch it from. http://localhost:8080




var con = mysql.createConnection({
  host: "localhost",
  user: "root",
  password: "",
  database: "markers"
});

// this can add a user to the data base. 
 con.connect(function(err) {
   //if (err)throw err;
   console.log("Connected!");
  var sql = "INSERT INTO markers ( name, address, lat, lng, type) VALUES ('aaron barge2', '23 forest hill ave3', '-33.9107514', '151.1941684', 'person3')";
   con.query(sql, function (err, result) {
//     if (err) throw err;
     console.log("1 record inserted");
   });
});


// use this to view the whole database. 
con.connect(function(err) {
  //if (err) throw err;
  con.query("SELECT id FROM markers", function (err, result, fields) {
    //if (err) throw err;
    console.log(result);
  });
});

//Delete Record
con.connect(function(err) {
  //if (err) throw err;
  var sql = "DELETE FROM markers WHERE id = '5' ";
  con.query(sql, function (err, result) {
    //if (err) throw err;
    console.log("Number of records deleted: " + result.affectedRows);
  });
});





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