
/*var port = process.argv.length < 3 ? 8080 : process.argv[2];

var connect = require('connect');
connect.createServer(
    connect.static(__dirname)
).listen(port);

var readline = require('readline');

var rl = readline.createInterface({
  input: process.stdin,
  output: process.stdout
});

rl.question("Server running at http://127.0.0.1:" + port + "/\nExit with (x).", function(answer) {

	if (answer === "x") {
		console.log("Server stopped!");
  		rl.close();
  		process.exit();
	}
  	
});*/

var express = require('express');
var http = require('http');
var app = express();
var path = require('path');
var httpsync = require('httpsync');

app.set('port', process.env.PORT || 8080)
app.use(express.static(path.join(__dirname, 'public')));
app.use('/css', express.static(path.join(__dirname, '/css')));
app.use('/images', express.static(path.join(__dirname, '/images')));
app.use('/bower_components', express.static(path.join(__dirname, '/bower_components')));
app.use('/elements', express.static(path.join(__dirname, '/elements')));


app.get('/', function(req,res) {
	res.sendfile('index.html');
});

app.get('/api/stats', function(req,res) {

	var request = httpsync.get({ url : "http://www.easports.com/services/statscentral/getdata?platformTag=hockey-nhl-14-PS3&mode=versus&handle=mr_nuno"});
	var response = request.end();
	res.type('application/json');
	res.send(response.data.toString());

});

//http://www.easports.com/services/statscentral/getdata?platformTag=hockey-nhl-14-PS3&mode=solo&handle=mr_nuno

var server = app.listen(8080, function() {
    console.log('Listening on port %d', server.address().port);
});

