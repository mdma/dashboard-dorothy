Router.configure({
    layoutTemplate: 'mainLayout',
    notFoundTemplate: 'notFound'

});

//
// Example pages routes
//

Router.route('/dashboard5', function () {
    this.render('dashboard5');
});

Router.route('/', function () {
    Router.go('dashboard5');
});

