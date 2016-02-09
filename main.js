var express = require('express');
var jsLbc = require('./lib/leboncoin.js');
var jsMa = require('./lib/magents.js');
var host = 'localhost';
var port = '3000';
var bodyParser = require('body-parser');
var app = express();

app.use(express.static('public'));
app.use(bodyParser.urlencoded({extended: true}));

app.get('/', function (req, res)
{
	//res.render('index.html');
	res.sendFile('./public/index.html');
});

app.post("/post.html", function(req, res)
{
	var url = req.body.url;

	jsLbc.getInf(url, function (err, data)
	{
  		if(err != null)
		{
			console.log(err);
			data = { error: "An error occured with the url", }
			res.json(data);
		}
		else
		{
			agents.compare(data, function (err, data)
			{
				if(err == null)
			{
				var finalres = { finalres : data }
				res.json(finalres);
			}
			else
			{
				data = { error: "An error occured with meilleursagents", }
				res.json(data);
			}
				
			});
		}
	});
});

app.listen(port,function ()
{;
	console.log('Litstenning on '+ host + ':' + port);
});
