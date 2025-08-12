# Documentation

This NPM Package (`@ozrageharm/epiccore`) is a Node.js API wrapper for the Epic Games API, All API references and endpoints used in this package are sourced from https://github.com/LeleDerGrasshalmi/FortniteEndpointsDocumentation and https://github.com/MixV2/EpicResearch.

## Installation:

To install `@ozrageharm/epiccore`, run this command:

```code
> npm i @ozrageharm/epiccore@latest
```

---

## Authentication

You can authenticate to the Epic Games API with an auth code, a device auth object, an exchange code, or a refresh token using the `login` method.

### Authentication Code:

```javascript
const epiccore = require("@ozrageharm/epiccore");

(async () => {
  // Authenticate with an auth code
  try {
    const auth = await epiccore.login({
      method: "code",
      value: "<auth code here>",
    });
    console.log(auth);
  } catch (error) {
    console.error("An error occurred during authentication:", error);
  }
})();
```

### Exchange Code:

```javascript
const epiccore = require("@ozrageharm/epiccore");

(async () => {
  // Authenticate using an exchange code
  try {
    const credentials = {
      account_id: "<your account id>",
      access_token: "your account's access token",
    };
    const exchangeCode = await epiccore.generateExchangeCode(credentials);
    const auth = await epiccore.login({
      method: "exchange",
      value: exchangeCode.code,
    });
    console.log(auth);
  } catch (error) {
    console.error("An error occurred during authentication:", error);
  }
})();
```

### Device Auth:

```javascript
const epiccore = require("@ozrageharm/epiccore");

(async () => {
  try {
    const credentials = {
      account_id: "<your account id>",
      access_token: "your account's access token",
    };
    const deviceAuth = await epiccore.createDeviceAuth(credentials);
    const auth = await epiccore.login({ method: "device", value: deviceAuth });
    console.log(auth);
  } catch (error) {
    console.error("An error occurred during authentication:", error);
  }
})();
```

### Refresh Token:

```javascript
const epiccore = require("@ozrageharm/epiccore");

(async () => {
  // Authenticate using a refresh token
  try {
    const auth = await epiccore.login({
      method: "refresh",
      value: "<your refresh token here>",
    });
    console.log(auth);
  } catch (error) {
    console.error("An error occurred during authentication:", error);
  }
})();
```

---

## Client Tokens

