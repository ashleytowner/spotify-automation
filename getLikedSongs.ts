import axios from 'axios';
import * as dotenv from 'dotenv';
dotenv.config();

async function getLikedSongs(offset: number = 0, limit: number = 50, getNext: boolean = true): Promise<any[]> {
	let tracks = [];
	const res = await axios.get(`https://api.spotify.com/v1/me/tracks?limit=${limit}&offset=${offset}`, {
		headers: {
			Authorization: `Bearer ${process.env.TOKEN}`
		}
	})
	if (res.data.next && getNext) {
		tracks = [...res.data.items, ...(await getLikedSongs(offset + limit, limit))]
	} else {
		tracks = [...res.data.items]
	}
	return tracks;
}

async function main() {
	try {
		getLikedSongs().then(list => {
			console.log(JSON.stringify(list))
		})
	} catch (err) {
		console.error(err)
	}
}


main();

