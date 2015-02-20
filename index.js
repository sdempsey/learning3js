var express = require('express'),
    compression = require('compression');
    path = require('path'),
    fs = require('fs'),
    request = require('request'),
    app = express();

app.use(compression({level: 9}));

app.set('view cache', false);

require('./routes')(app);
app.use('/', express.static(__dirname + '/public'));

var port = process.env.PORT || 1337;
var host = '0.0.0.0';
var server = app.listen(port, host, function () {
    console.log("Listening on host: " + host + " and port: " + port);

    var crawl = process.argv[2] === 'crawl';
    var outputFolder = path.join(__dirname, "/static");
    if (crawl) { 
        crawlApp('localhost', port, server, app, outputFolder); 
    }
});

//
// Crawl the app and save the static files.
//
function crawlApp(host, port, server, app, outputFolder) {
    var stack = app._router.stack;
    for (var i in stack) {
        var rt = stack[i];

        if (rt.route) {
            // Hit this path and get the HTML response.
            var url = "http://" + host + ":" + port;
            var name = rt.route.path.replace(/\//, '');
            if (!name) { 
                name = "index"; 
            }
            name += ".html";

            // Save the response to disk.
            console.log("Getting " + url + rt.route.path);
            console.log("Output file: " + path.join(outputFolder, name));
            request.get(url + rt.route.path).pipe(fs.createWriteStream(path.join(outputFolder, name)));
        }
    }
}
