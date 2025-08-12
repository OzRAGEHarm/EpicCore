# EpicCore
## EpicCore is a Node.js API Wrapper created to Interact with Epic Games' API.
---

## Installation:
```code
> npm i @ozrageharm/epiccore@latest
```

Documentation can be found [here](https://github.com/OzRAGEHarm/EpicCore/blob/main/docs.md)

### Auth Code Login example:
**Get an auth code [here](https://www.epicgames.com/id/login?redirectUrl=https%3A%2F%2Fwww.epicgames.com%2Fid%2Fapi%2Fredirect%3FclientId%3D3f69e56c7649492c8cc29f1af08a8a12%26responseType%3Dcode%0A&prompt=login) by logging in.**

```javascript
const epiccore = require('@ozrageharm/epiccore');

(async () => {
    const authCode = "your-auth-code-here"
    const auth = await epiccore.login({ method: "code", value: authCode });
    console.log(`Logged in as: ${auth.displayName}`)

})();
```

### Listing all available client tokens
```javascript
const epiccore = require('@ozrageharm/epiccore');

(async () => {
  try {
    console.log(epiccore.clientTokens)
  } catch (error) {
    console.error("An error occurred:", error);
  }
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

### Getting Player Stats By Username and Account Id

```javascript
const { getStatsByName, getStatsById } = require('@ozrageharm/epiccore');

const apiKey = "api-key" // fortnite-api.com api key
const acc_by_name = getStatsByName("acc-username", apiKey)
const acc_by_id = getStatsById("acc-id", apiKey)

console.log(acc_by_name, acc_by_id)
```