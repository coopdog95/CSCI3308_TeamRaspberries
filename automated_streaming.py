#to simply stream testing
#Automated streaming script, to do:
#stuff

import subprocess
import signal
import sys

if (True != False):
	sys.exit()

print("Set up listener and dummy client")
print("When exiting, use crtl-c to exit cleanly")


#for dependencies
#this should show something:
#sudo dpkg -l | grep -P "php.+cli"
#sudo dpkg -l | grep -P "php.+mysql"
#sudo dpkg -l | grep -P "nodejs"

#To get processes
#ps -A 
#node/php/python processes
#ps -A | grep -P "(node|php|python)"
#To kill a process:
#kill pid1 pid2 pid3 ..
#just in case

check_nodejs = subprocess.Popen(["nodejs", "-v"], stdout=subprocess.PIPE)
nodejs_status = check_nodejs.communicate()[0]
check_nodejs.terminate()

check_php = subprocess.Popen(["php", "-v"], stdout=subprocess.PIPE)
php_status = check_php.communicate()[0]
chech_php.terminate()



php_listener = subprocess.Popen(["php", "soil/socket/listen.php", "start"])
'''
The PHP listener runs from listen.php, it waits for the source
of the stream to connect(right now a pseud_client.js, but will be arduino)
and waits for the destination of the stream to connect (the client's browser)
before streaming the data
'''

php_server = subprocess.Popen(["php", "-S", "localhost:3000"], cwd="soil")
'''
This is the server, when it serves home.php, there is inline javascript embedded
in it which tells it to connect to a certain socket (you can find it right BELOW
the src="socket.io.js" script). It will call the "updateGraph()" function on connection.
Right now I commented it out but it works. I also commented out the global definition of updateGraph()
in dynamicPlot.js outside the function block. Must uncomment for the stream to be able to call it.
'''

node_client = subprocess.Popen(["node", "files/test_script/pseudo_client.js"])
'''
This a nodejs client to connect to listen.php and feed it random data, which
listen.php will relay to the webpage
'''


def kill_all(signal, frame):
	print("Killing server, listener and dummy client")
	php_listener.terminate()
	php_server.terminate()
	node_client.terminate()

signal.signal(signal.SIGINT, kill_all)
signal.signal(signal.SIGTERM, kill_all)
signal.signal(signal.SIGALRM, kill_all)
signal.pause()

#none means running
if(php_listener):
	print("There is a problem with listen.php")
	signal.alarm(1)
if(php_server):
	print("There is a problem with the server")
	signal.alarm(1)
if(node_client):
	print("There is a problem with the dummy client")
	signal.alarm(1)



