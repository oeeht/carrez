var express = require('express');
var fs = require('fs');
var request = require('request');
var cheerio = require('cheerio');
var app = express();
var json = require('../json/leboncoin.json');

app.get('/leboncoin', function(req, res){
	url = "http://www.leboncoin.fr/ventes_immobilieres/919044489.htm?ca=12_s";
	request(url, function(error, response, html){
		if(!error){
			var $ = cheerio.load(html);
			var price;
			var city;
			var zip;
			var rooms;
			var surface;
			var type;

			price = $("[itemprop='price']").text();
			city = $("[itemprop='addressLocality']").text();
			zip = $("[itemprop='postalCode']").text();

			var tabdata = $("[class = 'lbcParams criterias']>table > tr > td");
			rooms = tabdata[1].children[0].data;
			surface = tabdata[2].children[0].data;
			type = tabdata[0].children[0].data;

			json.properties.price = price;
			json.properties.city = city;
			json.properties.zip = zip;
			json.properties.rooms = rooms;
			json.properties.surface = surface;
			json.properties.type = type;
		}

		fs.writeFile('output.json', JSON.stringify(json, null, 4), function(err){
			console.log('File created : output.json');
	});
	res.send('File created : output.json');
													} 
			)
										}
		);

app.listen('8080')
console.log('Go to localhost:8080/leboncoin');

//exports = module.exports = app;