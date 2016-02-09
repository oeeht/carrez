var cheerio = require('cheerio'),
	fs = require('fs'),
	jsonMa = require('../json/magents.json');
var json;
var urlMa = "./paris.html";
  
function goodDeal(data, callback)
{
	var $ = cheerio.load(fs.readFileSync(url, 'utf8'));
	var pricem2 = data.properties.price / data.properties.surface;
	var val = $('.small-4.medium-2.columns');
	val = val.slice(3);

	if (data.properties.type == "Appartement")
	{
		val = val.slice(0, 3);
	}
	else if (data.properties.type == "Maison")
	{
		val = val.slice(3, 6);
	}
	else
	{
		val = val.slice(6);
	}

	jsonMa.properties.zip = data.properties.zip;
	jsonMa.properties.type = data.properties.type;
	jsonMa.properties.city = data.properties.city;
	jsonMa.properties.surface = data.properties.surface;
	jsonMa.properties.price_ini = data.properties.price;
			
	jsonMa.properties.price.min = value[0].children[0].data.match(/[0-9,]/g).join("").replace(",", ".");
	jsonMa.properties.price.avg = value[1].children[0].data.match(/[0-9,]/g).join("").replace(",", ".");
	jsonMa.properties.price.max = value[2].children[0].data.match(/[0-9,]/g).join("").replace(",", ".");
	jsonMa.properties.pricem2 = pricem2;

	if(pricem2 < jsonMa.properties.price.avg)
	{
		jsonMa.properties.good = 1;
	}
	else
	{
		jsonMa.properties.good = 0;
	}

	callback(null, json);

	return jsonMa.properties.good;
} 
exports.goodDeal = goodDeal;