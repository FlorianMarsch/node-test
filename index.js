process.on('uncaughtException', function (err) {
	console.error(err.stack);
});


var app = require('./app')();


app.get('/', 'pages/index');

app.protect('/api/league', 'league');


app.fromCache('/api/currentGameday', 'currentGameday');
app.fromCache('/api/currentResults', 'currentResults');
app.fromCache('/api/liveResults', 'liveResults');
app.fromCache('/api/currentPlayers', 'currentPlayers');



app.getProxyToOtherApp('/api/news', 'NEWS_APP');
app.postProxyToOtherApp('/api/news', 'NEWS_APP');

//:profileId is used for authorization

app.getProxyToOtherApp('/api/profile', 'PROFILE_APP');
app.getProxyToOtherApp('/api/profile/:profileId', 'PROFILE_APP');
app.postProxyToOtherApp('/api/profile/:profileId', 'PROFILE_APP');


app.getProxyToOtherApp('/api/squad/:ownerId', 'PLAYER_APP');
app.getProxyToOtherApp('/api/player', 'PLAYER_APP');
app.getProxyToOtherApp('api/player/:playerId', 'PLAYER_APP');
app.getProxyToOtherApp('/api/offer/from/:profileId', 'PLAYER_APP');
app.getProxyToOtherApp('/api/offer/to/:profileId', 'PLAYER_APP');
app.postProxyToOtherApp('/api/offer/from/:profileId', 'PLAYER_APP');
app.postProxyToOtherApp('/api/offer/to/:profileId', 'PLAYER_APP');		
		
		
		
		
		