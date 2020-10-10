import * as express from 'express';
import * as dotenv from 'dotenv';
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
		res.send(`Token: ${tkn.data.access_token}`);
	}).catch(err => {
		res.status(500).send("Something went wrong")
		console.error(err.message)
	}).finally(() => {
		runningApp.close();
	})
})

const scopes = encodeURIComponent('user-library-read user-read-private playlist-read-private');
var runningApp = app.listen(port, () => {
	console.log(`https://accounts.spotify.com/authorize?response_type=code&client_id=${process.env.CLIENT_ID}&redirect_uri=${callback}&scope=${scopes}`)
})