
var port = process.argv.length < 3 ? 8080 : process.argv[2];

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
  	
});