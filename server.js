const express = require('express');
const hbs = require('hbs');
const fs = require('fs');

var app = express();

hbs.registerPartials(__dirname + '/views/partials');
app.set('view engine', 'hbs');


app.use((req, res, next) => {

	var now = new Date().toString();
	var log = `${now}: ${req.method} ${req.url}`;
	console.log(log);
	fs.appendFile('server.log', log + '\n', (err) => {
		if (err) {
			console.log('Unable to append to server.log');
		}
	});

	next();
});

// app.use((req, res, next) => {
// 	res.render('maintenance.hbs');
// });

app.use(express.static(__dirname + '/public'));

hbs.registerHelper('getCurrentYear', () => {
	return new Date().getFullYear();
});

hbs.registerHelper('screamIt', (str) => {
	return str.toUpperCase();
});

app.get('/', (req, res) => {
	// req = information about request coming in
	// headers that were used, any body information
	// res = bunch of methods available to you, customize
	// your data, do lots o' things

	//res.send('<h1>Hello Express!</h1>');

	// express is smart, recognizes when obj
	// is being sent

	res.render('home.hbs', {
		pageTitle: 'Home Page',
		welcomeMessage: 'Welcome to the website!'
	});
});

app.get('/about', (req, res) => {

	res.render('about.hbs', {
		pageTitle: 'About Page',
	});

});

app.get('/bad', (req, res) => {

	res.send({
		errorMessage: 'Unable to handle request'
	});

});


// binds server to port on machine
app.listen(3000, () => {
	console.log('Server is up on port 3000');
});