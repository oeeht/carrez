var request = require('request');
var cheerio = require('cheerio');
var fs = require('fs');
var lbcjson = require('../json/leboncoin.json');
var url ="http://www.leboncoin.fr/ventes_immobilieres/920589043.htm?ca=12_s";

function getInf(url, callback)
{
	request(url, function (error, response, body)
	{
		if (!error)
		{
    		var $ = cheerio.load(body);

    		json.properties.price = parseInt($("[itemprop='price']").text().toString().replace(' ' ,''));
    		json.properties.city = $("[itemprop='addressLocality']").text();
    		json.properties.zip = $("[itemprop='postalCode']").text();

    		var infos = $("[class='lbcParams criterias']>table > tr >th");
			var tab = $("[class='lbcParams criterias']>table > tr >td");

			for(var i =0; i<table.length; i++)
			{
				if(attribute[i].children[0].data.indexOf('Surface')>-1)
				{
					json.properties.surface = parseInt(table[i].children[0].data);
				}
				else if(attribute[i].children[0].data.indexOf('Pi')>-1)
				{
					json.properties.rooms = table[i].children[0].data;
				}
				else if(attribute[i].children[0].data.indexOf('Type')>-1)
				{
					json.properties.type = table[i].children[0].data;
				}
			}

			callback(null, json);

		}

		else
		{
			callback({error: error}, null);
			console.log(error);
			console.log(error.error);
		}
	});
}

exports.getInf = getInf;