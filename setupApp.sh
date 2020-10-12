if [ ! -d node_modules ]; then
	echo "Run npm install first"
else
	echo "Go to https://developer.spotify.com/dashboard/applications and create an app."
	echo -n "ClientId: "
	read sfyClientId
	echo -n "Client Secret: "
	read sfyClientSecret
	encoded=$(echo -n "${sfyClientId}:${sfyClientSecret}" | base64)
	echo "CLIENT_ID=${sfyClientId}" >> .env
	echo "CLIENT_SECRET=${sfyClientSecret}" >> .env
	echo "ENCODED_CLIENT=${encoded}" >> .env
	npm run auth
	rm getToken.js
fi

