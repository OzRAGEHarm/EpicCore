# EpicCore
## EpicCore is a Node.js API Wrapper created to Interact with Epic Games' API.
---

```code
> npm i @ozrageharm/epiccore
```

### Auth Code Login example:

```javascript
const epiccore = require('@ozrageharm/epiccore');

(async () => {

    const authCode = "your-auth-code-here"

    const auth = await epiccore.login({ method: "code", value: authCode });

    console.log(`Logged in as: ${auth.displayName}`)

})();
```

### Getting Playlist Data

```javascript
const { getPlaylist, getAllPlaylists } = require('@ozrageharm/epiccore');

const playlist_id = "playlist-id-here";

const playlist = getPlaylist(playlist_id);

const playlists = getAllPlaylists();

console.log(playlist, playlists)
```

### Getting Cosmetic Data

```javascript
const { getCosmetic, getPath } = require('@ozrageharm/epiccore');

// Cosmetic name and type are required for searching by name, but are not required for searching by id
const cosmetic = getCosmetic("cosmetic-name (optional)", "cosmetic-type (optional)", "cosmetic-id (optional)")

const path = getPath(cosmetic.path)
console.log(cosmetic, path)
```