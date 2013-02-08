if (global.GENTLY) require = GENTLY.hijack(require);

var program = require('commander'),
	crawler = require('img-crawler'),
	validator = require('validator');

var onCrawlUrl = function(url, consoleObject) {
	crawler.crawl({url: url, dist: '.'}, function(err, imgs) {
		if(err) {
			consoleObject.error(err);
		} else {
			consoleObject.log(imgs);
		}
		
	});
};

module.exports = function(argv, consoleObject) {
		if(consoleObject == null) {
			consoleObject = console;
		}
        program
                .version("0.0.1")
                .usage('[options]')
                .option('-u, --url [url]', 'A site to crawl')
                .parse(argv);

                if(program.url) {
                        try {
                                validator.check(program.url).isUrl();
                                onCrawlUrl(program.url, consoleObject);
                        } catch(e) {
                        		consoleObject.error(e.message);
                        }
                } else {
                	program.help();
                }
};
