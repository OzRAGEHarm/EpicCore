const axios = require('axios');

class MCP {
  async operation(accountId, profileId, operation, token, payload) {
    try {
      const url = `https://fortnite-public-service-prod11.ol.epicgames.com/fortnite/api/game/v2/profile/${accountId}/client/${operation}?profileId=${profileId}&rvn=-1`;

      const headers = {
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${token}`,
      };

      const response = await axios.post(url, payload, { headers });
      const data = response.data;

      if (data.errorMessage) throw new Error(JSON.stringify(data));
      return data;
    } catch (error) {
      throw new Error(error.message);
    }
  }
}

module.exports = MCP;
