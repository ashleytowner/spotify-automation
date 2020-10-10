const list = require('./mylibrary.json');

const songs = list.map(item => `${item.track.artists.reduce((a, b) => a + b.name, '')} - ${item.track.name}`);

console.log(songs.sort().join('\n'))