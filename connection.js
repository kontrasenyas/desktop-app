var mysql = require('mysql');

// Add the credentials to access your database
var connection = mysql.createConnection({
    host     : 'localhost',
    user     : 'root',
    password : null, // or the original password : 'apaswword'
    database : 'libotdb'
});



exports.connect = () => {

    // connect to mysql
    connection.connect(function(err) {
        // in case of error
        if(err){
            console.log(err.code);
            console.log(err.fatal);
        }
    });
        // Perform a query
    $query = 'SELECT * FROM `users` LIMIT 10';

    connection.query($query, function(err, rows, fields) {
        if(err){
            console.log("An error ocurred performing the query.");
            console.log(err);
            return;
        }

        console.log("Query succesfully executed", rows);
    });

    // Close the connection
    connection.end(function(){
        // The connection has been closed
    });

    return 'success';
}

exports.insertScreenshot = (filePath) => {

}

