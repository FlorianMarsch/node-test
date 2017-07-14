
var app = require('./app')();


app.get('/', 'pages/index');

app.mock('/api/news', 'news');
app.protect('/api/league', 'league');




