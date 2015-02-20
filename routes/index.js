var swig = require('swig'),
    path = require('path');

module.exports = function (app) {
    app.engine('html', swig.renderFile);

    app.set('view engine', 'html');
    app.set('views', path.join(__dirname, '../views'));
    swig.setDefaults({ cache: false });

    app.route("/")
    .all(function (req, res, next) {
        res.render('index', {bodyClass: 'home'});
    });

    app.route("/inner")
    .all(function (req, res, next) {
        res.render('inner', {bodyClass: 'inner'});
    });
};