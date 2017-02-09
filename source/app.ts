import { livePageID } from './config/public';
import { expressSessionSecret } from './config/secret';
import * as express from 'express';
import * as session from 'express-session';
import * as cookieParser from 'cookie-parser';
import * as bodyParser from 'body-parser';
import * as passport from 'passport';
import * as auth from './auth/Router';
import * as fbstream from './fbstream/Router';

var app = express();
app.use(express.static('public'));
app.use(session({
	secret: expressSessionSecret,
	resave: false,
	saveUninitialized: true
}));
app.use(cookieParser());
app.use(bodyParser.json())
app.use(bodyParser.urlencoded({ extended: true }));
app.use(passport.initialize());
app.use(passport.session());
app.set('views', './private/views')
app.set('view engine', 'pug')

// Add 'auth' folder
app.use('/auth', auth.Router('/auth', '/fbstream/start'));

// Add 'fbstream' folder
app.use('/fbstream', fbstream.Router());

// Default redirect
app.get('/', function (req, res) {
	res.redirect('/auth/start');
});

// test pug
app.get('/pugtest', function (req, res) {
	res.render('msg', { title: 'Hey', message: 'Hello there!' })
})

// Error handler
app.use(function (err, req, res, next) {
	console.error(err.stack);
	res.status(500).render('msg', { title: 'Something broke!', message: err.stack });
	//next(err); // don't call built-in error handler
})

// Run server
app.listen(8080);



