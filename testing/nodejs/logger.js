

var url= 'http://mylogger.io/log';

function log(message) {
	// body...
	concole.log(message);
}

module.exports.log =log;
module.exports.url =url;