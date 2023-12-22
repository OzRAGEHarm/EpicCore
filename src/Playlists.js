const { get } = require("request-promise");

class Playlist {
  async getPlaylist(playlist) {
    try {
      const url = `https://fortnite-api.com/v1/playlists/${playlist}`;

      const pl = await get({
        url,
        json: true,
      });

      if (pl.data) {
        return { ...pl.data };
      } else {
        return undefined;
      }
    } catch (err) {
      return undefined;
    }
  }

  async getAllPlaylists() {
    try {
      const url = `https://fortnite-api.com/v1/playlists`;

      const pl = await get({
        url,
        json: true,
      });

      if (pl.data) {
        return { ...pl.data };
      } else {
        return undefined;
      }
    } catch (err) {
      return undefined;
    }
  }
}

module.exports = Playlist;
