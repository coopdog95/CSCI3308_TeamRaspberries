import os


print("Creating database and tables (enter mysql password):")
os.system("mysql -u root -p < initialize_database.sql")

print("Changing the config.php to contain your password (enter mysql password):")
password = input()

conf = '''<?php


/* Database credentials. Assuming you are running MySQL
server with default setting (user 'root' with no password) */
define('DB_SERVER', 'localhost');
define('DB_USERNAME', 'root');
define('DB_PASSWORD', 'PLACEHOLDER');
define('DB_NAME', 'Raspberries');

/* Attempt to connect to MySQL database */
$link = mysqli_connect(DB_SERVER, DB_USERNAME, DB_PASSWORD, DB_NAME);

// Check connection
if($link === false){
    die("ERROR: Could not connect loser. " . mysqli_connect_error());
}
?>
'''.replace("PLACEHOLDER", password)


with open("soil/config.php", "w+") as file:
	file.write(conf)

print("Finished writing config.php")
print("""
Go into the soil directory, and run the server with:\n
\"php -S localhost:3000\"\n
you can access it in your browser by entering the url:\n
\"localhost:3000\"\n
by default this will point at our index.php file, which
is the renamed login page. you can also manually append
filenames like \"localhost:3000/home.php\" and it will 
serve it.\n
if you get a SQL error, make sure to install php-sql
"""
