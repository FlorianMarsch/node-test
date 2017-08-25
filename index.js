
var app = require('./app')();


app.get('/', 'pages/index');

app.mock('/api/news', 'news');
app.protect('/api/league', 'league');


app.fromCache('/api/currentGameday', 'currentGameday');
app.fromCache('/api/currentResults', 'currentResults');
app.fromCache('/api/currentPlayers', 'currentPlayers');




