const axios = require('axios');

class Playlist {
  /**
   * Fetches a specific playlist by its ID.
   * @param {string} playlist The ID of the playlist to fetch.
   * @returns {Promise<object|undefined>} A promise that resolves to the playlist data or undefined on error.
   */
  async getPlaylist(playlist) {
    try {
      const url = `https://fortnite-api.com/v1/playlists/${playlist}`;

      // Use axios.get to make the request
      const response = await axios.get(url);

      // The data is available on the 'data' property of the response object
      if (response.data) {
        return { ...response.data };
      } else {
        return undefined;
      }
    } catch (err) {
      // Return undefined in case of an error, consistent with the original code.
      console.error(`Error fetching playlist ${playlist}:`, err.message);
      return undefined;
    }
  }

  /**
   * Fetches all available playlists.
   * @returns {Promise<object|undefined>} A promise that resolves to the list of all playlists or undefined on error.
   */
  async getAllPlaylists() {
    try {
      const url = `https://fortnite-api.com/v1/playlists`;

      // Use axios.get to make the request
      const response = await axios.get(url);

      // The data is available on the 'data' property of the response object
      if (response.data) {
        return { ...response.data };
      } else {
        return undefined;
      }
    } catch (err) {
      // Return undefined in case of an error, consistent with the original code.
      console.error('Error fetching all playlists:', err.message);
      return undefined;
    }
  }
}

module.exports = Playlist;