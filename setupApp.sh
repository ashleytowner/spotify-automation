if [ ! -d node_modules ]; then
	echo "Run npm install first"
else
	echo "Go to https://developer.spotify.com/dashboard/applications and create an app."
	echo "Enter ClientId:"
	read sfyClientId
	echo "Enter Client Secret:"
	read sfyClientSecret
	encoded=$(echo -n "${sfyClientId}:${sfyClientSecret}" | base64)
	echo "CLIENT_ID=${sfyClientId}" >> .env
	echo "CLIENT_SECRET=${sfyClientSecret}" >> .env
	echo "ENCODED_CLIENT=${encoded}" >> .env
	tsc getToken.ts
	node getToken.js
fi

