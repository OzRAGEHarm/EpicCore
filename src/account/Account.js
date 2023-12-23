const axios = require("axios");

class Account {
  async getStatsByName(name, apiKey) {
    try {
      const url = `https://fortnite-api.com/v2/stats/br/v2/${name}`;

      const headers = {
        Authorization: apiKey, // fortnite-api.com API key
      };

      const response = await axios.get(url, { headers });
      const data = response.data;

      if (data.error) throw new Error(JSON.stringify(data));
      return data;
    } catch (error) {
      throw new Error(error.message);
    }
  }

  async getStatsById(id, apiKey) {
    try {
      const url = `https://fortnite-api.com/v2/stats/br/v2/${id}`;

      const headers = {
        Authorization: apiKey, // fortnite-api.com API key
      };

      const response = await axios.get(url, { headers });
      const data = response.data;

      if (data.error) throw new Error(JSON.stringify(data));
      return data;
    } catch (error) {
      throw new Error(error.message);
    }
  }
}

module.exports = Account;