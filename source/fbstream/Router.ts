import { livePageID } from '../config/public';
import * as express from 'express';
import * as fb from './fb';

async function main(user, res) {
	fb.get(user['accessToken'], '/me/accounts', function (err, buff) {
		if (err) console.log('Error!');
		else {
			var pages = buff['data'];
			var page = pages.find(function (x) {
				return x['id'] == livePageID;
			});
			console.log('Page access token:', page['access_token']);
			user['page'] = page;
		}
	});
}


var router = express.Router();

router.get('/start', function (req, res, next) {
	console.log('Starting fbstream');
	console.log('Session: ', req.session);
	console.log('User: ', req.user);
	fb.get(req.user['accessToken'], '/me/accounts', function (err, buff) {
		if (err) {
			res.redirect('./failure');
		} else {
			var data = buff['data'];
			var page = data.find((page) => page['id'] == livePageID);
			console.log('Page access token:', page['access_token']);
			console.log(page);
			req.user['page'] = page;
			res.send('You have gained access to ' + page['name']);
		}
	});
});

router.get('/failure', function (req, res) {
	console.log('Failed user: ', req.user);
	res.status(500).send('fbstream failure');
});


export function Router() {
	return router;
}
