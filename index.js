var express = require('express');
var app = express();

app.set('port', (process.env.PORT || 5000));

app.use(express.static(__dirname + '/public'));


app.get('/', function(request, response) {
	response.sendFile( __dirname + "/" + "views/pages/index.html" );
});
app.get('/api/:resource', function(request, response) {
	let resource = request.params.resource;
	response.header("Content-Type", "application/json");
	response.sendFile( __dirname + "/mock/" +resource+".json");
});

app.listen(app.get('port'), function() {
  console.log('Node app is running on port', app.get('port'));
});


