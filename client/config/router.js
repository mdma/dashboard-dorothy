Router.configure({
    layoutTemplate: 'mainLayout',
    notFoundTemplate: 'notFound'

});

//
// Example pages routes
//

Router.route('/admin', function () {
    this.render('admin');
});

Router.route('/diagnostic', function () {
    this.render('diagnostic');
});

Router.route('/locations', function () {
    this.render('locations');
});

Router.route('/dashboard', function () {
    this.render('dashboard');
});

Router.route('/', function () {
    Router.go('dashboard');
});

