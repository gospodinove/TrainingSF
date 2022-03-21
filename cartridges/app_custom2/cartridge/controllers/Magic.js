var server = require('server');
var service = require('app_custom2/cartridge/services/dadJokeService');

server.get('Show', function (req, res, next) {
    var properties = {};
    var template='magic';

    var svcResult = service.dadJokeAPIService.call();

    if (svcResult.status === 'OK') {
        properties.joke = svcResult.object.joke;
    }
  
    res.render(template, properties);
    next();
});

server.get('Search', function (req, res, next) {
    var properties = {};
    var template = 'magicSearch';
    var searchTerm = req.querystring.term || '';

    var url = service.dadJokeAPIService.getURL() + 'search';
    var svcResult = service.dadJokeAPIService.setURL(url).addParam('term', searchTerm).call();
    
    if (svcResult.status === 'OK') {
    	properties.term = searchTerm;
        properties.jokes = svcResult.object.results;
    }

    res.render(template, properties);
    next();
});

server.get('Json',  function (req, res, next) {
	var svcResult = service.dadJokeAPIService.call();

    if (svcResult.status === 'OK') {
    	res.json(svcResult.object);
    } else {
    	res.json({});
    }

    next();
});

server.get('Hello', function (req, res, next) {
    res.render('hello');
    next();
});

module.exports = server.exports();