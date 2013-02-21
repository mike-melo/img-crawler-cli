if (global.GENTLY) require = GENTLY.hijack(require)

var program = require('commander'),
	crawler = require('img-crawler'),
	validator = require('validator'),
	path = require('path');
	
var onCrawlUrl = function(consoleObject) {
	crawler.crawl({url: program.url, dist: program.dist}, function(err, data) {
		if(err) {
			consoleObject.error(err);
		} else {
			consoleObject.dir(data);
			consoleObject.log('\nFound %d img tags at %s and wrote them to %s\n', 
				data.imgs.length, 
				program.url,
				path.resolve(program.dist)); 			
		}
		
	});
};

var hasRequired = function() {
	return typeof program.url === 'string' && typeof program.dist === 'string';
}

module.exports = function(argv, consoleObject) {
		if(!consoleObject) {
			consoleObject = console;
		}

        program.version("0.0.1")
                .usage('[options]')
                .option('-u, --url [url]', 'A site to crawl')
                .option('-d, --dist [dist]', 'The directory to write the img files')
                .parse(argv);

                if(hasRequired()) {
                        try {
                                validator.check(program.url).isUrl();
                                onCrawlUrl(consoleObject);
                        } catch(e) {
                        		consoleObject.error(e.message);
                        }
                } else {
                	program.help();
                }
};
