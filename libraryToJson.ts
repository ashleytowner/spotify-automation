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

async function getSongsInPlaylist(playlistId: string, offset: number = 0, limit: number = 50, getNext: boolean = true): Promise<any[]> {
	let tracks = [];
	const res = await axios.get(`https://api.spotify.com/v1/playlists/${playlistId}/tracks`, {
		headers: {
			Authorization: `Bearer ${process.env.TOKEN}`
		}
	})
	if (res.data.next && getNext) {
		tracks = [...res.data.items, ...(await getSongsInPlaylist(playlistId, offset + limit, limit))]
	} else {
		tracks = [...res.data.items]
	}
	return tracks;
}

async function getAudioFeatures(trackId: string) {
	const res = await axios.get(`https://api.spotify.com/v1/audio-features/${trackId}`, {
		headers: {
			Authorization: `Bearer ${process.env.TOKEN}`
		}
	})
	return res.data;
}

async function getAudioAnalysis(trackId: string) {
	const res = await axios.get(`https://api.spotify.com/v1/audio-analysis/${trackId}`, {
		headers: {
			Authorization: `Bearer ${process.env.TOKEN}`
		}
	})
	return res.data;
}

async function getTrackInfo(trackId: string, complete: boolean = false) {
	const res = await axios.get(`https://api.spotify.com/v1/tracks/${trackId}${complete ? '/#complete' : ''}`, {
		headers: {
			Authorization: `Bearer ${process.env.TOKEN}`
		}
	})
	return res.data
}

async function main() {
	try {
		getLikedSongs().then(x => {
			console.log(x);
		})
	} catch (err) {
		console.error(err)
	}
}


main();