The package provides pre-configured client tokens for various platforms. To create your own, find a `client id` and `client secret` from a site like [egs.jaren.wtf](https://egs.jaren.wtf), then encode them together in the format: `id:secret` (notice the colon `:`) using a [Base64 encoder](https://www.base64encode.org/).

If you don't provide a client token, the package automatically uses the ANDROID_TOKEN from the clientTokens object as the default.

To use a specific client token, whether it's a pre-configured one or a custom one you created, you pass it as an argument to the login method, as shown in these examples:

* Using a pre-configured client token:
```javascript
const epiccore = require('@ozrageharm/epiccore');

(async () => {
  // This uses the pre-configured Xbox client token
  /*...*/ await epiccore.login(/*...*/, epiccore.clientTokens.XBOX_TOKEN)
})();
```

* Using a custom client token:
```javascript
const epiccore = require('@ozrageharm/epiccore');

(async () => {
  // This uses a custom one (in this case, the Switch 1 client token)
  /*...*/ await epiccore.login(/*...*/, "NTIyOWRjZDNhYzM4NDUyMDhiNDk2NjQ5MDkyZjI1MWI6ZTNiZDJkM2UtYmY4Yy00ODU3LTllN2QtZjNkOTQ3ZDIyMGM3CQ==")
})();
```

---

## Creating a Device Auth:

To create a device authentication object, you first need to get an access token by logging in. Then, you can use that access token along with the user's account ID to generate a new device auth object, which is useful for persistent logins.

Here is an example of how to use the createDeviceAuth method:

```javascript
const epiccore = require("@ozrageharm/epiccore");

(async () => {
  try {
    // First, log in with your preferred method to get an access token.
    // This example uses an auth code.
    const auth = await epiccore.login({
      method: "code",
      value: "<your auth code here>",
    });

    const credentials = {
      account_id: auth.account_id,
      access_token: auth.access_token,
    };

    // Now, use the credentials to create a device auth.
    const deviceAuth = await epiccore.createDeviceAuth(credentials);
    console.log(deviceAuth);
  } catch (error) {
    console.error("An error occurred during authentication:", error);
  }
})();
```

---

## Generating an Exchange Code:

An exchange code is a short-lived token that can be traded for a full access token. This is often used to pass a temporary authentication token from one service to another without exposing a long-term access token.

To generate an exchange code, you must first have a valid access token. Here is an example of how to use the `generateExchangeCode` method:

```javascript
const epiccore = require("@ozrageharm/epiccore");

(async () => {
  try {
    // First, log in with your preferred method to get an access token.
    // This example uses an auth code.
    const auth = await epiccore.login({
      method: "code",
      value: "<your auth code here>",
    });

    const credentials = {
      access_token: auth.access_token,
    };

    // Now, use the access token to generate an exchange code.
    const exchangeCode = await epiccore.generateExchangeCode(credentials);
    console.log(exchangeCode);
  } catch (error) {
    console.error("An error occurred:", error);
  }
})();
```

---

## Calling MCP Operations:

The `operation` method is used to interact with Fortnite's MCP service, it allows you to perform various actions on a user's profile, such as updating quest progress, managing virtual items, and more.

To use this method, you will need a valid access token, the user's account ID, and the relevant profile ID. Here is an example:

```javascript
const epiccore = require("@ozrageharm/epiccore");

(async () => {
  try {
    // First, log in with your preferred method to get an access token.
    // This example uses an auth code.
    const auth = await epiccore.login({
      method: "code",
      value: "<your auth code here>",
    });

    // Define the parameters for the MCP operation.
    const accountId = auth.account_id;
    const token = auth.access_token;
    const profileId = "athena"; // Example: "athena", "common_core", "campaign"
    const operation = "MarkItemSeen"; // Example: "MarkItemSeen", "SetGiftBoxOpened", etc.
    const payload = {}; // The payload for the operation, depends on the operation type.
    // In this case, MarkItemSeen can be bulk, meaning it will mark all items as seen, removing the notification that you have new items in your locker.

    // Now, perform the MCP operation.
    const mcpResponse = await epiccore.operation(
      accountId,
      profileId,
      operation,
      token,
      payload
    );
    console.log(mcpResponse);
  } catch (error) {
    console.error("An error occurred:", error);
  }
})();
```

---

## Getting cosmetics:

The `getCosmetic` method is used to fetch detailed information about a specific cosmetic item from the unofficial [Fortnite API](https://fortnite-api.com). This is useful for retrieving data like the item's name, description, rarity, and image URLs.

The method requires at least one identifier (name, type, or id) to locate the cosmetic. Here is an example of how to use the `getCosmetic` method:

- Getting a cosmetic by its name:

```javascript
const epiccore = require("@ozrageharm/epiccore");

(async () => {
  try {
    // For grabbing a cosmetic by name, the type string is required
    const cosmetic = await epiccore.getCosmetic("Renegade Raider", "outfit");
    console.log(JSON.stringify(cosmetic));
  } catch (error) {
    console.error("An error occurred:", error);
  }
})();
```

* Getting a cosmetic by it's id:

```javascript
const epiccore = require("@ozrageharm/epiccore");

(async () => {
  try {
    // For grabbing a cosmetic by id, name and type are not required
    const cosmetic = await epiccore.getCosmetic(
      null,
      null,
      "CID_028_Athena_Commando_F"
    );
    console.log(JSON.stringify(cosmetic));
  } catch (error) {
    console.error("An error occurred:", error);
  }
})();
```

> Response for either example code above (formatted for readability):

```json
{
  "id": "CID_028_Athena_Commando_F",
  "name": "Renegade Raider",
  "description": "Rare renegade raider outfit.",
  "type": "outfit",
  "rarity": {
    "value": "rare",
    "displayValue": "Rare",
    "backendValue": "EFortRarity::Rare"
  },
  "set": {
    "value": "Storm Scavenger",
    "text": "Part of the Storm Scavenger set.",
    "backendValue": "StormScavenger"
  },
  "introduction": {
    "chapter": "1",
    "season": "1",
    "text": "Introduced in Chapter 1, Season 1.",
    "backendValue": 1
  },
  "images": {
    "smallIcon": "https://fortnite-api.com/images/cosmetics/br/cid_028_athena_commando_f/smallicon.png",
    "icon": "https://fortnite-api.com/images/cosmetics/br/cid_028_athena_commando_f/icon.png",
    "featured": "https://fortnite-api.com/images/cosmetics/br/cid_028_athena_commando_f/featured.png",
    "lego": {
      "small": "https://fortnite-api.com/images/cosmetics/lego/cid_028_athena_commando_f/small.png",
      "large": "https://fortnite-api.com/images/cosmetics/lego/cid_028_athena_commando_f/large.png"
    },
    "bean": {
      "small": "https://fortnite-api.com/images/cosmetics/beans/bean_commando028/small.png",
      "large": "https://fortnite-api.com/images/cosmetics/beans/bean_commando028/large.png"
    }
  },
  "variants": [
    {
      "channel": "Material",
      "type": "STYLE",
      "options": [
        {
          "tag": "Mat1",
          "name": "DEFAULT",
          "image": "https://fortnite-api.com/images/cosmetics/br/cid_028_athena_commando_f/variants/material/mat1.png"
        },
        {
          "tag": "Mat2",
          "name": "CHECKERED",
          "image": "https://fortnite-api.com/images/cosmetics/br/cid_028_athena_commando_f/variants/material/mat2.png"
        },
        {
          "tag": "Mat3",
          "name": "Black & Gold",
          "image": "https://fortnite-api.com/images/cosmetics/br/cid_028_athena_commando_f/variants/material/mat3.png"
        }
      ]
    }
  ],
  "showcaseVideo": "fpBlzmTLmaE",
  "added": "2019-11-20T12:50:30Z"
}
```

---

## Getting updated cosmetic paths:

The `getPath` method provides an updated cosmetic path string. This is especially useful for libraries like [fnbr.js](https://fnbr.js.org/), which may require a different path format than what is provided by the unofficial [Fortnite API](https://fortnite-api.com). This method ensures that you have the correct path to use with those libraries.

The `getPath` method takes the cosmetic's original path as a single parameter and returns a string containing the updated path. This updated path can then be passed to other methods or libraries that require it, for example:

You can get an auth code by [logging into an account](https://www.epicgames.com/id/login?redirectUrl=https%3A%2F%2Fwww.epicgames.com%2Fid%2Fapi%2Fredirect%3FclientId%3D3f69e56c7649492c8cc29f1af08a8a12%26responseType%3Dcode%0A&prompt=login) or if you're already logged into an account, get an auth code [here](https://www.epicgames.com/id/api/redirect?clientId=3f69e56c7649492c8cc29f1af08a8a12&responseType=code)

```javascript
const epiccore = require("@ozrageharm/epiccore");
const { Client } = require("fnbr");

(async () => {
  try {
    const botOptions = {
      keepAliveInterval: 30,
      auth: {
        authorizationCode: async () => "<auth code here>",
        authClient: "fortniteAndroidGameClient", // you can use any game client here
      },
    };

    const client = new Client(botOptions);
    // fnbr allows you to login and it will create a client,
    // here's the docs page if you're interested (not affiliated, this code is just an example for the getPath method in use):
    // https://fnbr.js.org/#/docs/main/stable/general/welcome
    await client.login();

    // Get a cosmetic
    const cosmetic = await epiccore.getCosmetic("Renegade Raider", "outfit");

    // Get updated cosmetic path using the path from the getCosmetic method
    const path = epiccore.getPath(cosmetic.path);

    // Set the fnbr client's outfit in the party using the cosmetic id and updated path from getPath
    await client.party.me.setOutfit(cosmetic.id, [], [], path);
  } catch (error) {
    console.error("An error occurred:", error);
  }
})();
```

---

## Getting playlists:

The `getPlaylist` and `getAllPlaylists` methods allow you to retrieve information on a specific playlist or all available playlists. Here is how to use them:

* Using `getPlaylist` method:

```javascript
const epiccore = require("@ozrageharm/epiccore");

(async () => {
  try {
    // Get a playlist by id (in this case, the battle royale duos playlist)
    const playlist = await epiccore.getPlaylist("playlist_defaultduo");
    console.log(JSON.stringify(playlist));
  } catch (error) {
    console.error("An error occurred:", error);
  }
})();
```

> Response (formatted for readability):

```json
{
  "id": "Playlist_DefaultDuo",
  "name": "Duos",
  "description": "Pair up with a buddy and take everyone else down.",
  "gameType": "EFortGameType::BR",
  "ratingType": "fun",
  "minPlayers": -1,
  "maxPlayers": 100,
  "maxTeams": 100,
  "maxTeamSize": 2,
  "maxSquads": -1,
  "maxSquadSize": 2,
  "isDefault": true,
  "isTournament": false,
  "isLimitedTimeMode": false,
  "isLargeTeamGame": false,
  "accumulateToProfileStats": false,
  "images": {
    "showcase": "https://fortnite-api.com/images/playlists/playlist_defaultduo/showcase.png",
    "missionIcon": "https://fortnite-api.com/images/playlists/playlist_defaultduo/missionicon.png"
  },
  "gameplayTags": [
    "Athena.Playlist.DefaultXP",
    "Athena.Playlist.Default",
    "Athena.Playlist.Core",
    "Athena.Playlist.Duo",
    "Athena.Plugin.GameMod.Gasket",
    "Athena.Quests.NoBuild.Exclude",
    "Behavior.Playlist.UseTimeSlicedWorldReady"
  ],
  "path": "FortniteGame/Plugins/GameFeatures/BRPlaylists/Content/Athena/Playlists/Playlist_DefaultDuo",
  "added": "2020-09-25T22:30:59Z"
}
```

* Using `getAllPlaylists` method:

```javascript
const epiccore = require("@ozrageharm/epiccore");

(async () => {
  try {
    // Get all playlists
    const playlists = await epiccore.getAllPlaylists();
    console.log(JSON.stringify(playlists));
  } catch (error) {
    console.error("An error occurred:", error);
  }
})();
```

---

## Getting Account Statistics:

The `getStatsByName` and `getStatsById` methods allow you to retrieve the in-game statistics for a Fortnite account using either the player's display name or their unique account ID.

Both `getStatsByName` and `getStatsById` require an API key, you can get your own key [here](https://dash.fortnite-api.com/account).

* Using `getStatsByName`:

```javascript
const epiccore = require("@ozrageharm/epiccore");

(async () => {
  try {
    // Get account statistics via display name
    const apiKey = "<your api key here>";
    const stats = await epiccore.getStatsByName("<display name>", apiKey);
    console.log(JSON.stringify(stats));
  } catch (error) {
    console.error("An error occurred:", error);
  }
})();
```

* Using `getStatsById`:

```javascript
const epiccore = require("@ozrageharm/epiccore");

(async () => {
  try {
    // Get account statistics via account id
    const apiKey = "<your api key here>";
    const stats = await epiccore.getStatsById("<account id>", apiKey);
    console.log(JSON.stringify(stats));
  } catch (error) {
    console.error("An error occurred:", error);
  }
})();
```

# Credits:
Unofficial Fortnite API: https://fortnite-api.com/<br>
fnbr.js npm package: https://fnbr.js.org/<br>
Epic Research repository: https://github.com/MixV2/EpicResearch<br>
Fortnite Endpoints Documentation respository: https://github.com/LeleDerGrasshalmi/FortniteEndpointsDocumentation<br>