import * as express from 'express';
import * as dotenv from 'dotenv';
import * as fs from 'fs';
import axios from 'axios';
dotenv.config();
const app = express();
const port = 3000;
const callback = `http://localhost:${port}/`;

app.get('/', (req, res) => {
	const data = {
		grant_type: 'authorization_code',
		redirect_uri: encodeURIComponent('http://localhost:3000/'),
		code: req.query.code
	};
	const body = Object.keys(data).map(key => `${key}=${data[key]}`).join('&');
	axios.post(`https://accounts.spotify.com/api/token`, body, {
		headers: {
			Authorization: `Basic ${process.env.ENCODED_CLIENT}`
		}
	}).then(tkn => {
		fs.appendFile('./.env', `TOKEN=${tkn.data.access_token}`, (error) => {
			if (error) {
				res.send('There was an error. Please try again.')
				return;
			}
			res.send('You may now close this window');
			return;
		})
	}).catch(err => {
		res.status(500).send("Something went wrong")
		console.error(err.message)
	}).finally(() => {
		runningApp.close();
	})
})

const scopes = encodeURIComponent('user-library-read user-read-private playlist-read-private');
var runningApp = app.listen(port, () => {
	console.log('Click this link and log into spotify:')
	console.log(`https://accounts.spotify.com/authorize?response_type=code&client_id=${process.env.CLIENT_ID}&redirect_uri=${callback}&scope=${scopes}`)
})